import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../hooks.js'

/** 打字机：循环播放 phrases，输入 → 停顿 → 删除 */
export default function TypedText({ phrases = [], className = '' }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    if (!phrases.length) return
    if (prefersReducedMotion()) {
      setText(phrases[0])
      return
    }

    const current = phrases[index % phrases.length]
    let timer

    if (phase === 'typing') {
      if (text.length < current.length) {
        timer = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          95 + Math.random() * 65,
        )
      } else {
        timer = setTimeout(() => setPhase('erasing'), 1900)
      }
    } else if (text.length > 0) {
      timer = setTimeout(() => setText(current.slice(0, text.length - 1)), 38)
    } else {
      setPhase('typing')
      setIndex((i) => i + 1)
    }

    return () => clearTimeout(timer)
  }, [text, phase, index, phrases])

  return (
    <span className={className}>
      {text}
      <span className="caret" aria-hidden="true" />
    </span>
  )
}
