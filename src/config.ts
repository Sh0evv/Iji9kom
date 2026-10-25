export type GalleryItem = {
  name: string
  image: string
}

export const profileConfig = {
  nickname: 'Iji9kom',
  id: '227234955',
  clan: '[64-zx]',
  telegram: 'https://t.me/patr1cjane',
 avatar: '/images/avatar.jpg',
  initials: 'IJ',
  background: '/images/background.png',

  loadout: [
    { name: 'AKR Twilight', image: '/images/loadout/akr.png' },
    { name: 'AWM', image: '/images/loadout/awm.png' },
    { name: 'Desert Eagle', image: '/images/loadout/pistol.png' },
    { name: 'Knife', image: '/images/loadout/knife.png' },
  ] satisfies GalleryItem[],
} as const
