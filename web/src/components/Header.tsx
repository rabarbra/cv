import { CVData, Lang } from '../types'

interface Props {
  cv: CVData
  lang: Lang
  onLangChange: (l: Lang) => void
  theme: 'dark' | 'light'
  onThemeToggle: () => void
}

export default function Header({ cv, lang, onLangChange, theme, onThemeToggle }: Props) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="header-top">
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
      </div>
    </header>
  )
}
