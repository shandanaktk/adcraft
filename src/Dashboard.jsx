import { useEffect, useMemo, useRef, useState } from 'react'
import {
  approveAdDraft,
  connectMetaAds,
  connectSocialPlatform,
  dashboardApiReady,
  generateAdDraft,
  generateSocialContent,
  loadAdsAssets,
  publishSocialContent,
} from './dashboardApi.js'
import './dashboard.css'

const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms))

function Icon({ name, size = 18 }) {
  const paths = {
    home: <><path d="M3 10.8 12 3l9 7.8" /><path d="M5.5 9.5V21h13V9.5M9.5 21v-6h5v6" /></>,
    ads: <><path d="M4 13.5v-3l13-5v13l-13-5Z" /><path d="M7 14.6 8.5 20h3l-1.2-4.4M17 9l3-2M17 15l3 2" /></>,
    studio: <><rect x="3" y="3" width="18" height="18" rx="5" /><path d="m8 15 3-3 2 2 3-4 2 3M8 8h.01" /></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
    link: <><path d="M10 13a5 5 0 0 0 7.6.5l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" /><path d="M14 11a5 5 0 0 0-7.6-.5l-2 2a5 5 0 0 0 7.1 7.1l1.1-1.1" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
    spark: <path d="M12 2c.4 5.7 3.7 9 9 9.5-5.3.5-8.6 3.8-9 9.5-.4-5.7-3.7-9-9-9.5C8.3 11 11.6 7.7 12 2Z" />,
    more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
    wallet: <><path d="M4 6.5h14a2 2 0 0 1 2 2V19H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h13" /><path d="M16 11h5v4h-5a2 2 0 0 1 0-4Z" /></>,
    eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" /></>,
    cursor: <><path d="m5 3 13 9-6 1-3 6L5 3Z" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    back: <><path d="M19 12H5M10 17l-5-5 5-5" /></>,
    upload: <><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 16v4h16v-4" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    file: <><path d="M6 2h8l4 4v16H6Z" /><path d="M14 2v5h5M9 12h6M9 16h6" /></>,
    wifi: <><path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" /><circle cx="12" cy="20" r="1" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v6l4 2" /></>,
    play: <path d="m8 5 11 7-11 7Z" />,
    trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6" /></>,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  }
  return <svg className="db-icon" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">{paths[name] || paths.spark}</svg>
}

function PlatformMark({ platform }) {
  const key = platform.toLowerCase()
  if (key === 'facebook') return <span className="db-platform-mark facebook">f</span>
  if (key === 'instagram') return <span className="db-platform-mark instagram">◎</span>
  return <span className="db-platform-mark tiktok">♪</span>
}

function MiniChart({ color = '#d9ff57', variant = 0 }) {
  const lines = [
    'M1 27C15 28 17 15 31 19s17-4 23-10 17-3 25-7 13 1 20-1',
    'M1 24c13-1 13-12 27-9s15 9 28 2 18-3 27 4 14-9 28-8',
    'M1 28c12-5 17 1 27-7s18-2 27-9 16 9 27 3 18-3 29-12',
  ]
  return (
    <svg className="db-mini-chart" viewBox="0 0 128 34" preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id={`chart-${variant}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={color} stopOpacity=".35" /><stop offset="1" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      <path d={`${lines[variant]} L128 34H0Z`} fill={`url(#chart-${variant})`} />
      <path d={lines[variant]} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(onClose, 3600)
    return () => window.clearTimeout(timer)
  }, [toast, onClose])
  if (!toast) return null
  return <div className={`db-toast ${toast.type || ''}`}><span><Icon name={toast.type === 'error' ? 'close' : 'check'} size={15} /></span><p>{toast.message}</p><button onClick={onClose} aria-label="Dismiss"><Icon name="close" size={14} /></button></div>
}

function StatusChip({ children, color = 'lime' }) {
  return <span className={`db-status-chip ${color}`}><i />{children}</span>
}

const overviewStats = [
  { label: 'Ad spend', value: '$2,840', change: '+12.4%', icon: 'wallet', color: 'lime', chart: '#d9ff57' },
  { label: 'Impressions', value: '184.2K', change: '+18.2%', icon: 'eye', color: 'blue', chart: '#6588ff' },
  { label: 'Link clicks', value: '6,429', change: '+8.7%', icon: 'cursor', color: 'orange', chart: '#ff7657' },
  { label: 'New leads', value: '327', change: '+24.1%', icon: 'users', color: 'pink', chart: '#f7afd3' },
]

function Overview({ firstName, onNavigate }) {
  const today = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date())
  return (
    <div className="db-overview db-page-enter">
      <section className="db-welcome">
        <div>
          <span className="db-kicker"><Icon name="spark" size={13} /> {today}</span>
          <h1>Good evening, {firstName}.<br /><em>Ready to create?</em></h1>
          <p>Your campaigns are healthy and your content queue is looking good. Here’s what’s happening.</p>
        </div>
        <div className="db-welcome-orbit" aria-hidden="true"><i /><i /><span><Icon name="spark" size={24} /></span></div>
      </section>

      <section className="db-stat-grid">
        {overviewStats.map((stat, index) => (
          <article className={`db-glass-card db-stat-card accent-${stat.color}`} key={stat.label}>
            <div className="db-stat-top"><span><Icon name={stat.icon} size={17} /></span><small>Last 30 days</small></div>
            <p>{stat.label}</p>
            <div className="db-stat-value"><strong>{stat.value}</strong><em>{stat.change}</em></div>
            <MiniChart color={stat.chart} variant={index % 3} />
          </article>
        ))}
      </section>

      <section className="db-overview-grid">
        <article className="db-glass-card db-launch-card">
          <div className="db-card-heading"><div><span className="db-kicker">CREATE SOMETHING</span><h2>Where should we begin?</h2></div><Icon name="spark" size={19} /></div>
          <div className="db-launch-options">
            <button onClick={() => onNavigate('ads')}>
              <span className="db-launch-icon lime"><Icon name="ads" size={22} /></span>
              <div><strong>Build a Meta ad</strong><small>Strategy, creative, audience & lead form</small></div>
              <i><Icon name="arrow" size={17} /></i>
            </button>
            <button onClick={() => onNavigate('studio')}>
              <span className="db-launch-icon blue"><Icon name="studio" size={22} /></span>
              <div><strong>Create social content</strong><small>One idea, ready for every feed</small></div>
              <i><Icon name="arrow" size={17} /></i>
            </button>
          </div>
        </article>

        <article className="db-glass-card db-performance-card">
          <div className="db-card-heading"><div><span className="db-kicker">LIVE CAMPAIGNS</span><h2>Performance pulse</h2></div><button aria-label="Campaign options"><Icon name="more" size={18} /></button></div>
          <div className="db-campaign-row">
            <div className="db-campaign-creative"><span>MOVE</span><b>WITH<br />PURPOSE</b></div>
            <div className="db-campaign-copy"><StatusChip>Active</StatusChip><strong>Summer Movement</strong><small>Lead generation · Instagram</small></div>
            <div className="db-campaign-metric"><strong>4.82x</strong><small>ROAS</small></div>
          </div>
          <div className="db-campaign-row">
            <div className="db-campaign-creative coffee"><span>RISE</span><b>START<br />FRESH</b></div>
            <div className="db-campaign-copy"><StatusChip color="blue">Learning</StatusChip><strong>Cold Brew Launch</strong><small>Sales · Facebook + Instagram</small></div>
            <div className="db-campaign-metric"><strong>3.16x</strong><small>ROAS</small></div>
          </div>
          <button className="db-text-button" onClick={() => onNavigate('ads')}>View all campaigns <Icon name="arrow" size={15} /></button>
        </article>

        <article className="db-glass-card db-schedule-card">
          <div className="db-card-heading"><div><span className="db-kicker">UP NEXT</span><h2>Content queue</h2></div><span className="db-date-badge">SEP<br /><b>12</b></span></div>
          <div className="db-schedule-item"><span className="db-time">06:00<small>PM</small></span><i /><div><strong>Friday founder note</strong><small><PlatformMark platform="Instagram" /> Instagram · Post</small></div><span className="db-thumb thumb-pink" /></div>
          <div className="db-schedule-item"><span className="db-time">08:30<small>PM</small></span><i /><div><strong>Behind the blend</strong><small><PlatformMark platform="TikTok" /> TikTok · Reel</small></div><span className="db-thumb thumb-blue" /></div>
          <button className="db-text-button" onClick={() => onNavigate('studio')}>Open content calendar <Icon name="arrow" size={15} /></button>
        </article>
      </section>
    </div>
  )
}

const campaignRows = [
  { name: 'Summer Movement', type: 'Lead generation', status: 'Active', spend: '$1,240', leads: 148, cpl: '$8.38', roas: '4.82x', color: 'lime' },
  { name: 'Cold Brew Launch', type: 'Sales', status: 'Learning', spend: '$876', leads: 91, cpl: '$9.63', roas: '3.16x', color: 'blue' },
  { name: 'The Fall Edit', type: 'Awareness', status: 'Active', spend: '$522', leads: 64, cpl: '$8.16', roas: '—', color: 'orange' },
  { name: 'Daily Dew Retargeting', type: 'Sales', status: 'Paused', spend: '$202', leads: 24, cpl: '$8.42', roas: '2.74x', color: 'pink' },
]

function AdsBuilder({ onClose, notify, assets }) {
  const [step, setStep] = useState(1)
  const [objective, setObjective] = useState('Leads')
  const [prompt, setPrompt] = useState('Launch our new summer collection to active, style-conscious customers.')
  const [url, setUrl] = useState('https://yourbrand.com/summer')
  const [budget, setBudget] = useState('45')
  const [audience, setAudience] = useState('United States · Ages 22–44 · Fashion & fitness')
  const [headline, setHeadline] = useState('Move with purpose this summer')
  const [primaryText, setPrimaryText] = useState('Made for mornings that turn into adventures. Meet the lightweight collection designed to move with you.')
  const [serverDraft, setServerDraft] = useState(null)
  const [loadingLabel, setLoadingLabel] = useState('Reading your brand')
  const objectives = ['Leads', 'Sales', 'Awareness', 'Traffic']

  const handleGenerate = async () => {
    setStep(2)
    const labels = ['Reading your brand', 'Scanning your audience', 'Building the creative', 'Polishing your campaign']
    let labelIndex = 0
    const timer = window.setInterval(() => {
      labelIndex = Math.min(labelIndex + 1, labels.length - 1)
      setLoadingLabel(labels[labelIndex])
    }, 650)
    try {
      let result = null
      const account = assets.adAccounts?.[0]
      const page = assets.pages?.[0]
      if (dashboardApiReady('ads') && account && page) {
        result = await generateAdDraft({
          adAccountId: account.ad_account_id,
          pageId: page.page_id,
          prompt,
          url,
        })
      } else {
        await wait(2600)
      }
      if (result) {
        setServerDraft(result)
        setHeadline(result.suggested_ad?.creative_headline || headline)
        setPrimaryText(result.suggested_ad?.creative_text || primaryText)
        const cents = result.suggested_campaign?.daily_budget
        if (cents) setBudget(String(cents / 100))
      }
      setStep(3)
    } catch (error) {
      notify(error.message, 'error')
      setStep(1)
    } finally {
      window.clearInterval(timer)
    }
  }

  const handleApprove = async () => {
    setStep(2)
    setLoadingLabel('Sending everything to Meta')
    try {
      if (dashboardApiReady('ads') && serverDraft) {
        await approveAdDraft({
          steps: ['lead_form', 'campaign', 'adset', 'ad'],
          lead_form: serverDraft.suggested_lead_form,
          campaign: {
            ...serverDraft.suggested_campaign,
            daily_budget: Math.round(Number(budget) * 100),
          },
          adset: {
            ...serverDraft.suggested_adset,
            daily_budget: Math.round(Number(budget) * 100),
          },
          ad: {
            ...serverDraft.suggested_ad,
            creative_headline: headline,
            creative_text: primaryText,
          },
        })
      } else {
        await wait(1800)
      }
      setStep(4)
    } catch (error) {
      notify(error.message, 'error')
      setStep(3)
    }
  }

  return (
    <div className="db-builder db-page-enter">
      <div className="db-builder-top">
        <button className="db-back-button" onClick={step === 1 ? onClose : () => setStep(step === 4 ? 1 : Math.max(1, step - 1))}><Icon name="back" size={18} /> Back</button>
        <div className="db-stepper">
          {['Brief', 'Build', 'Review', 'Ready'].map((label, index) => <span className={step >= index + 1 ? 'active' : ''} key={label}><i>{step > index + 1 ? <Icon name="check" size={12} /> : index + 1}</i><b>{label}</b></span>)}
        </div>
        <button className="db-close-button" onClick={onClose} aria-label="Close campaign builder"><Icon name="close" size={18} /></button>
      </div>

      {step === 1 && (
        <section className="db-builder-brief">
          <span className="db-ai-orb"><Icon name="spark" size={22} /></span>
          <span className="db-kicker">AI CAMPAIGN BUILDER</span>
          <h1>What are we<br /><em>promoting today?</em></h1>
          <p>Give Adcraft the idea. We’ll build the strategy, copy, audience, lead form and campaign.</p>
          <div className="db-brief-card db-glass-card">
            <label>YOUR CAMPAIGN BRIEF</label>
            <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} rows="3" />
            <div className="db-brief-fields"><label><span>Destination link</span><input value={url} onChange={(event) => setUrl(event.target.value)} /></label><label><span>Daily budget</span><div className="db-money-input"><i>$</i><input type="number" value={budget} onChange={(event) => setBudget(event.target.value)} /></div></label></div>
            <div className="db-objectives"><span>Primary goal</span>{objectives.map((item) => <button className={objective === item ? 'selected' : ''} onClick={() => setObjective(item)} key={item}>{objective === item && <Icon name="check" size={12} />}{item}</button>)}</div>
            <button className="db-primary-button" onClick={handleGenerate} disabled={!prompt.trim()}>Build my campaign <Icon name="spark" size={16} /></button>
          </div>
          <small className="db-safe-note">✦ Nothing goes live without your approval.</small>
        </section>
      )}

      {step === 2 && (
        <section className="db-generating">
          <div className="db-generation-orb"><span><Icon name="spark" size={27} /></span><i /><i /><i /></div>
          <span className="db-kicker">ADCRAFT IS WORKING</span>
          <h1>{loadingLabel}<em>…</em></h1>
          <p>Strategy, creative and targeting are coming together.</p>
          <div className="db-generation-bars"><span /><span /><span /><span /></div>
        </section>
      )}

      {step === 3 && (
        <section className="db-review">
          <div className="db-review-heading"><div><span className="db-kicker">CAMPAIGN DRAFT</span><h1>Built for you.<br /><em>Refine anything.</em></h1></div><div><StatusChip>Ready to review</StatusChip><p>4 pieces generated</p></div></div>
          <div className="db-review-layout">
            <div className="db-review-stack">
              <article className="db-review-card db-glass-card"><header><span>01</span><div><b>Campaign strategy</b><small>The big picture</small></div><StatusChip>Complete</StatusChip></header><div className="db-review-fields"><label>Campaign goal<input value={objective} onChange={(event) => setObjective(event.target.value)} /></label><label>Daily budget<div className="db-money-input"><i>$</i><input value={budget} onChange={(event) => setBudget(event.target.value)} /></div></label></div><p className="db-ai-note"><Icon name="spark" size={13} /> Optimized for high-intent leads with automatic placements.</p></article>
              <article className="db-review-card db-glass-card"><header><span>02</span><div><b>Audience</b><small>Who will see it</small></div><button><Icon name="settings" size={15} /> Adjust</button></header><label>Targeting<input value={audience} onChange={(event) => setAudience(event.target.value)} /></label><div className="db-audience-scale"><span><Icon name="users" size={15} /> Estimated audience <b>2.1M – 2.8M</b></span><i><em /></i><small>Specific</small><small>Broad</small></div></article>
              <article className="db-review-card db-glass-card"><header><span>03</span><div><b>Lead form</b><small>Capture the right details</small></div><StatusChip color="blue">4 fields</StatusChip></header><div className="db-field-pills"><span><Icon name="check" size={12} /> Full name</span><span><Icon name="check" size={12} /> Email</span><span><Icon name="check" size={12} /> Phone</span><span><Icon name="check" size={12} /> Purchase timeline</span><button><Icon name="plus" size={13} /> Add field</button></div></article>
            </div>
            <aside className="db-ad-preview db-glass-card">
              <div className="db-preview-label"><span>LIVE PREVIEW</span><div><button className="active">Feed</button><button>Story</button></div></div>
              <div className="db-meta-post">
                <header><span className="db-avatar-mini">AC</span><div><b>Adcraft Studio</b><small>Sponsored · <span>🌐</span></small></div><Icon name="more" size={17} /></header>
                <div className="db-ad-art"><span className="db-art-label">THE SUMMER SERIES</span><strong>MOVE<br /><em>WITH</em><br />PURPOSE.</strong><i className="db-art-orbit" /><i className="db-art-pill">NEW DROP</i></div>
                <div className="db-post-copy"><textarea value={primaryText} onChange={(event) => setPrimaryText(event.target.value)} rows="3" /><div><span><small>YOURBRAND.COM</small><input value={headline} onChange={(event) => setHeadline(event.target.value)} /></span><button>Sign up</button></div></div>
                <footer><span>♡</span><span>◯</span><span>⌁</span></footer>
              </div>
              <p className="db-edit-hint"><Icon name="spark" size={12} /> Click any text field to make it yours.</p>
            </aside>
          </div>
          <div className="db-review-actions"><button className="db-secondary-button" onClick={() => setStep(1)}>Start over</button><button className="db-primary-button" onClick={handleApprove}>Approve & create campaign <Icon name="arrow" size={16} /></button></div>
        </section>
      )}

      {step === 4 && (
        <section className="db-success-screen">
          <div className="db-success-burst"><span><Icon name="check" size={34} /></span><i /><i /><i /></div>
          <span className="db-kicker">CAMPAIGN CREATED</span>
          <h1>Your campaign is<br /><em>ready to perform.</em></h1>
          <p>Summer Movement is in Meta and starts in draft mode, so you still have the final say.</p>
          <div className="db-success-summary db-glass-card"><span><small>STATUS</small><StatusChip color="blue">Draft in Meta</StatusChip></span><span><small>DAILY BUDGET</small><b>${budget}.00</b></span><span><small>EST. LEADS / WEEK</small><b>36–52</b></span></div>
          <div className="db-success-actions"><button className="db-primary-button" onClick={onClose}>View campaigns <Icon name="arrow" size={16} /></button><button className="db-secondary-button" onClick={() => setStep(1)}>Create another</button></div>
        </section>
      )}
    </div>
  )
}

