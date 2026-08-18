import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import FloatingLines from './FloatingLines'
import dashboardImage from '../hero.png'
import './styles.css'

// Base URL for public assets — handles both localhost and GitHub Pages
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

const routes = [
  ['/brand', 'Overview'], ['/logo', 'Logo'], ['/colors', 'Colors'],
  ['/typography', 'Typography'], ['/actions', 'CTAs'], ['/surfaces', 'Surfaces'],
  ['/patterns', 'Patterns'], ['/tokens', 'Tokens'], ['/components', 'Component lab']
]

const brand = {
  traits: ['Expert', 'Pragmatic', 'Trustworthy', 'Controlled', 'Quietly innovative'],
  avoid: ['Playful', 'Futuristic', 'Hype-driven'],
  colors: [
    ['Ivory', '#f4f0e8', '--ivory-100'], ['Paper', '#fffdf8', '--paper-100'],
    ['Ink', '#171717', '--ink-900'], ['Graphite', '#343633', '--ink-700'],
    ['Stone', '#625f58', '--stone-600'], ['Mist', '#ded8ce', '--stone-200'],
    ['Sage', '#69766d', '--sage-500'], ['Signal', '#b98b38', '--signal-500']
  ]
}

const defaultHero = {
  audienceLabel: 'Built for specialist teams', headline: 'Knowledge,', headlineEmphasis: 'put to work.',
  description: 'Turn your organization’s knowledge, systems, and SOPs into a governed AI workforce that gets work done.',
  primaryCtaLabel: 'Get started', primaryCtaUrl: '/get-started', secondaryCtaLabel: 'Explore agents', secondaryCtaUrl: '#agents',
  domainHeading: 'Built for work where judgment matters', domains: ['Finance', 'Tax', 'Legal', 'Operations', 'Research', 'Reporting']
}

function Link({ to, children, className = '' }) {
  return <a className={className} href={BASE + to} onClick={e => { e.preventDefault(); history.pushState({}, '', BASE + to); dispatchEvent(new PopStateEvent('popstate')); window.scrollTo(0, 0) }}>{children}</a>
}

function Copy({ value, label = 'Copy' }) {
  const [done, setDone] = useState(false)
  async function copy() { await navigator.clipboard.writeText(value); setDone(true); setTimeout(() => setDone(false), 1300) }
  return <button className="copy" onClick={copy}>{done ? 'Copied' : label}</button>
}

function Shell({ path, children }) {
  return <div className="app">
    <aside>
      <Link to="/" className="brand">Produc8ive</Link>
      <p className="aside-label">Brand system <span>v1.0</span></p>
      <nav>{routes.map(([to, label], i) => <Link key={to} to={to} className={path === to ? 'active' : ''}><span>0{i + 1}</span>{label}</Link>)}</nav>
      <p className="aside-note">Enterprise AI workforce<br />Finance · Tax · Legal</p>
    </aside>
    <main>{children}<footer><span>Produc8ive brand system</span><span>Built for teams that get work done.</span></footer></main>
  </div>
}

function PageHead({ eyebrow, title, intro }) {
  return <header className="page-head"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{intro}</p></header>
}

function Overview() {
  return <>
    <section className="hero">
      <div><p className="eyebrow">Produc8ive brand system</p><h1>Knowledge,<br /><em>put to work.</em></h1></div>
      <div className="hero-side"><p>Produc8ive turns an organization’s knowledge, systems, and SOPs into a governed AI workforce that gets work done.</p><div className="actions"><button className="button primary">Get started <b>↗</b></button><button className="button secondary">Explore agents</button></div></div>
    </section>
    <section className="statement"><p className="eyebrow light">Brand promise</p><blockquote>Give knowledge teams time back<br />without sacrificing control.</blockquote><div className="three"><p><b>Learns.</b><span>How your organization works.</span></p><p><b>Acts.</b><span>Across systems you already use.</span></p><p><b>Explains.</b><span>Every output and action.</span></p></div></section>
    <section className="section"><div className="section-title"><p className="eyebrow">Strategic foundation</p><h2>Enterprise scale.<br />Specialist depth.</h2></div><div className="foundation-grid">
      <article><span>01</span><h3>Category</h3><p>Enterprise AI Workforce Platform, anchored in finance, tax, and legal work.</p></article>
      <article><span>02</span><h3>Belief</h3><p>People should apply judgment—not spend their time moving information between systems.</p></article>
      <article><span>03</span><h3>Difference</h3><p>Organizational knowledge, live enterprise context, and controlled execution in one operating layer.</p></article>
      <article><span>04</span><h3>Outcome</h3><p>More work completed, faster and more consistently, with traceability built in.</p></article>
    </div></section>
    <section className="section"><div className="section-title"><p className="eyebrow">Character</p><h2>Quiet confidence.<br />Visible outcomes.</h2></div><div className="traits"><div><p className="eyebrow">We are</p>{brand.traits.map(x => <span key={x}>{x}</span>)}</div><div className="avoid"><p className="eyebrow">Never</p>{brand.avoid.map(x => <span key={x}>{x}</span>)}</div></div></section>
    <section className="direction"><div><p className="eyebrow">Design principles</p><h2>Clarity is a form<br />of control.</h2></div><ol><li><b>01</b><span><strong>Lead with outcomes</strong>Show what changed, not what the technology is called.</span></li><li><b>02</b><span><strong>Make complexity legible</strong>Structure dense ideas with hierarchy and proof.</span></li><li><b>03</b><span><strong>Earn every effect</strong>Depth and glass signal layers of work—not decoration.</span></li></ol></section>
  </>
}

function HomeHero() {
  const [hero, setHero] = useState(defaultHero)
  useEffect(() => {
    const controller = new AbortController()
    fetch(`${import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'}/api/homepage`, { signal: controller.signal })
      .then(response => response.ok ? response.json() : Promise.reject())
      .then(({ data }) => data && setHero({ ...defaultHero, ...data }))
      .catch(() => { })
    return () => controller.abort()
  }, [])
  return <div className="site-home">
    <header className="site-nav">
      <Link to="/" className="site-logo">Produc8ive</Link>
      <nav className="site-links" aria-label="Primary"><a href="#platform">Platform</a><a href="#agents">Agents</a><a href="#how">How it works</a><Link to="/brand">Brand kit</Link></nav>
      <Link to="/get-started" className="site-cta">Get started <span aria-hidden="true">↗</span></Link>
    </header>
    <main className="site-main">
      <section className="home-hero" id="platform">
        <div className="hero-orbits" aria-hidden="true"><i></i><i></i><i></i></div>
        <span className="orbit-badge badge-one" aria-hidden="true">S</span><span className="orbit-badge badge-two" aria-hidden="true">K</span><span className="orbit-badge badge-three" aria-hidden="true">F</span><span className="orbit-badge badge-four" aria-hidden="true">T</span>
        <div className="home-kicker"><span className="avatar-stack" aria-hidden="true"><i>F</i><i>T</i><i>L</i></span><strong>{hero.audienceLabel}</strong></div>
        <h1>{hero.headline}<br /><em>{hero.headlineEmphasis}</em></h1>
        <p className="home-intro">{hero.description}</p>
        <div className="home-actions"><Link to={hero.primaryCtaUrl} className="button primary">{hero.primaryCtaLabel} <b aria-hidden="true">↗</b></Link><a href={hero.secondaryCtaUrl} className="button secondary">{hero.secondaryCtaLabel}</a></div>
        <div className="product-stage" id="agents">
          <img className="workspace-placeholder" src={`${BASE}/agent-workspace-placeholder.svg`} alt="Placeholder for the Produc8ive agent workspace preview" />
        </div>
      </section>
      <section className="domain-strip" id="how" aria-label="Produc8ive capabilities"><p>{hero.domainHeading}</p><div>{hero.domains.map(domain => <span key={domain}>{domain}</span>)}</div></section>
    </main>
  </div>
}

