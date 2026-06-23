// app/digital-estimator/page.tsx — Phase 3: Digital Estimator
// 'use client' — reads URL params for prefill, handles form submission
'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const FINISH_COLORS: Record<string, string[]> = {
  flake: ['Domino (Black/White/Gray)', 'Silver Storm', 'Espresso', 'Sandstone', 'Coastal Blue', 'Custom Blend'],
  metallic: ['Midnight Blue', 'Brushed Nickel', 'Copper Vein', 'Obsidian', 'Champagne Gold', 'Pearl White'],
  quartz: ['Arctic White', 'Battleship Gray', 'Desert Tan', 'Onyx Black'],
  solid: ['Safety Red', 'Industrial Gray', 'Bright White', 'Hunter Green', 'Royal Blue'],
  glitter: ['Stardust Silver', 'Rose Gold', 'Sapphire Blue', 'Emerald Green'],
  stain: ['Chestnut Brown', 'Walnut', 'Slate Blue', 'Terracotta'],
  polished: ['Natural Gray', 'Salt & Pepper', 'Exposed Aggregate'],
};

function EstimatorForm() {
  const params = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    zipCode: '',
    address: '',
    floorMeasurements: '',
    projectType: '',
    existingFloorCovering: '',
    concreteCondition: '',
    desiredFinish: '',
    desiredColor: '',
    asapRequested: false,
    preferredTimeline: '',
    notes: '',
    whatsappConsent: true,
  });

  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Prefill from URL params
  useEffect(() => {
    setForm(prev => ({
      ...prev,
      fullName:     params.get('fullName') || params.get('name') || prev.fullName,
      email:        params.get('email') || prev.email,
      phone:        params.get('phone') || prev.phone,
      zipCode:      params.get('zipCode') || params.get('zip') || prev.zipCode,
      projectType:  params.get('projectType') || params.get('type') || prev.projectType,
    }));
  }, [params]);

  const set = (k: string, v: string | boolean) =>
    setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone || !form.zipCode || !form.projectType) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    setStatus('submitting');
    setErrorMsg('');
    try {
      const payload = {
        ...form,
        attachmentCount: files.length,
        attachmentPaths: [] as string[],
        source: 'estimator',
      };
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok || res.status < 500) {
        setStatus('success');
        const leadId = data.leadId || data.id || 'new';
        setTimeout(() => {
          window.location.href = `/customer-portal/dashboard?lead=${leadId}&name=${encodeURIComponent(form.fullName)}`;
        }, 1800);
      } else {
        throw new Error(data.error || 'Submission failed');
      }
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="de-success">
        <div className="de-success-icon">✅</div>
        <h2>You're All Set!</h2>
        <p>Your estimate request has been received. Jeremy will review your project and send a detailed proposal within <strong>24 hours</strong>.</p>
        <p className="de-success-sub">Redirecting you to your Client Portal…</p>
      </div>
    );
  }

  return (
    <form className="de-form" onSubmit={handleSubmit} noValidate>
      {/* ── SECTION 1: Contact Info ── */}
      <div className="de-section">
        <div className="de-section-num">1</div>
        <div className="de-section-body">
          <h2 className="de-section-title">Contact Information</h2>
          <div className="de-grid-2">
            <div className="de-field">
              <label>Full Name <span className="de-req">*</span></label>
              <input name="fullName" type="text" placeholder="John Smith"
                value={form.fullName} onChange={e => set('fullName', e.target.value)} required />
            </div>
            <div className="de-field">
              <label>Phone Number <span className="de-req">*</span></label>
              <input name="phone" type="tel" placeholder="(602) 555-0100"
                value={form.phone} onChange={e => set('phone', e.target.value)} required />
            </div>
            <div className="de-field">
              <label>Email Address <span className="de-req">*</span></label>
              <input type="email" name="email" placeholder="you@email.com"
                value={form.email} onChange={e => set('email', e.target.value)} required />
            </div>
            <div className="de-field">
              <label>ZIP Code <span className="de-req">*</span></label>
              <input name="zipCode" type="text" placeholder="85001" maxLength={5}
                value={form.zipCode} onChange={e => set('zipCode', e.target.value)} required />
            </div>
            <div className="de-field de-full">
              <label>Project Address</label>
              <input name="address" type="text" placeholder="123 N Main St, Phoenix AZ 85001"
                value={form.address} onChange={e => set('address', e.target.value)} />
            </div>
          </div>
          <label className="de-check">
            <input type="checkbox" checked={form.whatsappConsent}
              onChange={e => set('whatsappConsent', e.target.checked)} />
            <span>Send me WhatsApp updates about my estimate</span>
          </label>
        </div>
      </div>

      {/* ── SECTION 2: Project Details ── */}
      <div className="de-section">
        <div className="de-section-num">2</div>
        <div className="de-section-body">
          <h2 className="de-section-title">Project Details</h2>
          <div className="de-grid-2">
            <div className="de-field">
              <label>Project Type <span className="de-req">*</span></label>
              <select name="projectType" value={form.projectType}
                onChange={e => set('projectType', e.target.value)} required>
                <option value="">Select type…</option>
                <option value="Garage Floors">Garage Floor Coating</option>
                <option value="Commercial Floors">Commercial Floor System</option>
                <option value="Patio / Outdoor">Patio or Outdoor Space</option>
                <option value="Basement">Basement Floor</option>
                <option value="Repair & Prep">Concrete Repair & Prep</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="de-field">
              <label>Approx. Square Footage</label>
              <input name="floorMeasurements" type="text" placeholder="e.g. 500 sq ft"
                value={form.floorMeasurements} onChange={e => set('floorMeasurements', e.target.value)} />
            </div>
            <div className="de-field">
              <label>Existing Floor Covering</label>
              <select name="existingFloorCovering" value={form.existingFloorCovering}
                onChange={e => set('existingFloorCovering', e.target.value)}>
                <option value="">Select…</option>
                <option value="Bare Concrete">Bare Concrete</option>
                <option value="Paint">Paint / Existing Coating</option>
                <option value="Laminate">Laminate</option>
                <option value="Tile">Tile</option>
                <option value="VCT">VCT</option>
                <option value="Peeling Epoxy">Peeling Epoxy</option>
                <option value="Carpet">Carpet</option>
              </select>
            </div>
            <div className="de-field">
              <label>Concrete Condition</label>
              <select name="concreteCondition" value={form.concreteCondition}
                onChange={e => set('concreteCondition', e.target.value)}>
                <option value="">Select…</option>
                <option value="New">New — No cracks</option>
                <option value="Fair">Fair — Some cracks</option>
                <option value="Bad">Poor — Cracks &amp; holes</option>
              </select>
            </div>
          </div>

          {/* ASAP Toggle */}
          <div className="de-asap-row">
            <button type="button"
              className={'de-asap-btn' + (form.asapRequested ? ' active' : '')}
              onClick={() => set('asapRequested', !form.asapRequested)}>
              ⚡ {form.asapRequested ? 'ASAP Service Requested' : 'Request ASAP Service'}
            </button>
            <span className="de-asap-note">Priority scheduling — additional lead time fee may apply</span>
          </div>

          <div className="de-field" style={{ marginTop: 12 }}>
            <label>Preferred Timeline</label>
            <select name="preferredTimeline" value={form.preferredTimeline}
              onChange={e => set('preferredTimeline', e.target.value)}>
              <option value="">Select…</option>
              <option value="ASAP">As soon as possible</option>
              <option value="2 weeks">Within 2 weeks</option>
              <option value="1 month">Within 1 month</option>
              <option value="2-3 months">2–3 months</option>
              <option value="Planning ahead">Just planning ahead</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── SECTION 3: Floor System ── */}
      <div className="de-section">
        <div className="de-section-num">3</div>
        <div className="de-section-body">
          <h2 className="de-section-title">Desired Floor System</h2>
          <div className="de-finish-grid">
            {Object.keys(FINISH_COLORS).map(f => (
              <button key={f} type="button"
                className={'de-finish-chip' + (form.desiredFinish === f ? ' active' : '')}
                onClick={() => { set('desiredFinish', f); set('desiredColor', ''); }}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {form.desiredFinish && (
            <div className="de-field" style={{ marginTop: 16 }}>
              <label>Color / Blend</label>
              <select name="desiredColor" value={form.desiredColor}
                onChange={e => set('desiredColor', e.target.value)}>
                <option value="">Select color…</option>
                {FINISH_COLORS[form.desiredFinish]?.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          )}

          <div className="de-visualizer-cta">
            <a href="/visualizer" target="_blank" className="de-vis-link">
              🎨 Not sure? Try the Floor Visualizer →
            </a>
          </div>
        </div>
      </div>

      {/* ── SECTION 4: Photo Uploads ── */}
      <div className="de-section">
        <div className="de-section-num">4</div>
        <div className="de-section-body">
          <h2 className="de-section-title">Upload Floor Photos</h2>
          <p className="de-section-sub">
            Photos of your current floor help us give you the most accurate estimate.
            Upload JPG, PNG, or HEIC — up to 10 files, 20MB each.
          </p>
          <label className="de-upload-zone" onClick={() => fileInputRef.current?.click()}>
            <input ref={fileInputRef} type="file" multiple accept="image/*,.heic"
              style={{ display: 'none' }}
              onChange={e => {
                const newFiles = Array.from(e.target.files || []);
                setFiles(prev => [...prev, ...newFiles].slice(0, 10));
              }} />
            <div className="de-upload-icon">📷</div>
            <div className="de-upload-text">
              <strong>Drag &amp; drop photos here</strong><br />
              or <span className="de-upload-link">click to browse</span>
            </div>
            <div className="de-upload-hint">JPG, PNG, HEIC · Max 20MB each · Up to 10 files</div>
          </label>

          {files.length > 0 && (
            <div className="de-file-list">
              {files.map((f, i) => (
                <div key={i} className="de-file-item">
                  <span className="de-file-icon">🖼️</span>
                  <span className="de-file-name">{f.name}</span>
                  <span className="de-file-size">{(f.size / 1024 / 1024).toFixed(1)}MB</span>
                  <button type="button" className="de-file-remove"
                    onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── SECTION 5: Notes & Submit ── */}
      <div className="de-section">
        <div className="de-section-num">5</div>
        <div className="de-section-body">
          <h2 className="de-section-title">Additional Notes</h2>
          <div className="de-field">
            <label>Anything else we should know?</label>
            <textarea name="notes" rows={4} placeholder="Special access instructions, HOA requirements, timing constraints, etc."
              value={form.notes} onChange={e => set('notes', e.target.value)} />
          </div>
        </div>
      </div>

      {/* ── OFFER REMINDER ── */}
      <div className="de-offer-bar">
        <span className="de-offer-icon">🏷️</span>
        <span><strong>15% Off</strong> — Automatically applied when you submit your digital bid online.</span>
        <span className="de-offer-guarantee">✅ Guaranteed estimate within 24 hours by email</span>
      </div>

      {errorMsg && <div className="de-error">{errorMsg}</div>}

      <button type="submit" className="de-submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? '⏳ Submitting…' : '📋 Submit My Digital Bid — Get 15% Off'}
      </button>
      <p className="de-legal">
        No spam. Your info is used only to prepare your estimate.
        By submitting you agree to be contacted about your floor project.
      </p>
    </form>
  );
}

export default function DigitalEstimatorPage() {
  return (
    <>
      <style>{`
        *{box-sizing:border-box}
        body{font-family:'Inter','Helvetica Neue',Arial,sans-serif;background:#f8f7f4;color:#0a0b0c;margin:0}
        a{text-decoration:none;color:inherit}

        /* Header */
        .de-header{background:#111214;padding:0 clamp(1rem,4vw,2.5rem);height:68px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:50}
        .de-header-logo{color:#c9a227;font-weight:900;font-size:17px}
        .de-header-back{color:#9ca3af;font-size:14px;font-weight:600;display:flex;align-items:center;gap:6px}
        .de-header-back:hover{color:#c9a227}

        /* Hero */
        .de-hero{background:#111214;padding:clamp(2rem,5vw,4rem) clamp(1rem,4vw,2.5rem);text-align:center;border-bottom:3px solid #c9a227}
        .de-hero-badge{display:inline-flex;align-items:center;gap:8px;background:#c9a22720;color:#c9a227;font-weight:800;font-size:14px;padding:8px 20px;border-radius:20px;margin-bottom:20px;border:1px solid #c9a22740}
        .de-hero h1{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;color:#fff;margin-bottom:14px;line-height:1.1}
        .de-hero-sub{color:#9ca3af;font-size:1.05rem;max-width:540px;margin:0 auto 24px;line-height:1.6}
        .de-hero-pills{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
        .de-hero-pill{background:#1a1c1e;color:#ccc;font-size:13px;font-weight:600;padding:8px 16px;border-radius:20px;border:1px solid #2a2c2e}

        /* Main layout */
        .de-main{max-width:860px;margin:0 auto;padding:clamp(2rem,4vw,3rem) clamp(1rem,4vw,2rem)}

        /* Form sections */
        .de-section{display:flex;gap:20px;background:#fff;border-radius:12px;padding:clamp(1.5rem,3vw,2rem);border:1.5px solid #e2e0dc;margin-bottom:20px;box-shadow:0 2px 10px rgba(0,0,0,.05)}
        .de-section-num{width:36px;height:36px;background:#c9a227;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;color:#111;flex-shrink:0;margin-top:2px}
        .de-section-body{flex:1;min-width:0}
        .de-section-title{font-size:1.15rem;font-weight:800;margin-bottom:16px}
        .de-section-sub{font-size:14px;color:#666;margin-bottom:16px;line-height:1.6}

        /* Grid */
        .de-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        @media(max-width:580px){.de-grid-2{grid-template-columns:1fr}}
        .de-full{grid-column:1/-1}

        /* Fields */
        .de-field{display:flex;flex-direction:column;gap:6px}
        .de-field label{font-size:13px;font-weight:700;color:#333}
        .de-req{color:#c9a227}
        .de-field input,.de-field select,.de-field textarea{padding:11px 14px;border:1.5px solid #e2e0dc;border-radius:8px;font-size:15px;font-family:inherit;outline:none;transition:border-color .15s;background:#fff}
        .de-field input:focus,.de-field select:focus,.de-field textarea:focus{border-color:#c9a227}
        .de-field textarea{resize:vertical}
        .de-check{display:flex;align-items:center;gap:10px;font-size:14px;color:#555;margin-top:12px;cursor:pointer}
        .de-check input{width:16px;height:16px;accent-color:#c9a227}

        /* Finish chips */
        .de-finish-grid{display:flex;gap:10px;flex-wrap:wrap}
        .de-finish-chip{padding:10px 20px;border-radius:20px;border:2px solid #e2e0dc;font-size:14px;font-weight:700;background:#fff;cursor:pointer;transition:all .15s;font-family:inherit}
        .de-finish-chip.active,.de-finish-chip:hover{border-color:#c9a227;background:#c9a22715;color:#7a6010}
        .de-visualizer-cta{margin-top:16px}
        .de-vis-link{font-size:14px;font-weight:700;color:#c9a227}

        /* ASAP */
        .de-asap-row{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-top:16px}
        .de-asap-btn{padding:10px 20px;border-radius:8px;border:2px solid #e2e0dc;font-size:14px;font-weight:700;background:#fff;cursor:pointer;font-family:inherit;transition:all .15s}
        .de-asap-btn.active{border-color:#c9a227;background:#c9a22720;color:#7a6010}
        .de-asap-note{font-size:12px;color:#888}

        /* Upload */
        .de-upload-zone{display:flex;flex-direction:column;align-items:center;justify-content:center;border:2px dashed #c9a227;border-radius:10px;padding:32px 24px;cursor:pointer;transition:background .15s;text-align:center}
        .de-upload-zone:hover{background:#c9a2270a}
        .de-upload-icon{font-size:2.5rem;margin-bottom:8px}
        .de-upload-text{font-size:15px;color:#444;margin-bottom:6px}
        .de-upload-link{color:#c9a227;font-weight:700}
        .de-upload-hint{font-size:12px;color:#999}
        .de-file-list{margin-top:14px;display:flex;flex-direction:column;gap:8px}
        .de-file-item{display:flex;align-items:center;gap:10px;background:#f8f7f4;border-radius:8px;padding:10px 14px;border:1px solid #e2e0dc}
        .de-file-name{flex:1;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
        .de-file-size{font-size:12px;color:#888}
        .de-file-remove{background:none;border:none;color:#999;cursor:pointer;font-size:16px;padding:0 4px;line-height:1}
        .de-file-remove:hover{color:#dc2626}
        .de-file-icon{font-size:16px}

        /* Offer bar */
        .de-offer-bar{background:#c9a227;border-radius:10px;padding:16px 20px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:16px}
        .de-offer-icon{font-size:1.5rem}
        .de-offer-bar span{font-size:14px;color:#111}
        .de-offer-guarantee{margin-left:auto;font-size:13px;font-weight:700}

        /* Submit */
        .de-submit{width:100%;padding:18px;background:#c9a227;color:#111;font-weight:900;font-size:17px;border:none;border-radius:10px;cursor:pointer;font-family:inherit;transition:background .15s}
        .de-submit:hover:not(:disabled){background:#dbb84a}
        .de-submit:disabled{opacity:.6;cursor:not-allowed}
        .de-legal{font-size:12px;color:#999;text-align:center;margin-top:10px;line-height:1.5}
        .de-error{background:#fef2f2;border:1px solid #fca5a5;border-radius:8px;padding:12px 16px;color:#dc2626;font-size:14px;font-weight:600;margin-bottom:12px}

        /* Success */
        .de-success{max-width:560px;margin:80px auto;text-align:center;padding:40px 24px;background:#fff;border-radius:16px;border:2px solid #c9a227;box-shadow:0 8px 40px rgba(0,0,0,.1)}
        .de-success-icon{font-size:4rem;margin-bottom:16px}
        .de-success h2{font-size:2rem;font-weight:900;color:#0a0b0c;margin-bottom:12px}
        .de-success p{font-size:1rem;color:#555;line-height:1.6;margin-bottom:10px}
        .de-success-sub{font-size:14px;color:#999}

        @media(max-width:600px){
          .de-section{flex-direction:column;gap:14px}
          .de-offer-guarantee{margin-left:0}
        }
      `}</style>

      {/* Header */}
      <header className="de-header">
        <a href="/" className="de-header-logo">Phoenix Epoxy Pros</a>
        <a href="/" className="de-header-back">← Back to Home</a>
      </header>

      {/* Hero */}
      <div className="de-hero">
        <div className="de-hero-badge">🏷️ 15% Off — Online Bids Only</div>
        <h1>Your Free Digital Estimate</h1>
        <p className="de-hero-sub">
          Fill out the form below and Jeremy will personally review your project
          and send a detailed proposal within <strong style={{ color: '#c9a227' }}>24 hours</strong>.
        </p>
        <div className="de-hero-pills">
          <span className="de-hero-pill">✅ No pressure</span>
          <span className="de-hero-pill">📋 Detailed scope + pricing</span>
          <span className="de-hero-pill">🔒 Lifetime warranty included</span>
          <span className="de-hero-pill">⚡ 24-hr guarantee</span>
        </div>
      </div>

      {/* Form */}
      <main className="de-main">
        <Suspense fallback={<div style={{ textAlign: 'center', padding: 40 }}>Loading form…</div>}>
          <EstimatorForm />
        </Suspense>
      </main>

      {/* Footer */}
      <footer style={{ background: '#111214', color: '#666', textAlign: 'center', padding: '20px', fontSize: 13 }}>
        <a href="/" style={{ color: '#c9a227', fontWeight: 700 }}>Phoenix Epoxy Pros</a>
        {' · '}<a href="tel:17722090266" style={{ color: '#9ca3af' }}>772-209-0266</a>
        {' · '}<span>© {new Date().getFullYear()}</span>
      </footer>
    </>
  );
}
