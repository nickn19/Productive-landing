const visuals = {
  capture: <div className="capture-workspace" aria-hidden="true"><header><span>Finance intake</span><b>● Live</b></header><div className="capture-flow"><div className="source-list"><span><i>@</i>Email<small>6 new</small></span><span><i>▤</i>Invoices<small>8 files</small></span><span><i>▥</i>Statements<small>4 files</small></span></div><div className="flow-connector"><i></i><b>→</b></div><div className="intake-result"><small>STRUCTURED INTAKE</small><strong>18 items ready</strong><span>Classified <b>18</b></span><span>Fields extracted <b>96%</b></span><em>Ready to validate</em></div></div></div>,
  validate: <div className="validation-workspace" aria-hidden="true"><header><span>Document validation</span><b>3 checks passed</b></header><div className="validation-panels"><div className="document-preview"><small>INVOICE / 1842</small><strong>Northstar Supply</strong><span>Invoice total <b>£12,480</b></span><span>PO reference <b>PO-7741</b></span><i></i><i></i></div><div className="check-list"><span><i>✓</i><b>Supplier matched</b><small>Vendor master</small></span><span><i>✓</i><b>Totals checked</b><small>Within tolerance</small></span><span className="check-flag"><i>!</i><b>Approval missing</b><small>Review required</small></span></div></div></div>,
  coordinate: <div className="coordination-workspace" aria-hidden="true"><header><span>Month-end workflow</span><b>3 owners</b></header><div className="coordination-board"><span><i>✓</i><b>AP review</b><small>Finance Ops</small><em>Complete</em></span><span><i>2</i><b>Controller approval</b><small>J. Morgan</small><em>In review</em></span><span><i>3</i><b>ERP posting</b><small>System queue</small><em>Waiting</em></span></div><footer><span>Dependency tracked</span><b>No blockers</b></footer></div>,
  deliver: <div className="deliver-visual" aria-hidden="true"><span><small>MONTH-END WORKPAPER</small><b>Review-ready</b><i></i><i></i><i></i></span><em>Evidence attached</em></div>
}

export default function FinanceBrainTimeline({ stages }) {
  return <div className="flow-timeline">{stages.map(([type, label, title, description]) => <article className="timeline-item" key={title}>
    <div className={`flow-card-visual ${type}`}>{visuals[type]}</div>
    <span className="timeline-node" aria-hidden="true"><i></i></span>
    <div className="flow-card-copy"><p className="timeline-stage">{label}</p><h3>{title}</h3><p>{description}</p></div>
  </article>)}</div>
}