function Logo() {
  return <><PageHead eyebrow="Identity / 02" title="A mark for work in motion." intro="The current horizontal lockup is the only approved logo. Preserve its proportions, contrast, and generous breathing room." />
    <section className="logo-stage"><img src="/logo.png" alt="Produc8ive logo" /></section>
    <section className="split section"><div><p className="eyebrow">Proposed clear space</p><h2>Let the mark breathe.</h2><p>Maintain clear space equal to the height of the “P” around every side. Until a vector master exists, this rule remains proposed.</p></div><div className="clearspace"><div><img src="/logo.png" alt="Logo clear-space example" /></div></div></section>
    <section className="section"><div className="section-title"><p className="eyebrow">Approved use</p><h2>High contrast,<br />without compromise.</h2></div><div className="logo-pair"><article><img src="/logo.png" alt="Logo on ivory" /><p>Preferred · Ivory</p></article><article className="dark-logo"><div className="logo-reverse">PRODUC8IVE</div><p>Proposed · Reversed typeset preview only</p></article></div><p className="note">The reversed treatment is a placement preview, not an exportable logo asset. Create an approved SVG before production use.</p></section>
    <section className="section"><p className="eyebrow">Do not</p><div className="dont-grid"><p>Stretch or compress</p><p>Recolor individual parts</p><p>Place on busy imagery</p><p>Add glow or shadow</p></div></section>
  </>
}

function Colors() {
  return <><PageHead eyebrow="Foundation / 03" title="Warmth, precision, restraint." intro="Ivory and ink carry the identity. Muted neutrals organize information; sage and signal are scarce functional accents." />
    <section className="palette">{brand.colors.map(([name, hex, token], i) => <article key={name} style={{ background: hex, color: i === 2 || i === 3 || i === 4 || i === 6 ? '#fffdf8' : '#171717' }}><div><h3>{name}</h3><Copy value={hex} /></div><p>{hex}<br /><span>{token}</span></p></article>)}</section>
    <section className="section"><div className="section-title"><p className="eyebrow">Usage ratio</p><h2>Neutral by default.<br />Accent with intent.</h2></div><div className="ratio"><span>60%<small>Ivory / paper</small></span><span>25%<small>Ink / graphite</small></span><span>10%<small>Stone</small></span><span>5%<small>Accent</small></span></div></section>
    <section className="section"><p className="eyebrow">Verified text pairings</p><div className="table"><div><b>Background</b><b>Text</b><b>Ratio</b><b>Use</b></div><div><span>Paper #fffdf8</span><span>Ink #171717</span><span>17.64:1</span><span>All text</span></div><div><span>Ivory #f4f0e8</span><span>Ink #171717</span><span>15.77:1</span><span>All text</span></div><div><span>Ink #171717</span><span>Paper #fffdf8</span><span>17.64:1</span><span>All inverse text</span></div><div><span>Ivory #f4f0e8</span><span>Stone #625f58</span><span>5.60:1</span><span>Body and metadata</span></div></div></section>
  </>
}

function Typography() {
  return <><PageHead eyebrow="Foundation / 04" title="Editorial authority. Operational clarity." intro="Source Serif 4 gives the brand a considered point of view. Inter keeps dense workflows and explanations direct." />
    <section className="type-feature"><p>Source Serif 4</p><span>Display & headings</span><h2>Work moves faster<br />when knowledge does.</h2><div><b>Medium 500</b><b>Semibold 600</b><Copy value="font-family: 'Source Serif 4', Georgia, serif;" label="Copy CSS" /></div></section>
    <section className="type-feature sans"><p>Inter</p><span>Body, UI & labels</span><h2>Agents research, reason, act, and escalate exceptions across the systems your teams already use.</h2><div><b>Regular 400</b><b>Medium 500</b><b>Semibold 600</b><Copy value="font-family: Inter, Arial, sans-serif;" label="Copy CSS" /></div></section>
    <section className="section"><p className="eyebrow">Landing-page scale</p><div className="type-scale"><div><span>Hero</span><strong>48 / 1.02</strong><p>Give every decision the full intelligence of your organization.</p></div><div><span>Section</span><strong>36 / 1.08</strong><h2>Designed around how work gets done.</h2></div><div><span>Subsection</span><strong>28 / 1.15</strong><h3>Control without friction.</h3></div><div><span>Body</span><strong>16 / 1.55</strong><p>Use sentence case and keep paragraphs focused on a single outcome.</p></div></div></section>
    <section className="voice section"><div><p className="eyebrow">Voice</p><h2>Bold. Expressive.<br />Outcome-led.</h2></div><div><article><b>Say</b><p>Close the books. Keep the judgment.</p><p>Your organization already knows how. Put that knowledge to work.</p></article><article className="avoid"><b>Avoid</b><p>Supercharge your business with revolutionary AI.</p><p>Unlock the future with next-generation agents.</p></article></div></section>
  </>
}

const ButtonDemo = ({ label, kind = 'primary', disabled = false }) => <button disabled={disabled} className={`button ${kind}`}>{label}<b>↗</b></button>
function Actions() {
  return <><PageHead eyebrow="Components / 05" title="Move work forward." intro="Actions are direct, specific, and visually ordered. One primary action per decision point; secondary actions help people investigate." />
    <section className="cta-hero"><p className="eyebrow light">Primary conversion</p><h2>Your next move<br />starts here.</h2><ButtonDemo label="Get started" /></section>
    <section className="section"><p className="eyebrow">Hierarchy</p><div className="cta-grid"><article><span>Primary</span><ButtonDemo label="Get started" /><p>One per section. Use for the highest-value next step.</p></article><article><span>Secondary</span><ButtonDemo label="Explore agents" kind="secondary" /><p>Use to deepen product understanding.</p></article><article><span>Tertiary</span><ButtonDemo label="See how it works" kind="text" /><p>Use for low-commitment exploration.</p></article></div></section>
    <section className="section"><p className="eyebrow">States</p><div className="states"><div><span>Default</span><ButtonDemo label="Get started" /></div><div><span>Hover</span><ButtonDemo label="Get started" kind="hover" /></div><div><span>Focus</span><ButtonDemo label="Get started" kind="focus" /></div><div><span>Disabled</span><ButtonDemo label="Get started" disabled /></div></div></section>
    <section className="section"><p className="eyebrow">Form example</p><form className="form" onSubmit={e => e.preventDefault()}><label>Work email<input type="email" placeholder="name@company.com" /></label><label>What should move faster?<textarea placeholder="Tell us about the workflow"></textarea></label><ButtonDemo label="Get started" /></form></section>
  </>
}