function AdsWorkspace({ notify }) {
  const [builderOpen, setBuilderOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [assets, setAssets] = useState({ connections: [], pages: [], adAccounts: [] })
  const [connecting, setConnecting] = useState(false)

  useEffect(() => {
    if (!dashboardApiReady('ads')) return
    loadAdsAssets().then(setAssets).catch(() => {})
  }, [])

  const connect = async () => {
    if (!dashboardApiReady('ads')) {
      notify('Meta Ads connection is ready for OAuth once auth and API variables are configured.')
      return
    }
    setConnecting(true)
    try { await connectMetaAds() } catch (error) { notify(error.message, 'error') } finally { setConnecting(false) }
  }

  if (builderOpen) return <AdsBuilder onClose={() => setBuilderOpen(false)} notify={notify} assets={assets} />

  return (
    <div className="db-module db-page-enter">
      <header className="db-module-header">
        <div><span className="db-kicker"><Icon name="ads" size={13} /> META ADS</span><h1>Campaign command.</h1><p>Create, understand and improve every campaign in one place.</p></div>
        <div className="db-module-actions"><button className="db-secondary-button" onClick={connect}><Icon name="link" size={15} /> {connecting ? 'Connecting…' : assets.connections.length ? 'Meta connected' : 'Connect Meta'}</button><button className="db-primary-button" onClick={() => setBuilderOpen(true)}><Icon name="plus" size={16} /> Create campaign</button></div>
      </header>
      <nav className="db-module-tabs">{['overview', 'campaigns', 'analysis'].map((tab) => <button className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)} key={tab}>{tab === 'overview' ? 'Performance' : tab === 'campaigns' ? 'Campaigns' : 'AI analysis'}</button>)}</nav>

      {activeTab === 'overview' && <>
        <section className="db-insight-hero db-glass-card"><div><StatusChip>Performance is healthy</StatusChip><h2>Your ads brought in <em>327 leads</em><br />for $8.69 each.</h2><p>Summer Movement is doing the heavy lifting. Its cost per lead improved 18% this week.</p><button onClick={() => setActiveTab('analysis')}>Ask Adcraft about this <Icon name="arrow" size={15} /></button></div><div className="db-orbit-score"><i /><i /><span><small>ACCOUNT SCORE</small><b>88</b><em>/100</em></span></div></section>
        <section className="db-stat-grid compact">{overviewStats.map((stat, index) => <article className={`db-glass-card db-stat-card accent-${stat.color}`} key={stat.label}><div className="db-stat-top"><span><Icon name={stat.icon} size={17} /></span><small>vs. last month</small></div><p>{stat.label}</p><div className="db-stat-value"><strong>{stat.value}</strong><em>{stat.change}</em></div><MiniChart color={stat.chart} variant={index % 3} /></article>)}</section>
        <section className="db-ads-bottom"><article className="db-glass-card db-breakdown"><div className="db-card-heading"><div><span className="db-kicker">RESULTS</span><h2>Spend vs. leads</h2></div><select aria-label="Date range"><option>Last 30 days</option><option>Last 14 days</option></select></div><div className="db-big-chart"><div className="db-axis"><span>$3K</span><span>$2K</span><span>$1K</span><span>$0</span></div><div className="db-chart-grid"><i /><i /><i /><i /><svg viewBox="0 0 600 180" preserveAspectRatio="none"><defs><linearGradient id="big-fill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#6588ff" stopOpacity=".28"/><stop offset="1" stopColor="#6588ff" stopOpacity="0"/></linearGradient></defs><path d="M0 145C50 130 72 135 106 112s65-5 105-25 67 5 105-22 75 0 108-32 65 6 92-8 54-1 84-20V180H0Z" fill="url(#big-fill)"/><path d="M0 145C50 130 72 135 106 112s65-5 105-25 67 5 105-22 75 0 108-32 65 6 92-8 54-1 84-20" fill="none" stroke="#6588ff" strokeWidth="3"/><path d="M0 156c62-7 92-14 133-22s81-6 119-25 76-4 116-15 78-14 111-26 77 1 121-14" fill="none" stroke="#d9ff57" strokeWidth="2" strokeDasharray="5 5"/></svg><div className="db-chart-labels"><span>Aug 14</span><span>Aug 21</span><span>Aug 28</span><span>Sep 04</span><span>Sep 12</span></div></div></div><div className="db-chart-legend"><span><i className="blue" /> Ad spend</span><span><i className="lime" /> Leads</span></div></article><article className="db-glass-card db-optimizations"><div className="db-card-heading"><div><span className="db-kicker">AI OPTIMIZATION</span><h2>3 actions found</h2></div><span className="db-count-badge">3</span></div>{[['Scale Summer Movement', 'CPL is 22% below target', '+20% budget', 'lime'], ['Pause ad set B', 'Creative fatigue detected', 'Save $12/day', 'orange'], ['Refresh Cold Brew creative', 'Frequency reached 3.8', 'New concept', 'blue']].map(([title, body, action, color]) => <div className="db-action-row" key={title}><span className={color}><Icon name="spark" size={15} /></span><div><b>{title}</b><small>{body}</small></div><button>{action}</button></div>)}<button className="db-text-button">Review recommendations <Icon name="arrow" size={15} /></button></article></section>
      </>}

      {activeTab === 'campaigns' && <section className="db-campaigns-card db-glass-card"><div className="db-table-heading"><div><h2>All campaigns</h2><p>4 campaigns · 3 currently delivering</p></div><div><button><Icon name="search" size={15} /></button><select><option>All statuses</option><option>Active</option><option>Paused</option></select></div></div><div className="db-campaign-table"><div className="db-table-row head"><span>Campaign</span><span>Status</span><span>Spend</span><span>Leads</span><span>Cost / lead</span><span>ROAS</span><span /></div>{campaignRows.map((campaign) => <div className="db-table-row" key={campaign.name}><span className="db-table-name"><i className={campaign.color} /><span><b>{campaign.name}</b><small>{campaign.type}</small></span></span><span><StatusChip color={campaign.status === 'Paused' ? 'pink' : campaign.status === 'Learning' ? 'blue' : 'lime'}>{campaign.status}</StatusChip></span><span>{campaign.spend}</span><span>{campaign.leads}</span><span>{campaign.cpl}</span><span>{campaign.roas}</span><button><Icon name="more" size={17} /></button></div>)}</div></section>}

      {activeTab === 'analysis' && <section className="db-analysis-layout"><article className="db-glass-card db-analysis-main"><span className="db-ai-orb"><Icon name="spark" size={20} /></span><span className="db-kicker">AI ANALYSIS · LAST 30 DAYS</span><h2>More leads, better efficiency.<br /><em>Your strongest month yet.</em></h2><p>Spend increased 12%, but leads grew twice as fast. The account is becoming more efficient as Meta learns who converts.</p><div className="db-analysis-points"><div><span>01</span><p><b>Scale what is working</b>Summer Movement has room to absorb another 20% in daily budget without raising cost per lead.</p></div><div><span>02</span><p><b>Refresh before fatigue hits</b>Cold Brew’s frequency is approaching 4. A fresh visual this week should protect performance.</p></div><div><span>03</span><p><b>Keep lead quality in focus</b>Add a purchase-timeline question to improve sales follow-up without reducing volume.</p></div></div></article><aside className="db-glass-card db-ask-card"><span className="db-kicker">ASK YOUR DATA</span><h3>What would you like to know?</h3>{['Why did leads increase?', 'Which campaign should I scale?', 'How can I lower my cost per lead?'].map((question) => <button onClick={() => notify('Adcraft’s answer is ready in your analysis history.')} key={question}>{question}<Icon name="arrow" size={14} /></button>)}<label><textarea placeholder="Ask anything about your campaigns…" /><button onClick={() => notify('Your question was sent to the insights assistant.')}><Icon name="arrow" size={16} /></button></label></aside></section>}
    </div>
  )
}

