import React, { useEffect, useState } from 'react'
import './styles.css'

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

const metaItems = [
  { label: 'Industry', value: 'Logistics Technology' },
  { label: 'Function', value: 'Accounts Payable' },
  { label: 'Systems', value: 'Microsoft Outlook + NetSuite' },
  { label: 'Implementation', value: '6 weeks' }
]

const heroMetrics = [
  ['2,200–2,500', 'Invoices processed per month'],
  ['70%', 'Reduction in invoice processing time'],
  ['> 95%', 'Invoice processing accuracy']
]

const automatedStages = [
  {
    num: '01',
    title: '1. Invoice Receipt',
    description: 'Invoices are picked up directly from the central AP mailbox in Outlook. Multiple invoices within an email or email thread can be processed along with relevant supporting documents.'
  },
  {
    num: '02',
    title: '2. Invoice Reading',
    description: 'Invoice and line-item information is extracted, including vendor details, invoice number and date, amount, currency, HSN/SAC, description and other information required for booking.'
  },
  {
    num: '03',
    title: '3. Master Mapping',
    description: 'Extracted information is mapped against the company\'s NetSuite masters, including Vendor/Internal ID, subsidiary, location, currency, project, product and business unit.'
  },
  {
    num: '04',
    title: '4. Accounting Treatment',
    description: 'The appropriate GL/account line, department and project code are determined. Booking-date rules, prepaid treatment and other configured accounting rules are applied where relevant.'
  },
  {
    num: '05',
    title: '5. Tax Information',
    description: 'Place of supply is identified and HSN/SAC information from the invoice is mapped against the relevant NetSuite master to support the applicable GST calculation in NetSuite.'
  },
  {
    num: '06',
    title: '6. Bill Creation',
    description: 'The draft vendor bill is created directly in NetSuite along with the relevant supporting documents and email files.'
  },
  {
    num: '07',
    title: '7. Finance Review',
    description: 'The transaction remains in pending approval status for the Finance team to review, correct where required and approve.'
  },
  {
    num: '08',
    title: '8. Exception Handling',
    description: 'Where information cannot be reliably extracted or mapped, the invoice is flagged and the relevant details are routed to the mailbox for Finance review.'
  }
]

const accountingRules = [
  {
    req: 'Multiple subsidiaries & business dimensions',
    handled: 'Maps subsidiary, location, currency, project, product and business unit against the relevant NetSuite masters.'
  },
  {
    req: 'Accounting classification',
    handled: 'Determines the relevant GL/account line, department and project code based on configured mappings.'
  },
  {
    req: 'Multiple accounting lines',
    handled: 'Supports invoices requiring multiple accounting lines and allocations based on the applicable rules.'
  },
  {
    req: 'Closed accounting periods',
    handled: 'Applies the configured booking-date logic where the invoice relates to an accounting/MIS period that has already been closed.'
  },
  {
    req: 'Prepaid expenses',
    handled: 'Identifies invoices covering a service period of more than three months and determines the applicable amortisation period and start date.'
  },
  {
    req: 'GST place of supply',
    handled: 'Identifies the relevant place of supply and passes the information to NetSuite for determining the applicable GST treatment.'
  },
  {
    req: 'HSN/SAC mapping',
    handled: 'Picks up HSN/SAC information from the invoice and maps it against the relevant NetSuite master, supporting accurate GST calculation in NetSuite.'
  },
  {
    req: 'Supporting documents',
    handled: 'Carries relevant invoice PDFs, supporting documents into the corresponding NetSuite transaction.'
  }
]

const divisionOfDuties = [
  ['Invoice intake from Outlook', 'Review of created bills'],
  ['Invoice and line-item extraction', 'Exception handling'],
  ['Master-data mapping', 'Corrections where required'],
  ['Accounting classification', 'Final approval'],
  ['Booking-date and prepaid rules', 'Oversight of accounting treatment'],
  ['GST-related information', 'Review and release of sensitive payments'],
  ['Supporting documents', 'Verification of non-standard allocations'],
  ['NetSuite bill creation', 'Sign-off on exceptions']
]

