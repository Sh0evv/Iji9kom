import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import type { GalleryItem } from '../config'
import { AssetImage } from './AssetImage'

type ImageModalProps = {
  item: GalleryItem | null
  onClose: () => void
}

export function ImageModal({ item, onClose }: ImageModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!item) return

    returnFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      )

      if (focusableElements.length === 0) {
        event.preventDefault()
        dialogRef.current?.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (
        event.shiftKey &&
        (document.activeElement === firstElement ||
          !dialogRef.current?.contains(document.activeElement))
      ) {
        event.preventDefault()
        lastElement.focus()
      } else if (
        !event.shiftKey &&
        (document.activeElement === lastElement ||
          !dialogRef.current?.contains(document.activeElement))
      ) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.classList.add('modal-open')
    closeButtonRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('modal-open')
      returnFocusRef.current?.focus()
      returnFocusRef.current = null
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) =>
        event.target === event.currentTarget && onClose()
      }
    >
      <div
        ref={dialogRef}
        className="image-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
      >
        <button
          ref={closeButtonRef}
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Закрыть просмотр изображения"
        >
          <X aria-hidden="true" />
        </button>
        <AssetImage src={item.image} alt={item.name} mode="contain" />
        <h2 id="modal-title">{item.name}</h2>
      </div>
    </div>
  )
}
