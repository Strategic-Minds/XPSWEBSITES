"use client";

import { useEffect } from "react";

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
};

type SpeechRecognitionEventLike = {
  results: ArrayLike<{ 0?: { transcript?: string } }>;
};

type BrowserWindowWithSpeech = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

type ChartSample = {
  button: HTMLButtonElement;
  chartId: string;
  chartTitle: string;
  name: string;
  code?: string;
  label: string;
};

const chartTitleById: Record<string, string> = {
  flake: "Top Flake Colors",
  metallic: "Top Metallic Colors",
  quartz: "Top Quartz Colors",
  solid: "Solid Color Epoxy Base Coats",
  glitter: "Top Glitter Additive Colors",
  stain: "Concrete Dye & Stain Colors"
};

const aiRecolorEnabled = process.env.NEXT_PUBLIC_VISUALIZER_AI_RECOLOR === "true";

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function compact(value: string) {
  return normalize(value).replace(/\s+/g, "");
}

function sampleLabel(sample: ChartSample) {
  return sample.code ? `${sample.name} ${sample.code}` : sample.name;
}

function parseSampleButton(button: HTMLButtonElement): ChartSample | null {
  const name = button.textContent?.replace(/\s+/g, " ").trim();
  const ariaLabel = button.getAttribute("aria-label")?.replace(/^Enlarge\s+/i, "").replace(/\s+/g, " ").trim();
  const label = ariaLabel || name;

  if (!name || !label) {
    return null;
  }

  const shell = button.closest<HTMLElement>(".xps-chart-image-shell");
  const chartId = shell?.dataset.chart || "flake";
  const suffix = label.toLowerCase().startsWith(name.toLowerCase()) ? label.slice(name.length).trim() : "";

  return {
    button,
    chartId,
    chartTitle: chartTitleById[chartId] || chartId,
    name,
    code: suffix || undefined,
    label
  };
}

function collectSamples() {
  return Array.from(document.querySelectorAll<HTMLButtonElement>(".xps-chart-hotspot"))
    .map(parseSampleButton)
    .filter((sample): sample is ChartSample => Boolean(sample));
}

function scoreSample(command: string, sample: ChartSample) {
  const commandNorm = normalize(command);
  const commandCompact = compact(command);
  const nameNorm = normalize(sample.name);
  const nameCompact = compact(sample.name);
  const labelNorm = normalize(sample.label);
  const labelCompact = compact(sample.label);
  const codeCompact = sample.code ? compact(sample.code) : "";
  const chartNorm = normalize(`${sample.chartId} ${sample.chartTitle}`);
  let score = 0;

  if (codeCompact && commandCompact.includes(codeCompact)) {
    score = Math.max(score, 100);
  }

  if (commandNorm === nameNorm || commandCompact === nameCompact) {
    score = Math.max(score, 94);
  } else if (commandNorm.includes(nameNorm) || commandCompact.includes(nameCompact)) {
    score = Math.max(score, 74);
  }

  if (commandNorm.includes(labelNorm) || commandCompact.includes(labelCompact)) {
    score = Math.max(score, 96);
  }

  if (score > 0 && chartNorm.split(" ").some((word) => word.length > 4 && commandNorm.includes(word))) {
    score += 14;
  }

  return score;
}

