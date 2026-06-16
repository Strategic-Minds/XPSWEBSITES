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

const squareFootage = ["Under 250 sq ft", "250-500 sq ft", "500-1,000 sq ft", "1,000+ sq ft"];
const surfaceConditions = ["New concrete", "Existing coating", "Cracked or patched", "Stained or worn", "Not sure"];
const timelines = ["ASAP / 30 days", "30-60 days", "60-90 days", "Planning ahead"];

type SubmitState = "idle" | "sending" | "sent" | "error";

export function PhoenixLeadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [fileCount, setFileCount] = useState(0);

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
      setFileCount(0);
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <form ref={formRef} className="estimate-card" id="estimate" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="form-progress" aria-label="Estimate form steps">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
      </div>

      <div className="form-head">
        <p>Free estimate flow</p>
        <h2>Get My Free Estimate</h2>
        <span>Photos help us quote faster.</span>
      </div>

      <label className="form-field">
        <span>Step 1: Contact</span>
        <input name="fullName" placeholder="Full Name" required autoComplete="name" />
      </label>

      <div className="field-row">
        <input name="phone" placeholder="Phone Number" required autoComplete="tel" />
        <input name="email" type="email" placeholder="Email Address" required autoComplete="email" />
      </div>

      <label className="form-field">
        <span>Step 2: Project Type</span>
        <select name="projectType" required defaultValue="">
          <option value="" disabled>
            Choose project type
          </option>
          {projectTypes.map((project) => (
            <option key={project}>{project}</option>
          ))}
        </select>
      </label>

      <div className="field-row">
        <label className="form-field compact">
          <span>Step 3: Size</span>
          <select name="squareFootage" defaultValue="">
            <option value="" disabled>
              Approx. square footage
            </option>
            {squareFootage.map((size) => (
              <option key={size}>{size}</option>
            ))}
          </select>
        </label>
        <label className="form-field compact">
          <span>Surface</span>
          <select name="surfaceCondition" defaultValue="">
            <option value="" disabled>
              Current floor condition
            </option>
            {surfaceConditions.map((condition) => (
              <option key={condition}>{condition}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="field-row">
        <input name="zipCode" placeholder="Zip Code" inputMode="numeric" autoComplete="postal-code" />
        <select name="timeline" defaultValue="">
          <option value="" disabled>
            Timeline
          </option>
          {timelines.map((timeline) => (
            <option key={timeline}>{timeline}</option>
          ))}
        </select>
      </div>

      <label className="upload-box">
        <strong>Step 4: Upload Photos</strong>
        <span>{fileCount > 0 ? `${fileCount} photo${fileCount === 1 ? "" : "s"} selected` : "Optional JPG or PNG project photos"}</span>
        <input
          name="photos"
          type="file"
          accept="image/png,image/jpeg"
          multiple
          onChange={(event) => setFileCount(event.currentTarget.files?.length || 0)}
        />
      </label>

      <input className="hidden-field" name="budget" value="Online estimate request" readOnly />
      <input className="hidden-field" name="website" tabIndex={-1} autoComplete="off" />

      <button className="gold-button form-submit" type="submit" disabled={submitState === "sending"}>
        {submitState === "sending" ? "Sending..." : "Get My Free Estimate"}
      </button>

      <p className={`form-status ${submitState}`} aria-live="polite">
        {submitState === "sent" && "Request received. We will review your project details next."}
        {submitState === "error" && "The form did not send. Please call or try again."}
        {submitState === "idle" && "Upload photos and details so the estimate conversation starts with the right floor condition."}
        {submitState === "sending" && "Sending your estimate request..."}
      </p>
    </form>
  );
}
