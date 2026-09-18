import { useEffect, useState } from 'react'
import dashboardImage from '../hero.png'

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

const metrics = [
  ['14%', 'industry invoice exception rate'],
  ['9.2 days', 'average invoice cycle time'],
  ['32.6%', 'of B2B invoices processed touch-free'],
  ['21.8%', 'of AP staff time spent on supplier queries']
]

const principles = [
  ['Capture invoices through a defined process', 'Invoices may arrive through email, shared folders or other channels. Whatever the source, they should enter a defined processing workflow rather than remain scattered across individual inboxes.'],
  ['Validate before you post', 'Vendor details, duplicate invoices, required invoice fields and applicable internal checks should be completed before an invoice is posted into the ERP.'],
  ['Let routine invoices move. Stop the exceptions.', 'Not every invoice needs the same level of attention. Transactions that meet predefined rules can move forward, while exceptions should be held with a clear reason for review.'],
  ['Keep approvals within the process', 'Approval status should be visible within the workflow instead of being reconstructed through email chains and manual follow-ups.'],
  ['Maintain a clear audit trail', 'Your team should be able to see what was checked, what failed, who approved the invoice and what ultimately reached the ERP.']
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

function IntakeVisual() {
  return (
    <div className="ap-visual-intake">
      <div className="ap-intake-sources">
        <span className="ap-source-pill" title="Email"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></span>
        <span className="ap-source-pill" title="Document"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></span>
        <span className="ap-source-pill" title="Scan / OCR"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="3"/></svg></span>
        <span className="ap-source-pill" title="Cloud"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg></span>
      </div>
      <svg className="ap-intake-lines" viewBox="0 0 40 70" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3">
        <path d="M0 10 C 25 10, 20 35, 40 35" />
        <path d="M0 26 C 20 26, 20 35, 40 35" />
        <path d="M0 44 C 20 44, 20 35, 40 35" />
        <path d="M0 60 C 25 60, 20 35, 40 35" />
      </svg>
      <div className="ap-invoice-doc">
        <div className="ap-doc-header"><span>INVOICE</span></div>
        <div className="ap-doc-line w-80"></div>
        <div className="ap-doc-line w-60"></div>
        <div className="ap-doc-line w-70"></div>
        <div className="ap-doc-line w-40 highlight"></div>
      </div>
    </div>
  )
}

function VendorCheckVisual() {
  return (
    <div className="ap-visual-vendor">
      <div className="ap-vendor-window">
        <div className="ap-win-dots"><span></span><span></span><span></span></div>
        <div className="ap-win-content">
          <div className="ap-vendor-avatar-wrap">
            <span className="ap-avatar-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
            <span className="ap-check-badge"><svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg></span>
          </div>
          <div className="ap-vendor-rows">
            <span className="ap-row-bar w-75"></span>
            <span className="ap-row-bar w-50"></span>
            <span className="ap-row-bar w-60"></span>
          </div>
        </div>
      </div>
      <div className="ap-floating-glass">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>
      </div>
    </div>
  )
}

function ValidationVisual() {
  return (
    <div className="ap-visual-validation">
      <div className="ap-val-card">
        <div className="ap-val-item"><span className="ap-val-check"><svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg></span><span className="ap-val-line w-60"></span></div>
        <div className="ap-val-item"><span className="ap-val-check"><svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg></span><span className="ap-val-line w-75"></span></div>
        <div className="ap-val-item"><span className="ap-val-check"><svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg></span><span className="ap-val-line w-50"></span></div>
        <div className="ap-val-item"><span className="ap-val-check"><svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg></span><span className="ap-val-line w-65"></span></div>
      </div>
      <div className="ap-floating-shield">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
      </div>
    </div>
  )
}

function ApprovalVisual() {
  return (
    <div className="ap-visual-approval">
      <div className="ap-approval-card">
        <div className="ap-appr-header">
          <div className="ap-appr-avatar">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span className="ap-check-badge"><svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg></span>
          </div>
        </div>
        <div className="ap-appr-lines">
          <div className="ap-appr-line-item"><span className="ap-appr-chk"><svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg></span><span className="ap-val-line w-75"></span></div>
          <div className="ap-appr-line-item"><span className="ap-appr-chk"><svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg></span><span className="ap-val-line w-60"></span></div>
          <div className="ap-appr-line-item"><span className="ap-appr-chk"><svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg></span><span className="ap-val-line w-45"></span></div>
        </div>
      </div>
    </div>
  )
}

function ErpPostingVisual() {
  return (
    <div className="ap-visual-erp">
      <div className="ap-erp-card">
        <div className="ap-erp-logos">
          <span className="ap-erp-badge ap-erp-tally">Tally</span>
          <span className="ap-erp-badge ap-erp-sap">SAP</span>
        </div>
        <div className="ap-erp-other-pill">+ Other ERP</div>
      </div>
    </div>
  )
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
        <div className="finance-shift-copy"><p className="eyebrow">The shift</p><h2>AP automation is moving beyond invoice data entry</h2>
        <div className="ap-shift-beats">
          <div><h3>The situation</h3><p>Invoices arrive at four addresses. Sometimes five. One vendor, three spellings, two entities. Someone keys the same figures into a sheet, then the ERP, then a payment file.</p><p>As month-end approaches, unresolved invoices, mismatches and approval delays accumulate into a concentrated reconciliation workload.</p></div>
          <div className="ap-misnomer"><p className="ap-misnomer-label">The misnomer</p><blockquote>“We have an AP inbox, so intake is handled.”</blockquote><p>A shared inbox centralises invoice receipt, but does not by itself classify, validate, route or track invoices.</p></div>
          <div><h3>The shift</h3><p>Indian tax compliance moved from report and correct to verify before filing.</p><p>Outward liability in GSTR-3B stopped being editable. IMS decides what reaches your GSTR-2B — and taking no action counts as acceptance.</p></div>
          <p className="ap-stakes">The objective is simple: your team should spend less time processing routine invoices and more time dealing with the transactions that actually need their attention.</p>
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
        <header className="why-header"><div><p className="why-pill">Operating principles</p><p className="ap-reframe">The old approach was to process faster. The new one is to prepare better.</p><h2>What does a well-controlled AP process look like?</h2></div><p>These are product-agnostic. They hold whether or not you ever talk to us.</p></header>
        <div className="why-grid">{principles.map(([title, description], index) => <article className="why-card" key={title}><span className="ap-principle-icon"><PrincipleIcon name={['intake', 'match', 'measure', 'rules', 'evidence'][index]} /></span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>

      <section className="section ap-operating-model">
        <p className="eyebrow">A mature operating model</p><h2>What can the AP workflow look like?</h2>
        <div className="ap-model-story"><p>Not every invoice needs to follow the same path.</p><p>A valid invoice from an existing vendor may move through predefined checks and approvals with limited intervention.</p><p>If there is a duplicate, vendor mismatch, missing information or another exception, the invoice should stop and reach the appropriate person with a clear reason for review.</p><p>The table remains</p></div>
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

      <section className="ap-flow-section" id="workflow">
        <header className="ap-flow-header">
          <p className="flow-pill">AP Workflow</p>
          <h2>A practical AP automation workflow</h2>
          <p className="ap-flow-subtext">How an AI-assisted AP workflow moves from invoice intake to ERP posting—with exception governance and human oversight built in.</p>
        </header>

        <div className="ap-flow-canvas">
          <div className="ap-unified-flow-grid">
            {/* ── STEP 1 ── */}
            <div className="ap-grid-node node-step-1">
              <div className="ap-flow-visual-card">
                <IntakeVisual />
              </div>
              <div className="ap-flow-step-meta">
                <span className="ap-flow-step-num">1</span>
                <h3>Invoice intake</h3>
                <p>The invoice enters through the designated channel and is captured for processing.</p>
              </div>
            </div>

            {/* Connector 1 -> 2 */}
            <div className="ap-grid-connector conn-1-2" aria-hidden="true">
              <span className="ap-connector-wire"></span>
              <span className="ap-connector-circle">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </div>

            {/* ── STEP 2 ── */}
            <div className="ap-grid-node node-step-2">
              <div className="ap-flow-visual-card">
                <VendorCheckVisual />
              </div>
              <div className="ap-flow-step-meta">
                <span className="ap-flow-step-num">2</span>
                <h3>Vendor and duplicate checks</h3>
                <p>The vendor is matched against the vendor master and the invoice is checked for potential duplicates.</p>
              </div>
            </div>

            {/* Connector 2 -> 3 */}
            <div className="ap-grid-connector conn-2-3" aria-hidden="true">
              <span className="ap-connector-wire"></span>
              <span className="ap-connector-circle">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </div>

            {/* ── STEP 3 ── */}
            <div className="ap-grid-node node-step-3">
              <div className="ap-flow-visual-card">
                <ValidationVisual />
              </div>
              <div className="ap-flow-step-meta">
                <span className="ap-flow-step-num">3</span>
                <h3>Validation</h3>
                <p>Required invoice fields, internal rules and applicable compliance checks are applied before the invoice proceeds.</p>
              </div>
            </div>

            {/* ── STEP 4 (Exception Handling Branch) ── */}
            <div className="ap-grid-node node-step-4">
              {/* Branch In: If something doesn't match */}
              <div className="ap-branch-mismatch-header">
                <div className="ap-mismatch-stem"></div>
                <span className="ap-branch-pill ap-pill-mismatch">If something doesn’t match</span>
                <div className="ap-mismatch-arrow">
                  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M8 2v10M3 8l5 5 5-5"/></svg>
                </div>
              </div>

              <div className="ap-exception-composite-box">
                {/* 3 Action Badges */}
                <div className="ap-exception-actions">
                  <span className="ap-action-badge">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    Assign
                  </span>
                  <span className="ap-action-badge">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
                    Reason
                  </span>
                  <span className="ap-action-badge">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    Resolve
                  </span>
                </div>

                {/* 3-way dotted fan */}
                <svg className="ap-action-fan-svg" viewBox="0 0 28 68" fill="none" aria-hidden="true">
                  <path d="M0 12 C 18 12, 14 34, 28 34" stroke="var(--signal-500)" strokeWidth="1.3" strokeDasharray="3 3" />
                  <path d="M0 34 L 28 34" stroke="var(--signal-500)" strokeWidth="1.3" strokeDasharray="3 3" />
                  <path d="M0 56 C 18 56, 14 34, 28 34" stroke="var(--signal-500)" strokeWidth="1.3" strokeDasharray="3 3" />
                </svg>

                {/* Exception card container */}
                <div className="ap-exception-card">
                  <div className="ap-exception-alert-wrap">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <div className="ap-exception-text-content">
                    <span className="ap-flow-step-num ap-num-signal">4</span>
                    <h3>Exception handling</h3>
                    <p>If something does not match, the invoice is held and routed to the appropriate person with the reason clearly identified.</p>
                  </div>
                </div>

                {/* Return curve: Once resolved */}
                <div className="ap-exception-return-path">
                  <div className="ap-return-badge-wrapper">
                    <span className="ap-branch-pill ap-pill-resolved">Once resolved</span>
                  </div>
                  <svg className="ap-return-track-svg" viewBox="0 0 80 150" fill="none" aria-hidden="true">
                    <path d="M0 135 C 40 135, 52 120, 52 75 L 52 10" stroke="var(--sage-500)" strokeWidth="1.5" strokeDasharray="3 3" />
                    <polygon points="47,14 52,2 57,14" fill="var(--sage-500)" />
                  </svg>
                </div>
              </div>

              {/* Mobile-only resolved transition line into step 5 */}
              <div className="ap-mobile-resolved-transition" aria-hidden="true">
                <span className="ap-branch-pill ap-pill-resolved">Once resolved</span>
                <div className="ap-mismatch-arrow ap-arrow-sage">
                  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M8 2v10M3 8l5 5 5-5"/></svg>
                </div>
              </div>
            </div>

            {/* Connector 3 -> 5 (Main Line) */}
            <div className="ap-grid-connector conn-3-5" aria-hidden="true">
              <span className="ap-connector-wire"></span>
              <span className="ap-connector-circle">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </div>

            {/* ── STEP 5 ── */}
            <div className="ap-grid-node node-step-5">
              <div className="ap-flow-visual-card">
                <ApprovalVisual />
              </div>
              <div className="ap-flow-step-meta">
                <span className="ap-flow-step-num">5</span>
                <h3>Approval</h3>
                <p>The invoice follows the organisation’s existing approval matrix based on the relevant amount, business unit, cost centre or other defined rules.</p>
              </div>
            </div>

            {/* Connector 5 -> 6 */}
            <div className="ap-grid-connector conn-5-6" aria-hidden="true">
              <span className="ap-connector-wire"></span>
              <span className="ap-connector-circle">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </div>

            {/* ── STEP 6 ── */}
            <div className="ap-grid-node node-step-6">
              <div className="ap-flow-visual-card">
                <ErpPostingVisual />
              </div>
              <div className="ap-flow-step-meta">
                <span className="ap-flow-step-num">6</span>
                <h3>ERP posting</h3>
                <p>Once the required checks and approvals are complete, the accounting entry can be prepared or posted into Tally, SAP or another ERP.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="implementation-journey ap-baseline-section"><div className="implementation-copy"><p className="implementation-pill">Before implementation</p><h2>Measure your AP process before introducing AI automation.</h2><p className="implementation-intro">Establish the baseline before asking automation to improve it.</p><div className="implementation-principles ap-baseline-areas">{baselines.map(([title, description], index) => <article key={title}><i>{String(index + 1).padStart(2, '0')}</i><div><h3>{title}</h3><p>{description}</p></div></article>)}</div><div className="ap-key-insight"><p className="eyebrow">Key insight</p><p>The objective is not to automate every invoice. It is to reduce repetitive intervention while preserving human judgment where it matters.</p></div><p className="ap-baseline-line">Without a baseline, AP may feel faster after automation — but it is difficult to establish what actually improved.</p></div><div className="deployment-stage"><div className="deployment-workspace"><header><div><small>AP BASELINE / REVIEW</small><h3>Implementation readiness</h3></div><span>Start with the facts</span></header><div className="deployment-checklist">{[['complete', 'Workflow map', 'Captured', 'Invoice intake through payment documented.'], ['complete', 'Baseline metrics', 'Measured', 'Cycle time, exceptions and touchpoints recorded.'], ['progress', 'Rules and judgment', 'In review', 'Policies, tolerances and approval logic separated.'], ['pending', 'Pilot scope', 'Next', 'One bounded workflow selected.']].map(([state, title, status, description]) => <article className={state} key={title}><i aria-hidden="true">{state === 'complete' ? '✓' : state === 'progress' ? '◒' : '·'}</i><div><h4>{title}</h4><p>{description}</p></div><b>{status}</b></article>)}</div><footer><div className="readiness-copy"><span>Readiness</span><strong>01</strong><i><b></b></i></div><button type="button">Review the baseline <span aria-hidden="true">→</span></button></footer></div><div className="deployment-support"><article><small>Process clarity</small><strong>Documented workflow</strong></article><article><small>Control design</small><strong>Human review gates</strong></article><article><small>Measurement</small><strong>Reference metrics</strong></article></div></div></section>

      <section className="why-produc8ive common-problems"><header className="why-header"><div><p className="why-pill">Common problems</p><h2>Common AP problems where automation can help</h2></div></header><div className="why-grid">{problems.map(([title, description], index) => <article className="why-card problem-card" key={title}><span className="ap-principle-num">0{index + 1}</span><h3>{title}</h3><p>{description}</p><div className="why-visual"><ProblemVisual title={title} index={index} total={problems.length} /></div></article>)}</div></section>

      <section className="ap-faq-section" id="questions"><header><p className="eyebrow">Questions we get asked</p><h2>Common questions about AI in Accounts Payable</h2></header><div className="accordion ap-faq-accordion">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<b>+</b></summary><div className="ap-faq-answer">{answer}</div></details>)}</div></section>

      <section className="ap-limits-section"><div><p className="eyebrow">When AI may not be the right starting point</p><h2>Start with process clarity, not an automation mandate.</h2><p className="ap-limits-intro">AI may deliver limited value where:</p><div className="ap-limits-block"><ul><li>invoice volumes are very low;</li><li>processes are highly inconsistent;</li><li>vendor masters are poorly maintained;</li><li>approval rules are undocumented;</li><li>ERP workflows change frequently;</li><li>most invoices require genuine commercial judgment; or</li><li>the organisation has not defined responsibility for exceptions.</li></ul></div><p className="ap-key-insight"><span className="eyebrow">Key point</span><br />Automation tends to amplify process design. A poorly defined AP process does not become well controlled simply because AI is added to it.</p></div><div><p className="eyebrow">How to pilot AI in Accounts Payable</p><ol className="ap-pilot-steps">{[['Choose one bounded workflow', 'Avoid automating the entire AP function initially.'], ['Establish baseline metrics', 'Measure current cycle time, exceptions and manual effort.'], ['Document rules', 'Capture mappings, tolerances, approvals and exception policies.'], ['Test normal cases', 'Confirm routine invoices are handled correctly.'], ['Test edge cases', 'Missing PO, duplicate invoice, incorrect GSTIN, unusual tax treatment, and similar cases.'], ['Test failure cases', 'Poor scans, incomplete documents and inconsistent vendor information.'], ['Keep human approval initially', 'Move toward greater automation only after reliability is demonstrated.']].map(([title, description], index) => <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol></div></section>

      <section className="workflow-cta-section" id="start"><div className="workflow-cta-inner"><span className="pia-pill">A useful question to start with</span><h2>Which parts of your AP process require judgment—and which exist only because someone has always done them manually?</h2><p>Mapping that distinction is usually the first step toward identifying where automation can create value.</p><a className="button primary workflow-cta-btn" href={`${BASE}/#contact`}>Map one finance workflow <b aria-hidden="true">↗</b></a></div></section>
      <GuideFooter />
    </main>
  </div>
}
