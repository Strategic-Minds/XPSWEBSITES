"use client";

import { FormEvent, useRef, useState } from "react";

type SubmitState = "idle" | "sending" | "sent" | "error";

const finishOptions = [
  "Full broadcast flake",
  "Metallic epoxy",
  "Quartz system",
  "Solid color epoxy",
  "Polished concrete dye or stain",
  "Not sure yet"
];

export function DigitalEstimator() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("sending");

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/leads", {
        method: "POST",
        body: formData
      });

      if (!response.ok) throw new Error("Digital estimator endpoint failed");

      await response.json();
      setSubmitState("sent");
      formRef.current?.reset();
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <section className="digital-estimator-section" id="digital-estimator" aria-label="Digital Estimator 15 percent offer">
      <div className="digital-estimator-copy">
        <span className="section-kicker">15% Digital Estimator Offer</span>
        <h2>Save 15% when you use the Digital Estimator system.</h2>
        <p>
          Upload your existing floor images, measurements, current covering, desired finish, and color-chart choice.
          We review it and deliver an estimate by email within 24 hours with warranty information and job tracker access.
        </p>
        <ul>
          <li>Attach existing floor photos or PDFs.</li>
          <li>Send measurements, current covering, and desired finish.</li>
          <li>Choose a color from the home-page charts.</li>
          <li>Receive the estimate, warranty info, and portal path by email.</li>
        </ul>
      </div>

      <form ref={formRef} className="digital-estimator-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="hidden" name="source" value="xps_digital_estimator" />
        <input type="hidden" name="campaign" value="15_percent_digital_estimator" />
        <input type="hidden" name="timeline" value="24 hour digital estimate" />

        <div className="field-row">
          <label className="form-field">
            <span>Full name</span>
            <input name="fullName" required autoComplete="name" />
          </label>
          <label className="form-field">
            <span>Email</span>
            <input name="email" type="email" required autoComplete="email" />
          </label>
        </div>

        <div className="field-row">
          <label className="form-field">
            <span>Phone</span>
            <input name="phone" required autoComplete="tel" />
          </label>
          <label className="form-field">
            <span>Floor measurements</span>
            <input name="floorMeasurements" placeholder="Example: 22 x 24 garage" required />
          </label>
        </div>

        <label className="form-field">
          <span>Existing floor covering</span>
          <input name="existingFloorCovering" placeholder="Bare concrete, old epoxy, tile, carpet, paint, etc." required />
        </label>

        <div className="field-row">
          <label className="form-field">
            <span>Desired floor finish</span>
            <select name="desiredFinish" required defaultValue="">
              <option value="" disabled>Choose finish</option>
              {finishOptions.map((finish) => (
                <option key={finish}>{finish}</option>
              ))}
            </select>
          </label>
          <label className="form-field">
            <span>Desired color from charts</span>
            <input name="desiredColor" placeholder="Example: Domino FB-411" required />
          </label>
        </div>

        <label className="form-field">
          <span>Floor images, measurements, or documents</span>
          <input name="attachments" type="file" accept="image/png,image/jpeg,image/webp,application/pdf" multiple required />
        </label>

        <label className="form-field">
          <span>Anything else we should know?</span>
          <textarea name="notes" rows={4} placeholder="Cracks, moisture, timeline, vehicles, business hours, or warranty questions." />
        </label>

        <button className="gold-button form-submit" type="submit" disabled={submitState === "sending"}>
          {submitState === "sending" ? "Sending..." : "Submit Digital Estimate"}
        </button>

        <p className={`form-status ${submitState}`} aria-live="polite">
          {submitState === "idle" && "Attach the details once and we will review the estimate package."}
          {submitState === "sending" && "Uploading your digital estimate request..."}
          {submitState === "sent" && "Request received. Watch your email for the 24-hour estimate path."}
          {submitState === "error" && "The upload did not send. Please call or try again."}
        </p>
      </form>
    </section>
  );
}