function Surfaces() {
  return <><PageHead eyebrow="System / 06" title="Depth that explains." intro="Light surfaces lead. Dark sections create focus. Glass is reserved for layered workflows, navigation, and featured content." />
    <section className="surface-stack"><article><p>Paper</p><h2>Clear, direct, useful.</h2><span>Primary reading surface</span></article><article><p>Ivory</p><h2>Warmth without noise.</h2><span>Default page surface</span></article><article className="glass"><p>Glass</p><h2>Context over context.</h2><span>Featured layers and navigation</span></article><article className="inverse"><p>Ink</p><h2>Focus the decision.</h2><span>Approved dark sections</span></article></section>
    <section className="section"><p className="eyebrow">Featured card</p><div className="featured"><div><p className="eyebrow light">Agent / Finance operations</p><h2>From source data<br />to board-ready.</h2><p>Pull live data, validate figures, create visuals, and format the presentation—while keeping every source traceable.</p><ButtonDemo label="See how it works" kind="inverse" /></div><div className="mock"><div className="mock-top"><span>Board Deck Agent</span><span>● Live</span></div><div className="chart"><i></i><i></i><i></i><i></i><i></i><i></i></div><div className="mock-row"><span>Sources checked <b>24</b></span><span>Exceptions <b>03</b></span></div></div></div></section>
    <section className="section"><p className="eyebrow">Listings & disclosure</p><div className="accordion">{['What does the agent learn?', 'Where can it act?', 'How does it explain decisions?'].map((x, i) => <details key={x} open={i === 0}><summary>{x}<b>+</b></summary><p>{i === 0 ? 'Approved SOPs, policies, business rules, and historical decisions—within defined boundaries.' : 'Document the answer in plain language, then link to the relevant workflow or control.'}</p></details>)}</div></section>
  </>
}

const patternCode = `.dark-field {
  background:
    radial-gradient(circle at 78% 20%, rgba(105,118,109,.30), transparent 30%),
    linear-gradient(120deg, #171717, #292c29 55%, #171717);
  color: #fffdf8;
}`
function Patterns() {
  return <><PageHead eyebrow="Expression / 07" title="Atmosphere, with a job to do." intro="Patterns create hierarchy and safe content zones. They are CSS-native, restrained, and always have a solid fallback." />
    <section className="pattern-preview"><div><p className="eyebrow light">Dark field / Featured story</p><h2>Complex work.<br />Clear control.</h2><p>Keep primary content in the left 55%. The atmospheric focus sits away from text.</p></div></section>
    <section className="code-block"><div><span>CSS · Dark field</span><Copy value={patternCode} label="Copy CSS" /></div><pre>{patternCode}</pre></section>
    <section className="section"><div className="section-title"><p className="eyebrow">Diagram language</p><h2>Show the work,<br />not the magic.</h2></div><div className="flow"><div><b>01</b><span>SOPs & knowledge</span></div><i>→</i><div><b>02</b><span>Governed agent</span></div><i>→</i><div><b>03</b><span>Systems & action</span></div><i>→</i><div><b>04</b><span>Evidence & exceptions</span></div></div></section>
    <section className="section"><p className="eyebrow">Pattern rules</p><div className="dont-grid"><p>Use texture to separate modes</p><p>Protect quiet zones for copy</p><p>Keep motion slow and optional</p><p>Never imply unverified intelligence</p></div></section>
  </>
}

const tokenSnippet = `:root {
  --surface-primary: #f4f0e8;
  --surface-secondary: #fffdf8;
  --surface-inverse: #171717;
  --text-primary: #171717;
  --text-secondary: #625f58;
  --text-inverse: #fffdf8;
  --border-subtle: #ded8ce;
  --action-primary: #171717;
  --focus-ring: #69766d;
}`
function Tokens() {
  return <><PageHead eyebrow="Operations / 08" title="One source of truth." intro="Use semantic tokens in production work. Primitive values describe what a color is; semantic values describe what it does." />
    <section className="code-block large"><div><span>CSS · Core semantic tokens</span><Copy value={tokenSnippet} label="Copy tokens" /></div><pre>{tokenSnippet}</pre></section>
    <section className="section"><p className="eyebrow">Naming model</p><div className="token-model"><div><span>Primitive</span><code>--ink-900</code><p>Raw value. Do not use directly in components.</p></div><i>→</i><div><span>Semantic</span><code>--text-primary</code><p>Purpose. Preferred in layouts and prose.</p></div><i>→</i><div><span>Component</span><code>--button-bg</code><p>Local role. Maps back to a semantic token.</p></div></div></section>
    <section className="section"><p className="eyebrow">Quick copy</p><div className="quick-copy">{[['Primary background', 'var(--surface-primary)'], ['Primary text', 'var(--text-primary)'], ['Inverse section', 'var(--surface-inverse)'], ['Primary action', 'var(--action-primary)']].map(([a, b]) => <div key={a}><span>{a}</span><code>{b}</code><Copy value={b} /></div>)}</div></section>
    <section className="handoff"><p className="eyebrow light">Working rule</p><h2>If a value has no clear role,<br />it is not yet a token.</h2><p>Deprecate by aliasing the old semantic name for one release, documenting the replacement, then removing it.</p></section>
  </>
}

function SectionLibrary() {
  const [filter, setFilter] = useState('All')
  const sections = [
    ['Hero', 'Split hero', <SplitHero />], ['Hero', 'Product hero', <ProductHero />],
    ['Feature', 'Split feature', <SplitFeature />], ['Feature', 'Feature grid', <FeatureGrid />],
    ['CTA', 'Conversion banner', <ConversionBanner />], ['Footer', 'Corporate footer', <CorporateFooter />]
  ]
  const visible = filter === 'All' ? sections : sections.filter(([type]) => type === filter)
  return <section className="section-library">
    <header className="library-intro"><div><p className="eyebrow">Admin / Section library</p><h1>Ready-made sections,<br /><em>made Produc8ive.</em></h1></div><div><p>Reusable landing-page structures based on Ruixen UI's free section patterns, adapted to the Produc8ive brand system.</p><a className="button primary" href="https://ruixen.com/docs/index" target="_blank" rel="noreferrer">Browse Ruixen <b>↗</b></a></div></header>
    <nav className="section-filters" aria-label="Filter sections">{['All', 'Hero', 'Feature', 'CTA', 'Footer'].map(item => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}<span>{item === 'All' ? sections.length : sections.filter(([type]) => type === item).length}</span></button>)}</nav>
    <div className="section-list">{visible.map(([type, name, preview], index) => <article className="section-preview" key={name}><header><div><span>{String(index + 1).padStart(2, '0')}</span><h2>{name}</h2></div><p>{type}</p></header><div className="preview-frame">{preview}</div></article>)}</div>
  </section>
}

