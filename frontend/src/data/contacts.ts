export type ContactLink = {
  label: string
  href: string
  external: boolean
}

export const staticContactLinks: ContactLink[] = [
  {
    label: 'Telegram',
    href: 'https://t.me/Begench_Borjakov',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/begench-borjakov-862b84395',
    external: true,
  },
]

export const phoneContact: ContactLink = {
  label: '+90 537 524 52 64',
  href: 'tel:+905375245264',
  external: false,
}
