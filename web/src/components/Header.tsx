import { CVData, Lang } from '../types'

interface Props {
  cv: CVData
  lang: Lang
  onLangChange: (l: Lang) => void
  theme: 'dark' | 'light'
  onThemeToggle: () => void
}


const ICONS: Record<string, JSX.Element> = {
  tel: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 12a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1.22h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9a16 16 0 006.9 6.9l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  email: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  github: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>,
  linkedin: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  location: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
}

function contactHref(key: string, value: string | { city: string; country: string }): string | null {
  if (key === 'tel') return `tel:${String(value).replace(/\s/g, '')}`
  if (key === 'email') return `mailto:${value}`
  if (key === 'github') return `https://${value}`
  if (key === 'linkedin') return `https://${value}`
  return null
}

function contactLabel(key: string, value: string | { city: string; country: string }): string {
  if (key === 'location' && typeof value === 'object') return `${value.city}, ${value.country}`
  return String(value)
}

export default function Header({ cv, lang, onLangChange, theme, onThemeToggle }: Props) {
  const { content: contact } = cv.contact

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="header-top">
          <div className="header-name">
            <h1>{cv.title}</h1>
            <p className="subtitle">{cv.subtitle}</p>
          </div>
          <div className="header-controls">
            <button className="ctrl-btn" onClick={onThemeToggle} title="Toggle theme">
              {theme === 'dark' ? '☀' : '☾'}
            </button>
            <div className="ctrl-divider" />
            {(['en', 'de'] as Lang[]).map(l => (
              <button
                key={l}
                className={`ctrl-btn${lang === l ? ' active' : ''}`}
                onClick={() => onLangChange(l)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="contacts">
          {(Object.entries(contact) as [string, string | { city: string; country: string }][]).map(([key, value]) => {
            const href = contactHref(key, value)
            const label = contactLabel(key, value)
            return (
              <span key={key} className="contact-item">
                <span className="contact-icon">{ICONS[key]}</span>
                {href
                  ? <a href={href} target={key === 'github' || key === 'linkedin' ? '_blank' : undefined} rel="noopener noreferrer">{label}</a>
                  : <span>{label}</span>
                }
              </span>
            )
          })}
        </div>

      </div>
    </header>
  )
}
