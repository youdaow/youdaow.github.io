import { contact, nav, profile } from '../content.js'
import { ArrowUpIcon, GithubIcon } from './icons.jsx'
import './Footer.css'

export default function Footer() {
  const go = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <div className="footer__brand">
          <span className="footer__name">{profile.name}</span>
          <span className="mono footer__copy">
            © {new Date().getFullYear()} · React + Vite 构建
          </span>
        </div>

        <nav className="footer__links" aria-label="页脚导航">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={go(n.id)}>
              {n.label}
            </a>
          ))}
          <a
            href={`https://github.com/${contact.github}`}
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon />
            GitHub
          </a>
        </nav>

        <button
          type="button"
          className="footer__top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          回到顶部
          <ArrowUpIcon />
        </button>
      </div>
    </footer>
  )
}