const beforeAfterComparison = [
  ['AP team manually reviewed incoming invoice emails', 'Invoices picked up directly from the central AP mailbox'],
  ['Invoice information entered manually', 'Invoice and line-item information extracted automatically'],
  ['Accounting and master mappings determined by users', 'Configured mappings and accounting rules applied consistently'],
  ['Vendor bills manually created in NetSuite', 'Vendor bills created directly in NetSuite'],
  ['Supporting documents handled manually', 'Relevant supporting documents carried with the transaction'],
  ['Finance time spent on routine invoice processing', 'Greater focus on review, exceptions and approvals'],
  ['Processing capacity closely linked to manual effort', 'Higher volumes can be handled without a proportionate increase in processing effort']
]

const impactMetrics = [
  ['70%', 'Reduction in invoice processing time'],
  ['> 95%', 'Invoice processing accuracy'],
  ['2,200–2,500', 'Invoices processed every month'],
  ['6 weeks', 'Implementation including Outlook and NetSuite integrations']
]

function StepReceiveGraphic() {
  return (
    <svg width="120" height="95" viewBox="0 0 120 95" fill="none" xmlns="http://www.w3.org/2000/svg" className="step-graphic-svg" aria-label="Receive from Outlook">
      <defs>
        <filter id="rec-shadow" x="0" y="0" width="120" height="95" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#171717" floodOpacity="0.08" />
        </filter>
        <linearGradient id="mailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2b579a" />
          <stop offset="100%" stopColor="#123469" />
        </linearGradient>
      </defs>
      <g filter="url(#rec-shadow)">
        <rect x="22" y="16" width="76" height="58" rx="8" fill="#ffffff" stroke="#ded8cc" strokeWidth="1" />
        <rect x="22" y="16" width="76" height="18" rx="8" fill="#f4f0e6" />
        <rect x="22" y="26" width="76" height="8" fill="#f4f0e6" />
        <circle cx="32" cy="25" r="3" fill="#2b579a" />
        <rect x="40" y="23" width="34" height="4" rx="2" fill="#58544e" />
        <rect x="30" y="42" width="60" height="3" rx="1.5" fill="#8d8980" />
        <rect x="30" y="49" width="46" height="2.5" rx="1.25" fill="#cbcfc7" />
        <rect x="30" y="55" width="52" height="2.5" rx="1.25" fill="#cbcfc7" />
      </g>
      <g transform="translate(68, 38)">
        <rect x="0" y="0" width="30" height="28" rx="6" fill="url(#mailGrad)" stroke="#ffffff" strokeWidth="1.5" />
        <path d="M6 9 L15 15 L24 9" stroke="#ffffff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="6" y="9" width="18" height="12" rx="1" stroke="#ffffff" strokeWidth="1.5" fill="none" />
      </g>
    </svg>
  )
}

