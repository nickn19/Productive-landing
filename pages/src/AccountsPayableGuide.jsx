import { useEffect, useState } from 'react'
import FinanceBrainTimeline from './FinanceBrainTimeline'
import dashboardImage from '../hero.png'

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

const metrics = [
  ['14%', 'industry invoice exception rate'],
  ['9.2 days', 'average invoice cycle time'],
  ['32.6%', 'of B2B invoices processed touch-free'],
  ['21.8%', 'of AP staff time spent on supplier queries']
]

const principles = [
  ['Consolidate invoice intake', 'Invoices may arrive through email, portals, shared folders, scans or internal forwards. A central intake layer makes classification, tracking and validation easier.'],
  ['Use structured identifiers for vendor matching', 'In India, GSTIN can provide a stronger matching signal than vendor name alone, particularly where naming conventions vary across invoices and systems.'],
  ['Measure exception rates separately from invoice volumes', 'Two AP teams processing the same number of invoices can have very different workloads if their exception rates differ materially.'],
  ['Document accounting and approval rules', 'A tolerance nobody wrote down cannot be automated, delegated, audited, or handed to a successor.'],
  ['Capture evidence during processing', 'Scrutiny response windows run to days. Evidence assembled later is evidence assembled too late.']
]

const modelRows = [
  ['Finance reviews most invoices', 'Finance focuses primarily on exceptions'],
  ['Reconciliation concentrated near month-end', 'Validation occurs throughout the month'],
  ['Supporting evidence gathered later', 'Evidence captured during processing'],
  ['Approval delays found reactively', 'Ageing and bottlenecks monitored continuously'],
  ['Coding relies heavily on individual memory', 'Rules and mappings are documented and applied consistently']
]

const judgmentRows = [
  ['Invoice capture and classification', 'Unusual accounting classifications'],
  ['Field validation', 'Complex cost allocations'],
  ['Duplicate checks', 'Ambiguous tax positions'],
  ['PO/GRN matching', 'Vendor master changes with financial impact'],
  ['Approval routing', 'Final approval of sensitive transactions'],
  ['Draft ERP entry preparation', 'Overrides and policy exceptions']
]

const apStages = [
  ['1', 'Invoice intake', 'Monitor email inboxes, portals and shared folders.'],
  ['2', 'Document classification', 'Identify invoices, credit notes, supporting documents and PO-related records.'],
  ['3', 'Data extraction', 'Capture invoice number, date, vendor, GSTIN, line items, tax values, HSN/SAC and payment terms.'],
  ['4', 'Vendor and master-data matching', 'Map the invoice against vendor masters, entities, locations and currencies.'],
  ['5', 'Accounting recommendations', 'Suggest GL codes, cost centres, projects and other accounting dimensions.'],
  ['6', 'Validation', 'Check mandatory fields, tax logic, duplicates and policy thresholds.'],
  ['7', 'PO/GRN matching', 'Compare invoice details against purchase orders and receipts.'],
  ['8', 'Exception management', 'Escalate invoices that fall outside defined rules.'],
  ['9', 'Approval routing', 'Send transactions to the correct approver based on company policy.'],
  ['10', 'ERP preparation/posting', 'Prepare a draft transaction for review or post based on the organisation’s control design.']
]

const demoStages = [
  ['Intake', 'Four channels arriving in one reviewable queue.'],
  ['Validation', 'Fields checked, tolerances applied, low-confidence values flagged, not filled.'],
  ['Exception', 'A vendor mismatch surfaced with the supporting evidence attached.'],
  ['Approval', 'Routed to the right owner, with everything they need to decide.'],
  ['Draft entry', 'Prepared in your ERP. Held until a person confirms it.']
]

const workflowSteps = [
  ['Gather the evidence', 'Collects documents, system data, emails and supporting records for the task.'],
  ['Apply your rules', 'Checks completeness, matches records, applies your SOPs, thresholds and approval logic.'],
  ['Surface exceptions', 'Flags missing information, mismatches, policy deviations and anything requiring judgment.'],
  ['Prepare the decision', 'Creates a review-ready summary with supporting context and a recommended next action.'],
  ['Route for approval', 'Sends the case to the right finance owner with the evidence attached.'],
  ['Keep it traceable', 'Records every check, recommendation, approval and change for oversight and audit.']
]

