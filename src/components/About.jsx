import { contact, gamedev, profile, skills, stats, techStack } from '../content.js'
import { ArrowUpIcon } from './icons.jsx'
import Reveal from './Reveal.jsx'
import { useCountUp, useGithubProfile, useInView } from '../hooks.js'
import './About.css'

export default function About() {
  const gh = useGithubProfile(contact.github)

  return (
    <section id="about" className="section">
      <div className="shell about__grid">
        <div className="about__prose">
          <Reveal>
            <span className="label">About</span>
            <h2 className="section-title">关于我</h2>
          </Reveal>

          {profile.bio.map((p, i) => (
            <Reveal as="p" key={i} className="about__p" delay={100 + i * 80}>
              {p}
            </Reveal>
          ))}

          <Reveal className="about__stack" delay={260}>
            <span className="label">项目里用到的技术</span>
            <ul>
              {techStack.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="about__game" delay={320}>
            <span className="label">游戏开发</span>
            <ul>
              {gamedev.items.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
            <p className="about__note mono">
              引擎 {gamedev.engines.join(' / ')}，目前能搭起这些基础系统
            </p>
          </Reveal>

          <Reveal delay={380}>
            <a
              className="link-arrow"
              href={`https://github.com/${contact.github}`}
              target="_blank"
              rel="noreferrer"
            >
              github.com/{contact.github}
              <ArrowUpIcon className="about__ext" />
            </a>
          </Reveal>
        </div>

        <div className="about__side">
          <Reveal className="stats">
            {stats.map((s, i) => (
              <Stat key={s.label} stat={s} gh={gh} index={i} />
            ))}
          </Reveal>

          <Reveal className="skills card" delay={100}>
            <div className="skills__head">
              <span className="label">我能负责的部分</span>
              <span className="mono skills__note">AI-first 分工</span>
            </div>
            <ul>
              {skills.map((skill, i) => (
                <Bar key={skill.name} skill={skill} index={i} />
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Stat({ stat, gh, index }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const fromGh = stat.ghField ? gh?.[stat.ghField] : null
  const value = Number.isFinite(fromGh) ? fromGh : stat.fallback
  const shown = useCountUp(value, inView, 1100 + index * 120)

  return (
    <div className="stat" ref={ref}>
      <span className="stat__num mono">{shown.toLocaleString('en-US')}</span>
      <span className="stat__label">{stat.label}</span>
    </div>
  )
}

function Bar({ skill, index }) {
  const [ref, inView] = useInView({ threshold: 0.5 })

  return (
    <li className="bar" ref={ref}>
      <div className="bar__top">
        <span>{skill.name}</span>
        <span className="mono">{skill.level}</span>
      </div>
      <div className="bar__track">
        <span
          className="bar__fill"
          style={{
            width: inView ? `${skill.level}%` : '0%',
            transitionDelay: `${index * 90}ms`,
          }}
        />
      </div>
    </li>
  )
}
