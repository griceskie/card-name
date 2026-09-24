# Skill Notch Snackbar — Design Specification

## Overview

This document describes the **Skill Notch Snackbar**, a fixed-position panel that appears when the user clicks **"View more"** in the Skills section. It displays five skill cards in a horizontally scrollable row, each containing an illustration and a description label.

The component follows the same interaction paradigm as the Tools Notch (bounce animation, scroll-aware visibility, outside-click dismissal, mutual exclusivity).

---

## 1. Container (`.skill-notch`)

### Positioning & Layout

| Property | Value |
|---|---|
| Position | `fixed` |
| Bottom | `24px` |
| Horizontal alignment | `left: 50%; transform: translateX(-50%)` |
| Width | `1200px` (desktop) |
| Max Width | `calc(100% - 48px)` |
| Display | `flex` |
| Align Items | `stretch` |
| Gap | `32px` |
| Z-Index | `1000` |

### Visual Styling

| Property | Value |
|---|---|
| Background | `rgba(244, 245, 245, 0.75)` (frosted glass) |
| Backdrop Filter | `blur(96px)` (with `-webkit-` prefix) |
| Border | `1px solid #FFFFFF` |
| Border Radius | `32px` |
| Box Shadow | `0 6px 14px rgba(0, 0, 0, 0.1)` |
| Padding | `24px` |

---

## 2. Skill Card (`.skill-notch-item`)

Each card is a vertical block containing an image and a text label.

### Card Container

| Property | Value |
|---|---|
| Flex | `1` (fills equally on desktop) |
| Min Width | `0` |
| Background | `#FFFFFF` |
| Border Radius | `16px` |
| Overflow | `hidden` |
| Display | `flex; flex-direction: column` |
| Cursor | `var(--cursor-pointer)` |
| Hover Transform | `translateY(-6px)` |
| Hover Shadow | `0 12px 28px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)` |
| Transition | `transform 250ms ease-out, box-shadow 250ms ease-out` |

### Image Area (`.skill-notch-image`)

| Property | Value |
|---|---|
| Width | `100%` |
| Height | `100px` |
| Overflow | `hidden` |
| Flex Shrink | `0` |

The image uses `object-fit: cover` with `object-position: top`. A `::after` pseudo-element applies a gradient overlay identical to the video container and project banner:

```css
linear-gradient(to bottom,
  rgba(255,255,255,0) 0%,
  rgba(255,255,255,0.4) 50%,
  rgba(255,255,255,1) 100%
)
```

### Text Label (`.skill-notch-text`)

| Property | Value |
|---|---|
| Padding | `16px` |
| Font | Inter, `14px`, weight `400` |
| Line Height | `145%` |
| Letter Spacing | `0.16px` |
| Color | `#060606` |

---

## 3. Content Mapping

| # | Image | Label |
|---|---|---|
| 1 | `ui.png` | UI Design for Visual and Accessibility |
| 2 | `ux.png` | UX Strategy for Problem Solving |
| 3 | `interaction.png` | Interaction Design for Usability and Feedback |
| 4 | `ai.png` | Design to Development Translation for Ai |
| 5 | `development.png` | AI-Assisted Design Workflow |

---

## 4. Animation & State Management

The skill notch uses the **same state machine** as the tools notch:

| State | CSS Classes | Description |
|---|---|---|
| `default` | (none) | Hidden, `opacity: 0; pointer-events: none` |
| `active` | `.skill-notch-visible` | Visible with bounce entry |
| `auto-hidden` | `.skill-notch-hidden` | Temporarily hidden on scroll-down, recovers on scroll-up |
| `dismissed` | `.skill-notch-hidden` | Permanently hidden until re-triggered |

### Entry Animation
- Transform: `translateX(-50%) translateY(40px)` → `translateX(-50%) translateY(0) scale(1)`
- Transition: `400ms cubic-bezier(0.34, 1.56, 0.64, 1)` (bouncy overshoot)
- Opacity: `0 → 1` over `300ms ease`

### Exit Animation
- Transform: `translateX(-50%) translateY(40px) scale(0.95)`
- Transition: `300ms ease-in` (transform), `250ms ease-in` (opacity)

### Mutual Exclusivity
Opening the skill notch automatically dismisses the tools notch, and vice versa. This is handled in JavaScript:
```js
skillViewMore.addEventListener('click', (e) => {
    if (notchState === 'active') hideNotch(true);
    // then toggle skill notch...
});
```

### Scroll-Aware Visibility
- Scrolling **down** (positive delta > 10px): hide with `auto-hidden` state
- Scrolling **up** (negative delta): restore to `active` state
- Only applies when state is not `default` or `dismissed`

### Dismiss Triggers
- Click outside the snackbar → permanent dismiss
- Click "View more" again → toggle off

---

## 5. Responsive Behavior

### Tablet (≤768px) — Horizontal Scroll

The notch stays horizontal but becomes scrollable. Only ~3 cards are visible at a time; the rest are revealed by swiping.

| Property | Value |
|---|---|
| Width | `calc(100% - 48px)` |
| Gap | `16px` |
| Padding | `20px` |
| Border Radius | `28px` |
| Overflow-X | `auto` (hidden scrollbar) |
| `-webkit-overflow-scrolling` | `touch` |

**Card sizing at tablet:**

| Property | Value |
|---|---|
| Flex | `0 0 auto` (no shrink, no grow) |
| Width | `180px` |
| Min Width | `180px` |
| Image Height | `90px` |
| Text Size | `13px` |

---

### Mobile (≤480px) — Horizontal Scroll (3 Cards Visible)

Same horizontal scroll pattern, tighter dimensions. Approximately 2 full cards + a partial 3rd are visible, hinting at scrollability.

| Property | Value |
|---|---|
| Width | `calc(100% - 32px)` |
| Flex Direction | `row` (stays horizontal) |
| Gap | `12px` |
| Padding | `16px` |
| Bottom | `16px` |
| Border Radius | `24px` |

**Card sizing at mobile:**

| Property | Value |
|---|---|
| Width | `140px` |
| Min Width | `140px` |
| Image Height | `90px` |
| Text Size | `12px` |
| Hover | Disabled (`transform: none`) |
| Active | `scale(0.96)` for tap feedback |

---

### Small Mobile (≤360px) — Compact Horizontal Scroll

Even tighter layout with smaller cards.

| Property | Value |
|---|---|
| Width | `calc(100% - 24px)` |
| Padding | `12px` |
| Gap | `8px` |
| Bottom | `12px` |
| Border Radius | `20px` |

**Card sizing at small mobile:**

| Property | Value |
|---|---|
| Width | `120px` |
| Min Width | `120px` |
| Image Height | `72px` |
| Text Size | `11px` |

---

## 6. HTML Structure

```html
<div class="skill-notch" id="skillNotch">
  <div class="skill-notch-item">
    <div class="skill-notch-image">
      <img src="../resource/ui.png" alt="UI Design">
    </div>
    <span class="skill-notch-text">UI Design for Visual and Accessibility</span>
  </div>
  <!-- repeat for each of the 5 skills -->
</div>
```

**Trigger:**
```html
<a href="#" class="view-more" id="skillViewMore">View more</a>
```