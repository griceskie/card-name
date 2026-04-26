# Project Modal — Design Specification

## Overview

This document is an AI-ready design guideline for the **Project Modal** component. It describes the exact visual tokens, layout structure, interaction logic, and responsive behavior so that any AI can reproduce the modal to precisely match the Figma design and current implementation.

The modal is a macOS-inspired floating panel that displays project details when the user clicks **"View more"** in the Project section of the card.

---

## 0. Modal Layer & Environment

| Property | Value |
|---|---|
| Mounting | `position: fixed; inset: 0` — covers the full viewport |
| Z-Index (Overlay) | `2000` |
| Z-Index (Header) | `10` (within the modal) |
| Backdrop | `rgba(0, 0, 0, 0.2)` dim layer |
| Body during open | `overflow: hidden` (class `modal-open` on `<body>`) |

---

## 1. Modal Overlay (`.project-modal-overlay`)

| Property | Value |
|---|---|
| Position | `fixed; inset: 0` |
| Background | `rgba(0, 0, 0, 0.2)` |
| Display | `flex; align-items: center; justify-content: center` |
| Padding | `0 24px` (horizontal gap on all screens) |
| Opacity (default) | `0; pointer-events: none` |
| Opacity (active) | `1; pointer-events: auto` |
| Transition | `opacity 250ms ease` |
| Overflow | `hidden` |

### Active State (`.project-modal-overlay.active`)

Applied via JavaScript when the modal is opened. Adds `opacity: 1` and enables pointer events.

---

## 2. Modal Wrapper (`.project-modal`)

| Property | Value |
|---|---|
| Width | `100%; max-width: 1040px` |
| Height (default) | `500px` |
| Height (expanded) | `721px` (class `.expanded`) |
| Max Height | `90vh` |
| Background | `#FAFAFA` |
| Border | `1px solid #D7D7D7` |
| Border Radius | `32px` |
| Box Shadow | `0px 20px 25px rgba(0, 0, 0, 0.2)` |
| Overflow | `overflow-y: auto; overflow-x: hidden` |
| Scroll Behavior | `scroll-behavior: smooth` |
| Scrollbar | Hidden (cross-browser): `scrollbar-width: none; -ms-overflow-style: none; ::-webkit-scrollbar { display: none }` |
| Transform (default) | `scale(0.92); opacity: 0` |
| Transform (active) | `scale(1); opacity: 1` |
| Transition | `transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 300ms ease, height 500ms cubic-bezier(0.16, 1, 0.3, 1)` |

### Entry / Exit Animation

- **Entry**: `scale(0.92) → scale(1)`, `opacity 0 → 1`, bouncy easing `cubic-bezier(0.34, 1.56, 0.64, 1)`
- **Exit**: Reverse — overlay fades out (`opacity → 0`), then after `transitionend`, cleans up classes.
- Height transitions between states: `500ms cubic-bezier(0.16, 1, 0.3, 1)`

---

## 3. Modal Header (`.project-modal-header`)

| Property | Value |
|---|---|
| Position | `sticky; top: 0` |
| Padding | `24px` (all sides) |
| Display | `flex; align-items: center` |
| Gap | `16px` |
| Background | `rgba(250, 250, 250, 0.75)` |
| Backdrop Filter | `blur(96px)` (with `-webkit-` prefix) |
| Z-Index | `10` |

---

### 3a. Traffic Light (`.traffic-light`)

| Property | Value |
|---|---|
| Display | `flex` |
| Gap | `8px` |

#### Dot Styles (`.traffic-dot`)

| Property | Value |
|---|---|
| Size | `20px × 20px` |
| Shape | `border-radius: 50%` |
| Border | `none` |
| Cursor | `var(--cursor-pointer)` |
| Transition | `filter 0.2s ease, transform 0.2s ease` |
| Hover | `filter: brightness(1.15); transform: translateY(-1px)` |
| Active | `transform: scale(0.96)` |

#### Color Mapping

| Class | Color |
|---|---|
| `.red` | `#F7392E` |
| `.yellow` | `#F8C600` |
| `.green` | `#33C357` |

#### Tooltip (`.traffic-dot::after`)

| Property | Value |
|---|---|
| Source | `data-tooltip` attribute |
| Font | Inter, `11px`, weight `500` |
| Color | `#060606` |
| Background | `#FFFFFF` |
| Padding | `4px 8px` |
| Border Radius | `6px` |
| Box Shadow | `0 4px 12px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)` |
| Position | `bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%) translateY(-4px)` |
| Appear on hover | `opacity: 1; transform: translateX(-50%) translateY(0)` |
| Transition | `opacity 200ms ease, transform 200ms ease` |

#### Behavior Mapping (JavaScript)

