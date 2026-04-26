# Tools Notch Snackbar — Design Specification

## Overview

This document specifies the **Tools Notch Snackbar**, a fixed-position navigation dock that surfaces when the user clicks **"View more"** in the Tools section. It adopts a macOS-like interactive dock behavior with bounce animations, hover scaling, tooltips, and scroll-aware visibility.

Core behaviors:
- Triggers via a bouncing **snackbar animation** (`cubic-bezier(0.34, 1.56, 0.64, 1)`)
- Items enlarge dynamically via an interactive **dock hover scale** effect
- Features **scroll-aware visibility management** (hides when scrolling down, reappears scrolling up)
- Supports a persistent **dismiss state** (off-click event closure)
- **Mutual exclusivity** with the Skill Notch — only one can be active at a time

---

## 1. Snackbar Container (`.notch-content`)

### Positioning & Layout

| Property | Value |
|---|---|
| Position | `fixed` |
| Bottom | `24px` |
| Horizontal Alignment | `left: 50%; transform: translateX(-50%)` |
| Width | `max-content` |
| Height | `120px` |
| Display | `flex; align-items: center; justify-content: center` |
| Gap | `32px` |
| Padding | `24px` |
| Z-Index | `1000` |

### Visual Styling

| Property | Value |
|---|---|
| Background | `rgba(244, 245, 245, 0.75)` (frosted glass) |
| Backdrop Filter | `blur(96px)` (with `-webkit-` prefix) |
| Border | `1px solid #FFFFFF` |
| Border Radius | `32px` |
| Box Shadow | `0 6px 13px rgba(0, 0, 0, 0.1)` |

---

## 2. Notch Item — Dock Effect (`.notch-item`)

### Layout

| Property | Value |
|---|---|
| Size | `72px × 72px` |
| Display | `flex; align-items: center; justify-content: center` |
| Transform Origin | `bottom center` |
| Cursor | `var(--cursor-pointer)` |
| Transition | `transform 250ms ease-out` |

### Hover Behavior (Desktop)
Active targets undergo spatial transformation on hover:
- `transform: scale(1.2) translateY(-10px)` — 20% scale up + 10px vertical lift
- Creates a "pulled from the dock" effect without disrupting neighboring items

### Image
- `width: 100%; height: 100%; object-fit: contain`
- `pointer-events: none` — prevents image from capturing cursor events

---

## 3. Tooltip (`.notch-item::after`)

Tooltip rendering uses the CSS `data-tooltip` attribute.

| Property | Value |
|---|---|
| Source | `content: attr(data-tooltip)` |
| Position | `bottom: calc(100% + 14px); left: 50%` |
| Font | Inter, `12px`, weight `500` |
| Color | `#1F1F1F` |
| Background | `#FFFFFF` |
| Padding | `6px 12px` |
| Border Radius | `8px` |
| Box Shadow | `0 2px 6px rgba(0, 0, 0, 0.1)` |
| Default State | `opacity: 0; pointer-events: none; transform: translateX(-50%) translateY(4px)` |
| Hover State | `opacity: 1; transform: translateX(-50%) translateY(0)` |
| Transition | `opacity 200ms ease, transform 200ms ease` |

---

## 4. State Management

| State | CSS Classes | Description |
|---|---|---|
| `default` | (none) | Hidden, `opacity: 0; pointer-events: none` |
| `active` | `.notch-visible` | Visible with bounce entry |
| `auto-hidden` | `.notch-hidden` | Temporarily hidden during scroll-down |
| `dismissed` | `.notch-hidden` | Permanently hidden until re-triggered |

### Entry Animation (`.notch-visible`)
- Transform: `translateX(-50%) translateY(0) scale(1)`
- Opacity: `1`
- Pointer Events: `auto`
- Transition: `400ms cubic-bezier(0.34, 1.56, 0.64, 1)` (bouncy overshoot)

### Exit Animation (`.notch-hidden`)
- Transform: `translateX(-50%) translateY(40px) scale(0.95)`
- Opacity: `0`
- Transition: `300ms ease-in` (transform), `250ms ease-in` (opacity)

---

## 5. Interaction Logic (JavaScript)

### Scroll-Aware Visibility
```
scrollThreshold = 10px

if (scrolling DOWN && state === 'active')  → hideNotch(false)  [auto-hidden]
if (scrolling UP   && state === 'auto-hidden') → showNotch()     [active]
```
States `default` and `dismissed` are excluded from scroll behavior.

### Mutual Exclusivity
Opening the tools notch dismisses the skill notch, and vice versa:
```js
toolsViewMore.addEventListener('click', () => {
    if (skillNotchState === 'active') hideSkillNotch(true);
    // ...toggle tools notch
});
```

### Dismiss
- **Outside click**: `document.addEventListener('click')` — if target is outside the notch container, permanently dismiss
- **Toggle**: Clicking "View more" again toggles the notch off

---

## 6. Content Mapping

| # | Tooltip | Image | Alt |
|---|---|---|---|
| 1 | Figma | `Figma-Dark logo.svg` | Figma |
| 2 | Cursor | `cursor-ai-code-icon 1.svg` | Cursor |
| 3 | Antigravity | `antigravity-color 1.svg` | Antigravity |
| 4 | Lovable | `Lovable_Symbol_0 1.svg` | Lovable |
| 5 | Claude | `claude-logo.svg` | Claude |

---

## 7. Responsive Behavior

### Tablet (≤768px)

| Property | Change |
|---|---|
| Gap | `24px` |
| Padding | `20px` |
| Height | `100px` |
| Border Radius | `28px` |
| Item Size | `60px × 60px` |

### Mobile (≤480px) — Bottom Dock

The notch adapts to a full-width bottom-docked bar.

| Property | Change |
|---|---|
| Width | `calc(100% - 32px)` |
| Height | `auto` |
| Padding | `16px` |
| Gap | `12px` |
| Bottom | `16px` |
| Border Radius | `24px` |
| Item Size | `48px × 48px` |

**Touch behavior adjustments:**
- Hover lift disabled: `transform: none` on hover
- Active tap feedback: `transform: scale(0.9)` with `120ms ease`
- Tooltips hidden: `display: none` on `::after` (touch cannot hover)

### Small Mobile (≤360px)

| Property | Change |
|---|---|
| Width | `calc(100% - 24px)` |
| Padding | `12px` |
| Gap | `8px` |
| Bottom | `12px` |
| Border Radius | `20px` |
| Item Size | `40px × 40px` |

---

## 8. HTML Structure

```html
<!-- Trigger -->
<a href="#" class="view-more" id="toolsViewMore">View more</a>

<!-- Snackbar -->
<div class="notch-content" id="notchContent">
  <div class="notch-item" data-tooltip="Figma">
    <img src="../resource/Figma-Dark logo.svg" alt="Figma" width="80" height="80">
  </div>
  <!-- repeat for each tool -->
</div>
```