const baselines = [
  ['Understand the Current Workflow', 'Map how invoices move from receipt to payment — including intake, data entry, PO matching, accounting and tax coding, approvals, exceptions and ERP entry.'],
  ['Measure the Workload', 'Track invoice volumes, manual touchpoints, exception rates and manual coding. Volume alone does not determine workload — exception-heavy processes require significantly more human effort.'],
  ['Measure Processing Performance', 'Establish current invoice cycle time, approval ageing, touchless processing rate, cost per invoice and duplicate rate. These become the reference points for measuring improvement.'],
  ['Separate Rules from Judgment', 'Identify activities that follow defined rules — extraction, matching, validation and routing — separately from those requiring accounting, tax, commercial or approval judgment.']
]

const problems = [
  ['Duplicate invoices', 'AI can combine invoice number, vendor, date, amount and similarity checks to identify possible duplicates.'],
  ['Vendor identification', 'Structured identifiers such as GSTIN can help reconcile naming variations.'],
  ['MSME payment timelines', 'Systems can track ageing against configured payment obligations and flag approaching deadlines.'],
  ['Missing HSN/SAC information', 'Invoices with missing classifications can be identified before downstream processing.'],
  ['Approval delays', 'Ageing dashboards can show invoices waiting with specific owners.']
]

const faqs = [
  ['Does financial data leave the organisation’s environment?', <><p>That depends on the solution’s deployment architecture. Finance teams should understand where documents are processed, where data is stored, whether external AI models receive any information, how long data is retained, and who can access it.</p><p>For sensitive financial data, these questions should be addressed before implementation rather than after deployment.</p><p className="ap-faq-flag">Deployment architecture must be documented before this question can be answered for a specific implementation.</p></>],
  ['Is AI-powered AP automation just OCR?', <><p>No. OCR primarily converts information in documents into machine-readable data.</p><p>AI-enabled AP can extend beyond extraction to vendor identification, master-data matching, duplicate detection, PO and receipt matching, accounting recommendations, validation, exception identification, approval routing and preparation of ERP entries.</p><p>The distinction is between reading an invoice and using the information on that invoice to support the AP process.</p></>],
  ['What happens when the AI is not confident?', <><p>A well-designed AP workflow should not treat every AI output as equally reliable. Confidence thresholds can identify uncertain fields or transactions and route them for human review.</p><p>Examples include an unclear invoice number, an unidentified vendor, an unusual tax treatment or an unexpected difference against a purchase order. The objective is not to eliminate uncertainty, but to identify and manage it explicitly.</p></>],
  ['Can AI work with the existing ERP?', <><p>It depends on the ERP, its version, available APIs or import mechanisms, and the activities being automated.</p><p>Integration may range from preparing structured import files to reading master data, validating transactions or creating draft entries directly in the ERP. Define precisely what information the AI needs to read and what actions it should be permitted to perform.</p></>],
  ['What about scanned, poorly formatted or handwritten invoices?', <><p>Document quality directly affects extraction reliability. Clear digital invoices are generally easier to process than low-resolution scans, handwritten documents or invoices with inconsistent layouts.</p><p>These documents do not necessarily prevent automation, but they may require lower confidence thresholds and greater human review. Testing should include real-world documents and difficult edge cases, not only clean sample invoices.</p></>],
  ['How long does AP automation take to implement?', <><p>There is no universal implementation timeline. Complexity depends on the number of invoice sources, ERP environment, master-data quality, documented business rules, PO and non-PO workflows, approval structures, exceptions, integration requirements, and security and deployment architecture.</p><p>A limited workflow with clear rules will generally be easier to automate than an AP process with multiple entities, undocumented exceptions and inconsistent master data.</p></>],
  ['Will AI reduce the number of people required in AP?', <><p>Not necessarily. The more immediate impact is usually a change in what AP teams spend their time doing.</p><p>Human effort can shift from downloading invoices, entering data and following up on approvals towards exception management, vendor issues, accounting judgment, controls, analysis and process improvement.</p><p>The useful question is not only how many invoices AI can process, but how much manual intervention remains per invoice.</p></>]
]