function findSpokenSample(command: string) {
  return collectSamples()
    .map((sample) => ({ sample, score: scoreSample(command, sample) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)[0]?.sample;
}

function buildUploadedImage(frame: HTMLButtonElement, imageData: string) {
  frame.classList.add("has-image");
  frame.textContent = "";

  const image = document.createElement("img");
  image.className = "visualizer-uploaded-image";
  image.src = imageData;
  image.alt = "Attached floor preview";

  const tint = document.createElement("span");
  tint.className = "visualizer-image-tint";
  tint.setAttribute("aria-hidden", "true");

  frame.append(image, tint);
}

function currentPalette(preview: HTMLElement) {
  const style = window.getComputedStyle(preview);
  return ["--tone-a", "--tone-b", "--tone-c", "--tone-d"]
    .map((token) => style.getPropertyValue(token).trim())
    .filter(Boolean);
}

async function requestAiRecolor(
  preview: HTMLElement,
  frame: HTMLButtonElement,
  status: HTMLElement,
  imageData: string,
  sample: ChartSample
) {
  if (!aiRecolorEnabled) {
    status.textContent = `Local preview applied for ${sampleLabel(sample)}. Live AI recolor is ready to enable after the OpenAI key and cost gate are approved.`;
    return;
  }

  status.textContent = `Preparing AI recolor for ${sampleLabel(sample)}...`;

  try {
    const response = await fetch("/api/visualizer/recolor-floor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: imageData,
        chartId: sample.chartId,
        chartTitle: sample.chartTitle,
        option: {
          name: sample.name,
          code: sample.code,
          palette: currentPalette(preview)
        }
      })
    });

    const data = await response.json();

    if (data?.image) {
      const nextImage = String(data.image).startsWith("data:") ? String(data.image) : `data:image/png;base64,${data.image}`;
      buildUploadedImage(frame, nextImage);
      status.textContent = `AI recolor returned ${sampleLabel(sample)}.`;
      return;
    }

    if (data?.url) {
      buildUploadedImage(frame, String(data.url));
      status.textContent = `AI recolor returned ${sampleLabel(sample)}.`;
      return;
    }

    status.textContent = data?.message || `Local preview applied for ${sampleLabel(sample)}.`;
  } catch {
    status.textContent = `Local preview applied for ${sampleLabel(sample)}. AI recolor did not complete in this preview.`;
  }
}

