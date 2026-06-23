# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 07-seo-performance.spec.ts >> SEO — Homepage >> meta description exists and is correct length
- Location: .agents/playwright/tests/07-seo-performance.spec.ts:17:7

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 165
Received:   181
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e2]:
    - generic [ref=e3]:
      - link "Phoenix Epoxy Pros home" [ref=e4] [cursor=pointer]:
        - /url: "#home"
        - img "Phoenix Epoxy Pros" [ref=e5]
      - navigation "Main navigation" [ref=e6]:
        - link "Digital Bid" [ref=e7] [cursor=pointer]:
          - /url: /digital-bid
        - link "Portal System" [ref=e8] [cursor=pointer]:
          - /url: /portal-system
        - link "About Us" [ref=e9] [cursor=pointer]:
          - /url: /about-us
        - link "Gallery" [ref=e10] [cursor=pointer]:
          - /url: /gallery
        - link "Call 772-209-0266" [ref=e11] [cursor=pointer]:
          - /url: tel:17722090266
      - link "Get Quote" [ref=e13] [cursor=pointer]:
        - /url: /digital-estimator
    - region "Phoenix Epoxy Pros estimate hero" [ref=e14]:
      - generic [ref=e17]:
        - heading "Get Quote" [level=2] [ref=e19]
        - textbox [ref=e21]:
          - /placeholder: Full Name
        - textbox [ref=e23]:
          - /placeholder: Phone Number
        - textbox [ref=e25]:
          - /placeholder: Email Address
        - textbox [ref=e27]:
          - /placeholder: Zip Code
        - combobox [ref=e29]:
          - option "Project Type" [disabled] [selected]
          - option "Garage Floors"
          - option "Commercial Floors"
          - option "Patios & Outdoor Spaces"
          - option "Floor Repair"
          - option "Polished Concrete"
          - option "Decorative Concrete"
          - option "Epoxy Training Classes"
          - option "Business Starter Training"
        - generic [ref=e30]:
          - checkbox "Request ASAP service" [ref=e31]
          - generic [ref=e32]: Request ASAP service
        - button "Start Digital Bid" [ref=e33] [cursor=pointer]
    - region "Estimate benefits" [ref=e34]:
      - paragraph [ref=e35]:
        - strong [ref=e36]: Photos, Size & Surface Condition
        - generic [ref=e37]: Start with the floor type, rough square footage, current coating history, cracks, and clear photos.
      - paragraph [ref=e38]:
        - strong [ref=e39]: Finish System Guidance
        - generic [ref=e40]: Compare flake, metallic, quartz, solid color, glitter, and stain options before choosing the performance path.
      - paragraph [ref=e41]:
        - strong [ref=e42]: Portal-Ready Project Setup
        - generic [ref=e43]: Estimator requests can move into proposal delivery, payment links, warranty information, and job tracking after approval.
    - generic [ref=e44]:
      - generic [ref=e45]:
        - generic [ref=e46]: Services
        - heading "Phoenix epoxy floors built around the right system" [level=2] [ref=e47]
      - generic [ref=e48]:
        - link "Garage Floor Coatings project example Garage Floor Coatings Diamond-grind prep, crack repair, full-broadcast flake, and durable polyaspartic topcoat planning. Best for daily-use Phoenix garages that need a clean finish, traction, and easier maintenance." [ref=e49] [cursor=pointer]:
          - /url: /digital-estimator
          - img "Garage Floor Coatings project example" [ref=e50]
          - generic [ref=e51]:
            - heading "Garage Floor Coatings" [level=2] [ref=e52]
            - paragraph [ref=e53]: Diamond-grind prep, crack repair, full-broadcast flake, and durable polyaspartic topcoat planning.
            - generic [ref=e54]: Best for daily-use Phoenix garages that need a clean finish, traction, and easier maintenance.
        - link "Commercial Floor Systems project example Commercial Floor Systems Flake, quartz, and high-performance coating systems for shops, showrooms, warehouses, and workspaces. Traffic, chemical exposure, slip resistance, downtime, and cleaning needs drive the system recommendation." [ref=e55] [cursor=pointer]:
          - /url: /digital-estimator
          - img "Commercial Floor Systems project example" [ref=e56]
          - generic [ref=e57]:
            - heading "Commercial Floor Systems" [level=2] [ref=e58]
            - paragraph [ref=e59]: Flake, quartz, and high-performance coating systems for shops, showrooms, warehouses, and workspaces.
            - generic [ref=e60]: Traffic, chemical exposure, slip resistance, downtime, and cleaning needs drive the system recommendation.
        - link "Patios & Outdoor Concrete project example Patios & Outdoor Concrete Exterior coating direction for patios, covered spaces, walkways, and Arizona concrete surfaces. Outdoor projects need UV, heat, texture, and drainage considerations before finish selection." [ref=e61] [cursor=pointer]:
          - /url: /digital-estimator
          - img "Patios & Outdoor Concrete project example" [ref=e62]
          - generic [ref=e63]:
            - heading "Patios & Outdoor Concrete" [level=2] [ref=e64]
            - paragraph [ref=e65]: Exterior coating direction for patios, covered spaces, walkways, and Arizona concrete surfaces.
            - generic [ref=e66]: Outdoor projects need UV, heat, texture, and drainage considerations before finish selection.
        - link "Repair & Surface Prep project example Repair & Surface Prep Crack repair, spalling, failed coating removal, grinding, patching, and slab-condition review. Prep is the part that decides whether the coating bonds, wears correctly, and looks right." [ref=e67] [cursor=pointer]:
          - /url: /digital-estimator
          - img "Repair & Surface Prep project example" [ref=e68]
          - generic [ref=e69]:
            - heading "Repair & Surface Prep" [level=2] [ref=e70]
            - paragraph [ref=e71]: Crack repair, spalling, failed coating removal, grinding, patching, and slab-condition review.
            - generic [ref=e72]: Prep is the part that decides whether the coating bonds, wears correctly, and looks right.
    - generic [ref=e73]:
      - generic [ref=e74]:
        - generic [ref=e75]: Before / After
        - heading "Prep is what separates a coating from a floor that lasts." [level=2] [ref=e76]
        - paragraph [ref=e77]: A good epoxy or polyaspartic system starts before the coating is poured. The slab needs the right profile, repairs, cleaning, base coat, broadcast, and topcoat for the way the floor will actually be used.
        - link "Start My Quote" [ref=e78] [cursor=pointer]:
          - /url: /digital-estimator
      - img "Before and after Phoenix epoxy garage floor comparison" [ref=e79]
    - generic [ref=e80]:
      - generic [ref=e81]:
        - generic [ref=e82]: Step by step installation
        - heading "Our 6-step floor coating process" [level=2] [ref=e83]
      - generic [ref=e84]:
        - article [ref=e85]:
          - generic [ref=e86]:
            - img "Sign Up & Schedule Job epoxy floor process stage" [ref=e87]
            - generic [ref=e88]: "1"
          - heading "Sign Up & Schedule Job" [level=3] [ref=e89]
          - paragraph [ref=e90]: Start the estimate, send project basics, and choose the first finish direction.
          - list [ref=e91]:
            - listitem [ref=e92]: Free estimate intake
            - listitem [ref=e93]: Digital Bid handoff
            - listitem [ref=e94]: Scheduling path
        - article [ref=e95]:
          - generic [ref=e96]:
            - img "Prep Work epoxy floor process stage" [ref=e97]
            - generic [ref=e98]: "2"
          - heading "Prep Work" [level=3] [ref=e99]
          - paragraph [ref=e100]: Concrete is mechanically prepared so the coating has the right profile and bond.
          - list [ref=e101]:
            - listitem [ref=e102]: Diamond grinding
            - listitem [ref=e103]: Crack repair and patching
            - listitem [ref=e104]: Clean surface profile
        - article [ref=e105]:
          - generic [ref=e106]:
            - img "Base Coat epoxy floor process stage" [ref=e107]
            - generic [ref=e108]: "3"
          - heading "Base Coat" [level=3] [ref=e109]
          - paragraph [ref=e110]: The base coat is matched to the slab, use case, and selected broadcast system.
          - list [ref=e111]:
            - listitem [ref=e112]: Moisture-aware review
            - listitem [ref=e113]: Strong bond layer
            - listitem [ref=e114]: System-specific base
        - article [ref=e115]:
          - generic [ref=e116]:
            - img "Beauty Coat epoxy floor process stage" [ref=e117]
            - generic [ref=e118]: "4"
          - heading "Beauty Coat" [level=3] [ref=e119]
          - paragraph [ref=e120]: Flake, metallic, or quartz creates the visual finish and texture profile.
          - list [ref=e121]:
            - listitem [ref=e122]: Flake broadcast
            - listitem [ref=e123]: Metallic movement
            - listitem [ref=e124]: Quartz texture
        - article [ref=e125]:
          - generic [ref=e126]:
            - img "Topcoat Finish epoxy floor process stage" [ref=e127]
            - generic [ref=e128]: "5"
          - heading "Topcoat Finish" [level=3] [ref=e129]
          - paragraph [ref=e130]: The clear topcoat locks in the system and sets the sheen, texture, and durability.
          - list [ref=e131]:
            - listitem [ref=e132]: Polyaspartic topcoat
            - listitem [ref=e133]: Satin or gloss direction
            - listitem [ref=e134]: Durability layer
        - article [ref=e135]:
          - generic [ref=e136]:
            - img "Final Inspection epoxy floor process stage" [ref=e137]
            - generic [ref=e138]: "6"
          - heading "Final Inspection" [level=3] [ref=e139]
          - paragraph [ref=e140]: The finished floor is reviewed for quality, cure guidance, and care instructions.
          - list [ref=e141]:
            - listitem [ref=e142]: Walkthrough
            - listitem [ref=e143]: Care guide
            - listitem [ref=e144]: Follow-up notes
    - region "Epoxy color charts" [ref=e145]:
      - generic [ref=e146]:
        - strong [ref=e147]: Don't see your color?
        - text: Contact us, we have many other custom colors perfect for you!
      - generic [ref=e148]:
        - generic [ref=e149]:
          - article [ref=e150]:
            - generic [ref=e151]:
              - heading "Top Flake Colors" [level=2] [ref=e152]
              - paragraph [ref=e153]: Full-broadcast flake finish options.
            - img "XPS top 12 epoxy flake color chart" [ref=e155]
          - article [ref=e156]:
            - generic [ref=e157]:
              - heading "Top Metallic Colors" [level=2] [ref=e158]
              - paragraph [ref=e159]: Decorative metallic epoxy finish options.
            - img "XPS top metallic colors chart" [ref=e161]
          - article [ref=e162]:
            - generic [ref=e163]:
              - heading "Top Quartz Colors" [level=2] [ref=e164]
              - paragraph [ref=e165]: Quartz texture finish options.
            - img "XPS top quartz colors chart" [ref=e167]
          - article [ref=e168]:
            - generic [ref=e169]:
              - heading "Solid Color Epoxy Base Coats" [level=2] [ref=e170]
              - paragraph [ref=e171]: Solid color epoxy is typically used as the base coat during the application process.
            - img "XPS solid color epoxy base coat chart" [ref=e173]
          - article [ref=e174]:
            - generic [ref=e175]:
              - heading "Top Glitter Additive Colors" [level=2] [ref=e176]
              - paragraph [ref=e177]: Glitter is an additive, but it can also be used to create an overall sparkle look.
            - img "XPS top glitter additive color chart" [ref=e179]
          - article [ref=e180]:
            - generic [ref=e181]:
              - heading "Concrete Dye & Stain Colors" [level=2] [ref=e182]
              - paragraph [ref=e183]: Concrete dye and stain options for polished or decorative concrete color direction.
            - img "XPS concrete dye and stain color chart" [ref=e185]
        - paragraph [ref=e186]: Due to computer screen differences, some colors may slightly differ in person, and especially when sealer is applied which may give it a "wet look" which enriches the color.
    - generic [ref=e187]:
      - generic [ref=e188]:
        - generic [ref=e189]: Project gallery
        - heading "Real surface directions for real concrete" [level=2] [ref=e190]
      - generic [ref=e191]:
        - link "Garage Floors example Garage Floors" [ref=e192] [cursor=pointer]:
          - /url: /digital-estimator
          - img "Garage Floors example" [ref=e193]
          - generic [ref=e194]: Garage Floors
        - link "Commercial Floors example Commercial Floors" [ref=e195] [cursor=pointer]:
          - /url: /digital-estimator
          - img "Commercial Floors example" [ref=e196]
          - generic [ref=e197]: Commercial Floors
        - link "Outdoor Spaces example Outdoor Spaces" [ref=e198] [cursor=pointer]:
          - /url: /digital-estimator
          - img "Outdoor Spaces example" [ref=e199]
          - generic [ref=e200]: Outdoor Spaces
        - link "Concrete Repair example Concrete Repair" [ref=e201] [cursor=pointer]:
          - /url: /digital-estimator
          - img "Concrete Repair example" [ref=e202]
          - generic [ref=e203]: Concrete Repair
      - link "View Full Gallery" [ref=e204] [cursor=pointer]:
        - /url: /gallery
    - generic [ref=e205]:
      - generic [ref=e206]:
        - generic [ref=e207]: Job Tracker
        - heading "A client portal that starts tracking the moment they sign up" [level=2] [ref=e208]
      - generic [ref=e209]:
        - article [ref=e210]:
          - heading "Immediate Tracking From Signup" [level=3] [ref=e211]
          - paragraph [ref=e212]: Clients can see their project intake, estimate status, finish selections, schedule checkpoints, and next required action as soon as tracker access is created.
        - article [ref=e213]:
          - heading "Unique Client Project Timeline" [level=3] [ref=e214]
          - paragraph [ref=e215]: Photos, measurements, desired finish, warranty information, care instructions, messages, approvals, proposal details, and documents stay attached to one job record instead of scattered texts.
        - article [ref=e216]:
          - heading "Built For Trust Before Install Day" [level=3] [ref=e217]
          - paragraph [ref=e218]: The tracker shows what has been received, what is being reviewed, what is approved, and what happens next so clients never wonder where the job stands.
      - generic [ref=e219]:
        - paragraph [ref=e220]: Every qualified estimate can become a tracked project with uploads, finish approvals, proposal status, warranty documents, progress checkpoints, and email updates in one place.
        - link "View Portal System" [ref=e221] [cursor=pointer]:
          - /url: /portal-system
    - region "Digital Estimator 15 percent offer" [ref=e222]:
      - generic [ref=e223]:
        - generic [ref=e224]: 15% Digital Estimator Offer
        - heading "Save 15% by starting your bid online." [level=2] [ref=e225]
        - paragraph [ref=e226]: "The Digital Bid System keeps the estimate package clean from the first click: contact details, floor images, measurements, existing covering, desired finish, desired color, warranty notes, proposal handoff, and job tracker setup."
        - list [ref=e227]:
          - listitem [ref=e228]: Start here with name, email, phone, ZIP, project type, and ASAP request if needed.
          - listitem [ref=e229]: The full Digital Bid form opens with your details already filled in.
          - listitem [ref=e230]: Upload multiple floor photos, measurements, current covering, finish choice, and inspiration pictures.
          - listitem [ref=e231]: Jeremy receives the package for review, then sends the proposal, payment path, warranty information, and tracker access steps.
      - generic [ref=e232]:
        - generic [ref=e233]:
          - generic [ref=e234]:
            - text: Full name
            - textbox "Full name" [ref=e235]
          - generic [ref=e236]:
            - text: Email
            - textbox "Email" [ref=e237]
        - generic [ref=e238]:
          - generic [ref=e239]:
            - text: Phone
            - textbox "Phone" [ref=e240]
          - generic [ref=e241]:
            - text: ZIP code
            - textbox "ZIP code" [ref=e242]
        - generic [ref=e243]:
          - text: Project type
          - combobox "Project type" [ref=e244]:
            - option "Choose project type" [disabled] [selected]
            - option "Garage Floors"
            - option "Commercial Floors"
            - option "Patios & Outdoor Spaces"
            - option "Floor Repair"
            - option "Polished Concrete"
            - option "Decorative Concrete"
            - option "Epoxy Training Classes"
            - option "Business Starter Training"
        - generic [ref=e245]:
          - checkbox "Request ASAP service" [ref=e246]
          - generic [ref=e247]: Request ASAP service
        - button "Start Digital Bid" [ref=e248] [cursor=pointer]
        - generic [ref=e249]: On the next page you can upload multiple job photos and any floor examples you like from this site or online.
    - generic [ref=e250]:
      - generic [ref=e251]:
        - generic [ref=e252]: Common questions
        - heading "Plan your epoxy floor estimate" [level=2] [ref=e253]
      - generic [ref=e254]:
        - group [ref=e255]:
          - generic "What should I send for an estimate?" [ref=e256] [cursor=pointer]
          - paragraph [ref=e257]: Send the project type, rough square footage, timeline, surface condition, coating history, and clear photos of the floor.
        - group [ref=e258]:
          - generic "Should I choose flake, metallic, or quartz?" [ref=e259] [cursor=pointer]
        - group [ref=e260]:
          - generic "Why does prep matter so much?" [ref=e261] [cursor=pointer]
    - generic [ref=e262]:
      - generic [ref=e263]:
        - img "Phoenix Epoxy Pros" [ref=e264]
        - paragraph [ref=e265]: Phoenix epoxy floor estimates, digital bid intake, finish system planning, proposal handoff, and customer project tracking.
      - navigation "Footer navigation" [ref=e266]:
        - link "Digital Bid" [ref=e267] [cursor=pointer]:
          - /url: /digital-bid
        - link "Portal System" [ref=e268] [cursor=pointer]:
          - /url: /portal-system
        - link "About Us" [ref=e269] [cursor=pointer]:
          - /url: /about-us
        - link "Contact Us" [ref=e270] [cursor=pointer]:
          - /url: /contact-us
        - link "Gallery" [ref=e271] [cursor=pointer]:
          - /url: /gallery
        - link "Job Tracker" [ref=e272] [cursor=pointer]:
          - /url: /job-tracker
        - link "JEREMY@SHOPXPS.COM" [ref=e273] [cursor=pointer]:
          - /url: mailto:JEREMY@SHOPXPS.COM
        - link "772-209-0266" [ref=e274] [cursor=pointer]:
          - /url: tel:17722090266
  - complementary "Instant chat request" [ref=e275]:
    - button "Instant Chat ASAP help" [ref=e276] [cursor=pointer]:
      - generic [ref=e277]: Instant Chat
      - strong [ref=e278]: ASAP help
  - alert [ref=e279]
