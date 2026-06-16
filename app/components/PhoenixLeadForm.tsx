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
        <h2>Get Quote</h2>
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

      <label className="form-field">
        <input name="zipCode" placeholder="Zip Code" inputMode="numeric" autoComplete="postal-code" />
      </label>

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

      <input className="hidden-field" name="budget" value="Online estimate request" readOnly />
      <input className="hidden-field" name="website" tabIndex={-1} autoComplete="off" />

      <button className="gold-button form-submit" type="submit" disabled={submitState === "sending"}>
        {submitState === "sending" ? "Sending..." : "Get Quote"}
      </button>

      <p className={`form-status ${submitState}`} aria-live="polite">
        {submitState === "sent" && "Request received. We will review your project details next."}
        {submitState === "error" && "The form did not send. Please call or try again."}
        {submitState === "idle" && "Send the basics and we will review the project next."}
        {submitState === "sending" && "Sending your estimate request..."}
      </p>
    </form>
  );
}
