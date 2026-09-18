import { contact, profile, projects } from '../content.js'
import { GithubIcon } from './icons.jsx'
import TypedText from './TypedText.jsx'
import Reveal from './Reveal.jsx'
import './Hero.css'

export default function Hero() {
  const scrollTo = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="hero">
      <div className="shell">
        <Reveal className="hero__strip">
          <span className="hero__status">
            <i />
            {profile.status}
          </span>
          <ul className="hero__meta mono">
            {profile.meta.map((m) => (
              <li key={m.k}>
                <span>{m.k}</span>
                {m.v}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="hero__grid">
          <div className="hero__copy">
            <Reveal as="p" className="label" delay={40}>
              {profile.location} · {profile.direction}
            </Reveal>

            <Reveal as="h1" className="hero__title" delay={90}>
              {profile.name}
              <span className="hero__roles">
                <TypedText phrases={profile.roles} />
              </span>
            </Reveal>

            <Reveal as="p" className="hero__tagline" delay={150}>
              {profile.tagline}
            </Reveal>

            <Reveal className="hero__cta" delay={210}>
              <a className="btn btn-primary" href="#projects" onClick={scrollTo('projects')}>
                看 {projects.length} 个项目
              </a>
              <a
                className="btn btn-ghost"
                href={`https://github.com/${contact.github}`}
                target="_blank"
                rel="noreferrer"
              >
                <GithubIcon />
                GitHub
              </a>
              <a className="link-arrow" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </Reveal>
          </div>

          <Reveal as="aside" className="hero__panel card" delay={240}>
            <div className="hero__panel-head">
              <span className="label">最近在做</span>
              <span className="mono hero__panel-count">
                {profile.now.length} 项
              </span>
            </div>
            <ul className="hero__rows">
              {profile.now.map((item) => (
                <li key={item.text}>
                  <span className="hero__row-text">{item.text}</span>
                  <em className="mono hero__state" data-state={item.state}>
                    {item.state}
                  </em>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