function StepReadGraphic() {
  return (
    <svg width="120" height="95" viewBox="0 0 120 95" fill="none" xmlns="http://www.w3.org/2000/svg" className="step-graphic-svg" aria-label="Read and Extract">
      <defs>
        <filter id="read-shadow" x="0" y="0" width="120" height="95" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#171717" floodOpacity="0.08" />
        </filter>
        <linearGradient id="scanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f7f4ed" />
        </linearGradient>
      </defs>
      <g filter="url(#read-shadow)">
        <rect x="30" y="10" width="60" height="72" rx="6" fill="url(#scanGrad)" stroke="#ded8cc" strokeWidth="1" />
        <rect x="38" y="18" width="24" height="4" rx="2" fill="#171717" />
        <rect x="38" y="27" width="44" height="2.5" rx="1.25" fill="#8d8980" />
        <rect x="38" y="34" width="36" height="2" rx="1" fill="#cbcfc7" />
        <rect x="38" y="40" width="44" height="2" rx="1" fill="#cbcfc7" />
        <rect x="38" y="48" width="44" height="1" fill="#e5dfd5" />
        <rect x="38" y="54" width="20" height="2.5" rx="1.25" fill="#58685e" />
        <rect x="64" y="54" width="18" height="2.5" rx="1.25" fill="#b98b38" />
        <rect x="38" y="62" width="44" height="8" rx="2" fill="#edf2ee" stroke="#cad8cf" strokeWidth="1" />
        <rect x="42" y="65" width="18" height="2" rx="1" fill="#3f614d" />
      </g>
      <g transform="translate(18, 44)">
        <circle cx="12" cy="12" r="10" fill="#3f614d" stroke="#ffffff" strokeWidth="1.5" />
        <path d="M7 12 L10.5 15.5 L16.5 9" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

function StepMapGraphic() {
  return (
    <svg width="120" height="95" viewBox="0 0 120 95" fill="none" xmlns="http://www.w3.org/2000/svg" className="step-graphic-svg" aria-label="Map NetSuite Masters">
      <defs>
        <filter id="map-shadow" x="0" y="0" width="120" height="95" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#171717" floodOpacity="0.08" />
        </filter>
      </defs>
      <g filter="url(#map-shadow)">
        <rect x="18" y="14" width="84" height="64" rx="8" fill="#ffffff" stroke="#ded8cc" strokeWidth="1" />
        <rect x="18" y="14" width="84" height="14" rx="8" fill="#f4f0e8" />
        <rect x="18" y="22" width="84" height="6" fill="#f4f0e8" />
        <text x="26" y="24" fill="#625f58" fontSize="6.5" fontWeight="700" fontFamily="Inter, sans-serif">NETSUITE MASTERS</text>
        <rect x="26" y="34" width="22" height="6" rx="2" fill="#ece7dc" />
        <rect x="52" y="34" width="42" height="6" rx="2" fill="#e2ede5" />
        <rect x="26" y="44" width="22" height="6" rx="2" fill="#ece7dc" />
        <rect x="52" y="44" width="42" height="6" rx="2" fill="#e2ede5" />
        <rect x="26" y="54" width="22" height="6" rx="2" fill="#ece7dc" />
        <rect x="52" y="54" width="42" height="6" rx="2" fill="#e2ede5" />
        <path d="M49 37 L51 37" stroke="#69766d" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M49 47 L51 47" stroke="#69766d" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M49 57 L51 57" stroke="#69766d" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  )
}

function StepRulesGraphic() {
  return (
    <svg width="120" height="95" viewBox="0 0 120 95" fill="none" xmlns="http://www.w3.org/2000/svg" className="step-graphic-svg" aria-label="Apply Accounting Rules">
      <defs>
        <filter id="rule-shadow" x="0" y="0" width="120" height="95" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#171717" floodOpacity="0.08" />
        </filter>
        <linearGradient id="gearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b98b38" />
          <stop offset="100%" stopColor="#8c651e" />
        </linearGradient>
      </defs>
      <g filter="url(#rule-shadow)">
        <rect x="20" y="16" width="80" height="62" rx="8" fill="#fdfcf9" stroke="#dcd6c8" strokeWidth="1" />
        <rect x="28" y="26" width="36" height="3" rx="1.5" fill="#58544e" />
        <rect x="28" y="33" width="28" height="2.5" rx="1.25" fill="#a09a8f" />
        <rect x="28" y="40" width="32" height="2.5" rx="1.25" fill="#a09a8f" />
        <rect x="28" y="50" width="64" height="1" fill="#e5dfd5" />
        <rect x="28" y="58" width="22" height="4" rx="2" fill="#58685e" />
        <rect x="54" y="58" width="22" height="4" rx="2" fill="#b98b38" />
      </g>
      <g transform="translate(70, 22)">
        <circle cx="16" cy="16" r="14" fill="url(#gearGrad)" stroke="#ffffff" strokeWidth="2" />
        <circle cx="16" cy="16" r="5" fill="#ffffff" />
      </g>
    </svg>
  )
}

function StepCreateGraphic() {
  return (
    <svg width="120" height="95" viewBox="0 0 120 95" fill="none" xmlns="http://www.w3.org/2000/svg" className="step-graphic-svg" aria-label="Create NetSuite Bill">
      <defs>
        <filter id="bill-shadow" x="0" y="0" width="120" height="95" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#171717" floodOpacity="0.08" />
        </filter>
      </defs>
      <g filter="url(#bill-shadow)">
        <rect x="24" y="12" width="72" height="68" rx="8" fill="#ffffff" stroke="#ded8cb" strokeWidth="1" />
        <rect x="24" y="12" width="72" height="14" rx="8" fill="#2d3b32" />
        <rect x="24" y="20" width="72" height="6" fill="#2d3b32" />
        <text x="32" y="22" fill="#ffffff" fontSize="6.5" fontWeight="700" fontFamily="Inter, sans-serif">NETSUITE BILL</text>
        <rect x="32" y="32" width="26" height="3" rx="1.5" fill="#8d8980" />
        <rect x="32" y="38" width="38" height="2" rx="1" fill="#cbcfc7" />
        <rect x="32" y="43" width="34" height="2" rx="1" fill="#cbcfc7" />
        <rect x="32" y="51" width="56" height="1" fill="#e5dfd5" />
        <rect x="32" y="57" width="20" height="2.5" rx="1.25" fill="#4d8262" />
        <rect x="60" y="57" width="26" height="2.5" rx="1.25" fill="#171717" />
        <rect x="32" y="66" width="56" height="6" rx="2" fill="#f4f0e6" />
      </g>
    </svg>
  )
}

function StepReviewGraphic() {
  return (
    <svg width="120" height="95" viewBox="0 0 120 95" fill="none" xmlns="http://www.w3.org/2000/svg" className="step-graphic-svg" aria-label="Review and Approve">
      <defs>
        <filter id="rev-shadow" x="0" y="0" width="120" height="95" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#171717" floodOpacity="0.08" />
        </filter>
        <linearGradient id="apprBtnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#415448" />
          <stop offset="100%" stopColor="#2c3a31" />
        </linearGradient>
      </defs>
      <g filter="url(#rev-shadow)">
        <rect x="26" y="10" width="68" height="64" rx="10" fill="#ffffff" stroke="#ded8cb" strokeWidth="1" />
        <g transform="translate(48, 18)">
          <circle cx="12" cy="12" r="12" fill="#edf2ee" stroke="#d3ded5" strokeWidth="1" />
          <circle cx="12" cy="9" r="4.5" fill="#2d3b32" />
          <path d="M4 20 C4 15 7 14 12 14 C17 14 20 15 20 20 Z" fill="#2d3b32" />
          <circle cx="20" cy="18" r="5.5" fill="#4d8262" stroke="#ffffff" strokeWidth="1.2" />
          <path d="M18 18 L19.5 19.5 L22.5 16.5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      <g transform="translate(30, 50)">
        <rect x="0" y="0" width="60" height="22" rx="5" fill="url(#apprBtnGrad)" stroke="#52685a" strokeWidth="1" />
        <text x="30" y="15" fill="#ffffff" fontSize="8.5" fontWeight="700" textAnchor="middle" letterSpacing="0.3" fontFamily="Inter, sans-serif">Approve</text>
      </g>
    </svg>
  )
}

const pipelineSteps = [
  {
    num: 1,
    title: 'RECEIVE',
    description: 'Invoices and supporting documents are picked up from the central AP mailbox.',
    graphic: <StepReceiveGraphic />
  },
  {
    num: 2,
    title: 'READ',
    description: 'Invoice data, line items, HSN/SAC and other booking information are extracted.',
    graphic: <StepReadGraphic />
  },
  {
    num: 3,
    title: 'MAP',
    description: 'Vendor, entity, location, project, business unit and other NetSuite masters are mapped.',
    graphic: <StepMapGraphic />
  },
  {
    num: 4,
    title: 'APPLY RULES',
    description: 'GL classification, booking date, prepaid treatment, amortisation and GST-related information are determined.',
    graphic: <StepRulesGraphic />
  },
  {
    num: 5,
    title: 'CREATE',
    description: 'The vendor bill and supporting documents are created directly in NetSuite.',
    graphic: <StepCreateGraphic />
  },
  {
    num: 6,
    title: 'REVIEW & APPROVE',
    description: 'Finance reviews the draft transaction, handles exceptions and completes the approval.',
    graphic: <StepReviewGraphic />
  }
]

function CaseStudyNav() {
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

  return (
    <header className={`floating-navbar ${visible ? 'nav-visible' : 'nav-hidden'} ${scrolled ? 'scrolled' : ''}`}>
      <a href={`${BASE}/`} className="site-logo">
        <img src={`${BASE}/logo_hero.png`} alt="Produc8ive" style={{ height: '32px', width: 'auto', display: 'block' }} />
      </a>
      <nav aria-label="Case study navigation">
        <a href="#challenge">The Challenge</a>
        <a href="#what-automated">Automated Stages</a>
        <a href="#pipeline">The Workflow</a>
        <a href="#accounting-rules">Accounting Rules</a>
        <a href="#finance-control">Finance Control</a>
      </nav>
      <a className="nav-action" href="#contact">
        Discuss Workflow <span aria-hidden="true">↗</span>
      </a>
    </header>
  )
}

function GuideFooter() {
  const links = [
    ['The Challenge', '#challenge'],
    ['What Produc8ive Automated', '#what-automated'],
    ['From Inbox to NetSuite', '#pipeline'],
    ['Accounting Rules', '#accounting-rules'],
    ['Finance Stays in the Loop', '#finance-control'],
    ['The Impact', '#impact']
  ]
  return (
    <footer className="landing-footer">
      <div className="landing-footer-inner">
        <div className="landing-footer-brand">
          <span className="landing-footer-logo">
            <img src={`${BASE}/footer-logo.png`} alt="Produc8ive" style={{ height: '32px', width: 'auto', display: 'block' }} />
          </span>
          <p className="landing-footer-desc">
            Produc8ive turns finance processes, institutional knowledge and enterprise data into governed AI workflows that help teams analyse, coordinate and execute work with greater speed and control.
          </p>
          <address className="landing-footer-address">
            Flat C-1301 Sr No 69 &amp; 70, Hill View Residency,<br />
            Kothrud, Pune, Pune City,<br />
            Maharashtra, India — 411038
          </address>
          <p className="landing-footer-entity">Produc8ive Solutions Private Limited</p>
        </div>
        <nav className="landing-footer-nav" aria-label="Case study footer navigation">
          <p className="landing-footer-nav-heading">In this case study</p>
          <ul>
            {links.map(([label, href]) => (
              <li key={href}>
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

  return (
    <section className="contact-section" id="contact">
      <div className="contact-intro">
        <p className="eyebrow">Automate Your AP Workflow</p>
        <h2>Let's discuss how to automate your invoice-to-ERP operations.</h2>
        <p>
          Share your current AP environment and volumes, and we'll show you how to structure automated invoice intake, master mapping, accounting rules and ERP bill creation while keeping Finance in control.
        </p>
        <a href="mailto:smishra@produc8ive.com">
          smishra@produc8ive.com <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <p>Contact details</p>
        <div className="contact-name-fields">
          <label>
            Name
            <input name="Name" autoComplete="given-name" required />
          </label>
        </div>
        <label>
          Work email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          <div className="phone1">Phone <span>Optional</span></div>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label>
          What Accounts Payable or finance workflows are you looking to automate?
          <textarea name="message" rows="5" required />
        </label>
        <button className="button primary" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : <>Send message <b aria-hidden="true">&rarr;</b></>}
        </button>
        {status === 'success' && <p style={{ color: 'green', marginTop: '1rem' }}>Message sent. We'll be in touch soon.</p>}
        {status === 'error' && <p style={{ color: 'red', marginTop: '1rem' }}>Something went wrong. Please try again or email us directly.</p>}
      </form>
    </section>
  )
}

export default function LogisticsCaseStudyPage() {
  return (
    <div className="landing-one ap-guide">
      <CaseStudyNav />
      <main>
        {/* HERO SECTION */}
        <section className="tabbed-hero landing-hero-redesign ap-guide-hero">
          <p className="ap-hero-eyebrow">Case Study · Logistics Technology</p>
          <h1>Automating Accounts Payable for a Global Logistics Technology Company</h1>
          <p className="landing-lead">
            A global logistics technology company automated invoice processing from its central Accounts Payable mailbox to NetSuite, reducing processing time while retaining finance review and approval.
          </p>

          {/* PROJECT METADATA STRIP */}
          <div className="domain-strip" style={{ marginTop: '36px', background: 'var(--surface-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '24px 32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', width: '100%', maxWidth: '1000px', margin: '0 auto', textAlign: 'left' }}>
              {metaItems.map(item => (
                <div key={item.label}>
                  <p style={{ margin: '0 0 6px', fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--sage-500)', fontFamily: 'var(--font-body)' }}>
                    {item.label}
                  </p>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', display: 'block' }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="landing-actions" style={{ marginTop: '32px' }}>
            <a className="button primary" href="#challenge">
              Explore the Case Study <b aria-hidden="true">→</b>
            </a>
          </div>
        </section>

        {/* METRICS STRIP */}
        <section className="ap-metric-strip" aria-labelledby="cs-metrics-heading">
          <p className="ap-metric-label" id="cs-metrics-heading">6 weeks implementation along with integration with NetSuite and Outlook</p>
          <div className="ap-metric-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {heroMetrics.map(([number, label]) => (
              <article key={label}>
                <strong>{number}</strong>
                <p>{label}</p>
              </article>
            ))}
          </div>
        </section>

        {/* SECTION 1: THE CHALLENGE */}
        <section className="finance-shift" id="challenge" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="finance-shift-copy" style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
            <p className="eyebrow" style={{ textAlign: 'center' }}>Case Background</p>
            <h2 style={{ maxWidth: '100%', margin: '0 auto 24px', textAlign: 'center' }}>The Challenge</h2>
            <div className="ap-shift-beats" style={{ marginTop: '24px', textAlign: 'left' }}>
              <div>
                <p style={{textAlign:'center', fontSize: '16px', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  The company operates a centralised Accounts Payable function, with an 8–10 member AP team receiving invoices for its subsidiaries across different locations.
                </p>
                <p style={{ textAlign:'center', fontSize: '16px', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Invoice processing was largely manual. The team reviewed emails received in the central AP mailbox, downloaded invoices and supporting documents, captured invoice information, determined the appropriate accounting treatment and master mappings, and created vendor bills in NetSuite.
                </p>
                <p style={{ textAlign:'center', fontSize: '16px', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  At a volume of approximately 2,200–2,500 invoices every month, this meant significant time was spent on repetitive processing and data entry.
                </p>
                <p style={{ textAlign:'center', fontSize: '16px', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '0' }}>
                  The requirement was to reduce invoice processing time, standardise accounting treatment and create capacity for increasing volumes — while retaining Finance review and approval.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: WHAT PRODUC8IVE AUTOMATED */}
        <section className="why-produc8ive" id="what-automated">
          <header className="why-header">
            <div>
              <p className="why-pill">System Integration</p>
              <h2>What Produc8ive Automated</h2>
            </div>
            <p>
              The workflow was built around the company's existing Outlook and NetSuite environment. Produc8ive handles the process from receipt of the invoice until creation of the vendor bill, with Finance retaining the final review and approval.
            </p>
          </header>
          <div className="ap-judgment-table">
            <div className="ap-judgment-head">
              <span>Stage</span>
              <span>What happens</span>
            </div>
            {automatedStages.map((stage) => (
              <div className="ap-judgment-row" key={stage.title}>
                <p><strong>{stage.title}</strong></p>
                <p>{stage.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: FROM INBOX TO NETSUITE (PREDICTABLE PIPELINE) */}
        <section className="predictable-pipeline-section finance-brain-flow" id="pipeline">
          <header>
            <p className="flow-pill">End-to-End Execution</p>
            <h2>From Inbox to NetSuite</h2>
          </header>
          <p className="ap-workflow-note" style={{ marginBottom: '40px' }}>
            A structured workflow connecting the central AP mailbox directly to NetSuite bill creation.
          </p>
          <div className="pipeline-canvas-wrapper">
            <div className="pipeline-scroll-area">
              <div className="pipeline-steps-row">
                {pipelineSteps.map((step, idx) => (
                  <React.Fragment key={step.title}>
                    <div className="pipeline-step-item">
                      <div className="pipeline-visual-box">{step.graphic}</div>
                      <div className="pipeline-card-body">
                        <span className="pipeline-num-badge">{step.num}</span>
                        <h3 className="pipeline-step-title">{step.title}</h3>
                        <p className="pipeline-step-desc">{step.description}</p>
                      </div>
                    </div>
                    {idx < pipelineSteps.length - 1 && (
                      <div className="pipeline-step-arrow" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14" />
                          <path d="M13 6l6 6-6 6" />
                        </svg>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

            
            </div>

          
          </div>
        </section>

        {/* SECTION 4: ACCOUNTING RULES BUILT INTO THE WORKFLOW */}
        <section className="why-produc8ive" id="accounting-rules">
          <header className="why-header">
            <div>
              <p className="why-pill">ERP &amp; Compliance Logic</p>
              <h2>Accounting Rules Built Into the Workflow</h2>
            </div>
            <p>
              The requirement went beyond reading information from invoices. The workflow also needed to apply the company's existing accounting rules before creating the transaction in NetSuite.
            </p>
          </header>
          <div className="ap-judgment-table">
            <div className="ap-judgment-head">
              <span>Requirement</span>
              <span>How it is handled</span>
            </div>
            {accountingRules.map((rule) => (
              <div className="ap-judgment-row" key={rule.req}>
                <p><strong>{rule.req}</strong></p>
                <p>{rule.handled}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: FINANCE STAYS IN THE LOOP */}
        <section className="section ap-operating-model" id="finance-control">
          <p className="eyebrow">Human Oversight &amp; Governance</p>
          <h2>Finance Stays in the Loop</h2>
          <div className="ap-model-story">
            <p>
              Automation was introduced to reduce routine processing — not to remove finance controls.
            </p>
          </div>
          <div className="ap-model-layout">
            <div className="ap-compare">
              <div className="ap-compare-head">
                <span>Produc8ive handles</span>
                <span>Finance retains</span>
              </div>
              {divisionOfDuties.map(([produc8iveItem, financeItem], idx) => (
                <div className="ap-compare-row" key={idx}>
                  <p>{produc8iveItem}</p>
                  <p>{financeItem}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="ap-misnomer" style={{ marginTop: '32px' }}>
            <p className="ap-misnomer-label">Exception Control</p>
            <blockquote>
              Where the required information cannot be reliably extracted or mapped, the transaction is flagged for review rather than being forced through the workflow.
            </blockquote>
          </div>
        </section>

        {/* SECTION 6: THE IMPACT */}
        <section className="section ap-operating-model" id="impact">
          <p className="eyebrow">Operational Outcomes</p>
          <h2>The Impact</h2>
          <div className="ap-model-layout">
            <div className="ap-compare">
              <div className="ap-compare-head">
                <span>Before</span>
                <span>With Produc8ive</span>
              </div>
              {beforeAfterComparison.map(([before, after], idx) => (
                <div className="ap-compare-row" key={idx}>
                  <p>{before}</p>
                  <p>{after}</p>
                </div>
              ))}
            </div>
          </div>

      
        </section>

        {/* SECTION 7: SUMMARY & TAKEAWAYS (A SHIFT FROM PROCESSING TO REVIEW & A MORE SCALABLE AP PROCESS) */}
        {/* <section className="ap-limits-section">
          <div>
            <p className="eyebrow">Team Transformation</p>
            <h2>A Shift from Processing to Review</h2>
            <p className="ap-limits-intro">
              For the centralised AP team, the implementation changed where time was being spent.
            </p>
            <p className="ap-limits-intro">
              The objective was not to reduce headcount. The 8–10 member team continues to own the AP process, while repetitive activities such as invoice reading, data entry, master mapping and creation of NetSuite bills are handled through the workflow.
            </p>
            <p className="ap-limits-intro">
              This allows Finance to spend more time on review, exceptions and approvals, while maintaining control over the final accounting entry.
            </p>
          </div>
          <div>
            <p className="eyebrow">Implementation Scale</p>
            <h2>A More Scalable AP Process</h2>
            <p className="ap-limits-intro">
              The company now processes approximately 2,200–2,500 invoices every month through a structured workflow connecting its central AP mailbox with NetSuite.
            </p>
            <p className="ap-limits-intro">
              With 95% processing accuracy and a 70% reduction in invoice processing time, routine activities are handled through Produc8ive while Finance retains review, exception handling and approval.
            </p>
            <div className="ap-key-insight" style={{ marginTop: '20px' }}>
              <p className="eyebrow">Speed to Value</p>
              <p>
                The workflow was implemented in 6 weeks, including the Outlook and NetSuite integrations.
              </p>
            </div>
          </div>
        </section> */}

        {/* WORKFLOW CTA SECTION */}
        <section className="workflow-cta-section">
          <div className="workflow-cta-inner">
            <span className="pia-pill">Scale Your AP Operations</span>
            <h2>Ready to automate your Accounts Payable function?
</h2>
            <p>
              See how Produc8ive can connect your central AP inboxes and ERP to eliminate manual data entry while keeping your finance team in full control of every approval and exception.
            </p>
            <a className="button primary workflow-cta-btn" href="#contact">
              Discuss Your AP Workflow <b aria-hidden="true">↗</b>
            </a>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <ContactSection />
        <GuideFooter />
      </main>
    </div>
  )
}
