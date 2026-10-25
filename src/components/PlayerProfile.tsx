import { useEffect, useState } from 'react'

type PlayerProfileProps = {
  avatar: string
  initials: string
  nickname: string
  id: string
}

export function PlayerProfile({
  avatar,
  initials,
  nickname,
  id,
}: PlayerProfileProps) {
  const [avatarFailed, setAvatarFailed] = useState(false)

  useEffect(() => setAvatarFailed(false), [avatar])

  return (
    <header className="player-profile">
      <div className={`avatar ${avatarFailed ? 'avatar-initials' : ''}`}>
        {!avatarFailed ? (
          <img
            src={avatar}
            alt={`Аватар ${nickname}`}
            onError={() => setAvatarFailed(true)}
          />
        ) : (
          <span role="img" aria-label={`Инициалы ${nickname}`}>
            {initials}
          </span>
        )}
      </div>
      <h1>{nickname}</h1>
      <p>ID {id}</p>
      <div className="chevron-divider" aria-hidden="true"><span /></div>
    </header>
  )
}
