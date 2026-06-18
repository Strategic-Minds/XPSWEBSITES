"use client";

import { FormEvent, useState } from "react";

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

type SubmitState = "idle" | "opening" | "error";

function readFormValue(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

export function PhoenixLeadForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("Send the basics and the Digital Bid form will open prefilled.");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const lead = {
      fullName: readFormValue(formData, "fullName"),
      phone: readFormValue(formData, "phone"),
      email: readFormValue(formData, "email"),
      zipCode: readFormValue(formData, "zipCode"),
      projectType: readFormValue(formData, "projectType")
    };

    if (!lead.fullName || !lead.phone || !lead.email || !lead.zipCode || !lead.projectType) {
      setSubmitState("error");
      setMessage("Name, phone, email, ZIP code, and project type are required.");
      return;
    }

    setSubmitState("opening");
    setMessage("Opening your prefilled Digital Bid form...");

    window.sessionStorage.setItem("xpsEstimatorLead", JSON.stringify(lead));
    const params = new URLSearchParams();
    Object.entries(lead).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    window.location.assign(`/digital-estimator?${params.toString()}`);
  }

  return (
    <form className="estimate-card" id="estimate" onSubmit={handleSubmit} encType="multipart/form-data">
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
        <input name="zipCode" placeholder="Zip Code" inputMode="numeric" autoComplete="postal-code" required />
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

      <input className="hidden-field" name="budget" value="Digital Bid estimate request" readOnly />
      <input className="hidden-field" name="website" tabIndex={-1} autoComplete="off" />

      <button className="gold-button form-submit" type="submit" disabled={submitState === "opening"}>
        {submitState === "opening" ? "Opening..." : "Start Digital Bid"}
      </button>

      <p className={`form-status ${submitState}`} aria-live="polite">
        {message}
      </p>
    </form>
  );
}
