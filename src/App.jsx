import { useEffect, useState } from 'react'
import OnboardingFlow from './OnboardingFlow.jsx'

const features = [
  {
    number: '01',
    title: 'AI campaign creation',
    body: 'Targeting, budget, copy, and creative—built around your business and your goal. No blank canvas. No guesswork.',
    tag: 'Build',
  },
  {
    number: '02',
    title: 'Automated lead forms',
    body: 'Generate high-converting forms that capture and qualify leads directly inside Meta. No extra landing page needed.',
    tag: 'Capture',
  },
  {
    number: '03',
    title: 'Launch now—or later',
    body: 'Go live the moment your campaign is ready, or schedule it for exactly the right time. You stay in control.',
    tag: 'Publish',
  },
  {
    number: '04',
    title: 'Full campaign management',
    body: 'Budget pacing, performance monitoring, and optimization happen automatically after launch.',
    tag: 'Optimize',
  },
  {
    number: '05',
    title: 'AI social content',
    body: 'Create on-brand captions, visuals, and copy for the days between campaigns—ready to publish.',
    tag: 'Create',
  },
  {
    number: '06',
    title: 'One place. Every platform.',
    body: 'Connect Instagram, Facebook, and TikTok once. Publish everywhere in the format each platform wants.',
    tag: 'Connect',
  },
]

const steps = [
  ['Connect your accounts', 'Link Meta, Instagram, Facebook, and TikTok in a few clicks.'],
  ['Tell us the goal', 'Leads, sales, followers, or awareness—choose what success looks like.'],
  ['AI builds everything', 'Adcraft generates the creative, copy, targeting, and lead forms.'],
  ['Launch or schedule', 'Publish instantly or choose the exact day and time.'],
  ['Adcraft runs it', 'We manage, monitor, and optimize while you get back to business.'],
]

const reasons = [
  ['No experience needed', 'Adcraft does the strategy, not just the setup.'],
  ['One platform, every channel', 'Meta, Instagram, TikTok, and Facebook—connected.'],
  ['AI that actually creates', 'Real campaigns and content, not another pile of templates.'],
  ['Runs itself', 'Launch, management, and optimization without daily babysitting.'],
  ['Your time back', 'Spend it on the business—not inside Ads Manager.'],
]

const tickerPlatforms = [
  { name: 'Meta', logo: '/social_logos/meta.png' },
  { name: 'Instagram', logo: '/social_logos/instagram.png' },
  { name: 'TikTok', logo: '/social_logos/tiktok.png' },
  { name: 'Facebook', logo: '/social_logos/facebook.png' },
]

const heroCards = [
  { platform: 'Facebook', variant: 'studio', handle: 'Form & Function', badge: 'New' },
  { platform: 'Instagram', variant: 'skincare', handle: 'Soft Studio', badge: 'Just in' },
  { platform: 'TikTok', variant: 'food', handle: 'Hot Stuff', format: 'reel', badge: 'Trending' },
  { platform: 'Instagram', variant: 'pulse', handle: 'Axiom Athletics', badge: 'New drop' },
  { platform: 'Facebook', variant: 'coffee', handle: 'Rise Coffee', badge: 'Launch' },
  { platform: 'TikTok', variant: 'studio', handle: 'Quiet Objects', format: 'reel', badge: 'For you' },
  { platform: 'Instagram', variant: 'food', handle: 'Good Heat', badge: 'New flavor' },
]

function Arrow({ direction = 'up' }) {
  const rotate = direction === 'down' ? 135 : 0
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" style={{ transform: `rotate(${rotate}deg)` }}>
      <path d="M4.5 15.5 15.5 4.5M7 4.5h8.5V13" />
    </svg>
  )
}

function Spark() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 1.5c.35 5.17 3.32 8.14 8.5 8.5-5.18.35-8.15 3.32-8.5 8.5-.36-5.18-3.33-8.15-8.5-8.5 5.17-.36 8.14-3.33 8.5-8.5Z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

