"use client";
import { useState } from "react";
import { MobileNavigation } from "../components/MobileNavigation";

const CDN = "https://cdn.shopify.com/s/files/1/0754/8905/0678/files";

const PROJECTS = [
  { id:1,  cat:"Garage Floors",   title:"Full-Broadcast Flake System",      loc:"Scottsdale, AZ", sqft:"520 sqft",  system:"Polyaspartic Flake",    img:`${CDN}/phoenix-epoxy-pros-service-garage.webp?v=1781648581`,       tag:"Most Popular" },
  { id:2,  cat:"Before & After",  title:"Complete Surface Transformation",  loc:"Phoenix, AZ",    sqft:"480 sqft",  system:"Metallic Epoxy",         img:`${CDN}/phoenix-epoxy-pros-before-after.webp?v=1781648570`,         tag:"Before/After"  },
  { id:3,  cat:"Commercial",      title:"Commercial Warehouse Floor",       loc:"Mesa, AZ",       sqft:"8,200 sqft",system:"Industrial Epoxy",        img:`${CDN}/phoenix-epoxy-pros-service-commercial.webp?v=1781648591`,   tag:"Commercial"    },
  { id:4,  cat:"Patios",          title:"Outdoor Patio Polyaspartic",       loc:"Chandler, AZ",   sqft:"640 sqft",  system:"UV-Stable Polyaspartic",  img:`${CDN}/phoenix-epoxy-pros-service-patio.webp?v=1781648601`,        tag:"Outdoor"       },
  { id:5,  cat:"Garage Floors",   title:"Repair & Resurface",               loc:"Gilbert, AZ",    sqft:"420 sqft",  system:"Diamond Grind + Epoxy",   img:`${CDN}/phoenix-epoxy-pros-service-repair.webp?v=1781648616`,       tag:"Repair"        },
  { id:6,  cat:"Process",         title:"Diamond Grind Surface Prep",       loc:"Tempe, AZ",      sqft:"580 sqft",  system:"Prep Stage",              img:`${CDN}/nashville-resin-worx-process-02-prep-work.png?v=1781036569`,tag:"Process"       },
  { id:7,  cat:"Process",         title:"Base Coat Application",            loc:"Phoenix, AZ",    sqft:"500 sqft",  system:"Base Layer",              img:`${CDN}/nashville-resin-worx-process-03-base-coat.png?v=1781036578`,tag:"Process"       },
  { id:8,  cat:"Process",         title:"Flake Broadcast Beauty Coat",      loc:"Scottsdale, AZ", sqft:"460 sqft",  system:"Full Broadcast",          img:`${CDN}/nashville-resin-worx-process-04-beauty-coat.png?v=1781036586`,tag:"Process"     },
  { id:9,  cat:"Process",         title:"Final Inspection Walkthrough",     loc:"Phoenix, AZ",    sqft:"490 sqft",  system:"Polyaspartic Top Coat",   img:`${CDN}/nashville-resin-worx-process-06-final-inspection.png?v=1781036605`,tag:"Final"   },
  { id:10, cat:"Color Systems",   title:"Top Flake Color Options",          loc:"XPS System",     sqft:"All sizes", system:"Flake System",            img:`${CDN}/xps-top-flake-colors-approved.png?v=1781670774`,            tag:"Colors"        },
  { id:11, cat:"Color Systems",   title:"Metallic Epoxy Colors",            loc:"XPS System",     sqft:"All sizes", system:"Metallic System",         img:`${CDN}/xps-top-metallic-colors-standardized.png?v=1781670766`,     tag:"Colors"        },
  { id:12, cat:"Color Systems",   title:"Quartz Color System",              loc:"XPS System",     sqft:"All sizes", system:"Quartz System",           img:`${CDN}/xps-top-quartz-colors-standardized.png?v=1781670783`,       tag:"Colors"        },
];

const CATS = ["All","Garage Floors","Commercial","Patios","Before & After","Process","Color Systems"];