export function VisualizerUploadEnhancer() {
  useEffect(() => {
    let uploadedImage = "";
    let selectedSampleLabel = "JPG, PNG, or WEBP";
    const cleanups: Array<() => void> = [];

    function install() {
      const preview = document.querySelector<HTMLElement>(".floor-visualizer-strip .visualizer-preview");
      const garage = preview?.querySelector<HTMLElement>(".visualizer-garage");

      if (!preview || !garage || garage.querySelector(".visualizer-upload-system")) {
        return;
      }

      preview.setAttribute("aria-label", "Floor image upload and chart color preview");
      garage.removeAttribute("aria-hidden");

      const system = document.createElement("div");
      system.className = "visualizer-upload-system";
      system.dataset.activeChart = "flake";
      system.innerHTML = `
        <input class="visualizer-file-input" type="file" accept="image/png,image/jpeg,image/webp" />
        <button class="visualizer-image-frame" type="button" aria-label="Attach a floor image to the visualizer frame">
          <span class="visualizer-frame-empty">
            <strong>Floor image area</strong>
            <small>Attach photo below</small>
          </span>
        </button>
        <div class="visualizer-frame-toolbar" aria-label="Visualizer upload and voice controls">
          <button class="visualizer-mic-button" type="button" aria-label="Start voice color prompt">
            <span class="visualizer-mic-icon" aria-hidden="true"></span>
          </button>
          <button class="visualizer-attach-box" type="button" aria-label="Attach image here">
            <span class="visualizer-paperclip-icon" aria-hidden="true"></span>
            <span class="visualizer-attach-copy">Attach image here</span>
            <small>JPG, PNG, or WEBP</small>
          </button>
        </div>
        <p class="visualizer-voice-status" aria-live="polite">Attach a floor photo, then tap a chart color or use the microphone.</p>
      `;

      garage.appendChild(system);

      const input = system.querySelector<HTMLInputElement>(".visualizer-file-input");
      const frame = system.querySelector<HTMLButtonElement>(".visualizer-image-frame");
      const attachBox = system.querySelector<HTMLButtonElement>(".visualizer-attach-box");
      const attachMeta = system.querySelector<HTMLElement>(".visualizer-attach-box small");
      const micButton = system.querySelector<HTMLButtonElement>(".visualizer-mic-button");
      const status = system.querySelector<HTMLElement>(".visualizer-voice-status");

      if (!input || !frame || !attachBox || !attachMeta || !micButton || !status) {
        return;
      }

      const previewPanel = preview;
      const fileInput = input;
      const imageFrame = frame;
      const attachButton = attachBox;
      const sampleMeta = attachMeta;
      const voiceButton = micButton;
      const voiceStatus = status;

      if (uploadedImage) {
        buildUploadedImage(imageFrame, uploadedImage);
        sampleMeta.textContent = selectedSampleLabel;
      }

      function openUploadPicker() {
        fileInput.click();
      }

      function handleUpload(event: Event) {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];

        if (!file) {
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result !== "string") {
            return;
          }

          uploadedImage = reader.result;
          buildUploadedImage(imageFrame, uploadedImage);
          sampleMeta.textContent = selectedSampleLabel;
          voiceStatus.textContent = "Image attached. Tap a chart color or press the microphone to apply a finish color.";
        };
        reader.readAsDataURL(file);
      }

      function applySample(sample: ChartSample, source: "chart" | "voice") {
        selectedSampleLabel = sampleLabel(sample);
        system.dataset.activeChart = sample.chartId;
        sampleMeta.textContent = selectedSampleLabel;
        voiceStatus.textContent = uploadedImage
          ? `${source === "voice" ? "Voice selected" : "Chart selected"} ${selectedSampleLabel}. Local color preview applied.`
          : `${source === "voice" ? "Voice selected" : "Chart selected"} ${selectedSampleLabel}. Attach a floor photo to preview it in the frame.`;

        if (uploadedImage) {
          window.setTimeout(() => {
            void requestAiRecolor(previewPanel, imageFrame, voiceStatus, uploadedImage, sample);
          }, 80);
        }
      }

      function handleChartClick(event: MouseEvent) {
        const target = event.target as Element | null;
        const button = target?.closest<HTMLButtonElement>(".xps-chart-hotspot");
        const sample = button ? parseSampleButton(button) : null;

        if (sample) {
          window.setTimeout(() => applySample(sample, "chart"), 0);
        }
      }

      function startVoicePrompt() {
        const speechWindow = window as BrowserWindowWithSpeech;
        const SpeechRecognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;

        if (!SpeechRecognition) {
          voiceStatus.textContent = "Voice input is not supported in this browser. Tap a chart color or type through the future AI prompt flow.";
          return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        voiceButton.classList.add("listening");
        voiceStatus.textContent = "Listening. Say a chart color name or code, such as Gravel FB-414 or Copper metallic.";

        recognition.onresult = (event) => {
          const transcript = event.results[0]?.[0]?.transcript || "";
          const sample = findSpokenSample(transcript);

          if (!sample) {
            voiceStatus.textContent = `I heard "${transcript}". Say a color name or code from the flake, metallic, quartz, solid, glitter, or stain charts.`;
            return;
          }

          sample.button.click();
          applySample(sample, "voice");
        };

        recognition.onerror = () => {
          voiceStatus.textContent = "Voice prompt stopped before a chart color was selected. Try again or tap a color sample.";
        };

        recognition.onend = () => {
          voiceButton.classList.remove("listening");
        };

        recognition.start();
      }

      imageFrame.addEventListener("click", openUploadPicker);
      attachButton.addEventListener("click", openUploadPicker);
      fileInput.addEventListener("change", handleUpload);
      document.addEventListener("click", handleChartClick);
      voiceButton.addEventListener("click", startVoicePrompt);

      cleanups.push(() => imageFrame.removeEventListener("click", openUploadPicker));
      cleanups.push(() => attachButton.removeEventListener("click", openUploadPicker));
      cleanups.push(() => fileInput.removeEventListener("change", handleUpload));
      cleanups.push(() => document.removeEventListener("click", handleChartClick));
      cleanups.push(() => voiceButton.removeEventListener("click", startVoicePrompt));
    }

    install();

    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(install);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
