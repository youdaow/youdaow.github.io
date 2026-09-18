import { useEffect, useState } from 'react'
import { contact, nav, profile } from '../content.js'
import { GithubIcon, MenuIcon, CloseIcon, SunIcon, MoonIcon } from './icons.jsx'
import { useActiveSection, useScrollProgress, useTheme } from '../hooks.js'
import './Nav.css'

const ids = nav.map((n) => n.id)

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [theme, toggleTheme] = useTheme()
  const active = useActiveSection(ids)
  const { progress, y } = useScrollProgress()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className={`nav ${y > 8 ? 'is-solid' : ''}`}>
      <div className="shell nav__inner">
        <a href="#home" className="nav__brand" onClick={go('home')}>
          <span className="nav__mark" aria-hidden="true">
            {profile.name.slice(0, 1)}
          </span>
          <span className="nav__name">{profile.name}</span>
          <span className="nav__tag mono">个人主页</span>
        </a>

        <nav className="nav__links" aria-label="主导航">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={go(item.id)}
              className={`nav__link ${active === item.id ? 'is-active' : ''}`}
              aria-current={active === item.id ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <button
            type="button"
            className="nav__theme"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? '切换到深色主题' : '切换到浅色主题'}
            title={theme === 'light' ? '切换到深色' : '切换到浅色'}
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>

          <a
            className="nav__gh"
            href={`https://github.com/${contact.github}`}
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon />
            <span>GitHub</span>
          </a>
          <a className="btn btn-primary nav__cta" href="#contact" onClick={go('contact')}>
            联系我
          </a>
          <button
            type="button"
            className="nav__burger"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? '关闭菜单' : '打开菜单'}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div className="nav__bar" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      <div className={`nav__drawer ${open ? 'is-open' : ''}`}>
        {nav.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={go(item.id)}
            className="nav__drawer-link"
          >
            {item.label}
          </a>
        ))}
        <a
          className="btn btn-primary nav__drawer-cta"
          href={`https://github.com/${contact.github}`}
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon />
          GitHub
        </a>
      </div>
    </header>
  )
}
