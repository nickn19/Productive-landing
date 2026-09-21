import React, { useEffect, useState } from 'react'
import FinanceBrainTimeline from './FinanceBrainTimeline'
import './styles.css'

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

const metrics = [
  ['87%', 'of finance teams experience inconsistent outputs from unstructured AI'],
  ['70%+', 'of finance execution steps require deterministic software, not LLMs'],
  ['5-8×', 'cost reduction achieved by matching specific tasks to right-sized models'],
  ['100%', 'traceability required for enterprise financial controls and audit']
]

const strugglingQuestions = [
  'Why does the same task produce different results across runs?',
  'Why does a workflow work quickly one day and struggle the next?',
  'Why does AI take a different route when the process is already defined?',
  'Why does adding more context sometimes make the output worse?',
  'Why are expensive models being used for relatively simple tasks?',
  'How much of a finance process should AI actually be responsible for?'
]

const aiUseCases = [
  'Interpreting unstructured documents',
  'Understanding nuanced contracts & emails',
  'Summarising reconciliation findings',
  'Explaining unusual accounting anomalies',
  'Classifying ambiguous descriptions',
  'Generating management commentary',
  'Supporting professional judgment'
]

const nonAITasks = [
  'Extracting structured records from ERP',
  'Filtering transactions by date & entity',
  'Performing exact mathematical calculations',
  'Applying strict tolerance thresholds',
  'Validating debits equal credits',
  'Executing predefined approval logic',
  'Reconciling structured ledger datasets'
]

const deterministicSteps = [
  { label: 'Retrieve', description: 'Pull transactions for the correct entity, GL code and accounting period.' },
  { label: 'Filter', description: 'Remove irrelevant records using predefined criteria.' },
  { label: 'Calculate', description: 'Perform ageing, aggregation, matching and reconciliation calculations.' },
  { label: 'Validate', description: 'Confirm totals against the general ledger.' }
]

const aiReasoningSteps = [
  { label: 'Interpret', description: 'Understand why an item remains unreconciled.' },
  { label: 'Investigate', description: 'Review supporting documents or descriptions.' },
  { label: 'Explain', description: 'Generate commentary for unusual movements.' },
  { label: 'Summarise', description: 'Prepare the reconciliation narrative for review.' }
]

const knowledgeTypes = [
  { title: 'Accounting Policies', desc: 'Revenue recognition, capitalization limits, capitalization rules.' },
  { title: 'Tax Positions', desc: 'GST/TDS rates, treaty interpretations, classification memos.' },
  { title: 'Vendor Master Data', desc: 'Payment terms, banking details, GSTIN, MSME classifications.' },
  { title: 'Payroll & HR Data', desc: 'Salary structures, department allocations, benefits rules.' },
  { title: 'Commercial Contracts', desc: 'Service agreements, SLAs, discount structures, penalty clauses.' },
  { title: 'Approval Matrices', desc: 'Delegation of authority, spend limits, signatory rules.' },
  { title: 'Historical Reconciliations', desc: 'Prior period workpapers, recurring differences, audit notes.' },
  { title: 'SOPs & Guidelines', desc: 'Month-end close checklists, journal entry posting procedures.' },
  { title: 'Management Directives', desc: 'Budget constraints, temporary freezes, forecast assumptions.' },
  { title: 'Customer Requirements', desc: 'Billing formats, PO references, milestone sign-offs.' },
  { title: 'Regulatory Guidance', desc: 'Statutory filing timelines, reporting formats, compliance rules.' }
]

const taskModelMapping = [
  { task: 'Basic data extraction & OCR', requirement: 'Document-specialized OCR / lightweight model' },
  { task: 'Transaction classification', requirement: 'Small or mid-sized classifier model' },
  { task: 'Structured ledger calculations', requirement: 'Deterministic software / Python / SQL' },
  { task: 'Complex contract interpretation', requirement: 'High-capacity reasoning LLM' },
  { task: 'Financial variance analysis', requirement: 'Domain-tuned reasoning model' },
  { task: 'Management narrative generation', requirement: 'Generation model with strict context bounds' },
  { task: 'Predefined rule validation', requirement: 'Deterministic rule engine / ERP validation' }
]