const studioIdeas = [
  { id: 1, day: 'Today', format: 'Reel', theme: 'Behind the scenes', title: 'Show the craft behind your best seller', caption: 'The details nobody sees are the reason it feels so good. Come behind the scenes with us. ✦', tags: ['BehindTheBrand', 'MadeWithCare'], color: 'blue' },
  { id: 2, day: 'Today', format: 'Post', theme: 'Founder story', title: 'The “why” that started everything', caption: 'We didn’t start with a perfect plan. We started with one idea we couldn’t stop thinking about.', tags: ['FounderStory', 'SmallBusiness'], color: 'pink' },
  { id: 3, day: 'Tomorrow', format: 'Story', theme: 'Community', title: 'Let your audience choose the next drop', caption: 'You decide what comes next. Tap your favorite color and we’ll make it happen.', tags: ['YouChoose', 'CommunityFirst'], color: 'orange' },
]

const defaultScheduled = [
  { id: 1, date: 12, time: '6:00 PM', title: 'Friday founder note', platform: 'Instagram', format: 'Post', color: 'pink' },
  { id: 2, date: 13, time: '10:00 AM', title: 'Behind the blend', platform: 'TikTok', format: 'Reel', color: 'blue' },
  { id: 3, date: 16, time: '12:30 PM', title: 'Community color vote', platform: 'Instagram', format: 'Story', color: 'orange' },
  { id: 4, date: 18, time: '9:00 AM', title: 'Product care guide', platform: 'Facebook', format: 'Post', color: 'lime' },
]

