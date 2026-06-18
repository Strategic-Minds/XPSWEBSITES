"use client";

import { FormEvent, useRef, useState } from "react";

const projectTypes = [
  "Garage Floors",
  "Commercial Floors",
  "Patios & Outdoor Spaces",
  "Floor Repair",
  "Polished Concrete",
  "Decorative Concrete",
  "Epoxy Training Classes",
  "Business Starter Training"
];

const floorCoverings = [
  "Bare Concrete",
  "Existing Epoxy or Paint",
  "Tile or Thinset",
  "Carpet Glue or Mastic",
  "Oil Stains or Heavy Contamination",
  "Cracked or Spalled Concrete",
  "Not Sure"
];

const finishTypes = [
  "Full Broadcast Flake",
  "Metallic Epoxy",
  "Quartz System",
  "Solid Color Epoxy",
  "Polished Concrete Dye or Stain",
  "Glitter Additive",
  "Need Recommendation"
];

type SubmitState = "idle" | "sending" | "sent" | "error";

export function PhoenixLeadForm() {
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

      if (!response.ok) throw new Error("Lead endpoint failed");

      await response.json();
      setSubmitState("sent");
      formRef.current?.reset();
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <form ref={formRef} className="estimate-card" id="estimate" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="form-head">
        <span>15% off with digital estimator</span>
        <h2>Get Quote</h2>
        <p>Upload the floor details now and receive an estimate by email within 24 hours.</p>
      </div>

      <label className="form-field">
        <input name="fullName" placeholder="Full Name" required autoComplete="name" />
      </label>

      <label className="form-field">
        <input name="phone" placeholder="Phone Number" required autoComplete="tel" />
      </label>

      <label className="form-field">
        <input name="email" type="email" placeholder="Email Address" required autoComplete="email" />
      </label>

      <div className="field-row">
        <label className="form-field">
          <input name="zipCode" placeholder="Zip Code" inputMode="numeric" autoComplete="postal-code" />
        </label>
        <label className="form-field">
          <input name="squareFootage" placeholder="Floor Sq Ft" inputMode="numeric" />
        </label>
      </div>

      <label className="form-field">
        <select name="projectType" required defaultValue="">
          <option value="" disabled>
            Project Type
          </option>
          {projectTypes.map((project) => (
            <option key={project}>{project}</option>
          ))}
        </select>
      </label>

      <div className="field-row">
        <label className="form-field">
          <select name="existingFloorCovering" required defaultValue="">
            <option value="" disabled>
              Existing Floor
            </option>
            {floorCoverings.map((covering) => (
              <option key={covering}>{covering}</option>
            ))}
          </select>
        </label>
        <label className="form-field">
          <select name="desiredFinish" required defaultValue="">
            <option value="" disabled>
              Desired Finish
            </option>
            {finishTypes.map((finish) => (
              <option key={finish}>{finish}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="form-field">
        <input name="desiredColor" placeholder="Desired Color / Chart Name" />
      </label>

      <label className="form-field">
        <textarea name="floorMeasurements" placeholder="Floor measurements, notes, timeline, and anything unusual about the slab" rows={4} />
      </label>

      <label className="upload-box">
        <strong>Upload floor images and measurements</strong>
        <span>Attach current floor photos, marked-up measurements, sketches, or PDFs.</span>
        <input name="photos" type="file" accept="image/*,.pdf" multiple />
      </label>

      <input className="hidden-field" name="budget" value="Digital estimator 15% off request" readOnly />
      <input className="hidden-field" name="website" tabIndex={-1} autoComplete="off" />

      <button className="gold-button form-submit" type="submit" disabled={submitState === "sending"}>
        {submitState === "sending" ? "Sending..." : "Get 15% Off Estimate"}
      </button>

      <p className={`form-status ${submitState}`} aria-live="polite">
        {submitState === "sent" && "Request received. Your digital estimate package is queued for email delivery within 24 hours."}
        {submitState === "error" && "The form did not send. Please call or try again."}
        {submitState === "idle" && "Includes estimate, warranty direction, and job tracker setup after review."}
        {submitState === "sending" && "Sending your digital estimator package..."}
      </p>
    </form>
  );
}
