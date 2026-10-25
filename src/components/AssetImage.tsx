import { useEffect, useState } from 'react'

type AssetImageProps = {
  src: string
  alt: string
  mode?: 'cover' | 'contain'
  className?: string
}

export function AssetImage({ src, alt, mode = 'cover', className = '' }: AssetImageProps) {
  const [failed, setFailed] = useState(false)

  useEffect(() => setFailed(false), [src])

  return (
    <div className={`asset-image ${failed ? 'is-missing' : ''} ${className}`}>
      {!failed && <img src={src} alt={alt} style={{ objectFit: mode }} onError={() => setFailed(true)} />}
      {failed && <span className="asset-placeholder" aria-label={`${alt}: изображение ожидается`} />}
    </div>
  )
}