export default function GalleryPage() {
  const [cat, setCat] = useState("All");
  const [lb, setLb]   = useState<number|null>(null);

  const items = cat==="All" ? PROJECTS : PROJECTS.filter(p=>p.cat===cat);
  const lbItem = lb!==null ? PROJECTS.find(p=>p.id===lb) : null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html:`
        .gal-page{background:#fafafa;min-height:100vh;font-family:Arial,Helvetica,sans-serif;}
        .gal-header{position:sticky;top:0;z-index:30;background:#050505;border-bottom:1px solid rgba(255,255,255,.08);min-height:68px;display:flex;align-items:center;justify-content:space-between;padding:0 24px;}
        .gal-header-logo{display:flex;align-items:center;gap:12px;text-decoration:none;}
        .gal-header-logo img{height:38px;width:auto;}
        .gal-header-nav{display:flex;align-items:center;gap:4px;}
        @media(max-width:900px){.gal-header-nav{display:none;}}
        .gal-header-nav a{padding:7px 14px;border-radius:6px;color:rgba(255,255,255,.6);font-size:13px;font-weight:700;text-decoration:none;transition:color .15s;}
        .gal-header-nav a:hover{color:#fff;}
        .gal-header-cta{padding:9px 20px;background:#F6B800;color:#000;font-weight:900;font-size:13px;border-radius:6px;text-decoration:none;}
        .gal-header-actions{display:flex;align-items:center;gap:10px;}
        @media(max-width:900px){.gal-header-actions{display:none;}}

        .gal-hero{background:#050505;padding:72px 24px 56px;text-align:center;}
        .gal-hero-kicker{font-size:10px;font-weight:900;letter-spacing:.2em;text-transform:uppercase;color:#F6B800;margin-bottom:14px;}
        .gal-hero-h1{font-family:Impact,"Arial Black",sans-serif;font-size:clamp(48px,8vw,88px);color:#fff;text-transform:uppercase;line-height:.95;letter-spacing:-1px;margin-bottom:16px;}
        .gal-hero-h1 span{color:#F6B800;}
        .gal-hero-sub{font-size:17px;color:rgba(255,255,255,.55);max-width:520px;margin:0 auto 40px;line-height:1.6;}
        .gal-stats{display:flex;justify-content:center;gap:48px;flex-wrap:wrap;}
        .gal-stat-n{font-size:32px;font-weight:900;color:#fff;line-height:1;}
        .gal-stat-l{font-size:11px;color:rgba(255,255,255,.4);margin-top:4px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;}

        .gal-filters{position:sticky;top:68px;z-index:20;background:#fff;border-bottom:1px solid #e5e7eb;display:flex;overflow-x:auto;scrollbar-width:none;padding:0 16px;}
        .gal-filters::-webkit-scrollbar{display:none;}
        .gal-filter-btn{flex-shrink:0;padding:14px 18px;font-size:13px;font-weight:800;color:#666;border:none;background:transparent;cursor:pointer;border-bottom:2px solid transparent;white-space:nowrap;font-family:inherit;transition:all .15s;}
        .gal-filter-btn:hover{color:#000;}
        .gal-filter-btn.active{color:#F6B800;border-bottom-color:#F6B800;}

        .gal-container{max-width:1440px;margin:0 auto;padding:40px 16px 96px;}
        .gal-count{font-size:13px;color:#888;font-weight:600;margin-bottom:24px;}
        .gal-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:2px;}
        @media(max-width:640px){.gal-grid{grid-template-columns:1fr 1fr;}}

        .gal-card{background:#0a0a0a;position:relative;overflow:hidden;aspect-ratio:4/3;cursor:pointer;}
        @media(max-width:640px){.gal-card{aspect-ratio:1;}}
        .gal-card img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s ease;}
        .gal-card:hover img{transform:scale(1.05);}
        .gal-card-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.9) 0%,rgba(0,0,0,.2) 50%,transparent 100%);opacity:0;transition:opacity .3s;display:flex;flex-direction:column;justify-content:flex-end;padding:20px;}
        .gal-card:hover .gal-card-overlay{opacity:1;}
        .gal-card-tag{display:inline-block;margin-bottom:6px;padding:3px 9px;background:#F6B800;color:#000;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;border-radius:3px;width:fit-content;}
        .gal-card-title{font-size:15px;font-weight:900;color:#fff;margin-bottom:3px;line-height:1.2;}
        .gal-card-meta{font-size:11px;color:rgba(255,255,255,.6);}

        .gal-card-info{padding:12px 14px;background:#fff;border-bottom:1px solid #f0f0f0;}
        .gal-card-info-title{font-size:13px;font-weight:900;color:#0a0a0a;margin-bottom:2px;}
        .gal-card-info-meta{font-size:11px;color:#888;}
        .gal-card-info-badge{display:inline-block;margin-top:5px;padding:2px 8px;background:#FFF8E1;color:#B8860B;font-size:9px;font-weight:900;text-transform:uppercase;border-radius:3px;}

        .gal-cta{background:#F6B800;padding:64px 24px;text-align:center;}
        .gal-cta-h{font-family:Impact,"Arial Black",sans-serif;font-size:clamp(32px,5vw,52px);color:#000;text-transform:uppercase;letter-spacing:-1px;margin-bottom:12px;}
        .gal-cta-sub{font-size:18px;color:rgba(0,0,0,.6);margin-bottom:28px;}
        .gal-cta-btn{display:inline-flex;align-items:center;gap:8px;background:#000;color:#F6B800;font-size:15px;font-weight:900;padding:16px 36px;border-radius:6px;text-decoration:none;text-transform:uppercase;}
        .gal-cta-btn:hover{background:#111;}

        .lightbox{position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.96);display:flex;align-items:center;justify-content:center;padding:20px;}
        .lb-inner{position:relative;max-width:960px;width:100%;}
        .lb-img{width:100%;max-height:78vh;object-fit:contain;display:block;border-radius:4px;}
        .lb-close{position:absolute;top:-44px;right:0;background:rgba(255,255,255,.1);border:none;color:#fff;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;}
        .lb-title{font-size:18px;font-weight:900;color:#fff;margin:16px 0 4px;}
        .lb-meta{font-size:13px;color:rgba(255,255,255,.5);}
      `}} />

      <div className="gal-page">
        {/* HEADER */}
        <header className="gal-header">
          <a href="/" className="gal-header-logo">
            <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" />
          </a>
          <nav className="gal-header-nav">
            {[["/"          ,"Home"         ],
              ["/gallery"   ,"Gallery"      ],
              ["/design"    ,"Design Center"],
              ["/digital-estimator","Estimate"],
              ["/about-us"  ,"About"        ],
              ["/contact-us","Contact"      ]].map(([h,l])=>(
              <a key={h} href={h}>{l}</a>
            ))}
          </nav>
          <div className="gal-header-actions">
            <a href="/customer-portal" style={{padding:"7px 14px",color:"rgba(255,255,255,.55)",fontSize:13,fontWeight:700,border:"1px solid rgba(255,255,255,.12)",borderRadius:6,textDecoration:"none"}}>Client Portal</a>
            <a href="/digital-estimator" className="gal-header-cta">Free Estimate →</a>
          </div>
          <MobileNavigation />
        </header>

        {/* HERO */}
        <section className="gal-hero">
          <div className="gal-hero-kicker">Project Gallery</div>
          <h1 className="gal-hero-h1">500+ Arizona<br/><span>Floors Transformed.</span></h1>
          <p className="gal-hero-sub">Every project is a real Phoenix-area floor. Real crews. Real results. Powered by Xtreme Polishing Systems.</p>
          <div className="gal-stats">
            {[["500+","Projects"],["4.9★","Google Rating"],["10yr","Warranty"],["AZ","Licensed & Insured"]].map(([n,l])=>(
              <div key={l}><div className="gal-stat-n">{n}</div><div className="gal-stat-l">{l}</div></div>
            ))}
          </div>
        </section>

        {/* FILTERS */}
        <div className="gal-filters">
          {CATS.map(c=>(
            <button key={c} className={`gal-filter-btn${cat===c?" active":""}`} onClick={()=>setCat(c)}>
              {c} ({c==="All"?PROJECTS.length:PROJECTS.filter(p=>p.cat===c).length})
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="gal-container">
          <p className="gal-count">{items.length} project{items.length!==1?"s":""}{cat!=="All"?` in ${cat}`:""}</p>
          <div className="gal-grid">
            {items.map(item=>(
              <div key={item.id}>
                <div className="gal-card" onClick={()=>setLb(item.id)} role="button" tabIndex={0} aria-label={item.title}>
                  <img src={item.img} alt={item.title} loading="lazy" />
                  <div className="gal-card-overlay">
                    <span className="gal-card-tag">{item.tag}</span>
                    <div className="gal-card-title">{item.title}</div>
                    <div className="gal-card-meta">{item.loc} · {item.sqft} · {item.system}</div>
                  </div>
                </div>
                <div className="gal-card-info">
                  <div className="gal-card-info-title">{item.title}</div>
                  <div className="gal-card-info-meta">{item.loc} · {item.sqft}</div>
                  <span className="gal-card-info-badge">{item.system}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="gal-cta">
          <div className="gal-cta-h">Want a Floor Like These?</div>
          <p className="gal-cta-sub">Get your free digital estimate in under 10 minutes.</p>
          <a href="/digital-estimator" className="gal-cta-btn">Start Your Free Estimate →</a>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lbItem&&(
        <div className="lightbox" onClick={()=>setLb(null)}>
          <div className="lb-inner" onClick={e=>e.stopPropagation()}>
            <button className="lb-close" onClick={()=>setLb(null)}>✕</button>
            <img className="lb-img" src={lbItem.img} alt={lbItem.title} />
            <div className="lb-title">{lbItem.title}</div>
            <div className="lb-meta">{lbItem.loc} · {lbItem.sqft} · {lbItem.system}</div>
          </div>
        </div>
      )}
    </>
  );
}
