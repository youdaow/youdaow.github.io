import { useMemo, useState } from 'react'
import { projects } from '../content.js'
import { ArrowUpIcon, GithubIcon, LinkIcon, StarIcon } from './icons.jsx'
import Reveal from './Reveal.jsx'
import './Projects.css'

export default function Projects() {
  const [filter, setFilter] = useState('全部')
  const [open, setOpen] = useState(null)

  const featured = projects.find((p) => p.featured) ?? projects[0]
  const rest = useMemo(() => projects.filter((p) => p !== featured), [featured])

  const types = useMemo(
    () => ['全部', ...new Set(rest.map((p) => p.type))],
    [rest],
  )

  const shown = useMemo(
    () => (filter === '全部' ? rest : rest.filter((p) => p.type === filter)),
    [filter, rest],
  )

  return (
    <section id="projects" className="section">
      <div className="shell">
        <Reveal className="section-head">
          <div>
            <span className="label">Projects</span>
            <h2 className="section-title">做过的项目</h2>
          </div>
          <p className="section-note">
            精选一个放在上面，其余按分类列在表里。点任意一行可展开具体实现思路。
          </p>
        </Reveal>

        <Reveal className="feat card">
          <div className="feat__main">
            <span className="label">精选 · {featured.year}</span>
            <h3 className="feat__name">{featured.name}</h3>
            <p className="feat__summary">{featured.summary}</p>
            <p className="feat__detail">{featured.detail}</p>
            <div className="feat__actions">
              {featured.repo && (
                <a className="btn btn-ghost" href={featured.repo} target="_blank" rel="noreferrer">
                  <GithubIcon />
                  源码
                </a>
              )}
              {featured.demo && (
                <a className="link-arrow" href={featured.demo} target="_blank" rel="noreferrer">
                  在线体验
                  <ArrowUpIcon className="feat__ext" />
                </a>
              )}
            </div>
          </div>

          <dl className="feat__spec">
            <div>
              <dt>类型</dt>
              <dd>{featured.type}</dd>
            </div>
            <div>
              <dt>Star</dt>
              <dd className="mono">{featured.stars}</dd>
            </div>
            <div>
              <dt>技术栈</dt>
              <dd>
                <ul className="feat__tags">
                  {featured.tags.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className="tabs" delay={80}>
          {types.map((t) => (
            <button
              key={t}
              type="button"
              className={`tab ${filter === t ? 'is-on' : ''}`}
              onClick={() => setFilter(t)}
              aria-pressed={filter === t}
            >
              {t}
              <span className="mono tab__n">
                {t === '全部' ? rest.length : rest.filter((p) => p.type === t).length}
              </span>
            </button>
          ))}
        </Reveal>

        <Reveal className="rows" delay={120}>
          <div className="rows__head mono" aria-hidden="true">
            <span>#</span>
            <span>项目</span>
            <span>说明</span>
            <span>技术</span>
            <span>年份</span>
            <span />
          </div>

          {shown.map((p, i) => {
            const isOpen = open === p.name
            return (
              <article className={`row ${isOpen ? 'is-open' : ''}`} key={p.name}>
                <button
                  type="button"
                  className="row__btn"
                  onClick={() => setOpen(isOpen ? null : p.name)}
                  aria-expanded={isOpen}
                >
                  <span className="row__num mono">{String(i + 1).padStart(2, '0')}</span>
                  <span className="row__name">{p.name}</span>
                  <span className="row__summary">{p.summary}</span>
                  <span className="row__type mono">{p.type}</span>
                  <span className="row__year mono">{p.year}</span>
                  <span className="row__plus" aria-hidden="true" />
                </button>

                <div className="row__more">
                  <div className="row__more-inner">
                    <p>{p.detail}</p>
                    <ul>
                      {p.tags.map((t) => (
                        <li key={t} className="chip">
                          {t}
                        </li>
                      ))}
                    </ul>
                    <div className="row__links">
                      {p.repo && (
                        <a href={p.repo} target="_blank" rel="noreferrer">
                          <GithubIcon />
                          源码
                        </a>
                      )}
                      {p.demo && (
                        <a href={p.demo} target="_blank" rel="noreferrer">
                          <LinkIcon />
                          演示
                        </a>
                      )}
                      <span className="mono row__stars">
                        <StarIcon />
                        {p.stars}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}

          {!shown.length && <p className="rows__empty">这个分类下暂时没有别的。</p>}
        </Reveal>
      </div>
    </section>
  )
}
