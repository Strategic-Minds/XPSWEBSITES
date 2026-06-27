const chartBoards = [
  {
    id: "flake",
    image: "https://cdn.shopify.com/s/files/1/0994/8961/2147/files/xps-top-flake-colors-approved-exact-20260627.webp?v=1782596632",
    alt: "XPS top flake colors approved chart"
  },
  {
    id: "metallic",
    image: "https://cdn.shopify.com/s/files/1/0994/8961/2147/files/xps-top-metallic-colors-standardized-exact-20260627.webp?v=1782596644",
    alt: "XPS top metallic colors standardized chart"
  },
  {
    id: "quartz",
    image: "https://cdn.shopify.com/s/files/1/0994/8961/2147/files/xps-top-quartz-colors-standardized-exact-20260627.webp?v=1782596653",
    alt: "XPS top quartz colors standardized chart"
  },
  {
    id: "solid",
    image: "https://cdn.shopify.com/s/files/1/0994/8961/2147/files/xps-solid-color-epoxy-base-coats-exact-20260627.webp?v=1782596663",
    alt: "XPS solid color epoxy base coats chart"
  },
  {
    id: "glitter",
    image: "https://cdn.shopify.com/s/files/1/0994/8961/2147/files/xps-top-glitter-additive-colors-exact-20260627.webp?v=1782596676",
    alt: "XPS top glitter additive colors chart"
  },
  {
    id: "stain",
    image: "https://cdn.shopify.com/s/files/1/0994/8961/2147/files/xps-concrete-dye-stain-colors-exact-20260627.webp?v=1782596686",
    alt: "XPS concrete dye and stain colors chart"
  }
];

export function FinishVisualizer() {
  return (
    <section className="xps-flake-chart-section" id="color-chart" aria-label="Epoxy color charts">
      <div className="xps-custom-color-note">
        <strong>Don&apos;t see your color?</strong>
        <span>Contact us, we have many other custom colors perfect for you!</span>
      </div>
      <div className="xps-chart-board">
        <div className="xps-chart-board-grid">
          {chartBoards.map((board) => (
            <article className="xps-chart-frame" key={board.id} aria-label={board.alt}>
              <div className="xps-chart-image-shell" data-chart={board.id}>
                <img src={board.image} alt={board.alt} loading="lazy" />
              </div>
            </article>
          ))}
        </div>
        <p className="xps-chart-disclaimer">
          Due to computer screen differences, some colors may slightly differ in person, and sealer may give the floor a wet look that enriches the color.
        </p>
      </div>
    </section>
  );
}
