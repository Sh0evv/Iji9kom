import { Copy, Send } from 'lucide-react'

type ActionButtonsProps = {
  id: string
  telegram?: string
  onNotice: (message: string) => void
}

export function ActionButtons({
  id,
  telegram = 'https://t.me/patr1cjane',
  onNotice,
}: ActionButtonsProps) {
  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(id)
      onNotice('ID скопирован')
    } catch {
      onNotice(`Скопируйте ID вручную: ${id}`)
    }
  }

  const openTelegram = () => {
    const url = telegram.trim()

    if (!url) {
      onNotice('Telegram пока не указан')
      return
    }

    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="actions">
      <button type="button" onClick={copyId}>
        <Copy size={15} aria-hidden="true" />
        Copy ID
      </button>

      <button type="button" onClick={openTelegram}>
        <Send size={15} aria-hidden="true" />
        Telegram
      </button>
    </div>
  )
}