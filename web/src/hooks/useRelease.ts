import { useState, useEffect } from 'react'
import { Lang } from '../types'

const API = 'https://api.github.com/repos/rabarbra/cv/releases/latest'

export function useRelease() {
  const [assets, setAssets] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(rel => {
        const map: Record<string, string> = {}
        for (const a of rel.assets ?? []) map[a.name] = a.browser_download_url
        setAssets(map)
      })
      .catch(() => {})
  }, [])

  return (lang: Lang) => assets[`cv_${lang}.pdf`] ?? null
}
