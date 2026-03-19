import { CVLanguage } from '../types'

interface Props {
  title: string
  languages: CVLanguage[]
}

export default function Languages({ title, languages }: Props) {
  return (
    <section className="cv-section">
      <h2 className="section-title">{title}</h2>
      <div className="lang-list">
        {languages.map((l, i) => (
          <div key={i} className="lang-item">
            <span>{l.lang}</span>
            <span className="lang-level">{l.level}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