function PlatformIcon({ platform }) {
  if (platform === 'Instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.7" r="1" className="fill" />
      </svg>
    )
  }
  if (platform === 'TikTok') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.4 3v10.3a4.8 4.8 0 1 1-4.1-4.75v3.22a1.8 1.8 0 1 0 1 1.62V3h3.1Zm0 0c.4 2.2 1.7 3.5 4.1 3.9v3.05a8.3 8.3 0 0 1-4.1-1.35" />
      </svg>
    )
  }
  return <span className="facebook-glyph">f</span>
}

function CreativeArt({ variant }) {
  if (variant === 'pulse') {
    return (
      <div className="creative-art art-pulse">
        <div className="pulse-orbit pulse-orbit-one" />
        <div className="pulse-orbit pulse-orbit-two" />
        <div className="pulse-copy">
          <span>MOVE</span>
          <strong>WITH<br />PURPOSE</strong>
        </div>
        <div className="pulse-shoe" aria-hidden="true"><i /><b /></div>
      </div>
    )
  }
  if (variant === 'coffee') {
    return (
      <div className="creative-art art-coffee">
        <span className="tiny-label">SMALL BATCH / BIG ENERGY</span>
        <div className="coffee-sun" />
        <div className="coffee-can"><span>rise</span><small>cold brew</small></div>
        <strong>GOOD<br /><em>MORNINGS</em><br />START HERE.</strong>
      </div>
    )
  }
  if (variant === 'studio') {
    return (
      <div className="creative-art art-studio">
        <div className="studio-grid" />
        <span className="studio-kicker">THE FALL EDIT</span>
        <strong>LESS,<br /><em>BUT BETTER.</em></strong>
        <div className="studio-chair"><i /><b /><span /></div>
        <small>Objects for a slower kind of living.</small>
      </div>
    )
  }
  if (variant === 'skincare') {
    return (
      <div className="creative-art art-skincare">
        <div className="skin-bubble b1" /><div className="skin-bubble b2" /><div className="skin-bubble b3" />
        <span className="skin-kicker">NEW / DAILY DEW</span>
        <div className="skin-bottle"><i>dew</i><small>face serum</small></div>
        <strong>YOUR SKIN,<br /><em>ON A GOOD DAY.</em></strong>
      </div>
    )
  }
  return (
    <div className="creative-art art-food">
      <div className="food-stamp">NEW<br />DROP</div>
      <div className="food-plate"><span /><i /><b /></div>
      <strong>CRUNCH<br />THE<br /><em>EXPECTED.</em></strong>
      <small>Chili crunch. Zero rules.</small>
    </div>
  )
}

function SocialFrame({ platform, variant, handle, className = '', format = 'post', badge }) {
  return (
    <article className={`social-frame ${platform.toLowerCase()} ${format} ${className}`} aria-label={`${platform} ad preview`} data-reveal>
      <div className="phone-sheen" />
      <header className="social-topbar">
        <div className="social-profile">
          <span className={`avatar avatar-${variant}`}><Spark /></span>
          <div><strong>{handle}</strong><small>Sponsored</small></div>
        </div>
        <span className="social-more">•••</span>
      </header>
      <div className="creative-wrap">
        {badge && <span className="creative-badge"><Spark /> {badge}</span>}
        <CreativeArt variant={variant} />
        {platform === 'TikTok' && (
          <div className="tiktok-actions" aria-hidden="true"><span>♥</span><small>12.4k</small><span>●</span><small>842</small><span>↗</span></div>
        )}
      </div>
      <footer className="social-footer">
        <div className="social-meta">
          <PlatformIcon platform={platform} />
          <span>{platform === 'Facebook' ? 'Learn More' : platform === 'TikTok' ? 'Shop now' : 'View post'}</span>
        </div>
        <button type="button" aria-label={`Open ${platform} preview`}><Arrow /></button>
      </footer>
    </article>
  )
}