function ContentPreview({ format, caption, media, platforms }) {
  return <div className={`db-social-preview ${format}`}><header><span className="db-avatar-mini">AC</span><div><b>adcraft.studio</b><small>Sponsored creative</small></div><Icon name="more" size={16} /></header><div className={`db-social-media ${media ? 'has-media' : ''}`}>{media ? (format === 'reel' ? <video src={media} muted /> : <img src={media} alt="Uploaded content preview" />) : <><div className="db-preview-art"><span>MAKE</span><strong>GOOD<br /><em>THINGS</em><br />HAPPEN.</strong><i /></div><small>{format === 'reel' ? '9:16 video preview' : '1:1 image preview'}</small></>}</div><div className="db-social-caption"><p><b>adcraft.studio</b> {caption || 'Your caption will appear here…'}</p><div>{platforms.map((platform) => <PlatformMark platform={platform} key={platform} />)}</div></div><footer><span>♡</span><span>◯</span><span>⌁</span><small>Save</small></footer></div>
}

function SocialStudio({ notify }) {
  const [view, setView] = useState('ideas')
  const [createStep, setCreateStep] = useState(1)
  const [format, setFormat] = useState('reel')
  const [platforms, setPlatforms] = useState(['Instagram', 'Facebook', 'TikTok'])
  const [caption, setCaption] = useState('The details nobody sees are the reason it feels so good. Come behind the scenes with us. ✦')
  const [hashtags, setHashtags] = useState(['BehindTheBrand', 'MadeWithCare', 'SmallBusiness'])
  const [tone, setTone] = useState('Bold & warm')
  const [media, setMedia] = useState(null)
  const [mediaFile, setMediaFile] = useState(null)
  const [scheduleDate, setScheduleDate] = useState('2026-09-13')
  const [scheduleTime, setScheduleTime] = useState('10:00')
  const [generating, setGenerating] = useState(false)
  const [connections, setConnections] = useState({ Instagram: true, Facebook: true, TikTok: false })
  const [scheduled, setScheduled] = useState(defaultScheduled)
  const [drafts, setDrafts] = useState(() => {
    try { return JSON.parse(window.localStorage.getItem('adcraft.socialDrafts') || '[]') } catch { return [] }
  })
  const fileInput = useRef(null)

  useEffect(() => { window.localStorage.setItem('adcraft.socialDrafts', JSON.stringify(drafts)) }, [drafts])

  const beginCreate = (idea) => {
    if (idea) {
      setFormat(idea.format.toLowerCase())
      setCaption(idea.caption)
      setHashtags(idea.tags)
    }
    setCreateStep(1)
    setView('create')
  }

  const togglePlatform = (platform) => setPlatforms((current) => current.includes(platform) ? current.filter((item) => item !== platform) : [...current, platform])

  const generateCopy = async () => {
    setGenerating(true)
    try {
      let result
      if (dashboardApiReady('main')) result = await generateSocialContent({ format, prompt: caption })
      else await wait(1300)
      if (result) {
        setCaption(result.caption || caption)
        setHashtags(result.hashtags || hashtags)
      } else {
        setCaption('Built in the quiet moments. Tested in the busy ones. Meet the piece designed to keep up with everything your day becomes. ✦')
        setHashtags(['MadeToMove', 'EverydayDesign', 'MeetYourNewFavorite'])
      }
      notify('A fresh caption is ready to review.')
    } catch (error) { notify(error.message, 'error') } finally { setGenerating(false) }
  }

  const handleFile = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setMediaFile(file)
    const reader = new FileReader()
    reader.onload = () => setMedia(String(reader.result))
    reader.readAsDataURL(file)
    notify(`${file.name} added to your post.`)
  }

  const saveDraft = () => {
    const draft = { id: Date.now(), format, platforms, caption, hashtags, tone, media, createdAt: new Date().toISOString() }
    setDrafts((current) => [draft, ...current])
    notify('Draft saved. You can pick it up anytime.')
    setView('drafts')
  }

  const finishPost = async (mode) => {
    if (!platforms.length) { notify('Choose at least one destination.', 'error'); return }
    try {
      if (dashboardApiReady('main')) {
        const scheduledAt = mode === 'schedule' ? new Date(`${scheduleDate}T${scheduleTime}`).toISOString() : undefined
        await publishSocialContent({ platforms: platforms.map((item) => item.toLowerCase()), format, caption: `${caption}\n\n${hashtags.map((tag) => `#${tag}`).join(' ')}`, mode: mode === 'schedule' ? 'schedule' : 'publish_now', scheduledAt, media: mediaFile })
      } else await wait(900)
      if (mode === 'schedule') {
        const date = Number(scheduleDate.split('-')[2])
        setScheduled((current) => [...current, { id: Date.now(), date, time: scheduleTime, title: caption.slice(0, 34), platform: platforms[0], format, color: 'blue' }])
        notify('Post scheduled across your selected channels.')
        setView('calendar')
      } else {
        notify('Your post is published across the selected channels.')
        setView('ideas')
      }
    } catch (error) { notify(error.message, 'error') }
  }

  const connect = async (platform) => {
    if (dashboardApiReady('main')) {
      try { await connectSocialPlatform(platform.toLowerCase()) } catch (error) { notify(error.message, 'error') }
    } else {
      setConnections((current) => ({ ...current, [platform]: true }))
      notify(`${platform} OAuth is ready once auth is configured.`)
    }
  }

  const calendarDays = useMemo(() => Array.from({ length: 35 }, (_, index) => index < 2 || index > 31 ? null : index - 1), [])

  return (
    <div className="db-module db-studio db-page-enter">
      <header className="db-module-header"><div><span className="db-kicker"><Icon name="studio" size={13} /> SOCIAL STUDIO</span><h1>Make the feed yours.</h1><p>Plan once. Create beautifully. Publish everywhere.</p></div><div className="db-module-actions"><button className="db-secondary-button" onClick={() => setView('connections')}><Icon name="wifi" size={15} /> Connections</button><button className="db-primary-button" onClick={() => beginCreate()}><Icon name="plus" size={16} /> Create post</button></div></header>
      <nav className="db-module-tabs studio-tabs">{[['ideas', 'Ideas', 'spark'], ['create', 'Create', 'plus'], ['calendar', 'Calendar', 'calendar'], ['drafts', 'Drafts', 'file'], ['connections', 'Connections', 'wifi']].map(([id, label, icon]) => <button className={view === id ? 'active' : ''} onClick={() => id === 'create' ? beginCreate() : setView(id)} key={id}><Icon name={icon} size={14} />{label}{id === 'drafts' && drafts.length > 0 && <i>{drafts.length}</i>}</button>)}</nav>

      {view === 'ideas' && <section className="db-ideas-view"><div className="db-studio-hero db-glass-card"><div><StatusChip color="blue"><Icon name="spark" size={11} /> Fresh ideas</StatusChip><h2>Your next week,<br /><em>already inspired.</em></h2><p>Built from your brand, audience and what’s working right now.</p><button className="db-primary-button" onClick={() => beginCreate()}><Icon name="spark" size={15} /> Generate a custom idea</button></div><div className="db-floating-post post-one"><span>STAY<br /><em>CURIOUS.</em></span><small>Instagram</small></div><div className="db-floating-post post-two"><span>MAKE<br /><em>IT YOURS.</em></span><small>TikTok</small></div><i className="db-studio-orb" /></div><div className="db-ideas-heading"><div><span className="db-kicker">CURATED FOR YOUR BRAND</span><h2>Content plan</h2></div><div><button className="active">2 days</button><button>7 days</button><button>30 days</button></div></div><div className="db-idea-grid">{studioIdeas.map((idea) => <article className={`db-idea-card db-glass-card ${idea.color}`} key={idea.id}><header><span>{idea.day}</span><StatusChip color={idea.color}>{idea.format}</StatusChip></header><div className={`db-idea-art ${idea.color}`}><span>{idea.theme}</span><strong>{idea.title}</strong><i><Icon name={idea.format === 'Reel' ? 'play' : 'studio'} size={18} /></i></div><div className="db-idea-copy"><p>{idea.caption}</p><div>{idea.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div></div><footer><button className="db-secondary-button" onClick={() => beginCreate(idea)}>Use this idea <Icon name="arrow" size={14} /></button><button aria-label="More"><Icon name="more" size={17} /></button></footer></article>)}</div></section>}

      {view === 'create' && <section className="db-create-flow"><div className="db-create-head"><button className="db-back-button" onClick={() => setView('ideas')}><Icon name="back" size={17} /> Ideas</button><div><span className="db-kicker">NEW SOCIAL POST</span><h2>Create once. <em>Share everywhere.</em></h2></div><button className="db-secondary-button" onClick={saveDraft}><Icon name="file" size={14} /> Save draft</button></div><div className="db-create-steps">{['Format & channels', 'Create & refine', 'Preview & publish'].map((label, index) => <button className={createStep === index + 1 ? 'active' : createStep > index + 1 ? 'done' : ''} onClick={() => setCreateStep(index + 1)} key={label}><span>{createStep > index + 1 ? <Icon name="check" size={12} /> : index + 1}</span><b>{label}</b><i /></button>)}</div>
        {createStep === 1 && <div className="db-create-stage narrow"><span className="db-kicker">STEP 01 · THE FORMAT</span><h3>What are we making?</h3><p>Choose a format and every connected channel you want it adapted for.</p><div className="db-format-grid">{[['post', 'Social post', 'A timeless square or portrait post', 'studio'], ['story', 'Story', 'Quick, immersive and here for 24 hours', 'eye'], ['reel', 'Reel / video', 'Short-form motion built to stop the scroll', 'play']].map(([id, title, desc, icon]) => <button className={format === id ? 'selected' : ''} onClick={() => setFormat(id)} key={id}><span><Icon name={icon} size={21} /></span><b>{title}</b><small>{desc}</small>{format === id && <i><Icon name="check" size={13} /></i>}</button>)}</div><label className="db-destination-label">PUBLISHING TO</label><div className="db-platform-select">{Object.keys(connections).map((platform) => <button className={platforms.includes(platform) ? 'selected' : ''} onClick={() => connections[platform] ? togglePlatform(platform) : setView('connections')} key={platform}><PlatformMark platform={platform} /><span><b>{platform}</b><small>{connections[platform] ? 'Connected' : 'Connect first'}</small></span>{platforms.includes(platform) && <Icon name="check" size={14} />}</button>)}</div><button className="db-primary-button db-next" onClick={() => setCreateStep(2)} disabled={!platforms.length}>Continue <Icon name="arrow" size={15} /></button></div>}
        {createStep === 2 && <div className="db-create-stage editor"><div className="db-editor-panel"><div className="db-editor-section"><div className="db-section-title"><span><Icon name="upload" size={17} /></span><div><b>Add your creative</b><small>{format === 'reel' ? 'MP4 or MOV · 9:16 recommended' : 'JPG, PNG or MP4 · up to 30MB'}</small></div></div><input ref={fileInput} type="file" accept={format === 'reel' ? 'video/*' : 'image/*,video/*'} hidden onChange={handleFile} /><button className={`db-upload-zone ${media ? 'has-media' : ''}`} onClick={() => fileInput.current?.click()}>{media ? <>{format === 'reel' ? <video src={media} muted /> : <img src={media} alt="Selected upload" />}<span>Replace media</span></> : <><i><Icon name="upload" size={20} /></i><b>Drop something beautiful here</b><small>or click to browse your files</small></>}</button></div><div className="db-editor-section"><div className="db-section-title"><span><Icon name="spark" size={17} /></span><div><b>Write your caption</b><small>Start with an idea or let Adcraft rework it</small></div><button onClick={generateCopy} disabled={generating}><Icon name="spark" size={13} /> {generating ? 'Writing…' : 'AI rewrite'}</button></div><textarea value={caption} onChange={(event) => setCaption(event.target.value)} rows="6" /><div className="db-editor-meta"><label>Tone<select value={tone} onChange={(event) => setTone(event.target.value)}><option>Bold & warm</option><option>Playful</option><option>Editorial</option><option>Educational</option><option>Minimal</option></select></label><span>{caption.length} / 2,200</span></div></div><div className="db-editor-section"><div className="db-section-title"><span>#</span><div><b>Hashtags</b><small>Click one to remove it</small></div></div><div className="db-hashtag-editor">{hashtags.map((tag) => <button onClick={() => setHashtags((current) => current.filter((item) => item !== tag))} key={tag}>#{tag} ×</button>)}<button onClick={() => setHashtags((current) => [...current, 'NewTag'])}><Icon name="plus" size={12} /> Add</button></div></div></div><aside className="db-sticky-preview"><span className="db-kicker">LIVE PREVIEW</span><ContentPreview format={format} caption={caption} media={media} platforms={platforms} /><p><Icon name="spark" size={12} /> Adcraft adapts the crop and safe areas per channel.</p></aside><div className="db-stage-actions"><button className="db-secondary-button" onClick={() => setCreateStep(1)}><Icon name="back" size={14} /> Back</button><button className="db-primary-button" onClick={() => setCreateStep(3)}>Preview & publish <Icon name="arrow" size={15} /></button></div></div>}
        {createStep === 3 && <div className="db-create-stage publish"><div className="db-publish-preview"><span className="db-kicker">FINAL PREVIEW</span><ContentPreview format={format} caption={caption} media={media} platforms={platforms} /></div><div className="db-publish-options"><span className="db-kicker">WHEN SHOULD IT GO LIVE?</span><h3>Choose your moment.</h3><div className="db-publish-choice"><button className="selected"><span><Icon name="cursor" size={18} /></span><div><b>Publish now</b><small>Send it to every selected channel</small></div><i><Icon name="check" size={13} /></i></button><button><span><Icon name="calendar" size={18} /></span><div><b>Schedule for later</b><small>Your audience is most active at 6 PM</small></div></button></div><div className="db-date-fields"><label>Date<input type="date" value={scheduleDate} onChange={(event) => setScheduleDate(event.target.value)} /></label><label>Time<input type="time" value={scheduleTime} onChange={(event) => setScheduleTime(event.target.value)} /></label></div><div className="db-publish-summary"><div><span>DESTINATIONS</span><p>{platforms.map((platform) => <PlatformMark key={platform} platform={platform} />)}</p></div><div><span>FORMAT</span><b>{format}</b></div><div><span>BEST TIME</span><b>6:00 PM</b></div></div><button className="db-primary-button" onClick={() => finishPost('schedule')}><Icon name="calendar" size={15} /> Schedule post</button><button className="db-secondary-button full" onClick={() => finishPost('publish')}>Publish now instead</button></div><div className="db-stage-actions"><button className="db-secondary-button" onClick={() => setCreateStep(2)}><Icon name="back" size={14} /> Back to editor</button></div></div>}
      </section>}

      {view === 'calendar' && <section className="db-calendar-view"><div className="db-calendar-heading"><div><span className="db-kicker">CONTENT CALENDAR</span><h2>September 2026</h2><p>{scheduled.length} posts planned · 3 channels</p></div><div><button><Icon name="back" size={15} /></button><button>Today</button><button><Icon name="arrow" size={15} /></button><button className="db-primary-button" onClick={() => beginCreate()}><Icon name="plus" size={15} /> New post</button></div></div><div className="db-calendar-shell db-glass-card"><div className="db-calendar-days">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <span key={day}>{day}</span>)}</div><div className="db-calendar-grid">{calendarDays.map((date, index) => <div className={`${date === 12 ? 'today' : ''} ${date ? '' : 'muted'}`} key={index}><span>{date || (index < 2 ? 30 + index : index - 31)}</span>{scheduled.filter((post) => post.date === date).map((post) => <button className={post.color} key={post.id} title={post.title}><i><PlatformMark platform={post.platform} /></i><b>{post.time}</b><small>{post.title}</small></button>)}</div>)}</div></div></section>}

      {view === 'drafts' && <section className="db-drafts-view"><div className="db-view-title"><div><span className="db-kicker">SAVED WORK</span><h2>Your drafts</h2><p>Good ideas can wait until the timing is right.</p></div><button className="db-primary-button" onClick={() => beginCreate()}><Icon name="plus" size={15} /> New post</button></div>{drafts.length === 0 ? <div className="db-empty-state db-glass-card"><span><Icon name="file" size={26} /></span><h3>No drafts waiting</h3><p>Start a post and save it whenever you want to come back later.</p><button className="db-secondary-button" onClick={() => beginCreate()}>Create your first draft</button></div> : <div className="db-draft-grid">{drafts.map((draft) => <article className="db-draft-card db-glass-card" key={draft.id}><div className="db-draft-art">{draft.media ? <img src={draft.media} alt="Draft visual" /> : <span>IN<br /><em>PROGRESS.</em></span>}</div><div><span className="db-kicker">{draft.format} · {draft.platforms.join(' + ')}</span><p>{draft.caption}</p><small>{new Date(draft.createdAt).toLocaleDateString()}</small></div><footer><button onClick={() => { setFormat(draft.format); setPlatforms(draft.platforms); setCaption(draft.caption); setHashtags(draft.hashtags); setMedia(draft.media); setCreateStep(2); setView('create') }}>Continue editing <Icon name="arrow" size={14} /></button><button onClick={() => setDrafts((current) => current.filter((item) => item.id !== draft.id))} aria-label="Delete draft"><Icon name="trash" size={15} /></button></footer></article>)}</div>}</section>}

      {view === 'connections' && <section className="db-connections-view"><div className="db-view-title"><div><span className="db-kicker">YOUR CHANNELS</span><h2>Connect once.<br /><em>Create everywhere.</em></h2><p>Secure OAuth means Adcraft never sees or stores your passwords.</p></div><span className="db-connection-count"><b>{Object.values(connections).filter(Boolean).length}</b><small>of 3 connected</small></span></div><div className="db-connection-grid">{[['Instagram', 'Share posts, stories and reels', 'pink'], ['Facebook', 'Publish to your Page and feed', 'blue'], ['TikTok', 'Send short-form video to TikTok', 'dark']].map(([platform, desc, color]) => <article className={`db-connection-card db-glass-card ${color}`} key={platform}><PlatformMark platform={platform} /><div><h3>{platform}</h3><p>{desc}</p></div>{connections[platform] ? <><StatusChip>Connected</StatusChip><button onClick={() => setConnections((current) => ({ ...current, [platform]: false }))}>Disconnect</button></> : <button className="db-connect-button" onClick={() => connect(platform)}>Connect <Icon name="arrow" size={15} /></button>}</article>)}</div><div className="db-connection-note db-glass-card"><span><Icon name="link" size={19} /></span><div><b>Ads use a separate Meta connection</b><p>Meta requires different permissions for campaign management. Connect that once from the Ads workspace.</p></div></div></section>}
    </div>
  )
}

function Dashboard({ data = {}, onNavigate }) {
  const initialSection = new URLSearchParams(window.location.search).get('tab')
  const [section, setSection] = useState(['overview', 'ads', 'studio'].includes(initialSection) ? initialSection : 'overview')
  const [mobileNav, setMobileNav] = useState(false)
  const [toast, setToast] = useState(null)
  const name = data.name || 'Alex Morgan'
  const firstName = name.split(' ')[0]
  const notify = (message, type = 'success') => setToast({ message, type, id: Date.now() })
  const go = (next) => {
    setSection(next)
    setMobileNav(false)
    const url = new URL(window.location.href)
    if (next === 'overview') url.searchParams.delete('tab')
    else url.searchParams.set('tab', next)
    window.history.replaceState({}, '', `${url.pathname}${url.search}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const nav = [
    ['overview', 'Overview', 'home'],
    ['ads', 'Ads', 'ads'],
    ['studio', 'Social Studio', 'studio'],
  ]

  return (
    <main className="db-dashboard">
      <div className="db-ambient" aria-hidden="true"><span className="one" /><span className="two" /><span className="three" /></div>
      <aside className={`db-sidebar ${mobileNav ? 'open' : ''}`}>
        <div className="db-sidebar-brand"><button onClick={() => onNavigate('home')} aria-label="Adcraft home">Adcraft<span>.</span></button><button className="db-mobile-close" onClick={() => setMobileNav(false)} aria-label="Close menu"><Icon name="close" /></button></div>
        <div className="db-workspace-switch"><span>AC</span><div><b>{data.workspaceName || 'Adcraft Studio'}</b><small>Personal workspace</small></div><Icon name="more" size={16} /></div>
        <nav><small>WORKSPACE</small>{nav.map(([id, label, icon]) => <button className={section === id ? 'active' : ''} onClick={() => go(id)} key={id}><span><Icon name={icon} size={18} /></span>{label}{id === 'ads' && <i>2</i>}</button>)}<small>MANAGE</small><button onClick={() => { go('studio'); window.setTimeout(() => notify('Open the Connections tab to manage every channel.'), 200) }}><span><Icon name="link" size={18} /></span>Connections</button><button onClick={() => notify('Analytics are represented in the Ads performance view for now.')}><span><Icon name="chart" size={18} /></span>Analytics</button></nav>
        <div className="db-sidebar-bottom"><div className="db-usage"><span><Icon name="spark" size={13} /> AI CREATIONS</span><b>18 <small>/ 30 this month</small></b><i><em /></i><button>Upgrade plan <Icon name="arrow" size={13} /></button></div><button className="db-settings-link"><span><Icon name="settings" size={17} /></span>Settings</button><div className="db-profile"><span>AM<i /></span><div><b>{name}</b><small>demo@adcraft.ai</small></div><Icon name="more" size={16} /></div></div>
      </aside>
      {mobileNav && <button className="db-nav-scrim" onClick={() => setMobileNav(false)} aria-label="Close navigation" />}
      <div className="db-main-shell">
        <header className="db-topbar"><button className="db-menu-button" onClick={() => setMobileNav(true)} aria-label="Open navigation"><Icon name="menu" size={20} /></button><div className="db-breadcrumb"><span>{section === 'overview' ? 'Command center' : section === 'ads' ? 'Meta campaigns' : 'Organic content'}</span><i>/</i><b>{section === 'overview' ? 'Overview' : section === 'ads' ? 'Ads' : 'Social Studio'}</b></div><div className="db-top-actions"><label className="db-search"><Icon name="search" size={16} /><input placeholder="Search anything…" /><kbd>⌘ K</kbd></label><span className="db-demo-badge"><i /> Demo mode</span><button className="db-icon-button" aria-label="Notifications"><Icon name="bell" size={17} /><i /></button><button className="db-top-avatar">AM</button></div></header>
        <div className="db-main-content">
          {section === 'overview' && <Overview firstName={firstName} onNavigate={go} />}
          {section === 'ads' && <AdsWorkspace notify={notify} />}
          {section === 'studio' && <SocialStudio notify={notify} />}
        </div>
      </div>
      <Toast toast={toast} onClose={() => setToast(null)} />
    </main>
  )
}

export default Dashboard
