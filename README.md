# Kill your darlings: Curate Your Images

## General AI Fluency - Week 3

Every image below is mapped to a specific slot in the content map (Home → Proof of Work → Contact → About) except general images.

## General

### Background Texture

| Rejected BG 1                                                                               | Rejected BG 2                                                                                            |
| ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| ![](./hero/noise.jpeg)                                                                      | ![](./hero/light-grids.jpeg)                                                                             |
| I rejected this as it does not follow the light theme philosophy. Although I like the noise | This was rejected due to lack of noise even though it follows the light theme and uses the accent color. |

With the ideas from Claude, I just combined the noise and the light themed grid to create a satisfactory background.

![](./hero/grid-bg.png)

## Home

### Hero photo of me that uses the accent color (cannot be generated)

### Lead Case Snapshot (cannot be generated)

## Proof of Work

### Lead case (Draw Collab): showcase screenshots and proof of concurrency (cannot be genrated)

### Secondary cases: screenshots of other projects (cannot be generated)

### Skills section: real brand/logo icons (cannot be generated)

### Logos of all projects

I already had simple logos for my projects. But I wanted to try what Claude would give me. Here are some examples:

| Claude                                    | Original                                                   |
| ----------------------------------------- | ---------------------------------------------------------- |
| ![](./proof-of-work/draw-collab-icon.svg) | <img src="./proof-of-work/draw.png" height="200px"/>        |
| ![](./proof-of-work/farm-to-table-icon.svg) | <img src="./proof-of-work/farmtotable.png" height="200px"/> |
| ![](./proof-of-work/palayok-icon.svg) | <img src="./proof-of-work/palayok.png" height="200px"/>     |


Yes, Claude followed my design philosophy for the icons. But I want the portfolio to follow that philosophy, not every project. I want every project to have their own quirks, hence, the variance in color.

### Contact

- No new imagery needed

### About

- Same hero photo reused

## Part 2: Real Captures vs. Generated Connective Tissue

### Work Screenshots

All project imagery is a real, cropped, legible capture of a working interface — Draw Collab, Farm-to-Table, and Chef Bot. None of these were recreated or "improved" with AI, because a generated mockup of a real product would misrepresent what was actually built.

### Connective Tissue (texture, icons)

The background grid/noise texture is not newly generated — it's the real texture already used across the identity kit, hero page, projects grid, and skills page, so reusing it keeps the new portfolio visually continuous with existing brand assets rather than introducing a second style. The skill icons are official brand/logo marks (React, Node, MongoDB, Docker, etc.), not AI-generated, because redrawing a known logo with AI risks distorting it and misrepresenting the actual stack.

Net result: no new AI-generated assets were kept for connective tissue. That is itself a curation decision, documented below — and it also means the "one consistent style" requirement is satisfied by default, since there's no kept AI set that could be inconsistent. The two rejected images in Part 4 are intentionally _different_ from each other (a gradient blob vs. a glossy icon style) because they were separate tests, not a set — neither made the cut.

## Part 3: Real Photo Where the Subject Is a Person

The Home and About pages both use the same real photo of me. No AI headshot or avatar was generated or considered — a generated "person" would break the core rule that anywhere the subject is a person, the image must be real.

## Part 4: Curation — What I Rejected and Why

This is the discernment part. Below are two AI-style options I generated and rejected while testing whether connective tissue was even needed, plus the underlying decision not to generate anything for the final kit.

### Rejected: generic gradient-blob hero background

![Rejected hero texture — generic AI gradient blob](rejected-hero-gradient-blob.svg)

I generated this as a possible hero background before checking it against the existing site. Rejected because the saturated purple/pink/blue gradient look is a default "AI abstract tech" aesthetic that has nothing to do with my kit's palette (`#000000`, `#EEEEEE`, `#72C3D2`) or its flat, grainy, minimal mood — it would have made the hero look like a different product.

### Rejected: glossy 3D icon set

![Rejected skill icons — glossy 3D style](rejected-glossy-icon-set.svg)

I generated this as an alternative to the real brand icons already on the skills page. Rejected because the glossy, drop-shadowed, skeuomorphic style doesn't match the flat real logos I'm already using, and because it replaces recognizable brand marks (React, Node, MongoDB) with generic colored blobs — a viewer loses the actual information the icons are supposed to convey.

### Rejected: generating a new hero texture at all

No image is attached for this one because nothing was produced — the decision itself is the judgment. I considered generating a new textured background from scratch, then rejected the idea once I confirmed the current grid/noise texture already exists, is already used consistently across the site, and matches the identity kit. Generating a near-duplicate would have added inconsistency risk for zero benefit.

## Deliverable Summary

**Final keeper set**

- Home hero: real photo + real background texture
- Proof of Work lead case: Draw Collab, two real synced screenshots, captioned with tested scale (50+ concurrent users, sub-200ms latency)
- Secondary cases: Farm-to-Table (real), Chef Bot (real)
- Skills: real brand icons, backend-first ordering
- About: same real photo, capability-led copy
- Background: real grid/noise texture throughout

**Where I chose real over AI**

- Photo of me → real, not generated
- All project screenshots → real captures, not AI stand-ins
- Skill icons → real brand logos, not AI-generated
- Background texture → real existing asset, not regenerated

**What I rejected and why** — see Part 4.
