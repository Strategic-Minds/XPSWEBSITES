"use client";

import { ChangeEvent, PointerEvent, useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };
type StyleOption = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  prompt: string;
  sourceUrl?: string;
};
type Finish = { name: string; colors: string[]; prompt: string };

declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
    webkitAudioContext?: typeof AudioContext;
  }
}

const svg = (a: string, b: string, c: string) =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360'%3E%3Crect width='640' height='360' fill='${a}'/%3E%3Cpath d='M-40 250 C120 80 280 360 700 90' stroke='${b}' stroke-width='36' fill='none' opacity='.72'/%3E%3Cpath d='M-60 310 C160 120 320 390 720 160' stroke='${c}' stroke-width='13' fill='none' opacity='.55'/%3E%3Cpath d='M0 180 C180 20 340 270 680 40' stroke='%23ffffff' stroke-width='42' fill='none' opacity='.9'/%3E%3C/svg%3E`;

const fallbackStyles: StyleOption[] = [
  {
    id: "gallery",
    title: "Option 1: Gallery White Swirl",
    description: "Clean white metallic epoxy with soft silver ribbon movement.",
    imageUrl: svg("%23fbfbf8", "%23d9dde2", "%23bfc6cc"),
    prompt: "clean white metallic epoxy with soft silver ribbon swirls"
  },
  {
    id: "pearl",
    title: "Option 2: Pearl Cloud",
    description: "Cloudlike white pearl epoxy with faint warm veining.",
    imageUrl: svg("%23fffdfa", "%23eee7dc", "%23d3d1ca"),
    prompt: "pearl white metallic epoxy with cloudlike movement"
  },
  {
    id: "ice",
    title: "Option 3: Ice Marble",
    description: "White epoxy with crisp gray marble-like movement.",
    imageUrl: svg("%23f8f9f9", "%23cfd6da", "%239da8ae"),
    prompt: "white ice-marble metallic epoxy with gray swirl veins"
  }
];

const baseFinish: Finish = {
  name: "White Swirl Epoxy",
  colors: ["#ffffff", "#d9dde2", "#f4f2ec"],
  prompt:
    "Replace only the masked floor with a glossy white swirl metallic epoxy floor, preserving room perspective, shadows, walls, furniture, and baseboards."
};

