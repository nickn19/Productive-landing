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
  'Why does AI take a different route when the finance process is already defined?',
  'Why do workflows that succeed in pilots become unreliable at scale?',
  'Why are expensive models being used for relatively simple tasks? ',
]

const aiUseCases = [
  'Interpret documents',
  'Understand ambiguous information',
  'Explain anomalies',
  'Investigate exceptions',
  'Prepare commentary',
]

const nonAITasks = [
  'Retrieve records',
  'Filter data',
  'Perform calculations',
  'Apply predefined rules',
  'Validate defined conditions',
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
   { title: 'SOPs & Guidelines', desc: 'Month-end close checklists, journal entry posting procedures.' },
  
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
  { num: '1', title: 'Rules & Controls', description: 'Policies, SOPs, tolerances, approvals.' },
  { num: '2', title: 'Business Context', description: 'Enterprise knowledge, historical decisions and authorised external information.' },
  { num: '3', title: 'Systems & Data', description: 'ERP, email, spreadsheets, documents and operational systems.' },
  { num: '4', title: 'Execution & Reasoning', description: 'Deterministic computation where rules are known; AI where interpretation is required.' },
  { num: '5', title: 'Human Oversight', description: 'Exceptions, judgment, approvals and accountability.' },
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

function StepRetrieveGraphic() {
  return (
    <svg width="120" height="95" viewBox="0 0 120 95" fill="none" xmlns="http://www.w3.org/2000/svg" className="step-graphic-svg" aria-label="Retrieve Document">
      <defs>
        <filter id="c1-shadow" x="0" y="0" width="120" height="95" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#171717" floodOpacity="0.08" />
        </filter>
        <linearGradient id="folderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e3c287" />
          <stop offset="100%" stopColor="#cf9f54" />
        </linearGradient>
        <linearGradient id="paperGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f7f4ed" />
        </linearGradient>
      </defs>
      <g transform="rotate(-6 35 55)">
        <path d="M18 29 C18 26 20 24 23 24 L34 24 L40 28 L60 28 C62 28 64 30 64 32 L64 78 C64 80 62 82 60 82 L22 82 C20 82 18 80 18 78 Z" fill="url(#folderGrad)" />
      </g>
      <rect x="28" y="16" width="50" height="64" rx="4" fill="#ede7db" stroke="#ded6c8" strokeWidth="1" transform="rotate(-2 53 48)" />
      <g filter="url(#c1-shadow)">
        <rect x="36" y="10" width="54" height="70" rx="6" fill="url(#paperGrad)" stroke="#e4ded3" strokeWidth="1" />
        <rect x="76" y="7" width="8" height="9" rx="2" fill="#3d4e43" />
        <circle cx="80" cy="11" r="1" fill="#8cb99c" />
        <text x="44" y="26" fill="#171717" fontSize="7" fontWeight="800" letterSpacing="0.4" fontFamily="Inter, sans-serif">INVOICE</text>
        <rect x="44" y="34" width="38" height="2.5" rx="1.25" fill="#8d8980" />
        <rect x="44" y="40" width="28" height="2" rx="1" fill="#cbcfc7" />
        <rect x="44" y="45" width="34" height="2" rx="1" fill="#cbcfc7" />
        <rect x="44" y="50" width="20" height="2" rx="1" fill="#cbcfc7" />
        <rect x="44" y="58" width="38" height="1" fill="#e5dfd5" />
        <rect x="44" y="64" width="16" height="2" rx="1" fill="#58685e" />
        <rect x="66" y="64" width="16" height="2" rx="1" fill="#171717" />
      </g>
    </svg>
  )
}

function StepValidateGraphic() {
  return (
    <svg width="120" height="95" viewBox="0 0 120 95" fill="none" xmlns="http://www.w3.org/2000/svg" className="step-graphic-svg" aria-label="Validate Profile">
      <defs>
        <filter id="c2-shadow" x="0" y="0" width="120" height="95" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#171717" floodOpacity="0.08" />
        </filter>
        <linearGradient id="winGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#faf7f2" />
          <stop offset="100%" stopColor="#eae4d8" />
        </linearGradient>
        <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
          <stop offset="100%" stopColor="rgba(230,240,245,0.25)" />
        </linearGradient>
      </defs>
      <g filter="url(#c2-shadow)">
        <rect x="20" y="14" width="76" height="62" rx="8" fill="url(#winGrad)" stroke="#dcd4c6" strokeWidth="1" />
        <rect x="20" y="14" width="76" height="12" rx="8" fill="#dfd8cb" />
        <rect x="20" y="22" width="76" height="4" fill="#dfd8cb" />
        <circle cx="84" cy="20" r="1.5" fill="#a49e91" />
        <circle cx="89" cy="20" r="1.5" fill="#a49e91" />
        <circle cx="40" cy="45" r="12" fill="#ded7ca" stroke="#c5beaf" strokeWidth="1" />
        <circle cx="40" cy="42" r="4.5" fill="#5a5e5a" />
        <path d="M32 53 C32 48 35 47 40 47 C45 47 48 48 48 53 Z" fill="#5a5e5a" />
        <rect x="58" y="38" width="28" height="3" rx="1.5" fill="#8d8980" />
        <rect x="58" y="46" width="20" height="2.5" rx="1.25" fill="#b8b2a5" />
        <rect x="58" y="53" width="24" height="2" rx="1" fill="#cfc9bd" />
        <rect x="30" y="64" width="56" height="2" rx="1" fill="#e0d9cc" />
      </g>
      <g transform="translate(68, 38) rotate(-10)">
        <circle cx="16" cy="16" r="13" fill="url(#glassGrad)" stroke="#1e2220" strokeWidth="3.5" />
        <circle cx="16" cy="16" r="11" stroke="rgba(255,255,255,0.6)" strokeWidth="1" fill="none" />
        <ellipse cx="12" cy="12" rx="4" ry="2" fill="rgba(255,255,255,0.5)" transform="rotate(-30 12 12)" />
        <path d="M26 26 L38 38" stroke="#1e2220" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M26 26 L29 29" stroke="#8d8980" strokeWidth="5.5" />
      </g>
    </svg>
  )
}

function StepCalculateGraphic() {
  return (
    <svg width="120" height="95" viewBox="0 0 120 95" fill="none" xmlns="http://www.w3.org/2000/svg" className="step-graphic-svg" aria-label="Calculate Ledger">
      <defs>
        <filter id="c3-shadow" x="0" y="0" width="120" height="95" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#171717" floodOpacity="0.08" />
        </filter>
        <linearGradient id="calcGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c7dcd0" />
          <stop offset="100%" stopColor="#9fb6a7" />
        </linearGradient>
        <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2c3b32" />
          <stop offset="100%" stopColor="#1e2922" />
        </linearGradient>
      </defs>
      <g filter="url(#c3-shadow)">
        <rect x="46" y="10" width="58" height="68" rx="6" fill="#ffffff" stroke="#ded6c7" strokeWidth="1" />
        <text x="96" y="24" fill="#242b26" fontSize="6.5" fontWeight="700" textAnchor="end" fontFamily="Inter, sans-serif">1,24,50,000</text>
        <text x="96" y="34" fill="#4d5550" fontSize="6.5" fontWeight="600" textAnchor="end" fontFamily="Inter, sans-serif">12,450</text>
        <text x="96" y="44" fill="#4d5550" fontSize="6.5" fontWeight="600" textAnchor="end" fontFamily="Inter, sans-serif">3,000</text>
        <line x1="56" y1="50" x2="96" y2="50" stroke="#e0dad0" strokeWidth="1" strokeDasharray="2 2" />
      </g>
      <g filter="url(#c3-shadow)">
        <rect x="16" y="16" width="40" height="58" rx="8" fill="url(#calcGrad)" stroke="#8da394" strokeWidth="1" />
        <rect x="22" y="22" width="28" height="11" rx="3" fill="url(#screenGrad)" />
        <rect x="24" y="25" width="8" height="2" rx="1" fill="#7ba58b" opacity="0.8" />
        <rect x="22" y="38" width="7" height="6" rx="2" fill="#1b2820" />
        <rect x="32.5" y="38" width="7" height="6" rx="2" fill="#1b2820" />
        <rect x="43" y="38" width="7" height="6" rx="2" fill="#1b2820" />
        <rect x="22" y="47" width="7" height="6" rx="2" fill="#1b2820" />
        <rect x="32.5" y="47" width="7" height="6" rx="2" fill="#1b2820" />
        <rect x="43" y="47" width="7" height="6" rx="2" fill="#1b2820" />
        <rect x="22" y="56" width="7" height="6" rx="2" fill="#1b2820" />
        <rect x="32.5" y="56" width="7" height="6" rx="2" fill="#1b2820" />
        <rect x="43" y="56" width="7" height="6" rx="2" fill="#3f614d" />
      </g>
      <g transform="translate(84, 54)">
        <circle cx="10" cy="10" r="10" fill="#58946f" stroke="#ffffff" strokeWidth="1.5" />
        <path d="M6 10 L8.5 12.5 L13.5 7.5" stroke="#ffffff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

function StepInvestigateGraphic() {
  return (
    <svg width="120" height="95" viewBox="0 0 120 95" fill="none" xmlns="http://www.w3.org/2000/svg" className="step-graphic-svg" aria-label="Investigate Exception">
      <defs>
        <filter id="c4-shadow" x="0" y="0" width="120" height="95" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#171717" floodOpacity="0.08" />
        </filter>
        <filter id="alertGlow" x="0" y="0" width="60" height="60" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#e63946" floodOpacity="0.3" />
        </filter>
        <linearGradient id="alertGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff7b72" />
          <stop offset="100%" stopColor="#e63946" />
        </linearGradient>
      </defs>
      <rect x="24" y="20" width="62" height="58" rx="6" fill="#e8e2d5" stroke="#ded6c7" strokeWidth="1" />
      <g filter="url(#c4-shadow)">
        <rect x="32" y="14" width="58" height="66" rx="6" fill="#ffffff" stroke="#ded8cc" strokeWidth="1" />
        <rect x="40" y="24" width="24" height="3" rx="1.5" fill="#55524e" />
        <rect x="40" y="32" width="34" height="2.5" rx="1.25" fill="#55524e" />
        <rect x="40" y="39" width="40" height="2.5" rx="1.25" fill="#9e988e" />
        <rect x="40" y="46" width="36" height="2.5" rx="1.25" fill="#9e988e" />
        <rect x="40" y="53" width="28" height="2.5" rx="1.25" fill="#363937" />
        <rect x="40" y="60" width="38" height="2.5" rx="1.25" fill="#c7c1b5" />
        <rect x="40" y="67" width="18" height="2.5" rx="1.25" fill="#55524e" />
      </g>
      <g transform="translate(68, 8)" filter="url(#alertGlow)">
        <path d="M16 3 C17.5 0.5 20.5 0.5 22 3 L34 23 C35.5 25.5 34 29 31 29 L7 29 C4 29 2.5 25.5 4 23 Z" fill="url(#alertGrad)" />
        <rect x="18" y="10" width="2.5" height="9" rx="1.25" fill="#ffffff" />
        <circle cx="19.25" cy="23" r="1.5" fill="#ffffff" />
      </g>
    </svg>
  )
}

function StepExplainGraphic() {
  return (
    <svg width="120" height="95" viewBox="0 0 120 95" fill="none" xmlns="http://www.w3.org/2000/svg" className="step-graphic-svg" aria-label="Explain Reasoning">
      <defs>
        <filter id="c5-shadow" x="0" y="0" width="120" height="95" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#171717" floodOpacity="0.08" />
        </filter>
        <filter id="starGlow" x="0" y="0" width="50" height="50" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#3b82f6" floodOpacity="0.35" />
        </filter>
        <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      <g transform="translate(24, 12)" filter="url(#c5-shadow)">
        <rect x="0" y="0" width="58" height="42" rx="7" fill="#f4f0e6" stroke="#ded6c6" strokeWidth="1" />
        <rect x="8" y="10" width="22" height="3" rx="1.5" fill="#58544e" />
        <rect x="8" y="17" width="34" height="2.5" rx="1.25" fill="#a09a8f" />
        <rect x="8" y="24" width="28" height="2.5" rx="1.25" fill="#a09a8f" />
      </g>
      <g transform="translate(34, 28)" filter="url(#c5-shadow)">
        <rect x="0" y="0" width="60" height="48" rx="8" fill="#ffffff" stroke="#ded7cb" strokeWidth="1" />
        <rect x="8" y="12" width="38" height="3" rx="1.5" fill="#5a5650" />
        <rect x="8" y="19" width="44" height="2.5" rx="1.25" fill="#888277" />
        <rect x="8" y="26" width="32" height="2.5" rx="1.25" fill="#c2bcb0" />
        <rect x="8" y="33" width="22" height="2.5" rx="1.25" fill="#c2bcb0" />
      </g>
      <g transform="translate(80, 24)" filter="url(#starGlow)">
        <path d="M11 0 C11 5.5 16.5 11 22 11 C16.5 11 11 16.5 11 22 C11 16.5 5.5 11 0 11 C5.5 11 11 5.5 11 0 Z" fill="url(#starGrad)" />
        <circle cx="21" cy="3" r="2" fill="#93c5fd" />
      </g>
    </svg>
  )
}

function StepReviewGraphic() {
  return (
    <svg width="120" height="95" viewBox="0 0 120 95" fill="none" xmlns="http://www.w3.org/2000/svg" className="step-graphic-svg" aria-label="Review and Approve">
      <defs>
        <filter id="c6-shadow" x="0" y="0" width="120" height="95" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#171717" floodOpacity="0.08" />
        </filter>
        <filter id="btnShadow" x="0" y="0" width="80" height="50" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#1b2820" floodOpacity="0.25" />
        </filter>
        <linearGradient id="approveBtnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#415448" />
          <stop offset="100%" stopColor="#2c3a31" />
        </linearGradient>
      </defs>
      <g filter="url(#c6-shadow)">
        <rect x="26" y="10" width="68" height="62" rx="10" fill="#ffffff" stroke="#ded8cb" strokeWidth="1" />
        <g transform="translate(48, 18)">
          <circle cx="12" cy="12" r="12" fill="#edf2ee" stroke="#d3ded5" strokeWidth="1" />
          <circle cx="12" cy="9" r="4.5" fill="#2d3b32" />
          <path d="M4 20 C4 15 7 14 12 14 C17 14 20 15 20 20 Z" fill="#2d3b32" />
          <circle cx="20" cy="18" r="5.5" fill="#4d8262" stroke="#ffffff" strokeWidth="1.2" />
          <path d="M18 18 L19.5 19.5 L22.5 16.5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      <g transform="translate(30, 48)" filter="url(#btnShadow)">
        <rect x="0" y="0" width="60" height="24" rx="6" fill="url(#approveBtnGrad)" stroke="#52685a" strokeWidth="1" />
        <text x="30" y="16" fill="#ffffff" fontSize="9" fontWeight="700" textAnchor="middle" letterSpacing="0.3" fontFamily="Inter, sans-serif">Approve</text>
      </g>
    </svg>
  )
}

const pipelineStepsData = [
  {
    num: 1,
    title: 'Retrieve',
    description: 'Get the right data from the relevant systems.',
    graphic: <StepRetrieveGraphic />
  },
  {
    num: 2,
    title: 'Validate',
    description: 'Check completeness, accuracy and applicability.',
    graphic: <StepValidateGraphic />
  },
  {
    num: 3,
    title: 'Calculate',
    description: 'Perform defined calculations and reconciliations.',
    graphic: <StepCalculateGraphic />
  },
  {
    num: 4,
    title: 'Investigate',
    description: 'Analyse exceptions and identify likely causes.',
    graphic: <StepInvestigateGraphic />
  },
  {
    num: 5,
    title: 'Explain',
    description: 'Prepare clear explanations and context.',
    graphic: <StepExplainGraphic />
  },
  {
    num: 6,
    title: 'Review',
    description: 'Route for approval and ensure accountability.',
    graphic: <StepReviewGraphic />
  }
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
                <h3>The question has moved from “Can AI do it?” to “Can we rely on it?” </h3>
                <p>
               Many finance teams already have access to powerful AI models, copilots, enterprise data and workflow tools. Some have gone further — building prompts, skills and integrations into ERP systems.Yet a different set of problems is emerging.
                </p>
              </div>

              <div className="ap-misnomer">
                <p className="ap-misnomer-label">The Misconception</p>
                <blockquote>“We have an enterprise LLM subscription, so AI automation is handled.”</blockquote>
               
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
                Enterprise AI becomes reliable when intelligence is supported by well-designed workflows, clear rules and strong governance.
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
              <h2>Not every finance task needs AI reasoning </h2>
            </div>
            <p>
Some tasks require interpretation and judgment. Others simply require the system to follow a defined rule correctly every time.             </p>
          </header>
          <div className="ap-judgment-table">
            <div className="ap-judgment-head">
              <span>Use AI where judgment is required</span>
              <span>Use rules where consistency is required</span>
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
              <h2>Different workflows require different knowledge — and clear boundaries between them. </h2>
            </div>
            <p>
More knowledge does not always mean better outcomes. Each workflow should access only the information relevant to the task it is designed to perform.             </p>
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

        {/* NEW SECTION: PREDICTABLE WORKFLOW PIPELINE (NARROWER TASKS, CLEARER RULES) */}
        <section className="predictable-pipeline-section finance-brain-flow" id="process-pipeline">
          <header>
            <p className="flow-pill">Process Specialization</p>
            <h2>Complex workflows become reliable when responsibilities are narrower.</h2>
          </header>
          <p className="ap-workflow-note" style={{ marginBottom: '40px' }}>
            Reduce the freedom of each component to increase the reliability of the overall process.
          </p>
          <div className="pipeline-canvas-wrapper">
           
            <div className="pipeline-scroll-area">
              <div className="pipeline-steps-row">
                {pipelineStepsData.map((step, idx) => (
                  <React.Fragment key={step.title}>
                    <div className="pipeline-step-item">
                      <div className="pipeline-visual-box">{step.graphic}</div>
                      <div className="pipeline-card-body">
                        <span className="pipeline-num-badge">{step.num}</span>
                        <h3 className="pipeline-step-title">{step.title}</h3>
                        <p className="pipeline-step-desc">{step.description}</p>
                      </div>
                    </div>
                    {idx < pipelineStepsData.length - 1 && (
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

              {/* Exception Routing Branch */}
              <div className="pipeline-exception-area">
                <svg className="pipeline-dashed-curve" viewBox="0 0 160 52" fill="none" aria-hidden="true">
                  <path d="M155 38 H60 C30 38 15 28 15 8" stroke="#bda581" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                  <path d="M11 14 L15 6 L19 14" stroke="#bda581" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>

                <div className="pipeline-exception-center">
                  <div className="pipeline-down-indicator" aria-hidden="true">
                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                      <path d="M8 1 V13 M3.5 9 L8 13.5 L12.5 9" stroke="#998971" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="pipeline-exception-pill">
                    <div className="pipeline-alert-icon">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <defs>
                          <filter id="alertIconGlow" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse">
                            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#e63946" floodOpacity="0.25" />
                          </filter>
                        </defs>
                        <path d="M14 3 C15.2 1.5 17.2 1.5 18.4 3 L25.5 17 C26.7 19 25.5 22 23 22 L5 22 C2.5 22 1.3 19 2.5 17 Z" fill="#ff7675" filter="url(#alertIconGlow)" />
                        <path d="M14 4 L24.5 19 H3.5 Z" fill="#eb4d4b" opacity="0.85" />
                        <rect x="13.2" y="9" width="1.6" height="6" rx="0.8" fill="#ffffff" />
                        <circle cx="14" cy="17.5" r="1" fill="#ffffff" />
                      </svg>
                    </div>
                    <div className="pipeline-exception-meta">
                      <span className="pipeline-exception-sub">If something doesn't match</span>
                      <strong className="pipeline-exception-main">Handle as an exception</strong>
                    </div>
                  </div>
                </div>

                <svg className="pipeline-dashed-curve" viewBox="0 0 160 52" fill="none" aria-hidden="true">
                  <path d="M5 38 H100 C130 38 145 28 145 8" stroke="#bda581" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                  <path d="M141 14 L145 6 L149 14" stroke="#bda581" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>

            
            </div>
              {/* Bottom Rule Pill */}
              <div className="pipeline-bottom-banner">
                <span className="pipeline-gear-badge" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </span>
                <p className="pipeline-bottom-text">Narrower tasks. Clearer rules. More predictable outcomes.</p>
              </div>
          </div>
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
              <h2>Reliable enterprise AI requires 5 interconnected layers.</h2>
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
