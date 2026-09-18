import { useEffect, useState } from 'react'
import { contact, profile } from '../content.js'
import { ArrowUpIcon, CheckIcon, CopyIcon } from './icons.jsx'
import Reveal from './Reveal.jsx'
import './Contact.css'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [toast, setToast] = useState('')
  const [form, setForm] = useState({ name: '', email: '', msg: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2600)
    return () => clearTimeout(t)
  }, [toast])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      setToast('邮箱已复制到剪贴板')
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setToast(`复制没成功，手动记一下：${contact.email}`)
    }
  }

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setErrors((err) => ({ ...err, [k]: '' }))
  }

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = '填个称呼'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = '邮箱格式不对'
    if (form.msg.trim().length < 5) next.msg = '再多写几个字'
    setErrors(next)
    if (Object.keys(next).length) {
      setToast('还有几处需要补一下')
      return
    }

    const subject = encodeURIComponent(`来自 ${form.name} 的留言`)
    const body = encodeURIComponent(`${form.msg}\n\n—— ${form.name} <${form.email}>`)
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
    setToast('已打开邮件客户端，发送即可')
  }

  const channels = [
    { label: '邮箱', value: contact.email, copy: true },
    {
      label: 'GitHub',
      value: `github.com/${contact.github}`,
      url: `https://github.com/${contact.github}`,
    },
    ...contact.links.map((l) => ({
      label: l.label,
      value: l.url.replace(/^https?:\/\//, ''),
      url: l.url,
    })),
  ]

  return (
    <section id="contact" className="section">
      <div className="shell">
        <Reveal className="section-head">
          <div>
            <span className="label">Contact</span>
            <h2 className="section-title">聊聊</h2>
          </div>
          <p className="section-note">
            合作、请教、打招呼都可以。{profile.status}。
          </p>
        </Reveal>

        <div className="contact__grid">
          <Reveal className="channels">
            {channels.map((c) => {
              const inner = (
                <>
                  <span className="channels__label mono">{c.label}</span>
                  <span className="channels__value">{c.value}</span>
                  {c.copy ? (
                    <span className={`channels__act ${copied ? 'is-done' : ''}`}>
                      {copied ? <CheckIcon /> : <CopyIcon />}
                    </span>
                  ) : c.url ? (
                    <span className="channels__act">
                      <ArrowUpIcon className="channels__diag" />
                    </span>
                  ) : null}
                </>
              )

              return c.url ? (
                <a
                  className="channels__row"
                  key={c.label}
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {inner}
                </a>
              ) : (
                <button
                  type="button"
                  className="channels__row"
                  key={c.label}
                  onClick={copyEmail}
                >
                  {inner}
                </button>
              )
            })}
          </Reveal>

          <Reveal as="form" className="form card" delay={100} onSubmit={submit} noValidate>
            <div className="form__head">
              <span className="label">留言</span>
              <span className="mono form__note">走本地邮件客户端</span>
            </div>

            <label className={`field ${errors.name ? 'has-err' : ''}`}>
              <span className="field__k mono">称呼</span>
              <input
                value={form.name}
                onChange={set('name')}
                placeholder="怎么称呼你"
                aria-invalid={!!errors.name}
              />
              <em>{errors.name}</em>
            </label>

            <label className={`field ${errors.email ? 'has-err' : ''}`}>
              <span className="field__k mono">邮箱</span>
              <input
                value={form.email}
                onChange={set('email')}
                placeholder="name@example.com"
                aria-invalid={!!errors.email}
              />
              <em>{errors.email}</em>
            </label>

            <label className={`field ${errors.msg ? 'has-err' : ''}`}>
              <span className="field__k mono">想聊什么</span>
              <textarea
                rows={4}
                value={form.msg}
                onChange={set('msg')}
                placeholder="项目合作 / 技术交流 / 只是打个招呼"
                aria-invalid={!!errors.msg}
              />
              <em>{errors.msg}</em>
            </label>

            <button type="submit" className="btn btn-primary form__submit">
              发送邮件
            </button>
          </Reveal>
        </div>
      </div>

      <div className={`toast ${toast ? 'is-on' : ''}`} role="status" aria-live="polite">
        {toast}
      </div>
    </section>
  )
}
