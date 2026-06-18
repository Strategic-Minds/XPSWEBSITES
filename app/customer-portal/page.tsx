export default function CustomerPortalSignInPage() {
  return (
    <main className="plain-page">
      <a href="/" className="back-link">Back to Phoenix Epoxy Pros</a>
      <section className="plain-panel" aria-labelledby="portal-sign-in-title">
        <p className="eyebrow">Customer portal</p>
        <h1 id="portal-sign-in-title">Portal Sign In</h1>
        <p>
          Sign in to review project status, approved finish selections, proposals, scheduling notes, documents,
          messages, care guides, warranty information, and follow-up items connected to your floor project.
        </p>
        <form className="estimate-card" aria-label="Customer portal sign in">
          <div className="form-head">
            <span>Secure project access</span>
            <h2>Sign In</h2>
            <p>Portal access is issued after estimate and project setup.</p>
          </div>
          <label className="form-field">
            <span>Email Address</span>
            <input type="email" placeholder="name@example.com" autoComplete="email" />
          </label>
          <label className="form-field">
            <span>Password</span>
            <input type="password" placeholder="Password" autoComplete="current-password" />
          </label>
          <button className="gold-button form-submit" type="button">Sign In</button>
          <p className="form-status idle" aria-live="polite">
            Need access? Use the estimate form or contact the project team so your account can be prepared.
          </p>
        </form>
        <p className="notice">
          Customer dashboard, documents, and messages must stay behind this portal entry and should not appear as
          public homepage navigation.
        </p>
      </section>
    </main>
  );
}
