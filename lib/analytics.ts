type Ym = ((
  id: number,
  action: string,
  goal: string,
  params?: object,
) => void) & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any[]): void
}
type Gtag = (event: string, name: string, params?: object) => void

declare global {
  interface Window {
    ym?: Ym
    gtag?: Gtag
  }
}

export function track(event: string, params?: object) {
  if (typeof window === 'undefined') return
  window.ym?.(
    Number(process.env.NEXT_PUBLIC_YM_ID ?? 0),
    'reachGoal',
    event,
    params,
  )
  window.gtag?.('event', event, params)
}
