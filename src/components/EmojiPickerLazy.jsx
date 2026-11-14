import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

// Lazy-loaded: emoji data is ~450 KB, only fetched when the picker opens.
export default function EmojiPickerLazy({ onEmojiSelect, theme = 'dark' }) {
  return (
    <Picker
      data={data}
      onEmojiSelect={onEmojiSelect}
      theme={theme}
      previewPosition="none"
      skinTonePosition="search"
      set="native"
      dynamicWidth
    />
  )
}
