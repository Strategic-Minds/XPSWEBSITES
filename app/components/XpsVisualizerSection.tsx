const xpsVisualizerUrl = "https://xtremepolishingsystems.com/pages/flake-visualizer";

const chartBoards = [
  {
    title: "Top Flake Colors",
    subtitle: "Full-broadcast flake systems for garages, shops, patios, and high-use floors.",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-flake-colors-approved.png?v=1781670774",
    alt: "XPS top flake colors chart"
  },
  {
    title: "Top Metallic Colors",
    subtitle: "Decorative metallic epoxy options for showroom-style floors and statement spaces.",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-metallic-colors-standardized.png?v=1781670766",
    alt: "XPS top metallic colors chart"
  },
  {
    title: "Top Quartz Colors",
    subtitle: "Quartz texture directions for traction-heavy, commercial, and performance floors.",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-quartz-colors-standardized.png?v=1781670783",
    alt: "XPS top quartz colors chart"
  },
  {
    title: "Solid Base Coats",
    subtitle: "Solid epoxy base coat colors used to support flakes, metallics, quartz, and solid systems.",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-solid-color-epoxy-base-coats.png?v=1781680330",
    alt: "XPS solid color epoxy base coat chart"
  },
  {
    title: "Glitter Additives",
    subtitle: "Optional glitter additive colors for sparkle accents and custom decorative finishes.",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-glitter-additive-colors.png?v=1781680348",
    alt: "XPS top glitter additive color chart"
  },
  {
    title: "Concrete Dye & Stain",
    subtitle: "Concrete dye and stain directions for polished concrete and decorative concrete color.",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-concrete-dye-stain-colors.png?v=1781680338",
    alt: "XPS concrete dye and stain color chart"
  }
];

export function XpsVisualizerSection() {
  return (
    <>
      <section className="floor-visualizer-strip" id="visualizer" aria-label="XPS floor visualizer">
        <div className="visualizer-copy">
          <span className="visualizer-kicker">Xtreme Polishing Systems visualizer</span>
          <h2>See Your Floor Before You Build It.</h2>
          <p>
            Use the XPS floor visualizer to preview flake directions, then compare the actual color charts below before
            submitting your digital estimator request.
          </p>
          <div className="visualizer-actions">
            <a className="blue-button" href={xpsVisualizerUrl} target="_blank" rel="noreferrer">
              Open XPS Floor Visualizer
            </a>
          </div>
        </div>
        <div className="visualizer-preview xps-owned-preview" aria-label="XPS finish preview">
          <div className="visualizer-garage" aria-hidden="true">
            <div className="visualizer-wall" />
            <div className="visualizer-floor" />
          </div>
          <div className="visualizer-caption">
            <strong>XPS Flake Visualizer</strong>
            <span>Owned color workflow</span>
          </div>
        </div>
      </section>

      <section className="xps-flake-chart-section" id="color-chart" aria-label="Interactive epoxy color charts">
        <div className="xps-custom-color-note">
          <strong>Choose your color before the estimate.</strong>
          <span>Attach the chart name or screenshot in the digital estimator so the team can quote the right system.</span>
        </div>
        <div className="xps-chart-board">
          <div className="xps-chart-board-grid compact-chart-grid">
            {chartBoards.map((board) => (
              <article className="xps-chart-card" key={board.title}>
                <img src={board.image} alt={board.alt} />
                <div>
                  <h3>{board.title}</h3>
                  <p>{board.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="xps-chart-disclaimer">
            Due to screen and sealer differences, colors may look slightly different in person. Wet-look sealers can deepen color and sheen.
          </p>
        </div>
      </section>
    </>
  );
}
