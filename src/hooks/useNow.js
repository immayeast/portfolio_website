import { useEffect, useState } from 'react'

export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return now
}

export function formatTime(date, timeZone, withSeconds = true) {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: withSeconds ? '2-digit' : undefined,
      hour12: false,
      timeZone,
    }).format(date)
  } catch {
    return date.toTimeString().slice(0, withSeconds ? 8 : 5)
  }
}

const hmsFormatters = {}

// Hours, minutes, seconds of `date` in the given time zone
export function zonedHMS(date, timeZone) {
  try {
    const key = timeZone || 'local'
    hmsFormatters[key] ??= new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone,
    })
    const parts = hmsFormatters[key].formatToParts(date)
    const get = (type) => Number(parts.find((p) => p.type === type)?.value ?? 0)
    return { h: get('hour') % 24, m: get('minute'), s: get('second') }
  } catch {
    return { h: date.getHours(), m: date.getMinutes(), s: date.getSeconds() }
  }
}

export function zoneLabel(date, timeZone) {
  try {
    const part = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'short' })
      .formatToParts(date)
      .find((p) => p.type === 'timeZoneName')
    return part?.value ?? ''
  } catch {
    return ''
  }
}