const problemIcons = {
  'Duplicate invoices': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v10H7z" /><path d="M4 4h10v10H4z" /><path d="M11 11h9v9h-9" /></svg>,
  'Vendor identification': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19V8.5L12 4l8 4.5V19" /><path d="M8 12h8M8 16h8" /><path d="M12 4v15" /></svg>,
  'MSME payment timelines': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 18V8M12 18V4M19 18v-7" /><path d="M3 18h18" /></svg>,
  'Missing HSN/SAC information': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 3h8l5 5v13H7z" /><path d="M15 3v5h5M10 13h6M10 17h6" /><path d="M8 9h1" /></svg>,
  'Approval delays': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M8 9h8M8 13h5" /><path d="M15 18v3M9 18v3" /></svg>
}

function ProblemVisual({ title, index, total }) {
  const isDashboardCard = index >= total - 2

  if (isDashboardCard) {
    return <div className="problem-dashboard-shot" aria-hidden="true"><img src={dashboardImage} alt="Accounts payable dashboard showing exceptions and approval health" /></div>
  }

  return <div className="control-review" aria-hidden="true"><span><i className="problem-icon">{problemIcons[title]}</i><small>AP issue</small><b>{title}</b></span><button tabIndex="-1">Review</button></div>
}

function GuideNav() {
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    let previous = scrollY
    const update = () => { const current = scrollY; setScrolled(current > 16); setVisible(current < 80 || current < previous); previous = current }
    addEventListener('scroll', update, { passive: true })
    return () => removeEventListener('scroll', update)
  }, [])
  return <header className={`floating-navbar ${visible ? 'nav-visible' : 'nav-hidden'} ${scrolled ? 'scrolled' : ''}`}><a href={`${BASE}/`} className="site-logo"><img src={`${BASE}/logo_hero.png`} alt="Produc8ive"  /></a><nav aria-label="Guide navigation"><a href="#the-shift">The shift</a><a href="#where-ai-fits">Where AI fits</a><a href="#workflow">Workflow</a><a href="#questions">Questions</a></nav><a className="nav-action" href="#start">Start with your workflow <span aria-hidden="true">↗</span></a></header>
}

