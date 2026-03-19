import { useState, useEffect } from 'react'
import { Lang } from './types'
import { useCv } from './hooks/useCv'
import Header from './components/Header'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Education from './components/Education'
import Languages from './components/Languages'

type Theme = 'dark' | 'light'

export default function App() {
  const [lang, setLang] = useState<Lang>('en')
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) ?? 'dark'
  )
  const { data: cv, loading, error } = useCv(lang)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
    const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]:not([media])')
    if (icon) icon.href = theme === 'dark' ? '/favicon-light.svg' : '/favicon-dark.svg'
  }, [theme])

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
      </div>
    )
  }

  if (error || !cv) {
    return (
      <div className="loading">
        <p>Failed to load CV. <a href="https://github.com/rabarbra/cv" target="_blank" rel="noopener noreferrer">View on GitHub</a></p>
      </div>
    )
  }

  return (
    <>
      <Header cv={cv} lang={lang} onLangChange={setLang} theme={theme}
              onThemeToggle={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />
      <main className="main-content">
        <section className="cv-section">
          <h2 className="section-title">{cv.profile.title}</h2>
          {cv.profile.content.map((p, i) => <p key={i} className="profile-para">{p}</p>)}
        </section>
        <Experience title={cv.experience.title} jobs={cv.experience.content} />
        <Skills title={cv.skills.title} skills={cv.skills.content} />
        <Education title={cv.education.title} entries={cv.education.content} />
        <Languages title={cv.languages.title} languages={cv.languages.content} />
      </main>
      <footer className="site-footer">
        Source on <a href="https://github.com/rabarbra/cv" target="_blank" rel="noopener noreferrer">GitHub</a>
        {' '}· Updated automatically on every push
      </footer>
    </>
  )
}
