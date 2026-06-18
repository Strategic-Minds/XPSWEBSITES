"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type SubmitState = "idle" | "sending" | "sent" | "error";

type LeadBasics = {
  fullName: string;
  address: string;
  email: string;
  phone: string;
  zipCode: string;
};

const finishOptions = [
  "Full Broadcast Flake",
  "Metallic Epoxy",
  "Polished Concrete",
  "Sealed Concrete",
  "Quartz System",
  "Solid Color Epoxy",
  "Glitter / Metallic Accents"
];

const colorOptionsByFinish: Record<string, string[]> = {
  "Full Broadcast Flake": ["Domino", "Tidal Wave", "Creekbed", "Cabin Fever", "Gravel", "Nightfall", "Custom flake blend"],
  "Metallic Epoxy": ["Pearl White", "Graphite", "Silver Smoke", "Copper Drift", "Ocean Blue", "Black Marble", "Custom metallic"],
  "Polished Concrete": ["Natural Concrete", "Light Natural", "Warm Natural", "Salt and Pepper", "Charcoal Natural"],
  "Sealed Concrete": ["Natural Concrete", "Light Natural", "Warm Natural", "Charcoal Natural", "Clear sealed concrete"],
  "Quartz System": ["Natural Quartz", "Dolphin Gray", "Tan Blend", "Black / White Blend", "Custom quartz blend"],
  "Solid Color Epoxy": ["Light Gray", "Medium Gray", "Tile Red", "Safety Yellow", "Black", "White", "Custom solid color"],
  "Glitter / Metallic Accents": ["Silver Glitter", "Gold Glitter", "Blue Metallic", "Copper Metallic", "Pearl Accent", "Custom glitter color"]
};

const emptyLead: LeadBasics = {
  fullName: "",
  address: "",
  email: "",
  phone: "",
  zipCode: ""
};