| Button | ID | Action |
|---|---|---|
| Red | `trafficRed` | `closeModal()` — removes `.active` from overlay |
| Yellow | `trafficYellow` | `minimizeModal()` — removes `.expanded` from modal |
| Green | `trafficGreen` | `expandModal()` — adds `.expanded` to modal |

---

### 3b. Modal Title (`.modal-title`)

| Property | Value |
|---|---|
| Text | `My Project` |
| Font | Inter |
| Size | `16px` |
| Weight | `500` |
| Color | `#060606` |

---

## 4. Modal Content Grid (`.project-modal-container`)

| Property | Value |
|---|---|
| Padding | `0 24px 24px` |
| Display | `grid` |
| Grid Template | `repeat(auto-fill, minmax(min(465px, 100%), 1fr))` — responsive 2-column on desktop, 1-column on mobile |
| Gap | `24px` |

> **Note**: The `min(465px, 100%)` technique ensures each card never overflows its container regardless of viewport size.

---

## 5. Project Content Card (`.project-modal-content`)

Each project is a self-contained card within the grid with the following structure:

```
.project-modal-content
  ├── .project-banner       ← Banner image with gradient overlay
  ├── .project-icon         ← Logo overlapping the banner
  ├── .project-text-modal   ← Title + Description
  │     ├── .project-modal-title
  │     └── .project-modal-desc
  └── .project-action       ← "Read more" link
```

### Card Container Styles

| Property | Value |
|---|---|
| Background | `#FFFFFF` |
| Border Radius | `24px` |
| Border | `1px solid #E8E8E8` |
| Overflow | `hidden` |
| Display | `flex; flex-direction: column` |
| Hover Shadow | `0 8px 24px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)` |
| Transition | `box-shadow 0.2s ease` |

---

### 5a. Banner (`.project-banner`)

| Property | Value |
|---|---|
| Width | `100%` |
| Height | `150px` |
| Overflow | `hidden` |
| Position | `relative` |
| Flex Shrink | `0` |

#### Banner Image (`.project-banner img`)

| Property | Value |
|---|---|
| Width / Height | `100% / 100%` |
| Object Fit | `cover` |
| Object Position | `center -40px` |
| Display | `block` |

#### Gradient Overlay (`.project-banner::after`)

A pseudo-element that creates a smooth white fade from the bottom of the banner into the card content area:

| Property | Value |
|---|---|
| Position | `absolute; bottom: 0; left: 0; right: 0` |
| Height | `100%` |
| Background | `linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,1) 100%)` |
| Pointer Events | `none` |

#### Asset Mapping

| Project | Banner File |
|---|---|
| Airbnb | `airbnb-banner.jpg` |
| Fandom | `fandom-banner.jpg` |
| University | `university-banner.jpg` |
| ChatGPT | `chatgpt-banner.png` |
| IKEA | `ikea-banner.png` |

---

### 5b. Project Icon (`.project-icon`)

| Property | Value |
|---|---|
| Size | `64px × 64px` |
| Margin | `-32px 0 0 24px` (overlaps banner by 32px) |
| Overflow | `visible` |
| Z-Index | `2` |
| Flex Shrink | `0` |

#### Icon Image

| Property | Value |
|---|---|
| Width / Height | `100% / 100%` |
| Object Fit | `contain` |

#### Asset Mapping

| Project | Logo File |
|---|---|
| Airbnb | `airbnb-logo-2.svg` |
| Fandom | `fandom-logo.svg` |
| University | `ubd-logo 1.svg` |
| ChatGPT | `chatgpt-logo.svg` |
| IKEA | `ikea-logo.svg` |

---

### 5c. Text Content (`.project-text-modal`)

| Property | Value |
|---|---|
| Padding | `16px 24px 0` |
| Display | `flex; flex-direction: column` |
| Gap | `8px` |
| Flex | `1` (fills remaining card height) |

#### Title (`.project-modal-title`)

| Property | Value |
|---|---|
| Font | Inter |
| Size | `18px` |
| Weight | `600` |
| Line Height | `145%` |
| Letter Spacing | `0.16px` |
| Color | `#060606` |

#### Description (`.project-modal-desc`)

| Property | Value |
|---|---|
| Font | Inter |
| Size | `12px` |
| Weight | `400` |
| Line Height | `150%` |
| Letter Spacing | `0.24px` |
| Color | `#3D3D3D` |

---

### 5d. Action Link (`.project-action`)

| Property | Value |
|---|---|
| Font | Inter |
| Size | `14px` |
| Weight | `400` |
| Color | `#060606` |
| Text Decoration | `underline; text-underline-offset: 3px` |
| Padding | `16px 24px 24px` |
| Display | `inline-block` |
| Margin Top | `auto` (pushes link to bottom of card) |
| Cursor | `var(--cursor-pointer)` |
| Hover | `opacity: 0.6` |
| Transition | `opacity 0.2s ease` |

