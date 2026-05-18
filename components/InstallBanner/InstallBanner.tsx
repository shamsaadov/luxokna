'use client'
import { useEffect, useState } from 'react'
import * as s from './InstallBanner.css'

const STORAGE_KEY = 'luxokna.install.dismissed'
const COOLDOWN_MS = 30 * 24 * 60 * 60 * 1000 // 30 days
const ENTRANCE_DELAY_MS = 8000

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

function readDismissedAt(): number {
  if (typeof localStorage === 'undefined') return 0
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return 0
  const n = Number(raw)
  return Number.isFinite(n) ? n : 0
}

/**
 * Small dismissible "Установить как приложение" prompt that captures the
 * `beforeinstallprompt` event (Android/Chromium PWA install hook), waits 8s
 * to avoid fighting the hero, and is hidden on desktop and when the
 * calculator is open. Dismissals persist for 30 days in localStorage.
 */
export function InstallBanner() {
  const [evt, setEvt] = useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Respect a fresh dismissal.
    const dismissedAt = readDismissedAt()
    if (dismissedAt && Date.now() - dismissedAt < COOLDOWN_MS) return

    let timer: ReturnType<typeof setTimeout> | undefined
    const onBip = (e: Event) => {
      e.preventDefault()
      setEvt(e as BeforeInstallPromptEvent)
      timer = setTimeout(() => setVisible(true), ENTRANCE_DELAY_MS)
    }
    window.addEventListener('beforeinstallprompt', onBip)
    return () => {
      window.removeEventListener('beforeinstallprompt', onBip)
      if (timer) clearTimeout(timer)
    }
  }, [])

  const handleInstall = async () => {
    if (!evt) return
    try {
      await evt.prompt()
      await evt.userChoice
    } catch {
      /* user-cancelled or unsupported */
    }
    setVisible(false)
    setEvt(null)
  }

  const handleDismiss = () => {
    setVisible(false)
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()))
    } catch {
      /* private mode */
    }
  }

  return (
    <div
      className={s.root}
      data-visible={visible || undefined}
      aria-hidden={!visible}
      role="dialog"
      aria-label="Установка приложения"
    >
      <div className={s.text}>
        <div className={s.label}>Установить как приложение</div>
        <div className={s.sub}>Быстрее и без браузера</div>
      </div>
      <div className={s.actions}>
        <button type="button" className={s.btn} onClick={handleInstall}>
          Установить
        </button>
        <button
          type="button"
          className={s.close}
          onClick={handleDismiss}
          aria-label="Закрыть"
        >
          ×
        </button>
      </div>
    </div>
  )
}