function PrincipleIcon({ name }) {
  const paths = {
    intake: <><path d="M4 8h16v11H4z" /><path d="M4 13h4l2 3h4l2-3h4M8 5h8" /></>,
    match: <><path d="M4 7.5 11 4l9 4.5-9 4.5zM4 13.5 11 17l9-4.5M4 17.5 11 21l9-4.5" /></>,
    measure: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
    rules: <><path d="M7 3h8l3 3v15H7z" /><path d="M15 3v4h4M10 12h5M10 16h5" /></>,
    evidence: <><path d="m12 3 7 3v5c0 4.6-3 7.8-7 10-4-2.2-7-5.4-7-10V6z" /><path d="m9 12 2 2 4-4" /></>
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function GuideFooter() {
  const links = [['The shift', '#the-shift'], ['Operating principles', '#ap-lifecycle'], ['Where AI fits', '#where-ai-fits'], ['Workflow', '#workflow'], ['Questions', '#questions'], ['Start here', '#start']]
  return <footer className="landing-footer"><div className="landing-footer-inner"><div className="landing-footer-brand"><span className="landing-footer-logo"><img src={`${BASE}/footer-logo.png`} alt="Produc8ive" style={{ height: '32px', width: 'auto', display: 'block' }} /></span><p className="landing-footer-desc">Produc8ive turns finance processes, institutional knowledge and enterprise data into governed AI workflows that help teams analyse, coordinate and execute work with greater speed and control.</p><p className="landing-footer-entity">Produc8ive Solutions Private Limited</p></div><nav className="landing-footer-nav" aria-label="Guide footer navigation"><p className="landing-footer-nav-heading">In this guide</p><ul>{links.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ul></nav><div className="landing-footer-bottom"><span>© {new Date().getFullYear()} Produc8ive Solutions Private Limited. All rights reserved.</span><span>Built for teams that get work done.</span></div></div></footer>
}

export default function AccountsPayableGuide() {
  const [activeDemo, setActiveDemo] = useState(0)
  const [playingDemo, setPlayingDemo] = useState(false)
  return <div className="landing-one ap-guide">
    <GuideNav />
    <main>
      <section className="tabbed-hero landing-hero-redesign ap-guide-hero">
        <p className="ap-hero-eyebrow">A practical guide to AI in Accounts Payable</p>
        <h1>How AI is changing<br /><em>Accounts Payable operations</em></h1>
        <p className="landing-lead">This guide examines where AI can be applied across the AP lifecycle—from invoice intake and validation to exception handling, approvals and ERP posting.</p>
        <div className="landing-actions"><a className="button primary" href="#workflow">Explore the workflow <b aria-hidden="true">→</b></a></div>
      </section>

      <section className="ap-metric-strip" aria-labelledby="ap-snapshot">
        <p className="ap-metric-label" id="ap-snapshot">A snapshot of Accounts Payable performance</p>
        <div className="ap-metric-grid">{metrics.map(([number, label]) => <article key={label}><strong>{number}</strong><p>{label}</p></article>)}</div>
        <p className="ap-metric-source">Source: Ardent Partners, <i>AP Metrics That Matter 2025</i>. Predominantly Western samples — use them as direction, not as your target.</p>
        <p className="ap-metric-note">These benchmarks provide directional context. AP performance varies materially by invoice volume, process design, ERP environment, geography and level of automation.</p>
      </section>

      <section className="finance-shift" id="the-shift">
        <div className="finance-shift-copy"><p className="eyebrow">The shift</p><h2>Why Accounts Payable is becoming more control-intensive</h2>
        <div className="ap-shift-beats">
          <div><h3>The situation</h3><p>Invoices arrive at four addresses. Sometimes five. One vendor, three spellings, two entities. Someone keys the same figures into a sheet, then the ERP, then a payment file.</p><p>As month-end approaches, unresolved invoices, mismatches and approval delays accumulate into a concentrated reconciliation workload.</p></div>
          <div className="ap-misnomer"><p className="ap-misnomer-label">The misnomer</p><blockquote>“We have an AP inbox, so intake is handled.”</blockquote><p>A shared inbox centralises invoice receipt, but does not by itself classify, validate, route or track invoices.</p></div>
          <div><h3>The shift</h3><p>Indian tax compliance moved from report and correct to verify before filing.</p><p>Outward liability in GSTR-3B stopped being editable. IMS decides what reaches your GSTR-2B — and taking no action counts as acceptance.</p></div>
          <p className="ap-stakes">The direction of Indian tax administration increasingly requires finance teams to validate transaction data earlier in the reporting cycle rather than relying primarily on month-end correction.</p>
        </div></div>
        <div className="shift-visual" aria-label="Accounts Payable control workflow">
          <header><span>Accounts Payable</span><b><i></i> In review</b></header>
          <div className="workflow-summary"><small>CONTROL POSITION</small><strong>Validate earlier</strong><span>Keep exceptions visible throughout the month</span></div>
          <div className="workflow-path" aria-hidden="true"><span>Intake</span><i>→</i><span>Validate</span><i>→</i><span>Review</span></div>
          <div className="exception-card"><span><small>EXCEPTION</small><strong>Vendor mismatch</strong></span><b>Needs judgment</b></div>
          <footer><span>Routine checks <b>47</b></span><span>For review <b>03</b></span></footer>
        </div>
      </section>

      <section className="why-produc8ive ap-principles">
        <header className="why-header"><div><p className="why-pill">Operating principles</p><p className="ap-reframe">The old approach was to process faster. The new one is to prepare better.</p><h2>Five rules that separate a controlled AP from a crowded one.</h2></div><p>These are product-agnostic. They hold whether or not you ever talk to us.</p></header>
        <div className="why-grid">{principles.map(([title, description], index) => <article className="why-card" key={title}><span className="ap-principle-icon"><PrincipleIcon name={['intake', 'match', 'measure', 'rules', 'evidence'][index]} /></span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>

      <section className="section ap-operating-model">
        <p className="eyebrow">A mature operating model</p><h2>What the twentieth of the month looks like afterwards.</h2>
        <div className="ap-model-story"><p>It is the 18th. The GSTR-2B reconciliation is already done, because it has been running all month.</p><p>Your controller opens a queue of nine items. Not nine hundred. Two vendor mismatches. One missing HSN. One MSME payment at day 41.</p><p>She resolves them before lunch.</p><p>The close does not have a backlog waiting for it. The audit file is already the audit file.</p></div>
        <div className="ap-model-layout"><div className="ap-compare"><div className="ap-compare-head"><span>Traditional operating model</span><span>More automated operating model</span></div>{modelRows.map(([before, after]) => <div className="ap-compare-row" key={before}><p>{before}</p><p>{after}</p></div>)}</div></div>
        <p className="ap-turn">This is not a future state. It is what a well-designed AP function already looks like.</p>
      </section>

      <section className="why-produc8ive" id="where-ai-fits">
        <header className="why-header"><div><p className="why-pill">Automation and judgment</p><h2>Where AI can automate—and where human judgment remains important</h2></div><p>Use automation to prepare, validate and route. Reserve material decisions, overrides and ambiguous cases for finance professionals.</p></header>
        <div className="ap-judgment-table"><div className="ap-judgment-head"><span>Suitable for automation</span><span>Usually requires human judgment</span></div>{judgmentRows.map(([automation, judgment]) => <div className="ap-judgment-row" key={automation}><p>{automation}</p><p>{judgment}</p></div>)}</div>
      </section>

      <section className="use-cases-section" id="ap-lifecycle">
        <div className="agent-scroll" aria-label="Accounts Payable workflow stages"><div className="agent-track">{[...apStages, ...apStages].map(([number, title, description], index) => <article key={`${number}-${index}`} aria-hidden={index >= apStages.length ? 'true' : undefined}><span>{number.padStart(2, '0')}</span><div><h3>{title}</h3><p>{description}</p></div><i aria-hidden="true">↗</i></article>)}</div></div>
        <div className="use-cases-copy"><p className="eyebrow">The AP lifecycle</p><h2>Where AI can be used across Accounts Payable</h2><p className="use-cases-intro">From first receipt to a posting-ready entry, automation can prepare the repetitive work while people retain control of exceptions and decisions.</p><a className="button secondary" href="#workflow">See the workflow <b aria-hidden="true">↗</b></a></div>
      </section>

      <section className="pia-section ap-see-section" id="productInAction">
        <div className="pia-header"><div className="pia-header-left"><span className="pia-pill">See it in action</span><h2>Example: how an AI-assisted invoice moves through Accounts Payable</h2></div><p className="pia-subtext">Three minutes, one real AP invoice, start to posting-ready.</p></div>
        <div className="ap-tab-bar" role="tablist" aria-label="AP workflow example">{demoStages.map(([title], index) => <button type="button" key={title} className={activeDemo === index ? 'active' : ''} onClick={() => setActiveDemo(index)} role="tab" aria-selected={activeDemo === index}>{title}</button>)}</div>
        <figure className="ap-tab-panel">
          <div className="pia-video-wrap">
            {playingDemo ? <video className="pia-iframe" src={`${BASE}/Productive.mp4`} autoPlay controls playsInline /> : <button className="pia-thumb" type="button" onClick={() => setPlayingDemo(true)} aria-label="Play Accounts Payable workflow demo"><img className="pia-thumb-img" src={`${BASE}/thubnail1.png`} alt="Preview of the Accounts Payable workflow demo" /><span className="pia-play-btn" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span></button>}
          </div>
          <figcaption>{demoStages[activeDemo][0]} — {demoStages[activeDemo][1]}</figcaption>
        </figure>
      </section>

      <section className="finance-brain-flow" id="workflow"><header><p className="flow-pill">How a typical AI-assisted AP workflow works</p><h2>Six steps, and a person decides at the end.</h2></header><FinanceBrainTimeline stages={workflowSteps.map(([title, description], index) => [["capture", "validate", "coordinate", "deliver", "coordinate", "deliver"][index], `Step ${index + 1}`, title, description])} /><p className="ap-workflow-note">The precise workflow varies by organisation, but most AI-assisted AP processes follow some variation of these stages.</p></section>

      <section className="implementation-journey ap-baseline-section"><div className="implementation-copy"><p className="implementation-pill">Before implementation</p><h2>Measure your AP process before introducing AI automation.</h2><p className="implementation-intro">Establish the baseline before asking automation to improve it.</p><div className="implementation-principles ap-baseline-areas">{baselines.map(([title, description], index) => <article key={title}><i>{String(index + 1).padStart(2, '0')}</i><div><h3>{title}</h3><p>{description}</p></div></article>)}</div><div className="ap-key-insight"><p className="eyebrow">Key insight</p><p>The objective is not to automate every invoice. It is to reduce repetitive intervention while preserving human judgment where it matters.</p></div><p className="ap-baseline-line">Without a baseline, AP may feel faster after automation — but it is difficult to establish what actually improved.</p></div><div className="deployment-stage"><div className="deployment-workspace"><header><div><small>AP BASELINE / REVIEW</small><h3>Implementation readiness</h3></div><span>Start with the facts</span></header><div className="deployment-checklist">{[['complete', 'Workflow map', 'Captured', 'Invoice intake through payment documented.'], ['complete', 'Baseline metrics', 'Measured', 'Cycle time, exceptions and touchpoints recorded.'], ['progress', 'Rules and judgment', 'In review', 'Policies, tolerances and approval logic separated.'], ['pending', 'Pilot scope', 'Next', 'One bounded workflow selected.']].map(([state, title, status, description]) => <article className={state} key={title}><i aria-hidden="true">{state === 'complete' ? '✓' : state === 'progress' ? '◒' : '·'}</i><div><h4>{title}</h4><p>{description}</p></div><b>{status}</b></article>)}</div><footer><div className="readiness-copy"><span>Readiness</span><strong>01</strong><i><b></b></i></div><button type="button">Review the baseline <span aria-hidden="true">→</span></button></footer></div><div className="deployment-support"><article><small>Process clarity</small><strong>Documented workflow</strong></article><article><small>Control design</small><strong>Human review gates</strong></article><article><small>Measurement</small><strong>Reference metrics</strong></article></div></div></section>

      <section className="why-produc8ive common-problems"><header className="why-header"><div><p className="why-pill">Common problems</p><h2>Common AP problems where automation can help</h2></div><p>Each in the buyer’s words.</p></header><div className="why-grid">{problems.map(([title, description], index) => <article className="why-card problem-card" key={title}><span className="ap-principle-num">0{index + 1}</span><h3>{title}</h3><p>{description}</p><div className="why-visual"><ProblemVisual title={title} index={index} total={problems.length} /></div></article>)}</div></section>

      <section className="ap-faq-section" id="questions"><header><p className="eyebrow">Questions we get asked</p><h2>Common questions about AI in Accounts Payable</h2></header><div className="accordion ap-faq-accordion">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<b>+</b></summary><div className="ap-faq-answer">{answer}</div></details>)}</div></section>

      <section className="ap-limits-section"><div><p className="eyebrow">When AI may not be the right starting point</p><h2>Start with process clarity, not an automation mandate.</h2><p className="ap-limits-intro">AI may deliver limited value where:</p><div className="ap-limits-block"><ul><li>invoice volumes are very low;</li><li>processes are highly inconsistent;</li><li>vendor masters are poorly maintained;</li><li>approval rules are undocumented;</li><li>ERP workflows change frequently;</li><li>most invoices require genuine commercial judgment; or</li><li>the organisation has not defined responsibility for exceptions.</li></ul></div><p className="ap-key-insight"><span className="eyebrow">Key point</span><br />Automation tends to amplify process design. A poorly defined AP process does not become well controlled simply because AI is added to it.</p></div><div><p className="eyebrow">How to pilot AI in Accounts Payable</p><ol className="ap-pilot-steps">{[['Choose one bounded workflow', 'Avoid automating the entire AP function initially.'], ['Establish baseline metrics', 'Measure current cycle time, exceptions and manual effort.'], ['Document rules', 'Capture mappings, tolerances, approvals and exception policies.'], ['Test normal cases', 'Confirm routine invoices are handled correctly.'], ['Test edge cases', 'Missing PO, duplicate invoice, incorrect GSTIN, unusual tax treatment, and similar cases.'], ['Test failure cases', 'Poor scans, incomplete documents and inconsistent vendor information.'], ['Keep human approval initially', 'Move toward greater automation only after reliability is demonstrated.']].map(([title, description], index) => <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol></div></section>

      <section className="workflow-cta-section" id="start"><div className="workflow-cta-inner"><span className="pia-pill">A useful question to start with</span><h2>Which parts of your AP process require judgment—and which exist only because someone has always done them manually?</h2><p>Mapping that distinction is usually the first step toward identifying where automation can create value.</p><a className="button primary workflow-cta-btn" href={`${BASE}/#contact`}>Map one finance workflow <b aria-hidden="true">↗</b></a></div></section>
      <GuideFooter />
    </main>
  </div>
}
