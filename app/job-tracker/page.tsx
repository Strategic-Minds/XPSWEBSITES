const summaryItems = [
  ["Estimate Received", "Digital Bid intake, uploads, measurements, and finish choices are attached to the job."],
  ["Proposal Path", "The estimate is reviewed, the proposal is emailed, and the customer gets the next approval step."],
  ["Payment Link", "After proposal approval, the payment link is sent before temporary tracker access is released."],
  ["Tracker Access", "Once payment is received, temporary sign-in details open the full project tracking view."]
];

const trackerTimeline = [
  ["01", "Digital Bid Submitted", "Customer details, floor measurements, existing covering, concrete condition, colors, and images are received."],
  ["02", "Estimator Review", "Jeremy reviews the package, checks finish fit, and prepares the warranty-backed proposal."],
  ["03", "Proposal Emailed", "The proposal is delivered by email with project scope, warranty information, and the payment link path."],
  ["04", "Payment Confirmed", "After payment, the customer receives temporary job tracker sign-in information."],
  ["05", "Install Scheduled", "Schedule, prep checklist, finish selections, documents, and messages stay attached to the job."],
  ["06", "Warranty & Care", "Warranty details, care instructions, photos, and completion notes remain available after install."]
];

export default function JobTrackerPage() {
  return (
    <main className="portal-login-page job-tracker-preview-page">
      <header className="portal-login-header">
        <a href="/" aria-label="Back to Phoenix Epoxy Pros">
          <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" />
        </a>
        <a className="portal-home-link" href="/digital-estimator">Start digital bid</a>
      </header>

      <section className="portal-login-hero" aria-label="XPS job tracker system preview">
        <div className="portal-login-copy">
          <span className="section-kicker">Job Tracker System</span>
          <h1>Immediate project visibility after the Digital Bid.</h1>
          <p>
            This temporary tracker preview shows the client experience we are building: estimate status, proposal handoff,
            payment link follow-up, temporary sign-in delivery, schedule checkpoints, warranty information, and care details.
          </p>
          <div className="portal-proof-row" aria-label="Tracker highlights">
            <span>Proposal status</span>
            <span>Payment link path</span>
            <span>Temporary sign-in</span>
            <span>Warranty records</span>
          </div>
        </div>

        <aside className="portal-login-panel job-tracker-summary-panel">
          <p className="portal-panel-eyebrow">Client tracking preview</p>
          <h2>Current Job</h2>
          <ul>
            {summaryItems.map(([title, text]) => (
              <li key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="job-tracker-dashboard" aria-label="Tracker dashboard timeline">
        <div className="job-tracker-dashboard-inner">
          <article className="job-tracker-ticket">
            <span className="job-tracker-status-pill">Preview Mode</span>
            <h2>Digital Bid to Installed Floor</h2>
            <dl>
              <dt>Client</dt>
              <dd>Temporary customer account after payment</dd>
              <dt>Estimate</dt>
              <dd>Guaranteed 24-hour review path</dd>
              <dt>Discount</dt>
              <dd>15% Digital Estimator coupon attached</dd>
              <dt>Next Step</dt>
              <dd>Proposal email, payment link, then tracker access</dd>
            </dl>
          </article>

          <ol className="job-tracker-timeline">
            {trackerTimeline.map(([number, title, text]) => (
              <li key={title}>
                <strong>{number} / {title}</strong>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