#### Destination URLs

| Project | URL |
|---|---|
| Airbnb | https://www.notion.so/Create-a-Flight-Ticket-Booking-Feature-for-Airbnb-... |
| Fandom | https://www.notion.so/Create-an-Anti-Spoiler-feature-... |
| University | https://www.notion.so/Redesigned-the-course-registration-layout-... |
| ChatGPT | https://www.notion.so/Redesign-ChatGPT-4o-... |
| IKEA | https://www.notion.so/Redesign-Ikea-Indonesia-... |

All links open in `target="_blank"` with `rel="noopener noreferrer"`.

---

## 6. Project Entries (Content Mapping)

| # | Project | Title | Description (excerpt) |
|---|---|---|---|
| 1 | Airbnb Flights | Create a Flight Ticket Booking Feature for Airbnb to Create a More Integrated Travel Experience | Airbnb has helped millions of people find and book places to stay, yet it leaves users to figure out how to get there on their own. |
| 2 | Fandom Anti-Spoiler | Create an Anti-Spoiler feature for a better exploration experience in Wikifandom | Hundreds of millions of people visit Fandom Wiki every month to learn about their favorite characters, yet many end up encountering spoilers... |
| 3 | University | Redesigned the course registration layout to accelerate course selection with improve information clarity and visual hierarchy. | Course registration is a high-stakes and often stressful moment, but unclear information structure makes it difficult for students... |
| 4 | ChatGPT Redesign | Redesign ChatGPT-4o For Optimizing Chat Organization and Visual Accessibility Features | ChatGPT empowers millions of users to generate ideas, learn, and solve problems, yet its cluttered chat history... |
| 5 | IKEA Indonesia | Redesigning IKEA Indonesia to Simplify Navigation, Enhance Product Discovery, and Streamline Checkout | IKEA has inspired millions of people to design and furnish their homes, yet its mobile app struggles with cluttered navigation... |

---

## 7. State Management

### States

| State | Trigger | Height | Transform |
|---|---|---|---|
| **Closed** (default) | — | — | `scale(0.92); opacity: 0` |
| **Open** | Click "View more" in Project section | `500px` | `scale(1); opacity: 1` |
| **Expanded** | Scroll within modal > 50px, or click green dot | `721px` | — |
| **Minimized** | Click yellow dot | Back to `500px` | — |
| **Closed** | Click red dot, click overlay backdrop, press `Escape` | — | `opacity: 0` (overlay fade) |

### JS State Variables

| Variable | Purpose |
|---|---|
| `isMinimizing` | Guards against scroll-to-expand triggering during minimize animation (600ms debounce) |
| `modalScrollThreshold` | `50px` — scroll distance required to auto-expand the modal |

---

## 8. Interaction Logic (JavaScript)

### Open Modal (`openModal()`)

1. Add `.active` to `#projectModalOverlay`
2. Add `modal-open` to `document.body` (disables page scroll)
3. Reset `projectModal.scrollTop = 0`

### Close Modal (`closeModal()`)

1. Remove `.active` from `#projectModalOverlay`
2. Listen for `transitionend` on `.project-modal`
3. On completion: remove `modal-open` from body, remove `.expanded`, reset scroll to top

### Expand Modal (`expandModal()`)

- Add `.expanded` class to `.project-modal`

### Minimize Modal (`minimizeModal()`)

1. Set `isMinimizing = true`
2. Remove `.expanded` from `.project-modal`
3. Reset `isMinimizing = false` after `600ms` (matches height transition duration)

### Scroll-to-Expand

- Listens on `projectModal` scroll event
- If `scrollTop > 50` and modal is not `.expanded` and not `isMinimizing` → `expandModal()`

### Additional Dismiss Triggers

| Trigger | Handler |
|---|---|
| Click overlay (outside modal) | `e.target === projectModalOverlay → closeModal()` |
| Press `Escape` key | `document.keydown` event |

---

## 9. Responsive Behavior

### Tablet (`max-width: 768px`)

| Element | Change |
|---|---|
| `.project-modal` | `height: 480px; border-radius: 28px` |
| `.project-modal.expanded` | `height: 680px` |
| `.project-modal-container` | `gap: 16px; padding: 0 16px 16px` |
| `.project-banner` | `height: 120px` |
| `.project-icon` | `width: 52px; height: 52px; margin: -26px 0 0 16px` |
| `.project-text-modal` | `padding: 12px 16px 0` |
| `.project-modal-title` | `font-size: 15px` |
| `.project-modal-desc` | `font-size: 11px` |
| `.project-action` | `font-size: 13px; padding: 12px 16px 16px` |
| `.project-modal-header` | `padding: 16px` |