function SplitHero() { return <section className="lab-split-hero"><div><p className="eyebrow">Enterprise AI workforce</p><h3>Put your knowledge<br /><em>to work.</em></h3><p>Governed agents that understand how your organization works and move specialist work forward.</p><div><button className="button primary">Get started ↗</button><button className="button secondary">See how it works</button></div></div><div className="lab-workflow"><span>WORKFLOW / 01</span><b>Research</b><i>→</i><b>Reason</b><i>→</i><b>Act</b><small>Every action stays traceable.</small></div></section> }
function ProductHero() { return <section className="lab-product-hero"><p className="eyebrow">Built for work where judgment matters</p><h3>Close the work.<br />Keep the judgment.</h3><p>Connect knowledge, live context, and controlled execution in one operating layer.</p><button className="button primary">Explore agents ↗</button><div className="lab-dashboard"><span>Board Deck Agent</span><strong>24 sources checked</strong><div><i></i><i></i><i></i><i></i><i></i></div></div></section> }
function SplitFeature() { return <section className="lab-feature-split"><div><p className="eyebrow light">Controlled execution</p><h3>Designed around<br />how work gets done.</h3><p>Agents work across approved systems, escalate exceptions, and keep evidence attached.</p></div><ol>{[['01', 'Learns your process', 'Approved SOPs, policies, and prior decisions.'], ['02', 'Acts within boundaries', 'Defined permissions, review gates, and controls.'], ['03', 'Explains every output', 'Sources and reasoning remain visible.']].map(([n, t, d]) => <li key={n}><b>{n}</b><span><strong>{t}</strong>{d}</span></li>)}</ol></section> }
function FeatureGrid() { return <section className="lab-feature-grid"><header><p className="eyebrow">One operating layer</p><h3>From knowledge<br />to completed work.</h3></header><div>{[['01', 'Research', 'Find the right evidence.'], ['02', 'Reason', 'Apply policy and context.'], ['03', 'Act', 'Move work across systems.'], ['04', 'Escalate', 'Bring judgment in on time.']].map(([n, t, d]) => <article key={n}><span>{n}</span><h4>{t}</h4><p>{d}</p></article>)}</div></section> }
function ConversionBanner() { return <section className="lab-cta"><p className="eyebrow light">Your next move</p><h3>Give knowledge teams<br />time back.</h3><p>Start with one high-value workflow and prove the outcome.</p><button className="button inverse">Start a conversation ↗</button></section> }
function CorporateFooter() { return <footer className="lab-footer"><div><strong>Produc8ive</strong><p>Knowledge, put to work.</p></div><div><span>Platform</span><a href="#">Agents</a><a href="#">How it works</a><a href="#">Security</a></div><div><span>Company</span><a href="#">About</a><a href="#">Insights</a><a href="#">Contact</a></div><small>© 2026 Produc8ive. Built for teams that get work done.</small></footer> }

function LandingPageOne() {
  return <div className="landing-one">
    <FloatingNavbar />
    <main>
      <section className="tabbed-hero landing-hero-redesign" id="platform">
        <div className="hero-lines" aria-hidden="true"><FloatingLines lineCount={18} lineDistance={16} animationSpeed={.28} middleWavePosition={{ x: 1.4, y: -.15, rotate: .24 }} linesGradient={['#69766d', '#b98b38']} /></div>
        <h1>Turn Your Finance Knowledge<br /><em>Into Work That Gets Done</em></h1>
        <p className="landing-lead">Produc8ive turns your SOPs, institutional knowledge and live enterprise data into governed AI agents that complete repeatable finance workflows across your existing systems.</p>
        <div className="landing-actions"><a className="button primary" href="#contact">Map One Finance Workflow ↗</a></div>
        <div className="hero-dashboard-frame"><img src={dashboardImage} alt="Produc8ive finance automation dashboard" /></div>
      </section>
      <ClientsSection />
      <section className="growth-strip" id="proof" aria-label="Growth and efficiency outcomes"><div>
        <article><strong>10+ hours</strong><p>saved per week</p></article>
        <article><strong>8x</strong><p>faster processing</p></article>
        <article><strong>95%+</strong><p>data accuracy</p></article>
        <article><strong>60%</strong><p>lower processing cost</p></article>
      </div></section>

      <ProblemSection />
      <FinanceShiftSection />
      <WhyProduc8iveSection />
      <UseCasesSection />
      <FinanceBrainFlowSection />
      <ImplementationJourneySection />
      <ProductInActionSection />
      <IntegrationsSection />
      <HumanControlSection />
      <LeadershipSection />


      <ContactSection />
      <WorkflowCtaSection />
      <LandingFooter />
    </main>
  </div>
}

