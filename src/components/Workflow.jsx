import { tools, workflow } from '../content.js'
import Reveal from './Reveal.jsx'
import './Workflow.css'

export default function Workflow() {
  return (
    <section id="workflow" className="section">
      <div className="shell">
        <Reveal className="section-head">
          <div>
            <span className="label">Workflow</span>
            <h2 className="section-title">我怎么做事</h2>
          </div>
          <p className="section-note">
            代码交给 agent，我负责把需求说清楚、把结果验收到能上线。
          </p>
        </Reveal>

        <Reveal className="steps">
          {workflow.map((s) => (
            <div className="step" key={s.step}>
              <span className="step__num mono">{s.step}</span>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__text">{s.text}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="tools" delay={100}>
          <span className="label">常用 agent</span>
          <ul>
            {tools.map((t) => (
              <li key={t.name}>
                <span className="tools__name mono">{t.name}</span>
                <span className="tools__note">{t.note}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
