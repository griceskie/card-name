# Cursor System Specification

## Overview

This document describes the custom cursor system that replaces the default browser cursor using SVG assets located in the `card-name/cursor` folder.

**Objectives:**

* Enhance visual experience
* Provide clearer interaction feedback
* Ensure consistency with the overall UI style

---

## 0. Cursor Assets

All cursor assets are stored in:

```
/card-name/cursor/
```

They are implemented using CSS variables in the `:root` selector with precise hotspots and browser fallbacks:

```css
:root {
  --cursor-arrow: url('../cursor/cursor-arrow.svg') 15 9, auto;
  --cursor-pointer: url('../cursor/cursor-pointer.svg') 15 9, pointer;
  --cursor-text: url('../cursor/cursor-text.svg') 24 24, text;
  --cursor-grab: url('../cursor/cursor-grab.svg') 18 6, grab;
  --cursor-move: url('../cursor/cursor-move.svg') 24 24, move;
  --cursor-zoom: url('../cursor/cursor-zoom.svg') 18 18, zoom-in;
  --cursor-wait: url('../cursor/cursor-wait.svg') 24 24, wait;
  --cursor-busy: url('../cursor/cursor-busy.svg') 24 24, progress;
  --cursor-help: url('../cursor/cursor-help.svg') 15 9, help;
  --cursor-crosshair: url('../cursor/cursor-crosshair.svg') 24 24, crosshair;
  --cursor-resize: url('../cursor/cursor-resize.svg') 24 24, nwse-resize;
}
```

---

## 1. Global Cursor Setup

The default cursor across the entire page is overridden.

**Body Setup**
We use `--cursor-arrow` as the default cursor for the body.

```css
body {
  cursor: var(--cursor-arrow);
}
```

---

## 2. Interactive Cursor Rules

### Pointer (Clickable Elements)

Used for interactive elements such as buttons, links, clickable cards, and icons. 
Currently applied to: `.sound-toggle`, `.account-item`, `.location`, `.view-more`, `.skill-item`, `.tool-item`, `.action-btn`, `.notch-item`, `.skill-notch-item`, `.project-action`, and `.traffic-dot`.

```css
cursor: var(--cursor-pointer);
```

### Text Input

Used for input fields, textareas, and other editable content.

```css
cursor: var(--cursor-text);
```

### Drag / Move

Used for freely draggable elements, sortable lists, or canvas interactions.

```css
cursor: var(--cursor-move);
```

### Grab Interaction

Used for scrollable areas or inactive drag handles.

```css
cursor: var(--cursor-grab);
```

### Resize

Used for resizable containers or handles.

```css
cursor: var(--cursor-resize);
```

### Zoom

Used for image previews or zoomable content.

```css
cursor: var(--cursor-zoom);
```

### Loading State

#### Wait

Used during light loading tasks.

```css
cursor: var(--cursor-wait);
```

#### Busy

Used during blocking processes or heavy loading.

```css
cursor: var(--cursor-busy);
```

### Help

Used for tooltips, info icons, and hints.

```css
cursor: var(--cursor-help);
```

### Precision

Used for selections, targeted drawing or picking.

```css
cursor: var(--cursor-crosshair);
```

---

## 3. Implementation Strategy

**Priority:**

* Define global cursors at the `body` tag level.
* Override behavior on a per-component basis.
* Apply semantic cursors corresponding to specific user actions.

**Fallback:**

Browser defaults are always included directly in the CSS variables to ensure the application remains functional if images fail to load.

---

## 4. UX Rules

* The cursor should closely resemble its implied user action to avoid confusion.
* Avoid decorative cursors that have no functional value.
* Ensure hotspot coordinates perfectly align with the icon's visual pointer.

---

## 5. Consistency Rules

* All interactive (clickable) elements MUST utilize `var(--cursor-pointer)`.
* No interactive element should default back to standard browser cursors unless intentionally overridden or if loading fails.