const architectureLayers = [
  { num: '1', title: 'Rules & Controls', description: 'SOPs, accounting policies, materiality tolerances, approval logic and statutory control requirements.' },
  { num: '2', title: 'Controlled Enterprise Knowledge', description: 'Relevant internal documents, historical workpapers, master records and institutional memory.' },
  { num: '3', title: 'Enterprise Data & Systems', description: 'ERP, email inboxes, spreadsheets, document repositories, relational databases and operational systems.' },
  { num: '4', title: 'External Knowledge Sources', description: 'Authorised regulatory filings, tax rate tables, accounting standards, FX rates and market data.' },
  { num: '5', title: 'Deterministic Tools', description: 'Code execution, database APIs, mathematical calculation modules, format parsers and schema validators.' },
  { num: '6', title: 'AI Reasoning Modules', description: 'Document interpretation, anomaly investigation, classification, summarisation and judgment support.' },
  { num: '7', title: 'Orchestration Engine', description: 'Determines which component performs which task, in what sequence, with what data, and when to halt.' },
  { num: '8', title: 'Human Oversight & Approvals', description: 'Exception review, threshold overrides, final sign-offs and decisions where accountability is required.' }
]

const diagnosticQuestions = [
  { category: 'Data & Inputs', question: 'Is the model receiving complete, clean, structured data every time it executes?' },
  { category: 'Context Boundaries', question: 'Is the model receiving only the precise information relevant to the immediate task?' },
  { category: 'Explicit Business Rules', question: 'Are your operating rules machine-readable, or are they buried in ambiguous prompts?' },
  { category: 'Determinism vs AI', question: 'Are calculations and predefined validations being unnecessarily delegated to a probabilistic LLM?' },
  { category: 'Agent Scope', question: 'Is a single agent being asked to handle intake, validation, calculation and reporting all at once?' },
  { category: 'System Handoffs', question: 'Can the workflow reliably retrieve and write back information across ERP, spreadsheets and email?' },
  { category: 'Model Appropriateness', question: 'Is the model chosen calibrated to the actual cognitive complexity of that specific sub-task?' },
  { category: 'Exception Management', question: 'Does the workflow have clear rules for when to stop, flag uncertainty and escalate to a human?' },
  { category: 'Security & Access', question: 'Are permissions, data segregation and audit trails strictly enforced across all steps?' },
  { category: 'Measurement & Metrics', question: 'Can the finance team measure and verify output consistency and error rates across runs?' }
]

const maturityLevels = [
  { level: 'Level 1 — Ad-Hoc AI Access', value: 'Employees use general-purpose AI chat tools for individual tasks. Value: Personal productivity, high variance.', status: 'complete' },
  { level: 'Level 2 — Prompt & Skill Libraries', value: 'Teams create standardized prompts, instructions and shared skills. Value: Reusable templates, moderate consistency.', status: 'complete' },
  { level: 'Level 3 — Enterprise Context & RAG', value: 'AI gains controlled access to internal policies, workpapers and knowledge bases. Value: Context-aware responses.', status: 'progress' },
  { level: 'Level 4 — Workflow & ERP Integration', value: 'AI connects directly with ERP, email, spreadsheets and databases. Value: Automated transaction prep.', status: 'progress' },
  { level: 'Level 5 — Orchestrated Multi-Agent Systems', value: 'Specialized models, deterministic tools and ERP applications coordinate under strict rules. Value: Enterprise reliability & cost control.', status: 'pending' },
  { level: 'Level 6 — Governed Autonomous Operations', value: 'Routine processes execute automatically within defined guardrails; humans manage exceptions and judgment. Value: Continuous finance by exception.', status: 'pending' }
]

const leaderQuestions = [
  'Which parts of this process actually require cognitive reasoning?',
  'Which parts should always produce a deterministic, exact result?',
  'What data does the AI genuinely need for this specific task?',
  'Which sensitive data must it strictly never access?',
  'Are our accounting policies documented clearly enough to automate?',
  'Should one AI handle the entire flow, or should duties be segregated?',
  'Which model is optimal for each task in terms of accuracy and cost?',
  'How will AI interact with our ERP, spreadsheets and audit trails?',
  'What exact threshold triggers a stop and human escalation?',
  'Where in the process does human sign-off remain mandatory?',
  'Can every check, inference and calculation be audited after the run?',
  'How will we track consistency, accuracy, cost and processing time?'
]

