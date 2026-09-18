import { useEffect, useState } from 'react'

export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion)

  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/** 元素进入视口时返回 true，只触发一次 */
export function useInView(options = {}) {
  const [node, setNode] = useState(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!node) return
    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      {
        threshold: options.threshold ?? 0.2,
        rootMargin: options.rootMargin ?? '0px 0px -8% 0px',
      },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [node, options.threshold, options.rootMargin])

  return [setNode, inView]
}

/** 数字从 0 滚到 target */
export function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active || !Number.isFinite(target)) return
    if (prefersReducedMotion()) {
      setValue(target)
      return
    }
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, duration])

  return value
}

/** 当前处于哪个 section，用于导航高亮 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [ids])

  return active
}

export function useScrollProgress() {
  const [state, setState] = useState({ progress: 0, y: 0 })

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const max = document.documentElement.scrollHeight - window.innerHeight
        setState({
          progress: max > 0 ? Math.min(window.scrollY / max, 1) : 0,
          y: window.scrollY,
        })
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return state
}

export function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || 'dark',
  )

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    localStorage.setItem('theme', theme)
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'light' ? '#ffffff' : '#08090c')
  }, [theme])

  const toggleTheme = () => {
    const root = document.documentElement
    root.classList.add('theming')
    setTimeout(() => root.classList.remove('theming'), 360)
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }

  return [theme, toggleTheme]
}

/** 读 GitHub 公开资料，失败时静默降级到占位数字 */
export function useGithubProfile(username) {
  const [data, setData] = useState(null)

  useEffect(() => {
    if (!username || /your-|example/i.test(username)) return

    let cancelled = false
    const ctrl = new AbortController()
    fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
      signal: ctrl.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => json && !cancelled && setData(json))
      .catch(() => {})

    return () => {
      cancelled = true
      ctrl.abort()
    }
  }, [username])

  return data
}
