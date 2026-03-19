import { CVJob } from '../types'

interface Props {
  title: string
  jobs: CVJob[]
}

export default function Experience({ title, jobs }: Props) {
  return (
    <section className="cv-section">
      <h2 className="section-title">{title}</h2>
      <div className="jobs">
        {jobs.map((job, i) => (
          <article key={i} className="job">
            <div className="job-header">
              <div>
                <span className="job-title">{job.position}</span>
                <span className="job-org">{job.organization}</span>
              </div>
              <span className="job-period">{job.from} – {job.to}</span>
            </div>
            <ul className="job-desc">
              {job.description.map((d, j) => <li key={j}>{d}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