function ProblemSection() {
  const problems = [
    ['Systems Create Silos', 'Finance teams manually connect fragmented data, documents and approvals across tools before any process can be completed.'],
    ['Assembling the Truth', 'Finance teams must pull data, approvals, documents and business context from multiple systems before they can make a confident decision.'],
    ['People Bridge Systems', 'Experienced employees manually connect tools, chase inputs and resolve exceptions—making growth dependent on headcount and institutional knowledge.'],
    ['Automation Breaks on Exceptions', 'The moment a transaction requires context or judgement, the process falls back to emails, spreadsheets and manual follow-ups.']
  ]
  return <section className="problem-section" id="problems">
    <header><p className="problem-label"><span aria-hidden="true">△</span>The Problem</p><h2>Finance has more software than ever, but the work between systems is still manual.</h2></header>
    <div className="problem-grid">{problems.map(([title, description], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
    <div className="problem-story problem-single" aria-hidden="true">
      <div className="single-problem-flow">
        <section className="single-systems"><small>DISCONNECTED INPUTS</small><div><span><i>ERP</i><b>Transactions</b><em>£12,480</em></span><span><i>@</i><b>Email</b><em>Approval pending</em></span><span><i>▤</i><b>Documents</b><em>Invoice v3</em></span><span><i>£</i><b>Banking</b><em>£12,420</em></span></div></section>
        <div className="single-connector"><i></i><b>→</b></div>
        <section className="single-human"><small>HUMAN RECONCILIATION</small><strong>Finance assembles the truth</strong><span>Invoice total <b>£12,480</b></span><span>Bank amount <b>£12,420</b></span><span>Email adjustment <b>+ £60</b></span><em>Matched manually</em></section>
        <div className="single-connector broken"><i></i><b>×</b><small>Exception</small></div>
        <section className="single-outcome"><small>AUTOMATION FALLBACK</small><div className="exception-callout"><i>!</i><span><b>Amount mismatch</b><em>Rule cannot resolve</em></span></div><div className="conflicting-truth"><span>ERP <b>£12,480</b></span><span>Bank <b>£12,420</b></span></div><strong>Decision blocked<small>No stitched source of truth</small></strong></section>
      </div>
    </div>
  </section>
}

function FinanceShiftSection() {
  const shifts = [
    ['ready', 'Work arrives review-ready', 'Information is collected, organised and validated before it reaches the finance team.'],
    ['exceptions', 'Exceptions replace transaction queues', 'Teams focus on mismatches, risks and material decisions instead of reviewing every item manually.'],
    ['control', 'People remain in control', 'AI coordinates routine work while finance professionals approve consequential actions and resolve exceptions.']
  ]
  const icons = {
    ready: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11l2 2 4-4M7 3h8l4 4v14H5V3h2zm7 1v4h4" /></svg>,
    exceptions: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h10M4 18h7M18 15v6m-3-3h6" /></svg>,
    control: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l8 4v5c0 5-3.4 8-8 9-4.6-1-8-4-8-9V7l8-4zm-3 9l2 2 4-4" /></svg>
  }
  return <section className="finance-shift" id="finance-shift">
    <div className="finance-shift-copy">
      <p className="eyebrow">The Produc8ive shift</p>
      <h2>Finance Should Focus on Decisions, Not Data Preparation</h2>
      <div className="shift-points">{shifts.map(([icon, title, description]) => <article key={title}><span className="shift-icon">{icons[icon]}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
    </div>
    <div className="shift-visual" aria-label="Produc8ive prepares finance work and escalates only material exceptions">
      <header><span>Finance workflow</span><b><i></i> Coordinated</b></header>
      <div className="workflow-summary"><small>WORK PREPARED</small><strong>Review-ready</strong><span>Sources organised and validated</span></div>
      <div className="workflow-path" aria-hidden="true"><span>Collect</span><i>→</i><span>Validate</span><i>→</i><span>Review</span></div>
      <div className="exception-card"><span><small>EXCEPTION</small><strong>Invoice total mismatch</strong></span><b>Needs judgment</b></div>
      <footer><span>Routine items cleared <b>47</b></span><span>For review <b>03</b></span></footer>
    </div>
  </section>
}

function WhyProduc8iveSection() {
  const reasons = [
    ['brain', 'One Finance Brain', 'Bring together SOPs, business rules, institutional knowledge and live enterprise data so every agent works with the same organizational context.'],
    ['agents', 'Agents That Work Together', 'Specialised agents coordinate across multi-step finance workflows instead of handling isolated prompts or disconnected tasks.'],
    ['control', 'Human Control by Design', 'AI prepares, validates and recommends. Your team reviews exceptions, approves material actions and remains accountable for final decisions.'],
    ['process', 'Built Around Your Process', 'Configure workflows around your existing controls, approval structures and operating procedures rather than forcing finance into a standard template.'],
    ['stack', 'Works Across Your Stack', 'Connect ERPs, email, documents, banking portals and specialist systems without replacing the technology your team already uses.']
  ]
  const visuals = {
    brain: <div className="brain-map" aria-hidden="true"><span>SOPs</span><span>Rules</span><b>Finance<br />Brain</b><span>Live data</span><span>Context</span></div>,
    agents: <div className="agent-chain" aria-hidden="true"><span>Collect<small>Complete</small></span><i>→</i><span>Validate<small>Checked</small></span><i>→</i><span>Prepare<small>Ready</small></span></div>,
    control: <div className="control-review" aria-hidden="true"><span><i>!</i><small>Material exception</small><b>Payment variance</b></span><button tabIndex="-1">Review required</button></div>,
    process: <div className="process-steps" aria-hidden="true"><span><b>01</b>Prepare</span><span><b>02</b>Validate</span><span><b>03</b>Approve</span></div>,
    stack: <div className="stack-links" aria-hidden="true"><span>ERP</span><span>MAIL</span><b>P8</b><span>DOCS</span><span>BANK</span></div>
  }
  return <section className="why-produc8ive" id="why-produc8ive">
    <header className="why-header">
      <div><p className="why-pill">Why Produc8ive</p><h2>Built for the Work Between Your Systems</h2></div>
      <p>Produc8ive does more than add AI to isolated tasks. It connects your processes, enterprise knowledge and existing systems to help finance teams execute work with greater control.</p>
    </header>
    <div className="why-grid">{reasons.map(([type, title, description], index) => <article className={index < 2 ? 'why-card why-card-large' : 'why-card'} key={title}><h3>{title}</h3><p>{description}</p><div className={`why-visual ${type}`}>{visuals[type]}</div></article>)}</div>
  </section>
}

function UseCasesSection() {
  const agents = [
    ['Bookkeepin Operations Assistant', 'Organises client emails, statements, invoices and receipts into a clean, review-ready bookkeeping packet.'],
    ['AP Invoice Processing Assistant', 'Extracts invoice data, checks it against purchase and approval records, and prepares validated invoices for posting.'],
    ['Variance Analysis Assistant', 'Compares budgets and estimates against actual expenses to identify material variances and exceptions.'],
    ['AR Collections Assistant', 'Prioritises overdue invoices and prepares contextual payment reminders for finance-team review.'],
    ['Month-End Close Assistant', 'Tracks close activities, identifies blockers and highlights owners and next actions required for completion.'],
    ['Investor Reporting Assistant', 'Converts financials, KPIs and cash-flow data into a structured first draft of the investor reporting pack.'],
    ['Documentation Pre-Check Assistant', 'Reviews submission documents for missing, unclear or mismatched information before external processing.'],
    ['Case Status Assistant', 'Consolidates updates across emails, notes and systems into a current view of status, blockers and next actions.'],
    ['Audit-Ready Books Assistant', 'Reviews books and supporting records to flag missing evidence, inconsistencies, anomalies and unresolved items.']
  ]
  return <section className="use-cases-section" id="agents1">
    <div className="agent-scroll" aria-label="Deployable finance assistants"><div className="agent-track">{[...agents, ...agents].map(([title, description], index) => <article key={`${title}-${index}`} aria-hidden={index >= agents.length ? 'true' : undefined}><span>{String((index % agents.length) + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{description}</p></div><i aria-hidden="true">↗</i></article>)}</div></div>
    <div className="use-cases-copy"><p className="eyebrow">Deployable assistants</p><h2>Start With One Workflow. Scale Across Finance.</h2><p className="use-cases-intro">Deploy purpose-built agents for the finance processes consuming the most time today, then expand the same Finance Brain across AP, AR, close, reporting, bookkeeping and compliance.</p><a className="button secondary" href="#contact">Setup For Me <b aria-hidden="true">↗</b></a></div>
  </section>
}

function FinanceBrainFlowSection() {
  const stages = [
    ['capture', 'Input orchestration', 'Capture', 'Collects invoices, bank statements, client documents, accounting requests and other inputs from emails, files and connected systems, then structures them for processing.'],
    ['validate', 'Control checks', 'Validate', 'Checks documents and transactions for completeness, matches records and flags missing information, mismatches, uncategorised items and incomplete reports.'],
    ['coordinate', 'Workflow routing', 'Coordinate', 'Routes AP approvals, AR follow-ups, month-end tasks and documentation cases while tracking dependencies, owners and blockers.'],
    ['deliver', 'Review-ready output', 'Deliver', 'Produces review-ready workpapers, reports, summaries and commentary with the relevant supporting context attached.']
  ]
  const visuals = {
    capture: <div className="capture-workspace" aria-hidden="true"><header><span>Finance intake</span><b>● Live</b></header><div className="capture-flow"><div className="source-list"><span><i>@</i>Email<small>6 new</small></span><span><i>▤</i>Invoices<small>8 files</small></span><span><i>▥</i>Statements<small>4 files</small></span></div><div className="flow-connector"><i></i><b>→</b></div><div className="intake-result"><small>STRUCTURED INTAKE</small><strong>18 items ready</strong><span>Classified <b>18</b></span><span>Fields extracted <b>96%</b></span><em>Ready to validate</em></div></div></div>,
    validate: <div className="validation-workspace" aria-hidden="true"><header><span>Document validation</span><b>3 checks passed</b></header><div className="validation-panels"><div className="document-preview"><small>INVOICE / 1842</small><strong>Northstar Supply</strong><span>Invoice total <b>£12,480</b></span><span>PO reference <b>PO-7741</b></span><i></i><i></i></div><div className="check-list"><span><i>✓</i><b>Supplier matched</b><small>Vendor master</small></span><span><i>✓</i><b>Totals checked</b><small>Within tolerance</small></span><span className="check-flag"><i>!</i><b>Approval missing</b><small>Review required</small></span></div></div></div>,
    coordinate: <div className="coordination-workspace" aria-hidden="true"><header><span>Month-end workflow</span><b>3 owners</b></header><div className="coordination-board"><span><i>✓</i><b>AP review</b><small>Finance Ops</small><em>Complete</em></span><span><i>2</i><b>Controller approval</b><small>J. Morgan</small><em>In review</em></span><span><i>3</i><b>ERP posting</b><small>System queue</small><em>Waiting</em></span></div><footer><span>Dependency tracked</span><b>No blockers</b></footer></div>,
    deliver: <div className="deliver-visual" aria-hidden="true"><span><small>MONTH-END WORKPAPER</small><b>Review-ready</b><i></i><i></i><i></i></span><em>Evidence attached</em></div>
  }
  return <section className="finance-brain-flow" id="finance-brain-flow">
    <header><p className="flow-pill">How the Finance Brain works</p><h2>The Operating Flow Behind Every Agent</h2></header>
    <div className="flow-timeline">{stages.map(([type, label, title, description]) => <article className="timeline-item" key={title}>
      <div className={`flow-card-visual ${type}`}>{visuals[type]}</div>
      <span className="timeline-node" aria-hidden="true"><i></i></span>
      <div className="flow-card-copy"><p className="timeline-stage">{label}</p><h3>{title}</h3><p>{description}</p></div>
    </article>)}</div>
  </section>
}

function ImplementationJourneySection() {
  const principles = [
    ['Start with one workflow', 'Keep the first deployment focused, measurable and operationally useful.'],
    ['Configure around your controls', 'Preserve existing rules, approvals and human-review requirements.'],
    ['Validate with real cases', 'Test normal transactions, edge cases and exceptions before launch.'],
    ['Expand after production', 'Use the first workflow as the foundation for additional finance automations.']
  ]
  const deployment = [
    ['complete', 'Workflow Scope', 'Complete', 'Invoice intake, validation, exception review and posting-ready output agreed.'],
    ['complete', 'Knowledge and Rules', 'Complete', 'Vendor rules, PO checks, approval thresholds and exception logic configured.'],
    ['complete', 'System Connections', 'Complete', 'Shared inbox, document repository and ERP test environment connected.'],
    ['progress', 'Test Cases', '18 of 24 passed', 'Standard invoices validated. Six exception cases require review.'],
    ['pending', 'Production Readiness', 'Pending approval', 'Finance owner sign-off required before controlled launch.']
  ]
  return <section className="implementation-journey" id="implementation-journey">
    <div className="implementation-copy">
      <p className="implementation-pill">Implementation journey</p>
      <h2>From Workflow Discovery to Production in a Few Weeks</h2>
      <p className="implementation-intro">Start with one clearly defined finance workflow. We map how it operates, configure Produc8ive around your controls, connect the required systems and validate it with real cases before production launch.</p>
      <div className="implementation-principles">{principles.map(([title, description]) => <article key={title}><i aria-hidden="true">✓</i><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
    </div>
    <div className="deployment-stage">
      <div className="deployment-workspace">
        <header><div><small>FINANCE AUTOMATION / DEPLOYMENT</small><h3>AP Invoice Processing Deployment</h3></div><span>Validation in progress</span></header>
        <div className="deployment-checklist">{deployment.map(([state, title, status, description]) => <article className={state} key={title}><i aria-hidden="true">{state === 'complete' ? '✓' : state === 'progress' ? '◒' : '·'}</i><div><h4>{title}</h4><p>{description}</p></div><b>{status}</b></article>)}</div>
        <footer><div className="readiness-copy"><span>Launch readiness</span><strong>82%</strong><i><b></b></i></div><button type="button">Review Open Exceptions <span aria-hidden="true">→</span></button></footer>
      </div>
      <div className="deployment-support" aria-label="Implementation configuration summary"><article><small>Human Review Gates</small><strong>3 approvals configured</strong></article><article><small>Systems Connected</small><strong>Email · ERP · Shared Drive</strong></article><article><small>Test Coverage</small><strong>Normal · Exception · Failure cases</strong></article></div>
    </div>
  </section>
}

function HumanControlSection() {
  const cards = [
    { num: '01', title: 'Gather the Evidence', desc: 'Collects documents, system data, emails and supporting records required for the task.' },
    { num: '02', title: 'Apply the Rules', desc: 'Checks completeness, matches records and applies your SOPs, thresholds and approval logic.' },
    { num: '03', title: 'Surface Exceptions', desc: 'Flags missing information, mismatches, policy deviations and cases that require judgement.' },
    { num: '04', title: 'Prepare the Decision', desc: 'Creates review-ready summaries, supporting context and recommended next actions.' },
    { num: '05', title: 'Route for Approval', desc: 'Sends the case to the appropriate finance owner with the relevant evidence attached.' },
    { num: '06', title: 'Keep Every Action Traceable', desc: 'Records checks, recommendations, approvals and workflow history for oversight and audit.' },
  ]
  return (
    <section className="human-control-section">
      <div className="human-control-inner">
        <span className="pia-pill">Human control by design</span>
        <h2>AI Handles the Preparation.<br />Finance Keeps the Authority.</h2>
        <p className="human-control-sub">Produc8ive takes on the repetitive work required to prepare, validate and coordinate finance processes. Your team retains control over every decision that affects the books, cash, compliance or business risk.</p>
        <div className="human-control-grid">
          {cards.map(({ num, title, desc }) => (
            <article key={num} className="human-control-card">
              <span className="card-num">{num}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function IntegrationsSection() {
  const logos = [
    { src: `${BASE}/acumatic.svg`, alt: 'Acumatica' },
    { src: `${BASE}/oracle.svg`, alt: 'Oracle' },
    { src: `${BASE}/quickbook.png`, alt: 'QuickBooks' },
    { src: `${BASE}/sap.svg`, alt: 'SAP' },
    { src: `${BASE}/tally.svg`, alt: 'Tally' },
    { src: `${BASE}/zoho2.png`, alt: 'Zoho' },
  ]
  return (
    <section className="integrations-section" id="Integration">
      <div className="integrations-inner">
        <div className="integrations-copy">

          <h2>Produc8ive works with the systems your finance team already uses.</h2>
          <p className="integrations-sub">Connect Produc8ive with 1,000+ applications across ERP, accounting, banking, email, document management and enterprise operations. Use prebuilt integrations where available or configure custom connections for your existing systems.</p>
        </div>
        <div className="integrations-grid">
          {logos.map(({ src, alt }) => (
            <div key={alt} className="integrations-logo-card">
              <img src={src} alt={alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductInActionSection() {
  const [playing, setPlaying] = useState(false)
  return (
    <section className="pia-section" id="productInAction">
      <div className="pia-header">
        <div className="pia-header-left">
          <span className="pia-pill">Produc8ive in action</span>
          <h2>Automate Routine AP Work. Keep Control of Every Exception.</h2>
        </div>
        <p className="pia-subtext">Produc8ive captures invoices, validates key details and routes only mismatches or missing information for review, so your finance team spends less time processing and more time resolving what matters.</p>
      </div>
      <div className="pia-video-wrap">
        {playing ? (
          <video
            className="pia-iframe"
            src={`${BASE}/Productive.mp4`}
            autoPlay
            controls
            playsInline
          />
        ) : (
          <button className="pia-thumb" onClick={() => setPlaying(true)} aria-label="Play Produc8ive demo video">
            <img
              className="pia-thumb-img"
              src={`${BASE}/thubnail1.png`}
              alt="Produc8ive demo thumbnail"
            />
            <span className="pia-play-btn" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            </span>

          </button>
        )}
      </div>
    </section>
  )
}

function LandingFooter() {
  const links = [
    { label: 'Agents', sub: 'Start With One Workflow. Scale Across Finance.', href: '#agents1' },
    { label: 'How it works?', sub: 'The Operating Flow Behind Every Agent', href: '#finance-brain-flow' },
    { label: 'Why Produc8ive?', sub: 'Built for the Work Between Your Systems', href: '#why-produc8ive' },
    { label: 'Autonomous AP', sub: 'Automate Routine AP Work. Keep Control of Every Exception.', href: '#productInAction' },
    { label: 'Integrations', sub: 'Produc8ive works with the systems your finance team already uses.', href: '#Integration' },
  ]
  return (
    <footer className="landing-footer">
      <div className="landing-footer-inner">
        <div className="landing-footer-brand">
          <span className="landing-footer-logo"><img src={`${BASE}/footer-logo.png`} alt="Produc8ive" style={{ height: '32px', width: 'auto', display: 'block' }} /></span>
          <p className="landing-footer-desc">Produc8ive turns your finance processes, institutional knowledge and enterprise data into governed AI workflows that help teams analyse, coordinate and execute work with greater speed and control.</p>
          <address className="landing-footer-address">
            Flat C-1301 Sr No 69 &amp; 70, Hill View Residency,<br />
            Kothrud, Pune, Pune City,<br />
            Maharashtra, India — 411038
          </address>
          <p className="landing-footer-entity">Produc8ive Solutions Private Limited</p>
        </div>
        <nav className="landing-footer-nav" aria-label="Footer navigation">
          <p className="landing-footer-nav-heading">Quick Links</p>
          <ul>
            {links.map(({ label, href }) => (
              <li key={label}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="landing-footer-bottom">
          <span>© {new Date().getFullYear()} Produc8ive Solutions Private Limited. All rights reserved.</span>
          <span>Built for teams that get work done.</span>
        </div>
      </div>
    </footer>
  )
}

function WorkflowCtaSection() {
  return (
    <section className="workflow-cta-section">
      <div className="workflow-cta-inner">
        <span className="pia-pill">Start with one workflow</span>
        <h2>Find the Finance Workflow Worth Automating First</h2>
        <p>Start with one repetitive, high-friction process. We will map how it works today, identify the manual Operations and show how Produc8ive can turn it into a controlled, repeatable workflow.</p>
        <a className="button primary workflow-cta-btn" href="#contact">Map One Finance Workflow <b aria-hidden="true">↗</b></a>
      </div>
    </section>
  )
}

function ClientsSection() {
  const clients = [
    { src: `${BASE}/Suma-Logo-BlackText.svg`, alt: 'Suma Shilp' },
    { src: `${BASE}/serum-logo.png`, alt: 'Serum Institute of India' },
    { src: `${BASE}/Kale-New-Logofo.png`, alt: 'Kalé' },
    { src: `${BASE}/globalview.png`, alt: 'Globeview Advisors LLP' },
  ]
  return (
    <section className="clients-section">

      <h2 className="clients-title"> Trusted by Teams Running Critical Operations </h2>
      <div className="clients-grid">
        {clients.map(({ src, alt }) => (
          <div key={alt} className="clients-logo-card">
            <img src={src} alt={alt} />
          </div>
        ))}
      </div>
    </section>
  )
}

function LeadershipSection() {
  const team = [
    {
      name: 'Ameya Kunte',
      role: 'Co-founder & Experienced Finance Professional',
      img: `${BASE}/ameya.jpg`,
      bio: 'Ameya Kunte is a Chartered Accountant, tax expert, and entrepreneur with over two decades of experience in restructuring advisory, corporate tax, and M&A. He is the Founder of Globeview Advisors LLP, a boutique consulting firm delivering tax-centric business advisory services to leading businesses and promoters. Previously with Ernst & Young and PwC, Ameya also co-founded Taxsutra, India\'s premier B2B tax news platform.',
      linkedin: 'https://www.linkedin.com/in/ameya-kunte-01606010/'
    },
    {
      name: 'Saurav Mishra',
      role: 'Co-Founder & AI Advocate',
      img: `${BASE}/Saurav.jpg`,
      bio: 'Saurav is a growth strategist and entrepreneur who enables T-Shaped Growth for businesses by combining deep expertise in marketing and sales with a broad understanding of HR, finance, operations, and supply chains. He helps organizations deploy AI-driven automation and scalable growth playbooks. Previously, he founded and scaled a 300+ member technology company, later acquired by a New York private equity firm.',
      linkedin: 'https://www.linkedin.com/in/saurav-mishra/'
    },
    {
      name: 'Sawan Jain',
      role: 'Co-Founder & Tech Arch',
      img: `${BASE}/sawan.jpg`,
      bio: 'Sawan is the Co-founder of Varseno with over 20 years of experience in enterprise software strategy, design, and delivery. He is passionate about solving complex problems through innovative and scalable technology solutions. Known for his pragmatic leadership style, Sawan brings together strategy, creativity, and execution to build high-performing teams and deliver meaningful business impact.',
      linkedin: 'https://www.linkedin.com/in/sawanjain/'
    },
    {
      name: 'Akash Hande',
      role: 'Co-Founder & Product',
      img: `${BASE}/akash.png`,
      bio: 'Akash Hande is the Co-founder and Product Manager at Produc8ive, where he drives the vision and execution of AI-powered products. With a strong focus on blending technology, automation, and business strategy, Akash specializes in building scalable solutions for finance, e-commerce, and sport domain. He thrives on turning complex workflows into simple, outcome-driven products.',
      linkedin: 'https://www.linkedin.com/in/akashhande/'
    },
    {
      name: 'Rishabh Bhandari',
      role: 'Domain Lead & CRM',
      img: `${BASE}/rishabh.png`,
      bio: 'Rishabh is a Chartered Accountant leading the domain strategy and client engagement at Produc8ive, bringing a finance practitioner’s perspective to enterprise AI. He works at the intersection of finance, business processes and AI, translating complex workflows and operational challenges into practical, scalable AI solutions. His focus is on driving measurable business outcomes while ensuring strong human oversight.',
      linkedin: 'https://www.linkedin.com/in/rishabh-bhandari-231906162'
    }
  ]

  return <section className="leadership-section" id="leadership">
    <header className="leadership-header">
      <p className="eyebrow">Leadership Team</p>
      <h2>The People Behind Produc8ive</h2>
    </header>
    <div className="leadership-grid">
      {team.map(({ name, role, img, bio, linkedin }) => (
        <article className="leader-card" key={name}>
          <div className="leader-img-wrap">
            <img src={img} alt={name} className="leader-img" />
          </div>
          <div className="leader-identity">
            <h3 className="leader-name">{name}</h3>
            <p className="leader-role">{role}</p>
            <a href={linkedin} className="leader-linkedin" aria-label={`${name} on LinkedIn`} target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn Profile
            </a>
          </div>
          <div className="leader-bio-col">
            <p className="leader-bio">{bio}</p>
          </div>
        </article>
      ))}
    </div>
  </section>
}


function ContactSection() {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const form = e.target
    try {
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.Name.value,
          email: form.email.value,
          phone: form.phone.value,
          message: form.message.value,
        }),
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return <section className="contact-section" id="contact">
    <div className="contact-intro">
      <p className="eyebrow">Start with one workflow</p>
      <h2>Let's map the work that should move faster.</h2>
      <p>Tell us where your finance team is spending time on repetitive preparation, reconciliation or follow-up. We'll start with the workflow, its controls and the people who need to stay in the loop.</p>
      <a href="mailto:smishra@produc8ive.com">smishra@produc8ive.com <span aria-hidden="true">&rarr;</span></a>
    </div>
    <form className="contact-form" onSubmit={handleSubmit}>
      <p>Contact details</p>
      <div className="contact-name-fields">
        <label>Name<input name="Name" autoComplete="given-name" required /></label>
      </div>
      <label>Work email<input name="email" type="email" autoComplete="email" required /></label>
      <label><div className="phone1">Phone <span>Optional</span></div><input name="phone" type="tel" autoComplete="tel" /></label>
      <label>What workflow should move faster?<textarea name="message" rows="5" required /></label>
      <button className="button primary" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : <>Send message <b aria-hidden="true">&rarr;</b></>}
      </button>
      {status === 'success' && <p style={{color: 'green', marginTop: '1rem'}}>Message sent. We'll be in touch soon.</p>}
      {status === 'error' && <p style={{color: 'red', marginTop: '1rem'}}>Something went wrong. Please try again or email us directly.</p>}
    </form>
  </section>
}

function FloatingNavbar() {
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    let previous = scrollY
    const update = () => {
      const current = scrollY
      setScrolled(current > 16)
      setVisible(current < 80 || current < previous)
      previous = current
    }
    addEventListener('scroll', update, { passive: true })
    return () => removeEventListener('scroll', update)
  }, [])
  return <header className={`floating-navbar ${visible ? 'nav-visible' : 'nav-hidden'} ${scrolled ? 'scrolled' : ''}`}><Link to="/" className="site-logo"><img src={`${BASE}/logo_hero.png`} alt="Produc8ive" style={{ height: '32px', width: 'auto', display: 'block' }} /></Link><nav aria-label="Primary"><a href="#finance-brain-flow">How it works?</a><a href="#proof">Outcomes</a><a href="#agents1">Agents</a><a href="#productInAction">Autonomous AP</a><a href="#Integration">Integrations</a></nav><a className="nav-action" href="#contact">Map One Finance Workflow <span aria-hidden="true">↗</span></a></header>
}

function stripBase(pathname) {
  if (pathname.startsWith(BASE)) return pathname.slice(BASE.length) || '/'
  return pathname
}

const pages = { '/brand': Overview, '/logo': Logo, '/colors': Colors, '/typography': Typography, '/actions': Actions, '/surfaces': Surfaces, '/patterns': Patterns, '/tokens': Tokens, '/components': SectionLibrary }
function App() {
  const [path, setPath] = useState(() => stripBase(decodeURIComponent(location.pathname)))
  useEffect(() => {
    const update = () => setPath(stripBase(decodeURIComponent(location.pathname)))
    addEventListener('popstate', update)
    return () => removeEventListener('popstate', update)
  }, [])
  if (path === '/') return <LandingPageOne />
  if (path === '/brand-home') return <HomeHero />
  const Page = pages[path] || Overview
  return <Shell path={pages[path] ? path : '/brand'}><Page /></Shell>
}

createRoot(document.getElementById('root')).render(<App />)