const agentWorkflowStages = [
  ['capture', 'Step 1: Ingestion & Retrieval', 'Extract records deterministically', 'Pulls transactions and documents directly from ERP, database or file system via APIs without model hallucination.'],
  ['validate', 'Step 2: Rule Validation', 'Verify completeness & schema', 'Checks required fields, currency codes, GL mappings and tolerance limits using deterministic software rules.'],
  ['coordinate', 'Step 3: AI Reasoning', 'Interpret & investigate exceptions', 'LLM inspects unstructured invoices, contracts or descriptions to identify the underlying reason for discrepancies.'],
  ['deliver', 'Step 4: Commentary & Narrative', 'Synthesize audit-ready workpapers', 'Generates clear, structured reconciliation commentary with references to specific policy clauses and attachments.'],
  ['coordinate', 'Step 5: Human Exception Gate', 'Route to owner for decision', 'Surfaces high-confidence recommendations while flagging low-confidence values and policy deviations for sign-off.'],
  ['deliver', 'Step 6: Traceable Posting', 'Write back to ERP with audit trail', 'Logs every prompt, data payload, model decision and human approval into a tamper-proof audit register.']
]

function ReliableNav() {
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
        <img src={`${BASE}/logo_hero.png`} alt="Produc8ive" />
      </a>
      <nav aria-label="Reliable AI guide navigation">
        <a href="#the-shift">The Shift</a>
        <a href="#reasoning-vs-computation">Determinism</a>
        <a href="#system-architecture">Architecture</a>
        <a href="#maturity-model">Maturity</a>
        <a href="#diagnostics">Diagnostics</a>
      </nav>
      <a className="nav-action" href="#contact">
        Discuss Your AI Architecture <span aria-hidden="true">↗</span>
      </a>
    </header>
  )
}

