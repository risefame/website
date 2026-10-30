import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import { MarqueeStrip } from './components/Marquee'
import Manifesto from './components/Manifesto'
import Work from './components/Work'
import { Grain } from './components/ui'

export default function App() {
  return (
    <div className="relative min-h-screen bg-tar">
      <Grain />
      <Header />
      <main>
        <Hero />
        <MarqueeStrip />
        <Work />
        <MarqueeStrip reverse tone="volt" />
        <Manifesto />
      </main>
      <Footer />
    </div>
  )
}