export default function DigitalEstimatorPage() {
  const [lead, setLead] = useState<LeadBasics>(emptyLead);
  const [desiredFinish, setDesiredFinish] = useState(finishOptions[0]);
  const [desiredColor, setDesiredColor] = useState(colorOptionsByFinish[finishOptions[0]][0]);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("Complete the intake and attach job images to claim the 15% digital estimator coupon.");

  const colorOptions = useMemo(() => colorOptionsByFinish[desiredFinish] || ["Custom color"], [desiredFinish]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stored = window.sessionStorage.getItem("xpsEstimatorLead");
    const storedLead = stored ? JSON.parse(stored) : {};

    setLead({
      fullName: params.get("fullName") || storedLead.fullName || "",
      address: storedLead.address || "",
      email: params.get("email") || storedLead.email || "",
      phone: params.get("phone") || storedLead.phone || "",
      zipCode: params.get("zipCode") || storedLead.zipCode || ""
    });
  }, []);

  function updateLead(key: keyof LeadBasics, value: string) {
    setLead((current) => ({ ...current, [key]: value }));
  }

  function updateFinish(value: string) {
    setDesiredFinish(value);
    setDesiredColor((colorOptionsByFinish[value] || ["Custom color"])[0]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("sending");
    setMessage("Uploading your estimator package...");

    const formData = new FormData(event.currentTarget);
    formData.set("source", "xps_digital_estimator");
    formData.set("campaign", "15_percent_digital_estimator_coupon");
    formData.set("timeline", "24-hour digital estimator request");
    formData.set("desiredFinish", desiredFinish);
    formData.set("desiredColor", desiredColor);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        body: formData
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Estimator submission failed.");
      }

      setSubmitState("sent");
      setMessage("Received. Your 15% coupon is attached, and your estimate path will be emailed within 24 hours with warranty and job tracker information.");
    } catch (error) {
      setSubmitState("error");
      setMessage(error instanceof Error ? error.message : "Estimator submission failed.");
    }
  }

  return (
    <main className="portal-login-page digital-estimator-page">
      <header className="portal-login-header">
        <a href="/" aria-label="Back to Phoenix Epoxy Pros">
          <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" />
        </a>
        <a className="portal-home-link" href="/customer-portal">Back to entry</a>
      </header>

      <section className="portal-login-hero digital-estimator-hero" aria-label="Digital estimator form">
        <div className="portal-login-copy">
          <span className="section-kicker">15% off with Digital Estimator</span>
          <h1>Upload the floor details. Get the estimate in 24 hours.</h1>
          <p>
            Send photos, measurements, current floor covering, desired finish, and color direction. We will reply by
            email with the estimate, warranty information, and the proprietary job tracker setup path.
          </p>
          <div className="portal-proof-row" aria-label="Estimator guarantees">
            <span>Floor images</span>
            <span>Warranty info</span>
            <span>24-hour email estimate</span>
          </div>
        </div>

        <form className="digital-estimator-panel" onSubmit={handleSubmit}>
          <div className="digital-estimator-form-head">
            <p className="portal-panel-eyebrow">Professional estimate intake</p>
            <h2>Digital Estimator</h2>
          </div>

          <div className="digital-estimator-grid-fields">
            <label className="digital-estimator-field">
              <span>Full Name</span>
              <input name="fullName" value={lead.fullName} onChange={(event) => updateLead("fullName", event.target.value)} required />
            </label>
            <label className="digital-estimator-field">
              <span>Address</span>
              <input name="address" value={lead.address} onChange={(event) => updateLead("address", event.target.value)} required />
            </label>
            <label className="digital-estimator-field">
              <span>Email</span>
              <input name="email" type="email" value={lead.email} onChange={(event) => updateLead("email", event.target.value)} required />
            </label>
            <label className="digital-estimator-field">
              <span>Phone Number</span>
              <input name="phone" type="tel" value={lead.phone} onChange={(event) => updateLead("phone", event.target.value)} required />
            </label>
            <label className="digital-estimator-field">
              <span>ZIP Code</span>
              <input name="zipCode" inputMode="numeric" value={lead.zipCode} onChange={(event) => updateLead("zipCode", event.target.value)} required />
            </label>
            <label className="digital-estimator-field">
              <span>Floor Measurements</span>
              <input name="floorMeasurements" placeholder="Example: 24 x 22 garage or 528 sq ft" required />
            </label>
            <label className="digital-estimator-field">
              <span>Existing Floor</span>
              <select name="existingFloorCovering" required>
                <option>Bare Concrete</option>
                <option>Paint</option>
                <option>Laminate</option>
                <option>Tile</option>
                <option>VCT</option>
                <option>Peeling Epoxy</option>
                <option>Carpet</option>
              </select>
            </label>
            <label className="digital-estimator-field">
              <span>Condition of Concrete</span>
              <select name="concreteCondition" required>
                <option>New</option>
                <option>Fair - Some Cracks</option>
                <option>Bad - Cracks and Holes</option>
              </select>
            </label>
            <label className="digital-estimator-field">
              <span>Desired Floor Finish</span>
              <select name="desiredFinishSelect" value={desiredFinish} onChange={(event) => updateFinish(event.target.value)} required>
                {finishOptions.map((finish) => <option key={finish}>{finish}</option>)}
              </select>
            </label>
            <label className="digital-estimator-field">
              <span>Desired Color</span>
              <select name="desiredColorSelect" value={desiredColor} onChange={(event) => setDesiredColor(event.target.value)} required>
                {colorOptions.map((color) => <option key={color}>{color}</option>)}
              </select>
            </label>
          </div>

          <label className="digital-estimator-field digital-estimator-wide">
            <span>Project Notes</span>
            <textarea name="notes" rows={4} placeholder="Tell us about cracks, coatings, moisture, timeline, access, or color chart selections." />
          </label>

          <label className="digital-estimator-file digital-estimator-wide">
            <span>Attach Job Images</span>
            <input name="attachments" type="file" accept="image/png,image/jpeg,image/webp,application/pdf" multiple />
            <small>Upload current floor photos, measurements, and any reference images you want included.</small>
          </label>

          <button className="gold-button digital-estimator-submit" type="submit" disabled={submitState === "sending"}>
            {submitState === "sending" ? "Submitting..." : "Submit Digital Estimator"}
          </button>
          <p className={`portal-login-status ${submitState}`} aria-live="polite">{message}</p>
        </form>
      </section>
    </main>
  );
}