export default function VizualXPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState("");
  const [bounds, setBounds] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [polygon, setPolygon] = useState<Point[]>([]);
  const [styles, setStyles] = useState<StyleOption[]>(fallbackStyles);
  const [chosenStyle, setChosenStyle] = useState<StyleOption>(fallbackStyles[0]);
  const [finish, setFinish] = useState<Finish>(baseFinish);
  const [command, setCommand] = useState(
    "Hey Vizzy, outline my floor, search for white swirl epoxy floors, show me three options, and use option 1."
  );
  const [status, setStatus] = useState("Vizzy is ready");
  const [readout, setReadout] = useState("Upload a photo, then ask Vizzy what floor style you want.");
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;

    if (busy) {
      setElapsed(0);
      timer = setInterval(() => setElapsed((value) => value + 1), 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [busy]);

  useEffect(() => {
    draw();
  }, [image, polygon, chosenStyle, finish]);

  function fit(targetImage: HTMLImageElement) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0, width: 0, height: 0 };

    const ratio = Math.min(canvas.width / targetImage.width, canvas.height / targetImage.height);
    const width = targetImage.width * ratio;
    const height = targetImage.height * ratio;

    return {
      x: (canvas.width - width) / 2,
      y: (canvas.height - height) / 2,
      width,
      height
    };
  }

  function createMask(canvas: HTMLCanvasElement) {
    const mask = document.createElement("canvas");
    mask.width = canvas.width;
    mask.height = canvas.height;
    const context = mask.getContext("2d");

    if (!context || polygon.length < 3) return mask;

    context.beginPath();
    context.moveTo(polygon[0].x, polygon[0].y);
    polygon.slice(1).forEach((point) => context.lineTo(point.x, point.y));
    context.closePath();
    context.fillStyle = "#ffffff";
    context.fill();

    return mask;
  }

  function drawFinishPattern(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const gradient = context.createLinearGradient(0, canvas.height, canvas.width, 0);
    gradient.addColorStop(0, finish.colors[0]);
    gradient.addColorStop(0.55, finish.colors[1]);
    gradient.addColorStop(1, finish.colors[2]);
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let index = 0; index < 30; index += 1) {
      context.beginPath();
      const y = (canvas.height / 30) * index + Math.sin(index) * 28;
      context.moveTo(0, y);
      for (let x = 0; x <= canvas.width; x += 80) {
        context.lineTo(x, y + Math.sin(x / 120 + index) * 46);
      }
      context.strokeStyle = index % 2 ? "rgba(255,255,255,.38)" : "rgba(160,168,174,.24)";
      context.lineWidth = index % 3 ? 14 : 26;
      context.stroke();
    }
  }

  function draw() {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "rgba(255,255,255,.35)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (!image) return;

    const fittedBounds = fit(image);
    setBounds(fittedBounds);
    context.drawImage(image, fittedBounds.x, fittedBounds.y, fittedBounds.width, fittedBounds.height);

    if (polygon.length > 2) {
      const preview = document.createElement("canvas");
      preview.width = canvas.width;
      preview.height = canvas.height;
      const previewContext = preview.getContext("2d");

      if (previewContext) {
        drawFinishPattern(previewContext, preview);
        previewContext.globalCompositeOperation = "destination-in";
        previewContext.drawImage(createMask(canvas), 0, 0);
        context.globalAlpha = 0.82;
        context.drawImage(preview, 0, 0);
        context.globalAlpha = 1;
      }

      context.strokeStyle = "rgba(84,199,187,.95)";
      context.fillStyle = "#ffffff";
      context.lineWidth = 3;
      context.beginPath();
      context.moveTo(polygon[0].x, polygon[0].y);
      polygon.slice(1).forEach((point) => context.lineTo(point.x, point.y));
      context.closePath();
      context.stroke();
      polygon.forEach((point) => {
        context.beginPath();
        context.arc(point.x, point.y, 7, 0, Math.PI * 2);
        context.fill();
        context.stroke();
      });
    }
  }

  function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const nextImage = new Image();
      nextImage.onload = () => {
        setImage(nextImage);
        setImageDataUrl(String(reader.result));
        setPolygon([]);
        setStatus("Photo loaded");
        setReadout("Tell Vizzy what you want, or run the full preview flow.");
      };
      nextImage.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function pointerToCanvas(event: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * canvas.width,
      y: ((event.clientY - rect.top) / rect.height) * canvas.height
    };
  }

  async function detectFloor() {
    if (!imageDataUrl) {
      setStatus("Upload a photo first");
      return false;
    }

    setBusy(true);
    setStatus("Vizzy is outlining your floor");

    try {
      const response = await fetch("/api/vizual-x/detect-floor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageDataUrl })
      });
      const result = await response.json();
      if (!Array.isArray(result.polygon)) throw new Error(result.error || "Could not outline floor");

      const fittedBounds = image ? fit(image) : bounds;
      setPolygon(
        result.polygon.map((point: Point) => ({
          x: fittedBounds.x + point.x * fittedBounds.width,
          y: fittedBounds.y + point.y * fittedBounds.height
        }))
      );
      setReadout(
        `${result.mode === "ai" ? "AI detected" : "Estimated"} floor. Confidence ${Math.round(
          (result.confidence || 0) * 100
        )}%. ${result.notes || ""}`
      );
      setStatus("Floor outlined");
      setBusy(false);
      return true;
    } catch (error: any) {
      setStatus(error.message || "Outline failed");
      setReadout("You can still tap the photo to outline the floor manually.");
      setBusy(false);
      return false;
    }
  }

  async function searchStyles() {
    setBusy(true);
    setStatus("Vizzy is searching for style ideas");

    try {
      const response = await fetch("/api/vizual-x/style-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command })
      });
      const result = await response.json();
      const options: StyleOption[] = Array.isArray(result.options) && result.options.length ? result.options : fallbackStyles;
      setStyles(options);
      chooseStyle(options[0], 0);
      setStatus("Three style options ready");
      setReadout("Choose a card or say which option you like.");
      setBusy(false);
      return options;
    } catch {
      setStyles(fallbackStyles);
      setBusy(false);
      return fallbackStyles;
    }
  }

  function chooseStyle(style: StyleOption, index: number) {
    setChosenStyle(style);
    setFinish({
      ...baseFinish,
      name: style.title.replace(/^Option \d+:\s*/u, ""),
      prompt: `${baseFinish.prompt} Match option ${index + 1}: ${style.prompt}`
    });
    setStatus(`Option ${index + 1} selected`);
  }

  function selectedIndex() {
    return Math.max(0, Number(command.toLowerCase().match(/option\s*(1|2|3)/u)?.[1] || 1) - 1);
  }

  async function renderAiPreview() {
    const canvas = canvasRef.current;
    if (!canvas || !image || polygon.length < 3) {
      setStatus("Upload a photo and outline the floor first");
      return;
    }

    setBusy(true);
    setStatus("Vizzy is changing your floor");

    const snapshot = document.createElement("canvas");
    snapshot.width = canvas.width;
    snapshot.height = canvas.height;
    const snapshotContext = snapshot.getContext("2d");
    if (!snapshotContext) return;
    snapshotContext.fillStyle = "#ffffff";
    snapshotContext.fillRect(0, 0, snapshot.width, snapshot.height);
    snapshotContext.drawImage(image, bounds.x, bounds.y, bounds.width, bounds.height);

    try {
      const response = await fetch("/api/vizual-x/render-floor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageDataUrl: snapshot.toDataURL("image/png"),
          maskDataUrl: createMask(canvas).toDataURL("image/png"),
          finish,
          style: chosenStyle
        })
      });
      const result = await response.json();
      if (!response.ok || !result.image) throw new Error(result.error || "Render failed");

      const renderedImage = new Image();
      renderedImage.onload = () => {
        setImage(renderedImage);
        setImageDataUrl(result.image);
        setPolygon([]);
        playChime();
        setStatus("Floor preview is ready");
        setReadout("This is an AI visualization, not a final installation guarantee.");
      };
      renderedImage.src = result.image;
    } catch (error: any) {
      setStatus(error.message || "Render failed");
      setReadout("Add OpenAI environment variables in Vercel for final AI rendering.");
    }

    setBusy(false);
  }

  async function runFullFlow() {
    if (!imageDataUrl) {
      setStatus("Upload a photo first");
      return;
    }

    const options = await searchStyles();
    const index = selectedIndex();
    chooseStyle(options[index] || options[0], index);
    const outlined = polygon.length > 2 || (await detectFloor());
    if (outlined) await renderAiPreview();
  }

  function listen() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setStatus("Voice is not supported here. Use text.");
      return;
    }

    const recognizer = new SpeechRecognition();
    recognizer.lang = "en-US";
    recognizer.interimResults = false;
    recognizer.onstart = () => {
      setListening(true);
      setStatus("Vizzy is listening");
    };
    recognizer.onresult = (event: any) => {
      setCommand(event.results[0][0].transcript);
      setStatus("Voice command captured");
    };
    recognizer.onend = () => setListening(false);
    recognizer.start();
  }

  function playChime() {
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) return;

    const audioContext = new AudioContextCtor();
    const gain = audioContext.createGain();
    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.45);
    gain.connect(audioContext.destination);

    [523, 659, 784].forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      oscillator.frequency.value = frequency;
      oscillator.connect(gain);
      oscillator.start(audioContext.currentTime + index * 0.08);
      oscillator.stop(audioContext.currentTime + 0.38 + index * 0.08);
    });
  }

  function downloadPreview() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "vizual-x-floor-preview.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <main className="vx-page">
      <header className="vx-topbar">
        <div className="vx-brand">
          <span className="vx-brand-mark" />
          <span>
            <strong>Vizual-X</strong>
            <small>Vizzy AI floor studio</small>
          </span>
        </div>
        <div className="vx-status">{status}</div>
      </header>

      <section className="vx-hero">
        <div>
          <p className="vx-eyebrow">Say Hey Vizzy</p>
          <h1>Speak a floor idea. Vizzy finds it, outlines it, and renders it.</h1>
          <p>
            Upload a room photo, ask for a style like white swirl epoxy floor, choose one of three references, and
            Vizzy maps the look onto your floor.
          </p>
        </div>
        <div className="vx-vizzy-card">
          <div className="vx-vizzy-face">
            <div className="vx-vizzy-orbit">
              <div className="vx-vizzy-dot" />
            </div>
          </div>
          <p>
            Try: Hey Vizzy, outline my floor, search for white swirl epoxy floors, show me three options, and use
            option one.
          </p>
        </div>
      </section>

      <section className="vx-app-grid">
        <div className="vx-canvas-shell">
          <canvas
            ref={canvasRef}
            width={1280}
            height={820}
            onPointerDown={(event) => {
              if (image) {
                setPolygon((value) => [...value, pointerToCanvas(event)]);
                setStatus("Manual floor point added");
              }
            }}
          />
          {!image && (
            <div className="vx-empty">
              <span>Upload a floor photo</span>
              <strong>Vizzy will handle the preview flow from there.</strong>
            </div>
          )}
        </div>

        <aside className="vx-side">
          <section className="vx-panel">
            <label className="vx-upload">
              <input type="file" accept="image/png,image/jpeg,image/webp" onChange={upload} />
              Upload customer floor photo
            </label>
          </section>

          <section className="vx-panel vx-command-box">
            <h2>Tell Vizzy</h2>
            <p>Use voice or text. Vizzy understands outline my floor, search white swirl epoxy, and use option 1.</p>
            <textarea value={command} onChange={(event) => setCommand(event.target.value)} />
            <div className="vx-row">
              <button onClick={listen} disabled={listening}>
                {listening ? "Listening" : "Voice"}
              </button>
              <button className="vx-magic" onClick={runFullFlow} disabled={busy}>
                Do it all
              </button>
            </div>
          </section>

          <section className="vx-panel">
            <h2>Style search</h2>
            <p>Vizzy finds three rectangular inspiration choices.</p>
            <button className="vx-primary" onClick={searchStyles} disabled={busy}>
              Find 3 floor styles
            </button>
            <div className="vx-styles">
              {styles.map((style, index) => (
                <button
                  key={style.id}
                  className={`vx-style ${chosenStyle.id === style.id ? "vx-active" : ""}`}
                  onClick={() => chooseStyle(style, index)}
                >
                  <span className="vx-thumb">
                    <img src={style.imageUrl} alt={style.title} />
                  </span>
                  <span>
                    <strong>{style.title}</strong>
                    <span>{style.description}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="vx-panel">
            <h2>Render</h2>
            <p>{readout}</p>
            <div className={`vx-timer ${busy ? "" : "vx-hidden"}`}>
              <span>{elapsed}s elapsed</span>
            </div>
            <div className="vx-row">
              <button onClick={detectFloor} disabled={busy}>
                Outline floor
              </button>
              <button className="vx-primary" onClick={renderAiPreview} disabled={busy}>
                Render floor
              </button>
            </div>
            <button onClick={downloadPreview}>Download preview</button>
          </section>
        </aside>
      </section>
    </main>
  );
}
