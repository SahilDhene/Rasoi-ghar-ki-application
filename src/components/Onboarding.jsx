import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useLang } from '../lib/i18n'
import { CartIcon, CheckCircleIcon, FlameIcon, HomeIcon, UserPlusIcon } from './Icons'
import s from './Onboarding.module.css'

// "mom" = Kitchen Manager (edits stock), "dad" = Family Shopper (gets alerts, does shopping)
const ROLES = [
  { value: 'mom', titleKey: 'role_mom_title', descKey: 'role_mom_desc', Icon: FlameIcon, color: '#FF6B35', bg: 'rgba(255,107,53,0.10)' },
  { value: 'dad', titleKey: 'role_dad_title', descKey: 'role_dad_desc', Icon: CartIcon, color: '#60a5fa', bg: 'rgba(96,165,250,0.10)' },
]

function generateInviteCode() {
  const bytes = new Uint8Array(6)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (b) => (b % 36).toString(36)).join('').toUpperCase()
}

export default function Onboarding({ user, onComplete }) {
  const { t } = useLang()
  const [step, setStep] = useState('flow') // flow | create | join | invite
  const [role, setRole] = useState(null)
  const [familyName, setFamilyName] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [household, setHousehold] = useState(null)
  const [copied, setCopied] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] ?? 'there'

  function goBack() {
    setStep('flow')
    setError('')
  }

  async function handleCreate(e) {
    e.preventDefault()
    if (!familyName.trim()) return setError(t('err_enter_family_name'))
    if (!role) return setError(t('err_pick_role'))
    setBusy(true)
    setError('')
    try {
      // retry on invite-code collision (unique violation 23505)
      let created = null
      for (let attempt = 0; attempt < 5 && !created; attempt++) {
        const code = generateInviteCode()
        const { error } = await supabase.from('households').insert({ name: familyName.trim(), invite_code: code })
        if (error) {
          if (error.code !== '23505') throw error
        } else {
          const { data } = await supabase.rpc('find_household_by_invite_code', { code })
          created = data?.[0] ?? null
        }
      }
      if (!created) throw new Error('Could not generate a unique code. Try again.')

      const { error } = await supabase
        .from('household_members')
        .insert({ household_id: created.id, user_id: user.id, role })
      if (error) throw new Error(error.message)

      setHousehold(created)
      setStep('invite')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function handleJoin(e) {
    e.preventDefault()
    if (!inviteCode.trim()) return setError(t('err_enter_invite'))
    if (!role) return setError(t('err_pick_role'))
    setBusy(true)
    setError('')
    try {
      const { data, error } = await supabase.rpc('find_household_by_invite_code', { code: inviteCode.trim() })
      if (error || !data?.length) throw new Error(t('err_invalid_code'))
      const found = data[0]
      const { error: joinError } = await supabase
        .from('household_members')
        .insert({ household_id: found.id, user_id: user.id, role })
      if (joinError) throw new Error(joinError.message)
      onComplete(role, found)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  function copyCode() {
    navigator.clipboard.writeText(household.invite_code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const roleChips = (
    <div className={s.roleRow}>
      {ROLES.map((r) => {
        const active = role === r.value
        return (
          <button
            key={r.value}
            type="button"
            className={`${s.roleChip} ${active ? s.roleChipActive : ''}`}
            style={active ? { '--chip-color': r.color, '--chip-bg': r.bg } : {}}
            onClick={() => setRole(r.value)}
          >
            <div className={s.chipIcon} style={{ color: r.color, background: r.bg }}>
              <r.Icon size={16} />
            </div>
            <div className={s.chipText}>
              <span className={s.chipTitle}>{t(r.titleKey)}</span>
              <span className={s.chipDesc}>{t(r.descKey)}</span>
            </div>
            <div
              className={`${s.radio} ${active ? s.radioOn : ''}`}
              style={active ? { background: r.color, borderColor: r.color } : {}}
            />
          </button>
        )
      })}
    </div>
  )

  let card = null

  if (step === 'flow') {
    card = (
      <>
        <div className={s.header}>
          <p className={s.greeting}>{t('greeting', { name: firstName })}</p>
          <h1 className={s.title}>{t('join_family_title')}</h1>
          <p className={s.sub}>{t('join_family_sub')}</p>
        </div>
        <div className={s.flowOptions}>
          <button className={s.flowCard} onClick={() => setStep('create')}>
            <div className={s.flowIcon}>
              <HomeIcon size={20} />
            </div>
            <div className={s.flowInfo}>
              <span className={s.flowTitle}>{t('start_new_family')}</span>
              <span className={s.flowDesc}>{t('start_new_family_desc')}</span>
            </div>
            <span className={s.flowArrow}>→</span>
          </button>
          <button className={s.flowCard} onClick={() => setStep('join')}>
            <div className={s.flowIcon}>
              <UserPlusIcon size={20} />
            </div>
            <div className={s.flowInfo}>
              <span className={s.flowTitle}>{t('have_invite_code')}</span>
              <span className={s.flowDesc}>{t('have_invite_code_desc')}</span>
            </div>
            <span className={s.flowArrow}>→</span>
          </button>
        </div>
      </>
    )
  } else if (step === 'create') {
    card = (
      <>
        <button className={s.back} onClick={goBack}>{t('back')}</button>
        <div className={s.header}>
          <h1 className={s.title}>{t('name_your_family')}</h1>
          <p className={s.sub}>{t('name_your_family_sub')}</p>
        </div>
        <form onSubmit={handleCreate} className={s.form}>
          <input
            className={s.input}
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            placeholder={t('family_name_placeholder')}
            autoFocus
          />
          <p className={s.fieldLabel}>{t('your_role')}</p>
          {roleChips}
          {error && <p className={s.errMsg}>{error}</p>}
          <button type="submit" className={s.primaryBtn} disabled={busy}>
            {t(busy ? 'creating' : 'create_family')}
          </button>
        </form>
      </>
    )
  } else if (step === 'join') {
    card = (
      <>
        <button className={s.back} onClick={goBack}>{t('back')}</button>
        <div className={s.header}>
          <h1 className={s.title}>{t('enter_invite_code_title')}</h1>
          <p className={s.sub}>{t('enter_invite_code_sub')}</p>
        </div>
        <form onSubmit={handleJoin} className={s.form}>
          <input
            className={`${s.input} ${s.codeInput}`}
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value.toUpperCase().slice(0, 6))}
            placeholder="XXXXXX"
            autoFocus
            spellCheck={false}
          />
          <p className={s.fieldLabel}>{t('your_role')}</p>
          {roleChips}
          {error && <p className={s.errMsg}>{error}</p>}
          <button type="submit" className={s.primaryBtn} disabled={busy}>
            {t(busy ? 'joining' : 'join_family_btn')}
          </button>
        </form>
      </>
    )
  } else if (step === 'invite') {
    card = (
      <>
        <div className={s.successIcon}>
          <CheckCircleIcon size={48} />
        </div>
        <div className={s.header}>
          <h1 className={s.title}>{t('family_ready', { name: household.name })}</h1>
          <p className={s.sub}>{t('share_code_hint')}</p>
        </div>
        <div className={s.inviteBlock}>
          <p className={s.inviteLabel}>{t('invite_code')}</p>
          <div className={s.inviteCodeRow}>
            <span className={s.inviteCode}>{household.invite_code}</span>
            <button className={s.copyBtn} onClick={copyCode}>
              {t(copied ? 'copied' : 'copy')}
            </button>
          </div>
          <p className={s.inviteHint}>{t('invite_hint')}</p>
        </div>
        <button className={s.primaryBtn} onClick={() => onComplete(role, household)}>
          {t('go_to_dashboard')}
        </button>
      </>
    )
  }

  return (
    <div className={s.page}>
      <div className={s.bgGlow} />
      <div key={step} className={s.card}>
        {card}
      </div>
    </div>
  )
}
