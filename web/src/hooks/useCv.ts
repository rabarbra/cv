import { useState, useEffect } from 'react'
import yaml from 'js-yaml'
import { CVData, Lang } from '../types'

const RAW = 'https://raw.githubusercontent.com/rabarbra/cv/main'

export function useCv(lang: Lang) {
  const [data, setData] = useState<CVData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`${RAW}/cv.${lang}.yml`)
      .then(r => {
        if (!r.ok) throw new Error(`${r.status}`)
        return r.text()
      })
      .then(text => {
        setData(yaml.load(text) as CVData)
        setLoading(false)
      })
      .catch(e => {
        setError(e.message)
        setLoading(false)
      })
  }, [lang])

  return { data, loading, error }
}
