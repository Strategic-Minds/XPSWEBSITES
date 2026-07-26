'use client';

import { FormEvent, useState } from 'react';

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

export function PhoenixLeadForm() {
  const [state, setState] = useState<SubmissionState>('idle');
  const [message, setMessage] = useState('');

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('submitting');
    setMessage('');

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('/api/lead-preview', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok?: boolean; message?: string };
      if (!response.ok || !result.ok) throw new Error(result.message || 'Request could not be saved.');
      form.reset();
      setState('success');
      setMessage(result.message || 'Your Phoenix project request was validated for the preview queue.');
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'Request could not be saved.');
    }
  }

  return (
    <form className="digital-bid-form" id="digital-bid-form" onSubmit={submitLead}>
      <div className="form-grid two">
        <label>Full name<input name="name" autoComplete="name" required /></label>
        <label>Phone<input name="phone" type="tel" autoComplete="tel" required /></label>
      </div>
      <div className="form-grid two">
        <label>Email<input name="email" type="email" autoComplete="email" required /></label>
        <label>Project ZIP<input name="zip" inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}" required /></label>
      </div>
      <div className="form-grid three">
        <label>Approx. square feet<input name="squareFeet" inputMode="numeric" placeholder="650" /></label>
        <label>Floor system<select name="finish" defaultValue="Epoxy flake"><option>Epoxy flake</option><option>Metallic epoxy</option><option>Polished concrete</option><option>Stained concrete</option><option>Concrete countertop</option><option>Concrete overlayment</option></select></label>
        <label>Timeline<select name="timeline" defaultValue="Within 30 days"><option>ASAP</option><option>Within 30 days</option><option>1-3 months</option><option>Planning / budgeting</option></select></label>
      </div>
      <label>Project notes<textarea name="notes" rows={4} placeholder="Tell us about the floor, desired look, surface condition, and timing." /></label>
      <label className="consent-row"><input name="consent" type="checkbox" value="yes" required /><span>I agree that this Preview may validate my request without sending it to a live sales system.</span></label>
      <div className="form-actions">
        <button type="submit" disabled={state === 'submitting'}>{state === 'submitting' ? 'Validating Request…' : 'Start My Free Phoenix Quote'}</button>
        <a href="https://xtremepolishingsystems.com/pages/color-charts" target="_blank" rel="noopener noreferrer">View XPS Color Charts</a>
      </div>
      <div className={`form-status ${state}`} role="status" aria-live="polite">{message}</div>
    </form>
  );
}