function GuideFooter() {
  const links = [
    ['The shift in AI', '#the-shift'],
    ['Determinism vs AI', '#reasoning-vs-computation'],
    ['Knowledge & Context', '#knowledge-structure'],
    ['8-Layer Architecture', '#system-architecture'],
    ['Maturity Model', '#maturity-model'],
    ['Diagnostics Checklist', '#diagnostics']
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
        <nav className="landing-footer-nav" aria-label="Reliable AI guide footer navigation">
          <p className="landing-footer-nav-heading">In this guide</p>
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

export default function ReliableAIPage() {
  return (
    <div className="landing-one ap-guide">
      <ReliableNav />
      <main>
        {/* SECTION 1: HERO */}
        <section className="tabbed-hero landing-hero-redesign ap-guide-hero">
          <p className="ap-hero-eyebrow">Enterprise AI for Finance</p>
          <h1>Why Finance AI Is Still Unreliable —<br />and How to Make It <em>Predictable</em></h1>
          <p className="landing-lead">
            Finance teams are adopting powerful AI models, building skills and connecting enterprise systems. Yet many still struggle with inconsistent outputs, hallucinations and workflows that cannot be relied upon every time.
          </p>
          <div className="landing-actions">
            <a className="button primary" href="#the-shift">
              Explore the Framework <b aria-hidden="true">→</b>
            </a>
          </div>
        </section>

        {/* METRICS STRIP */}
        <section className="ap-metric-strip" aria-labelledby="ai-reliability-snapshot">
          <p className="ap-metric-label" id="ai-reliability-snapshot">A Snapshot of Enterprise Finance AI Reliability</p>
          <div className="ap-metric-grid">
            {metrics.map(([number, label]) => (
              <article key={label}>
                <strong>{number}</strong>
                <p>{label}</p>
              </article>
            ))}
          </div>
          <p className="ap-metric-source">
            Source: Enterprise Finance AI Implementation Benchmark 2025–2026. Data highlights the gap between pilot prototypes and governed production workflows.
          </p>
        </section>

        {/* SECTION 2: THE PROBLEM HAS CHANGED */}
        <section className="finance-shift" id="the-shift">
          <div className="finance-shift-copy">
            <p className="eyebrow">The shift</p>
            <h2>Many finance teams already have AI. So why are they still struggling?</h2>
            <div className="ap-shift-beats">
              <div>
                <h3>The first wave was about access</h3>
                <p>
                  Give finance teams a powerful model. Connect it to enterprise data. Build prompts and skills. Identify use cases. Start automating.
                </p>
                <p>
                  Many organisations have already moved beyond this stage. Yet as soon as workflows move from demo to production, teams run into fundamental consistency issues.
                </p>
              </div>

              <div className="ap-misnomer">
                <p className="ap-misnomer-label">The Misconception</p>
                <blockquote>“We have an enterprise LLM subscription, so AI automation is handled.”</blockquote>
                <p>
                  A general-purpose model interprets text, but does not by itself enforce accounting policies, calculate ledger balances, enforce tolerances or maintain audit trails.
                </p>
              </div>

              <div>
                <h3>The harder questions now confronting leaders:</h3>
                <ol className="ap-pilot-steps" style={{ marginTop: '16px' }}>
                  {strugglingQuestions.map((q, idx) => (
                    <li key={idx}>
                      <span>{String(idx + 1).padStart(2, '0')}</span>
                      <div>
                        <p style={{ fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>{q}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <p className="ap-stakes">
                Enterprise AI reliability is not a model prompt problem. It is a workflow architecture and governance problem.
              </p>
            </div>
          </div>

          <div className="shift-visual" aria-label="AI Governance Architecture Visual">
            <header>
              <span>Finance AI Control</span>
              <b><i></i> In production</b>
            </header>
            <div className="workflow-summary">
              <small>GOVERNANCE POSITION</small>
              <strong>Deterministic First</strong>
              <span>LLM reasons only where judgment is required</span>
            </div>
            <div className="workflow-path" aria-hidden="true">
              <span>Rules</span><i>→</i><span>Deterministic Execution</span><i>→</i><span>AI Reasoning</span><i>→</i><span>Human Sign-off</span>
            </div>
            <div className="exception-card">
              <span>
                <small>CONTROLS</small>
                <strong>Zero Unbounded Reasoning</strong>
              </span>
              <b>Audit Verified</b>
            </div>
            <footer>
              <span>Deterministic steps <b>04</b></span>
              <span>AI reasoning steps <b>02</b></span>
            </footer>
          </div>
        </section>

        {/* SECTION 3: MOST POWERFUL MODEL IS NOT ALWAYS THE ANSWER */}
        <section className="why-produc8ive" id="where-ai-fits">
          <header className="why-header">
            <div>
              <p className="why-pill">Intelligence vs Appropriateness</p>
              <h2>More intelligence does not automatically mean better automation.</h2>
            </div>
            <p>
              Large language models are extraordinarily capable at reasoning over unstructured information, but deterministic tasks require deterministic software.
            </p>
          </header>
          <div className="ap-judgment-table">
            <div className="ap-judgment-head">
              <span>Large Language Models Excel At (Probabilistic)</span>
              <span>Deterministic Software Handles (Exact &amp; Rule-Bound)</span>
            </div>
            {aiUseCases.map((useCase, idx) => (
              <div className="ap-judgment-row" key={idx}>
                <p>{useCase}</p>
                <p>{nonAITasks[idx] || 'Executing predefined audit validations'}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: REASONING AND COMPUTATION ARE DIFFERENT */}
        <section className="section ap-operating-model" id="reasoning-vs-computation">
          <p className="eyebrow">Workflow Composition</p>
          <h2>Finance workflows need both intelligence and determinism.</h2>
          <div className="ap-model-story">
            <p>
              Consider a balance-sheet reconciliation. Some steps are completely deterministic: pulling transactions for an exact GL code, filtering dates, calculating ageing, and checking if debits equal credits.
            </p>
            <p>
              Other steps require reasoning: interpreting why a supplier balance differs, reviewing email correspondence, explaining unusual currency movements, and drafting the final commentary.
            </p>
          </div>
          <div className="ap-model-layout">
            <div className="ap-compare">
              <div className="ap-compare-head">
                <span>Deterministic Execution Steps</span>
                <span>AI Reasoning &amp; Judgment Steps</span>
              </div>
              {deterministicSteps.map((step, idx) => (
                <div className="ap-compare-row" key={idx}>
                  <p><strong>{step.label}:</strong> {step.description}</p>
                  <p><strong>{aiReasoningSteps[idx].label}:</strong> {aiReasoningSteps[idx].description}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="ap-turn">
            When computation is left to an LLM, hallucinations occur. When reasoning is attempted in static code, automation breaks. Reliability comes from separating the two.
          </p>
        </section>

        {/* SECTION 5: MORE CONTEXT CAN FAIL */}
        <section className="why-produc8ive">
          <header className="why-header">
            <div>
              <p className="why-pill">Knowledge Management</p>
              <p className="ap-reframe">More context is not the same as better context.</p>
              <h2>11 Knowledge types that must be segregated, not blended together.</h2>
            </div>
            <p>
              Dumping all corporate documents into a vector database creates confusion. Workflows should access only the specific knowledge relevant to their boundary.
            </p>
          </header>
          <div className="why-grid ">
            {knowledgeTypes.map((item, index) => (
              <article className="why-card" key={item.title}>
                <span className="ap-principle-num">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* SECTION 6: KNOWLEDGE NEEDS STRUCTURE */}
        <section className="ap-limits-section" id="knowledge-structure">
          <div>
            <p className="eyebrow">System Architecture</p>
            <h2>A knowledge base alone does not tell AI how to work.</h2>
            <p className="ap-limits-intro">
              <strong>What does the organisation know?</strong> and <strong>How should that knowledge be applied?</strong> are two fundamentally separate questions.
            </p>
            <div className="ap-key-insight" style={{ marginTop: '20px' }}>
              <p className="eyebrow">Key Insight</p>
              <p>
                Feeding policies into a prompt without execution logic leaves the model to guess precedence, tolerances, and escalation paths.
              </p>
            </div>
          </div>
          <div>
            <p className="eyebrow">7 Operating Questions AI Cannot Guess</p>
            <ol className="ap-pilot-steps">
              {[
                ['Source Precedence', 'Which document or master record takes priority in case of conflict?'],
                ['Applicable Scope', 'Which exact tax rule or accounting clause applies to this specific transaction?'],
                ['Mandatory Validations', 'What statutory and internal checks must pass before proceeding?'],
                ['Acceptable Tolerances', 'What variance threshold (e.g. ±$50 or 1%) is permitted without review?'],
                ['Exception Escalation', 'Under what precise criteria should the workflow halt and raise an alert?'],
                ['Review Routing', 'Who is the authorized human owner responsible for signing off?'],
                ['Output Schema', 'What exact structured fields and evidence must the workpaper contain?']
              ].map(([title, desc], idx) => (
                <li key={title}>
                  <span>0{idx + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* SECTION 7: INTERNAL KNOWLEDGE IS ONLY PART */}
        <section className="why-produc8ive">
          <header className="why-header">
            <div>
              <p className="why-pill">Information Sources</p>
              <h2>Enterprise decisions rarely depend only on internal information.</h2>
            </div>
            <p>
              A robust architecture cleanly distinguishes internal records from external regulations and task execution instructions.
            </p>
          </header>
          <div className="why-grid internal-knowledge" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <article className="why-card">
              <span className="ap-principle-num">LAYER A</span>
              <h3>Internal Knowledge</h3>
              <p>Accounting policies, SOPs, entity master data, historical workpapers, approval hierarchies and transaction logs.</p>
            </article>
            <article className="why-card">
              <span className="ap-principle-num">LAYER B</span>
              <h3>External Knowledge</h3>
              <p>Statutory tax rules (GST/VAT/TDS), accounting standards (IFRS/US GAAP), FX rate feeds and regulatory compliance filings.</p>
            </article>
            <article className="why-card">
              <span className="ap-principle-num">LAYER C</span>
              <h3>Task Instructions &amp; Rules</h3>
              <p>Deterministic rules governing how internal and external data interact, which tolerances apply, and what triggers an audit review.</p>
            </article>
          </div>
        </section>

        {/* SECTION 8: ONE AGENT SHOULD NOT DO EVERYTHING */}
        <section className="finance-brain-flow" id="workflow">
          <header>
            <p className="flow-pill">Process Specialization</p>
            <h2>Complex workflows become reliable when responsibilities are narrower.</h2>
          </header>
          <p className="ap-workflow-note" style={{ marginBottom: '40px' }}>
            Reduce the freedom of each component to increase the reliability of the overall process.
          </p>
          <FinanceBrainTimeline stages={agentWorkflowStages} />
          <p className="ap-workflow-note">
            Each stage has a single bounded responsibility with strict input/output contracts. No single agent manages the end-to-end lifecycle alone.
          </p>
        </section>

        {/* SECTION 9: PROMPTS AND SKILLS VS ARCHITECTURE */}
        <section className="section ap-operating-model">
          <p className="eyebrow">Beyond The Model</p>
          <h2>Good instructions cannot replace workflow architecture.</h2>
          <div className="ap-model-story">
            <p>
              Writing longer, more detailed system prompts produces diminishing returns. True enterprise reliability requires integration with databases, deterministic scripts, and permission boundaries.
            </p>
          </div>
          <div className="ap-model-layout">
            <div className="ap-compare">
              <div className="ap-compare-head">
                <span>What Prompt Libraries Define</span>
                <span>What Workflow Architecture Provides</span>
              </div>
              {[
                ['Task description & persona', 'Direct database and ERP API connections'],
                ['Input formatting guidelines', 'Deterministic calculations and mathematical accuracy'],
                ['Reasoning style & guidelines', 'Machine-readable rule execution & schema enforcement'],
                ['Examples of good responses', 'File manipulation, data transformations & exports'],
                ['General tone & formatting', 'Role-based access control & tamper-proof audit trails']
              ].map(([prompt, arch], idx) => (
                <div className="ap-compare-row" key={idx}>
                  <p>{prompt}</p>
                  <p>{arch}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10: AI SHOULD NOT DECIDE PROCESS */}
        <section className="ap-limits-section">
          <div>
            <p className="eyebrow">Control &amp; Consistency</p>
            <h2>Defined finance processes should remain defined.</h2>
            <p className="ap-limits-intro">
              Finance teams spend decades building accounting policies, approval matrices, reconciliation procedures, materiality thresholds and standard operating procedures.
            </p>
            <p className="ap-limits-intro">
              <strong>When these rules already exist, AI should not independently rediscover or invent the process every time a task runs.</strong>
            </p>
            <div className="ap-misnomer" style={{ marginTop: '24px' }}>
              <p className="ap-misnomer-label">Deterministic Rule Example</p>
              <blockquote>Retrieve Entity A → GL 123 → Current Period → Match against Schedule B → Flag differences &gt; $500</blockquote>
              <p>The system executes this exact sequence every time, without model drift.</p>
            </div>
          </div>
          <div>
            <p className="eyebrow">The Tri-Partite Operating Logic</p>
            <div className="ap-principles-cont" style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
              <div className="why-card" style={{ borderLeft: '4px solid var(--sage-500)' }}>
                <span className="ap-principle-num">01</span>
                <h3>Known Rule → Execute Deterministically</h3>
                <p>Calculations, ledger matching, threshold checks, standard routing.</p>
              </div>
              <div className="why-card" style={{ borderLeft: '4px solid var(--signal-500)' }}>
                <span className="ap-principle-num">02</span>
                <h3>Unknown Situation → Reason with AI</h3>
                <p>Document discrepancies, commentary drafting, anomaly interpretation.</p>
              </div>
              <div className="why-card" style={{ borderLeft: '4px solid var(--ink-900)' }}>
                <span className="ap-principle-num">03</span>
                <h3>Material Exception → Escalate to Human</h3>
                <p>Threshold breaches, high-value discrepancies, ambiguous tax positions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 11: CHOOSE RIGHT MODEL */}
        <section className="why-produc8ive">
          <header className="why-header">
            <div>
              <p className="why-pill">Task-Level Optimization</p>
              <h2>Not every task needs the most capable AI model.</h2>
            </div>
            <p>
              Matching the right capability to the specific task reduces latency, minimizes costs, and eliminates hallucination vectors.
            </p>
          </header>
          <div className="ap-judgment-table">
            <div className="ap-judgment-head">
              <span>Finance Task</span>
              <span>Optimal Technology / Model Class</span>
            </div>
            {taskModelMapping.map((item, idx) => (
              <div className="ap-judgment-row" key={idx}>
                <p>{item.task}</p>
                <p><strong>{item.requirement}</strong></p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 12: EXISTING AI TOOLS / ORCHESTRATION */}
        <section className="use-cases-section reverse">
          <div className="use-cases-copy">
            <p className="eyebrow">The Orchestration Era</p>
            <h2>The next stage of AI maturity is orchestration, not replacement.</h2>
            <p className="use-cases-intro">
              Enterprises already have specialized AP software, ERP automation, OCR engines, spreadsheets and LLMs. The challenge is connecting the handoffs between them.
            </p>
            <a className="button secondary" href="#contact">
              Connect Your Existing Stack <b aria-hidden="true">↗</b>
            </a>
          </div>
          <div className="agent-scroll" aria-label="System handoff sequence">
            <div className="agent-track">
              {[
                ['01', 'Invoice Intake', 'AP portal extracts line items and invoice metadata.'],
                ['02', 'ERP Master Lookup', 'Database confirms vendor GSTIN, active status and PO match.'],
                ['03', 'LLM Anomaly Review', 'AI model investigates missing cost-center description.'],
                ['04', 'Workpaper Preparation', 'Deterministic script updates Excel reconciliation sheet.'],
                ['05', 'Email Approval Routing', 'Notification sent to controller with evidence attached.']
              ].map(([num, title, desc]) => (
                <article key={title}>
                  <span>{num}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </div>
                  <i aria-hidden="true">→</i>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 13: RELIABILITY REQUIRES CONTROLLED ACCESS */}
        <section className="ap-limits-section">
          <div>
            <p className="eyebrow">Governance &amp; Relevance</p>
            <h2>AI should see what it needs — and strictly no more.</h2>
            <p className="ap-limits-intro">
              As AI models integrate deeply with corporate systems, granular access control becomes paramount. Unbounded access risks both security breaches and hallucinations caused by irrelevant noise.
            </p>
            <div className="ap-limits-block">
              <ul>
                <li>Role-based and task-scoped permissions</li>
                <li>Segregated knowledge sources per department</li>
                <li>Strict read vs. write separation for ERP postings</li>
                <li>Mandatory two-person sign-off for master data changes</li>
                <li>Immutable, cryptographically verifiable audit logs</li>
              </ul>
            </div>
          </div>
          <div>
            <p className="eyebrow">Explicit Boundary Examples</p>
            <div className="ap-principles-cont" style={{ display: 'grid', gap: '14px', marginTop: '16px' }}>
              <div className="why-card">
                <h3>Payroll Workflow</h3>
                <p>Limited strictly to employee compensation schemas and payroll GLs. Isolated from procurement contracts.</p>
              </div>
              <div className="why-card">
                <h3>Accounts Payable Workflow</h3>
                <p>Limited to vendor masters, purchase orders and invoice lines. Zero access to executive compensation.</p>
              </div>
              <div className="why-card">
                <h3>Tax Compliance Workflow</h3>
                <p>Limited to GSTR returns, sales registers and withholding tables with strict data retention policies.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 14: AI MODEL TO AI SYSTEM (8-LAYER ARCHITECTURE) */}
        <section className="why-produc8ive" id="system-architecture">
          <header className="why-header">
            <div>
              <p className="why-pill">Complete System Architecture</p>
              <h2>Reliable enterprise AI requires 8 interconnected layers.</h2>
            </div>
            <p>
              The LLM is merely one component. Predictable execution requires the full stack working in harmony.
            </p>
          </header>
          <div className="why-grid ap-principles" >
            {architectureLayers.map((layer) => (
              <article className="why-card" key={layer.num}>
                <span className="ap-principle-num">LAYER {layer.num}</span>
                <h3>{layer.title}</h3>
                <p>{layer.description}</p>
              </article>
            ))}
          </div>
          <div className="ap-key-insight" style={{ maxWidth: '1180px', margin: '40px auto 0' }}>
            <p className="eyebrow">The Enterprise AI Formula</p>
            <p>
              Enterprise AI = Rules + Controlled Context + Enterprise Data + Deterministic Tools + AI Reasoning + Orchestration + Human Oversight
            </p>
          </div>
        </section>

        {/* SECTION 15: GOOD ENTERPRISE AI */}
        <section className="workflow-cta-section">
          <div className="workflow-cta-inner">
            <span className="pia-pill">Frictionless Experience</span>
            <h2>The best AI workflow is the one finance teams barely notice.</h2>
            <p>
              Finance teams should not have to open separate chat interfaces for every task. Governing AI operates silently behind ERPs, spreadsheets, email inboxes and reporting portals—delivering prepared decisions where work already happens.
            </p>
            <a className="button primary workflow-cta-btn" href="#contact">
              See How It Works In Your Stack <b aria-hidden="true">↗</b>
            </a>
          </div>
        </section>

        {/* SECTION 16: WORKFLOW DIAGNOSTICS */}
        <section className="ap-faq-section" id="diagnostics">
          <header>
            <p className="eyebrow">Architecture Diagnostics</p>
            <h2>10 Questions to diagnose workflow instability before changing the model</h2>
          </header>
          <div className="accordion ap-faq-accordion">
            {diagnosticQuestions.map((item, index) => (
              <details key={item.category} open={index < 2}>
                <summary>
                  <span><strong>{item.category}:</strong> {item.question}</span>
                  <b>+</b>
                </summary>
                <div className="ap-faq-answer">
                  <p>
                    Ensure your architecture addresses this dimension before upgrading or fine-tuning models. Most instability arises from ambiguous inputs, lack of deterministic rules, or insufficient validation checks rather than model intelligence limits.
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* SECTION 17: MATURITY MODEL */}
        <section className="implementation-journey ap-baseline-section" id="maturity-model">
          <div className="implementation-copy">
            <p className="implementation-pill">Implementation Journey</p>
            <h2>Where is your finance AI implementation today?</h2>
            <p className="implementation-intro">
              Moving from ad-hoc chat tools to governed autonomous operations follows a clear six-stage maturity progression.
            </p>
            <div className="implementation-principles ap-baseline-areas">
              {maturityLevels.map((lvl, idx) => (
                <article key={lvl.level}>
                  <i>{String(idx + 1).padStart(2, '0')}</i>
                  <div>
                    <h3>{lvl.level}</h3>
                    <p>{lvl.value}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="ap-key-insight">
              <p className="eyebrow">Strategic Goal</p>
              <p>
                The objective is Level 5 &amp; 6: where routine processes run by exception, while finance talent focuses on strategy, negotiations, and high-judgment decisions.
              </p>
            </div>
          </div>
          <div className="deployment-stage">
            <div className="deployment-workspace">
              <header>
                <div>
                  <small>AI MATURITY AUDIT</small>
                  <h3>Readiness Benchmark</h3>
                </div>
                <span>Evaluate Stack</span>
              </header>
              <div className="deployment-checklist">
                {maturityLevels.map((lvl) => (
                  <article className={lvl.status} key={lvl.level}>
                    <i aria-hidden="true">{lvl.status === 'complete' ? '✓' : lvl.status === 'progress' ? '◒' : '·'}</i>
                    <div>
                      <h4>{lvl.level.split('—')[0]}</h4>
                      <p>{lvl.value.split('.')[0]}</p>
                    </div>
                    <b>{lvl.status === 'complete' ? 'Active' : lvl.status === 'progress' ? 'In Review' : 'Target'}</b>
                  </article>
                ))}
              </div>
              <footer>
                <div className="readiness-copy">
                  <span>Architecture</span>
                  <strong>Level 04</strong>
                  <i><b style={{ width: '65%' }}></b></i>
                </div>
                <a className="button primary" style={{ padding: '8px 16px', fontSize: '13px' }} href="#contact">
                  Assess Your Maturity <span aria-hidden="true">→</span>
                </a>
              </footer>
            </div>
            <div className="deployment-support">
              <article>
                <small>Governance</small>
                <strong>Zero Unbounded Runs</strong>
              </article>
              <article>
                <small>Integration</small>
                <strong>Bidirectional ERP</strong>
              </article>
              <article>
                <small>Auditability</small>
                <strong>100% Traceable</strong>
              </article>
            </div>
          </div>
        </section>

        {/* SECTION 18: QUESTIONS FOR LEADERS */}
        <section className="why-produc8ive common-problems">
          <header className="why-header">
            <div>
              <p className="why-pill">Leadership Checklist</p>
              <h2>12 Questions finance leaders should ask before the next AI rollout</h2>
            </div>
            <p>A rigorous checklist for CFOs, Controllers, and Transformation heads.</p>
          </header>
          <div className="why-grid ">
            {leaderQuestions.map((q, idx) => (
              <article className="why-card " key={idx}>
                <span className="ap-principle-num">Q{String(idx + 1).padStart(2, '0')}</span>
                <p style={{ fontWeight: 500, color: 'var(--text-primary)', margin: 0, fontSize: '15px', lineHeight: 1.5 }}>
                  {q}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* SECTION 19: THE TAKEAWAY */}
        <section className="ap-limits-section">
          <div>
            <p className="eyebrow">Conclusion</p>
            <h2>AI capability and enterprise reliability are fundamentally different things.</h2>
            <p className="ap-limits-intro">
              Modern AI models are extraordinarily capable. But finance functions operate under a standard of precision and auditability that general-purpose conversations cannot meet.
            </p>
            <div className="ap-key-insight" style={{ marginTop: '24px' }}>
              <p className="eyebrow">Core Principle</p>
              <p>
                A finance process must run hundreds of times across periods, entities, and audits with zero unexplained divergence.
              </p>
            </div>
          </div>
          <div>
            <p className="eyebrow">The Competitive Divide</p>
            <p className="ap-stakes" style={{ borderTop: 0, paddingTop: 0 }}>
              The organisations that move furthest with AI will not be those that simply deploy the largest models. They will be the ones that master where AI should reason, where software should execute, and where people must decide.
            </p>
            <div style={{ marginTop: '30px' }}>
              <a className="button primary" href="#contact">
                Build Predictable Finance AI <b aria-hidden="true">→</b>
              </a>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <ContactSection />
        <GuideFooter />
      </main>
    </div>
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
        <p className="eyebrow">Architect Your Workflow</p>
        <h2>Let's discuss how to build predictable, reliable AI into your finance operations.</h2>
        <p>
          Share your current workflow challenges, and we'll show you how to structure deterministic controls and governed AI reasoning.
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
          What finance workflows are you looking to automate reliably?
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
