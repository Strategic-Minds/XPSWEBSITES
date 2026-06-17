"use client";

import type { ChangeEvent } from "react";
import type { UploadedPreview } from "./types";

const acceptedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxBytes = 8 * 1024 * 1024;

type ImageUploaderProps = {
  uploadedImage: UploadedPreview | null;
  error: string | null;
  onUpload: (file: File) => void;
};

export function ImageUploader({ uploadedImage, error, onUpload }: ImageUploaderProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
    event.target.value = "";
  }

  return (
    <section className="ev-panel ev-upload-panel" aria-label="Upload floor photo">
      <div>
        <p className="ev-kicker">Step 1</p>
        <h2>Upload Your Floor</h2>
        <p className="ev-muted">Your preview photo stays in your browser unless you submit it with a quote request.</p>
      </div>
      <label className="ev-upload-target">
        <input accept="image/jpeg,image/png,image/webp" type="file" onChange={handleChange} />
        <span>{uploadedImage ? "Replace photo" : "Choose garage, patio, commercial, or interior photo"}</span>
        <small>JPEG, PNG, or WebP. Max 8 MB.</small>
      </label>
      {uploadedImage ? (
        <p className="ev-file-note">Loaded: {uploadedImage.name} ({Math.round(uploadedImage.size / 1024)} KB)</p>
      ) : null}
      {error ? <p className="ev-error" role="alert">{error}</p> : null}
    </section>
  );
}

export function validatePreviewFile(file: File): string | null {
  if (!acceptedTypes.has(file.type)) {
    return "Use a JPEG, PNG, or WebP image.";
  }

  if (file.size > maxBytes) {
    return "Use an image under 8 MB for the browser preview.";
  }

  return null;
}
