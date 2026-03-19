import { CVEducation } from '../types'

interface Props {
  title: string
  entries: CVEducation[]
}

export default function Education({ title, entries }: Props) {
  return (
    <section className="cv-section">
      <h2 className="section-title">{title}</h2>
      <div className="edu-list">
        {entries.map((e, i) => (
          <div key={i} className="edu-item">
            <div className="edu-main">
              <strong>{e.organization}</strong>
              <span className="edu-discipline">{e.discipline}</span>
            </div>
            <span className="edu-period">{e.from} – {e.to}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
