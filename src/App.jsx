import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Workflow from './components/Workflow.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { ArrowUpIcon } from './components/icons.jsx'
import { useScrollProgress } from './hooks.js'
import './App.css'

export default function App() {
  const { y } = useScrollProgress()

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Workflow />
        <About />
        <Contact />
      </main>
      <Footer />

      <button
        type="button"
        className={`to-top ${y > 700 ? 'is-on' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="回到顶部"
      >
        <ArrowUpIcon />
      </button>
    </>
  )
}
