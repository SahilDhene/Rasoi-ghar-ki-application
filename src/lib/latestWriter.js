// Per-key write queue: at most one request in flight per key. Calls that arrive while one is
// running collapse into a single follow-up that sends the *latest* value, so rapid taps can't
// land out of order on the server. All callers of a burst get the final value (or the error).
// onDone(key, value) runs once per successful burst.
export function createLatestWriter(send, onDone = () => {}) {
  const wanted = new Map()
  const running = new Map()

  function write(key, value) {
    wanted.set(key, value)
    if (running.has(key)) return running.get(key)
    const burst = (async () => {
      try {
        for (;;) {
          const v = wanted.get(key)
          await send(key, v)
          if (wanted.get(key) === v) {
            wanted.delete(key)
            onDone(key, v)
            return v
          }
        }
      } catch (e) {
        wanted.delete(key)
        throw e
      } finally {
        running.delete(key)
      }
    })()
    running.set(key, burst)
    return burst
  }

  return { write, isBusy: (key) => running.has(key) }
}