```

# Test source

```ts
  1   | // ============================================================
  2   | // TEST SUITE 07: SEO & Performance
  3   | // Validates: titles, meta tags, schema, Core Web Vitals proxy,
  4   | //            image optimization, canonical URLs
  5   | // ============================================================
  6   | import { test, expect } from '@playwright/test';
  7   | 
  8   | test.describe('SEO — Homepage', () => {
  9   |   test('title contains brand and location keyword', async ({ page }) => {
  10  |     await page.goto('/');
  11  |     const title = await page.title();
  12  |     expect(title.toLowerCase()).toMatch(/epoxy|phoenix|floor/);
  13  |     expect(title.length).toBeGreaterThan(10);
  14  |     expect(title.length).toBeLessThan(70);
  15  |   });
  16  | 
  17  |   test('meta description exists and is correct length', async ({ page }) => {
  18  |     await page.goto('/');
  19  |     const desc = await page.$eval('meta[name="description"]', (el) => el.getAttribute('content')).catch(() => null);
  20  |     if (desc) {
  21  |       expect(desc.length).toBeGreaterThan(50);
> 22  |       expect(desc.length).toBeLessThan(165);
      |                           ^ Error: expect(received).toBeLessThan(expected)
  23  |       expect(desc.toLowerCase()).toMatch(/epoxy|floor|phoenix|coating/);
  24  |     }
  25  |   });
  26  | 
  27  |   test('has canonical URL tag', async ({ page }) => {
  28  |     await page.goto('/');
  29  |     const canonical = await page.$eval('link[rel="canonical"]', (el) => el.getAttribute('href')).catch(() => null);
  30  |     if (canonical) {
  31  |       expect(canonical).toMatch(/^https/);
  32  |     }
  33  |   });
  34  | 
  35  |   test('has OpenGraph tags', async ({ page }) => {
  36  |     await page.goto('/');
  37  |     const ogTitle = await page.$eval('meta[property="og:title"]', (el) => el.getAttribute('content')).catch(() => null);
  38  |     const ogDesc = await page.$eval('meta[property="og:description"]', (el) => el.getAttribute('content')).catch(() => null);
  39  |     const ogImage = await page.$eval('meta[property="og:image"]', (el) => el.getAttribute('content')).catch(() => null);
  40  |     // At least one OG tag should exist
  41  |     expect(ogTitle || ogDesc || ogImage).toBeTruthy();
  42  |   });
  43  | 
  44  |   test('has LocalBusiness schema with all required fields', async ({ page }) => {
  45  |     await page.goto('/');
  46  |     const schema = await page.$eval('script[type="application/ld+json"]', (el) => {
  47  |       try { return JSON.parse(el.textContent || '{}'); } catch { return {}; }
  48  |     }).catch(() => null);
  49  |     if (schema) {
  50  |       expect(schema['@type']).toBe('LocalBusiness');
  51  |       expect(schema.name).toBeTruthy();
  52  |       expect(schema.telephone).toBeTruthy();
  53  |       expect(schema.address?.['@type']).toBe('PostalAddress');
  54  |     }
  55  |   });
  56  | });
  57  | 
  58  | test.describe('SEO — Inner Pages', () => {
  59  |   const pages = [
  60  |     { path: '/digital-estimator', keyword: /estimate|bid|floor|digital/i },
  61  |     { path: '/visualizer', keyword: /visualiz|floor|color|design/i },
  62  |     { path: '/about-us', keyword: /about|epoxy|phoenix|company/i },
  63  |   ];
  64  | 
  65  |   for (const { path, keyword } of pages) {
  66  |     test(`${path} has appropriate title`, async ({ page }) => {
  67  |       await page.goto(path);
  68  |       const status = (await page.goto(path))?.status() ?? 0;
  69  |       if (status === 404) return; // Not yet built — skip SEO check
  70  |       const title = await page.title();
  71  |       const meta = await page.$eval('meta[name="description"]', (el) => el.getAttribute('content')).catch(() => '');
  72  |       expect(title.toLowerCase() + (meta || '')).toMatch(keyword);
  73  |     });
  74  |   }
  75  | });
  76  | 
  77  | test.describe('Performance — Image Optimization', () => {
  78  |   test('hero image loads and is not broken', async ({ page }) => {
  79  |     await page.goto('/');
  80  |     const heroImg = page.locator('header ~ * img, .hero img, section:first-of-type img').first();
  81  |     if (await heroImg.isVisible({ timeout: 5000 }).catch(() => false)) {
  82  |       const loaded = await page.waitForFunction(
  83  |         (el) => (el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth > 0,
  84  |         await heroImg.elementHandle(),
  85  |         { timeout: 8000 }
  86  |       ).catch(() => false);
  87  |       expect(loaded).not.toBeFalsy();
  88  |     }
  89  |   });
  90  | 
  91  |   test('no images return 404', async ({ page }) => {
  92  |     const failedImages: string[] = [];
  93  |     page.on('response', (resp) => {
  94  |       if (resp.request().resourceType() === 'image' && resp.status() === 404) {
  95  |         failedImages.push(resp.url());
  96  |       }
  97  |     });
  98  |     await page.goto('/');
  99  |     await page.waitForLoadState('networkidle');
  100 |     if (failedImages.length > 0) {
  101 |       console.warn('Broken images:', failedImages);
  102 |     }
  103 |     expect(failedImages.length).toBe(0);
  104 |   });
  105 | 
  106 |   test('page loads within 8 seconds', async ({ page }) => {
  107 |     const start = Date.now();
  108 |     await page.goto('/', { waitUntil: 'domcontentloaded' });
  109 |     const elapsed = Date.now() - start;
  110 |     expect(elapsed).toBeLessThan(8000);
  111 |   });
  112 | 
  113 |   test('no console errors on homepage', async ({ page }) => {
  114 |     const errors: string[] = [];
  115 |     page.on('console', (msg) => {
  116 |       if (msg.type() === 'error') errors.push(msg.text());
  117 |     });
  118 |     await page.goto('/');
  119 |     await page.waitForLoadState('networkidle').catch(() => null);
  120 |     // Filter out known acceptable errors (e.g. GA, third-party)
  121 |     const criticalErrors = errors.filter((e) =>
  122 |       !e.includes('google') && !e.includes('analytics') && !e.includes('cdn.shopify')
```