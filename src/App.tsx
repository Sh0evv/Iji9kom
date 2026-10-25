import {
  useCallback,
  useEffect,
  useState,
  type CSSProperties,
} from 'react'
import { Shield } from 'lucide-react'
import { ActionButtons } from './components/ActionButtons'
import { ImageModal } from './components/ImageModal'
import { LoadoutSection } from './components/LoadoutSection'
import { PlayerProfile } from './components/PlayerProfile'
import { profileConfig, type GalleryItem } from './config'

export default function App() {
  const [selected, setSelected] = useState<GalleryItem | null>(null)
  const [notice, setNotice] = useState('')

  const closeModal = useCallback(() => setSelected(null), [])

  useEffect(() => {
    if (!notice) return

    const timeout = window.setTimeout(() => setNotice(''), 2000)

    return () => window.clearTimeout(timeout)
  }, [notice])

  const backgroundStyle = {
    '--background-image': `url("${profileConfig.background}")`,
  } as CSSProperties

  return (
    <main className="app-shell" style={backgroundStyle}>
      <div className="background-overlay" aria-hidden="true" />

      <div className="particles" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => (
          <i
            key={index}
            style={{
              left: `${(index * 17 + 9) % 100}%`,
              top: `${(index * 23 + 11) % 100}%`,
              animationDelay: `${index * -0.6}s`,
            }}
          />
        ))}
      </div>

      <div className="content-wrap">
        <div className="game-title" aria-label="Standoff 2">
          <span />
          Standoff 2
          <span />
        </div>

        <article className="profile-card">
          <PlayerProfile
            avatar={profileConfig.avatar}
            initials={profileConfig.initials}
            nickname={profileConfig.nickname}
            id={profileConfig.id}
          />

          <section
            className="portfolio-section clan-section"
            aria-labelledby="clan-heading"
          >
            <h2 id="clan-heading">Clan</h2>

            <div className="clan-badge">
              <Shield size={23} strokeWidth={1.5} aria-hidden="true" />
              <span>{profileConfig.clan}</span>
            </div>
          </section>

          <LoadoutSection
            items={profileConfig.loadout}
            onSelect={setSelected}
          />

          <ActionButtons
            id={profileConfig.id}
            telegram={profileConfig.telegram}
            onNotice={setNotice}
          />
        </article>
      </div>

      <div
        className={`toast ${notice ? 'is-visible' : ''}`}
        role="status"
        aria-live="polite"
      >
        {notice}
      </div>

      <ImageModal item={selected} onClose={closeModal} />
    </main>
  )
}