function Nav({ onStart }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
        <a className="wordmark" href="#top" aria-label="Adcraft home">Adcraft<span>.</span></a>
        <nav className="desktop-nav-links" aria-label="Primary navigation">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#social">Social</a>
          <a href="#results">Results</a>
        </nav>
        <div className="nav-actions">
          <button className="menu-dot" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle navigation">
            <span /><span /><span /><span /><span /><span />
          </button>
          <a className="pill pill-light nav-cta" href="?view=signup" onClick={onStart}>Start free <Arrow /></a>
        </div>
      </header>
      <nav className={`menu-drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <button className="menu-close" onClick={() => setOpen(false)} aria-label="Close navigation"><CloseIcon /></button>
        <div className="menu-links">
          <a href="#features" onClick={() => setOpen(false)}>Features <span>01</span></a>
          <a href="#how" onClick={() => setOpen(false)}>How it works <span>02</span></a>
          <a href="#social" onClick={() => setOpen(false)}>Social <span>03</span></a>
          <a href="#results" onClick={() => setOpen(false)}>Results <span>04</span></a>
        </div>
        <p>Ads that build themselves.<br />Content that runs itself.</p>
      </nav>
    </>
  )
}

function Hero({ onStart }) {
  return (
    <section className="hero" id="top">
      <div className="hero-content-stage">
        <div className="hero-media" aria-hidden="true">
          <video autoPlay muted loop playsInline preload="auto" poster="/hero/hero-poster.jpg" disablePictureInPicture>
            <source media="(max-width: 760px) and (prefers-reduced-motion: no-preference)" src="/hero/hero-mobile.mp4" type="video/mp4" />
            <source media="(prefers-reduced-motion: no-preference)" src="/hero/hero.mp4" type="video/mp4" />
          </video>
          <span className="hero-video-overlay" />
        </div>
        <div className="hero-color-field" aria-hidden="true">
          <span className="color-orb color-orb-blue" />
          <span className="color-orb color-orb-pink" />
          <span className="color-orb color-orb-lime" />
        </div>
        <div className="hero-copy shell">
          <div className="eyebrow hero-eyebrow" data-reveal><Spark /> AI-powered campaign management</div>
          <h1 aria-label="Run Meta ads like you have a whole marketing team. Without the team.">
            <span className="line"><span className="reveal-line">Run Meta ads like you have</span></span>
            <span className="line"><span className="reveal-line">a whole <em>marketing team.</em></span></span>
            <span className="line muted"><span className="reveal-line">Without the team.</span></span>
          </h1>
          <div className="hero-bottom" data-reveal>
            <div className="hero-buttons">
              <a className="pill hero-start-button" href="?view=signup" onClick={onStart}>Get started now <Arrow /></a>
              <a className="text-link" href="#how"><span className="play">▶</span> Watch how it works</a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-gallery" aria-label="Social campaign previews">
        <div className="hero-gallery-track">
          {[0, 1].map((set) => (
            <div className="hero-gallery-set" aria-hidden={set === 1} key={set}>
              {heroCards.map((card, index) => (
                <SocialFrame
                  {...card}
                  className={`hero-card hero-card-${index + 1}`}
                  key={`${set}-${card.handle}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Platform integrations">
      <div className="trust-intro shell" data-reveal>
        <p>Trusted by brands and marketers who’d rather grow than manage spreadsheets.</p>
        <strong>1,000+ <span>campaigns launched</span></strong>
      </div>
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((set) => (
            <div className="ticker-set" key={set}>
              {tickerPlatforms.map((platform) => (
                <span className="ticker-item" key={`${set}-${platform.name}`}>
                  <img src={platform.logo} alt="" />
                  <b>{platform.name}</b>
                  <i>✦</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProblemSolution() {
  return (
    <>
      <section className="problem section-light">
        <div className="shell section-grid">
          <div className="eyebrow dark" data-reveal><span>01</span> The old way</div>
          <div className="problem-content">
            <h2 data-reveal>Running ads shouldn’t feel like a <em>full-time job.</em></h2>
            <div className="problem-body" data-reveal>
              <p>Setting up campaigns, writing copy, designing creative, building lead forms, scheduling posts, checking performance—it adds up fast.</p>
              <p>Most businesses either overpay an agency or burn hours doing it themselves.</p>
              <strong>There’s a better way. ↓</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="solution section-ink">
        <div className="solution-orbit orbit-one" /><div className="solution-orbit orbit-two" />
        <div className="shell section-grid">
          <div className="eyebrow" data-reveal><span>02</span> The Adcraft way</div>
          <div className="solution-content">
            <h2 data-reveal>Meet Adcraft—your ad campaign, <em>on autopilot.</em></h2>
            <p data-reveal>Adcraft builds Meta ad campaigns from scratch, creates the lead forms that capture your customers, and runs everything for you—instantly or on your schedule.</p>
            <div className="statement" data-reveal>
              <Spark />
              <span>It isn’t a tool that helps you make ads.</span>
              <strong>It’s the thing that makes them.</strong>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function Features() {
  return (
    <section className="features section-light" id="features">
      <div className="shell">
        <div className="section-heading" data-reveal>
          <div className="eyebrow dark"><span>03</span> Everything built in</div>
          <h2>Everything your ads need.<br /><em>Nothing they don’t.</em></h2>
        </div>
        <div className="feature-list">
          {features.map((feature) => (
            <article className="feature-row" key={feature.number} data-reveal>
              <span className="feature-number">{feature.number}</span>
              <div className="feature-title"><h3>{feature.title}</h3><span>{feature.tag}</span></div>
              <p>{feature.body}</p>
              <div className="feature-arrow"><Arrow /></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function SocialShowcase() {
  return (
    <section className="social-showcase section-ink" id="social">
      <div className="shell social-heading" data-reveal>
        <div className="eyebrow"><span>04</span> Paid + organic</div>
        <h2>Not just ads.<br />Your whole social presence, <em>handled.</em></h2>
        <p>Adcraft creates ready-to-post content for every channel, so your organic presence stays as strong as your paid one.</p>
      </div>
      <div className="social-stage shell">
        <div className="stage-color-field" aria-hidden="true">
          <span className="stage-orb stage-orb-blue" />
          <span className="stage-orb stage-orb-pink" />
          <span className="stage-orb stage-orb-lime" />
        </div>
        <div className="stage-copy">
          <p className="stage-index">04 / 06</p>
          <h3>One idea.<br />Every feed.</h3>
          <p>Create once, then let Adcraft resize, rewrite, and schedule the right version for every platform.</p>
          <div className="platform-pills"><span>Instagram</span><span>Facebook</span><span>TikTok</span></div>
        </div>
        <div className="stage-cards">
          <SocialFrame platform="Instagram" variant="coffee" handle="Rise Coffee" className="stage-card stage-card-a" badge="New" />
          <SocialFrame platform="TikTok" variant="pulse" handle="Axiom Athletics" className="stage-card stage-card-b" format="reel" badge="Trending" />
          <SocialFrame platform="Facebook" variant="skincare" handle="Soft Studio" className="stage-card stage-card-c" badge="Launch" />
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section className="how section-light" id="how">
      <div className="shell">
        <div className="how-intro section-grid">
          <div className="eyebrow dark" data-reveal><span>05</span> How it works</div>
          <h2 data-reveal>From idea to live campaign <em>in minutes.</em></h2>
        </div>
        <div className="steps">
          {steps.map(([title, body], index) => (
            <article className="step" key={title} data-reveal>
              <div className="step-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="step-dot"><Spark /></div>
              <div className="step-copy"><h3>{title}</h3><p>{body}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Reasons() {
  return (
    <section className="reasons section-ink">
      <div className="shell">
        <div className="section-heading split-heading" data-reveal>
          <div className="eyebrow"><span>06</span> Why Adcraft</div>
          <h2>Built to give you<br /><em>your time back.</em></h2>
        </div>
        <div className="reason-grid">
          {reasons.map(([title, body], index) => (
            <article key={title} className={`reason-card reason-${index + 1}`} data-reveal>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <Spark />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="testimonials section-light" id="results">
      <div className="shell">
        <div className="testimonial-top" data-reveal>
          <div className="eyebrow dark"><span>07</span> Real results, real fast</div>
          <p>Less setup. Less overhead. More work out in the world.</p>
        </div>
        <div className="quote-main" data-reveal>
          <span className="quote-mark">“</span>
          <blockquote>Adcraft set up my entire campaign—lead form and all—in under <em>ten minutes.</em> It’s been running itself ever since.</blockquote>
          <div className="quote-person"><span>CM</span><p><strong>Casey Morgan</strong><small>Founder, Northline Studio</small></p></div>
        </div>
        <div className="quote-secondary" data-reveal>
          <blockquote>“I stopped paying an agency $2,000 a month. Adcraft does more, faster.”</blockquote>
          <span>Jordan Lee / Better Goods Co.</span>
        </div>
      </div>
    </section>
  )
}

function FinalCTA({ onStart }) {
  return (
    <section className="final-cta section-ink" id="start">
      <div className="cta-glow" />
      <div className="shell">
        <div className="eyebrow" data-reveal><Spark /> Your next campaign</div>
        <h2 data-reveal>One click<br /><em>away.</em></h2>
        <div className="cta-bottom" data-reveal>
          <p>Let Adcraft build it, launch it, and run it—while you focus on everything else.</p>
          <a className="giant-button" href="?view=signup" onClick={onStart}>
            <span>Get started free</span><i><Arrow /></i>
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer section-ink">
      <div className="shell footer-top">
        <a className="footer-wordmark" href="#top">Adcraft<span>.</span></a>
        <p>Ads that build themselves.<br />Content that runs itself.</p>
        <div className="footer-links"><a href="#features">Features</a><a href="#how">How it works</a><a href="mailto:hello@adcraft.app">Contact</a></div>
      </div>
      <div className="shell footer-bottom"><span>© 2026 Adcraft</span><span>Meta ads, minus the mayhem.</span><a href="#top">Back to top ↑</a></div>
    </footer>
  )
}

function LandingPage({ onStart }) {
  useEffect(() => {
    const revealItems = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    revealItems.forEach((item) => observer.observe(item))

    let ticking = false
    const updateScrollMotion = () => {
      const scroll = window.scrollY
      const hero = document.querySelector('.hero')
      if (hero && scroll < window.innerHeight * 1.7) {
        hero.style.setProperty('--hero-lift', `${Math.min(scroll * 0.09, 60)}px`)
      }
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollMotion)
        ticking = true
      }
    }
    updateScrollMotion()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="app">
      <Nav onStart={onStart} />
      <main>
        <Hero onStart={onStart} />
        <TrustBar />
        <ProblemSolution />
        <Features />
        <SocialShowcase />
        <HowItWorks />
        <Reasons />
        <Testimonials />
        <FinalCTA onStart={onStart} />
      </main>
      <Footer />
    </div>
  )
}

function getView() {
  const view = new URLSearchParams(window.location.search).get('view')
  return ['signin', 'signup', 'onboarding', 'dashboard'].includes(view) ? view : 'home'
}

function App() {
  const [view, setView] = useState(getView)

  useEffect(() => {
    const handlePopState = () => setView(getView())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (nextView) => {
    const url = nextView === 'home' ? window.location.pathname : `${window.location.pathname}?view=${nextView}`
    window.history.pushState({}, '', url)
    window.scrollTo({ top: 0, behavior: 'instant' })
    setView(nextView)
  }

  if (view !== 'home') {
    return <OnboardingFlow initialView={view} onNavigate={navigate} />
  }

  const handleStart = (event) => {
    event.preventDefault()
    navigate('signup')
  }

  return <LandingPage onStart={handleStart} />
}

export default App
