interface Props {
  title: string
  skills: string[]
}

export default function Skills({ title, skills }: Props) {
  return (
    <section className="cv-section">
      <h2 className="section-title">{title}</h2>
      <div className="skills-wrap">
        {skills.map((s, i) => <span key={i} className="skill-tag">{s}</span>)}
      </div>
    </section>
  )
}