---

### Mobile (`max-width: 480px`) — Bottom Sheet Layout

The modal transforms into a **bottom sheet** on mobile.

| Element | Change |
|---|---|
| `.project-modal-overlay` | `align-items: flex-end; padding: 0 24px` |
| `.project-modal` | `width: 100%; max-width: 100%; height: 85vh; max-height: 85vh; border-radius: 24px 24px 0 0; border-bottom: none; box-shadow: 0px -8px 32px rgba(0,0,0,0.15)` |
| Entry transform | `translateY(100%)` (slides up from bottom) |
| Active transform | `translateY(0)` |
| `.project-modal.expanded` | `height: 92vh` |
| `.project-modal-container` | `grid-template-columns: repeat(auto-fill, minmax(min(264px, 100%), 1fr)); gap: 16px; padding: 0 16px 24px` |
| `.project-modal-header` | `padding: 16px; gap: 12px; justify-content: flex-start; position: relative` |
| Drag indicator | `.project-modal-header::before` — `36px × 4px` pill, `#D0D0D0`, centered at `top: 8px` |
| `.traffic-dot` | `width: 16px; height: 16px` |
| `.traffic-dot::after` | `display: none` (hide tooltips on touch) |
| `.modal-title` | `font-size: 14px` |
| `.project-modal-content` | `border-radius: 20px` |
| `.project-banner` | `height: 120px; object-position: center center` |
| `.project-icon` | `width: 48px; height: 48px; margin: -24px 0 0 16px` |
| `.project-text-modal` | `padding: 12px 16px 0; gap: 6px` |
| `.project-modal-title` | `font-size: 14px; line-height: 140%` |
| `.project-modal-desc` | `font-size: 11px; line-height: 145%; -webkit-line-clamp: 3` (3-line clamp) |
| `.project-action` | `font-size: 13px; padding: 12px 16px 16px` |

---

### Small Mobile (`max-width: 360px`)

| Element | Change |
|---|---|
| `.project-modal-overlay` | `padding: 0 24px` |
| `.project-modal` | `height: 90vh; border-radius: 20px 20px 0 0` |
| `.project-modal.expanded` | `height: 95vh` |
| `.project-banner` | `height: 100px` |
| `.project-modal-title` | `font-size: 13px` |
| `.project-modal-desc` | `font-size: 10px; -webkit-line-clamp: 2` |
| `.project-action` | `font-size: 12px; padding: 10px 16px 14px` |

---

## 10. Design Tokens Summary

| Token | Value |
|---|---|
| Modal background | `#FAFAFA` |
| Card background | `#FFFFFF` |
| Card border | `#E8E8E8` |
| Overlay background | `rgba(0, 0, 0, 0.2)` |
| Header backdrop | `rgba(250, 250, 250, 0.75)` + `blur(96px)` |
| Title color | `#060606` |
| Description color | `#3D3D3D` |
| Action link color | `#060606` |
| Red dot | `#F7392E` |
| Yellow dot | `#F8C600` |
| Green dot | `#33C357` |
| Drag handle | `#D0D0D0` |
| Font family | `Inter` (Google Fonts) |

---

## 11. HTML Structure Reference

```html
<!-- Trigger -->
<a href="#" class="view-more" id="projectViewMore">View more</a>

<!-- Modal Overlay -->
<div class="project-modal-overlay" id="projectModalOverlay">
  <div class="project-modal" id="projectModal">

    <!-- Sticky Header -->
    <div class="project-modal-header">
      <div class="traffic-light">
        <button class="traffic-dot red"    id="trafficRed"    data-tooltip="Close"></button>
        <button class="traffic-dot yellow" id="trafficYellow" data-tooltip="Minimize"></button>
        <button class="traffic-dot green"  id="trafficGreen"  data-tooltip="Maximize"></button>
      </div>
      <span class="modal-title">My Project</span>
    </div>

    <!-- Grid Content -->
    <div class="project-modal-container" id="projectModalContainer">

      <!-- Single Project Card (repeat for each project) -->
      <div class="project-modal-content">
        <div class="project-banner">
          <img src="../resource/[banner-file]" alt="[Project] Banner">
        </div>
        <div class="project-icon">
          <img src="../resource/[logo-file]" alt="[Project]">
        </div>
        <div class="project-text-modal">
          <h3 class="project-modal-title">[Project Title]</h3>
          <p class="project-modal-desc">[Description]</p>
        </div>
        <a href="[notion-url]" class="project-action" target="_blank" rel="noopener noreferrer">Read more</a>
      </div>

    </div>
  </div>
</div>
```
