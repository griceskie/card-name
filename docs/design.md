# Profile Card — Design Specification

## Overview

This document describes the HTML and CSS architecture for the **Profile Card** component. It covers the visual tokens, layout structure, responsive behavior, and interaction logic to ensure the implementation precisely matches the design intent.

---

## 0. Global / Body Layout

| Property | Value |
|---|---|
| Background | `#F4F4F4` |
| Typography | **Inter** (Google Fonts), `-webkit-font-smoothing: antialiased` |
| Layout | Flexbox, `justify-content: center; align-items: center; min-height: 100vh` |
| Padding | `40px 16px` |
| Cursor | `var(--cursor-arrow)` (custom SVG) |

---

## 1. Primary Card Wrapper (`.card`)

| Property | Value |
|---|---|
| Width | `420px` |
| Max Width | `100%` |
| Background | `#FFFFFF` |
| Border | `0.5px solid #D7D7D7` |
| Border Radius | `24px` |
| Overflow | `hidden` |

### Main Content Container (`.main-content`)

| Property | Value |
|---|---|
| Padding | `0` |
| Background | `#FFFFFF` |
| Display | `flex; flex-direction: column` |
| Border Radius | `24px` |
| Z-Index | `1` (above available-content) |

---

## 2. Dynamic Media Elements

### Video Container (`.video-container`)

| Property | Value |
|---|---|
| Height | `180px` |
| Overflow | `hidden` |
| Position | `relative` |

#### Video Source
- Autoplays (`autoplay muted loop playsinline`)
- `object-fit: cover; object-position: center -525px`

#### Gradient Overlay (`.video-overlay`)
- Position: `absolute; bottom: 0; left: 0; right: 0`
- Height: `70%`
- Background: `linear-gradient(to bottom, rgba(250,250,250,0) 0%, rgba(255,255,255,1) 100%)`

#### Sound Toggle (`.sound-toggle`)
- Position: Top right (`top: 10px; right: 10px`)
- Size: `30px × 30px`
- Style: `rgba(0,0,0,0.35)` background, `backdrop-filter: blur(6px)`
- Toggles between muted/unmuted SVG icons via JavaScript

---

## 3. Profile Interface (`.profile-row`)

Located bridging the content and video, floating over both.

| Property | Value |
|---|---|
| Margin Top | `-60px` |
| Display | `flex; align-items: flex-end` |
| Padding | `0 24px` |

### Profile Picture (`.profile-picture`)

| Property | Value |
|---|---|
| Dimensions | `120px × 120px` |
| Border Radius | `999px` (circle) |
| Border | `3px solid #FFFFFF` |
| Overflow | `hidden` |

### Status Indicator
- **Dot** (`.status-dot`): `24px`, solid `#008B2E`
- **Pulse** (`.status-pulse`): `24px`, infinite `1.5s` animation → `scale(1.6)` with `opacity: 0` fade

### Social Accounts (`.account-section`)

Items: LinkedIn, Instagram, Dribbble

| Property | Value |
|---|---|
| Item Padding | `8px` |
| Item Border | `1px solid #E4E4E4` |
| Border Radius | `20px` |
| Hover | `translateY(-1px)` |
| Active | `scale(0.96)` |
| Cursor | `var(--cursor-pointer)` |

#### Tooltip Colors (Brand-specific)

| Class | Tooltip Background |
|---|---|
| `.account-linkedin` | `#0A66C2` |
| `.account-instagram` | `#E1306C` |
| `.account-dribbble` | `#EA4C89` |

---

## 4. Text Content (`.text-content`)

| Element | Font | Size | Weight | Color |
|---|---|---|---|---|
| Name (`.name`) | Inter | `24px` | `600` | `#060606` |
| Profession (`.profession`) | Inter | `16px` | `400` | `#3D3D3D` |
| Description (`.description`) | Inter | `14px` | `400` | `#3D3D3D` |
| Location (`.location`) | Inter | `12px` | `400` | `#060606` |

---

## 5. Skill Badges (`.skill-content`)

Pill-shaped badges with themed colors.

| Modifier | Background | Text | Border |
|---|---|---|---|
| `.skill-red` | `#FCE6E6` | `#A30000` | `#F5CCCC` |
| `.skill-yellow` | `#FFFAE6` | `#B59100` | `#FFF2B2` |
| `.skill-green` | `#E6F5EB` | `#008B2E` | `#C2E8CE` |

Each badge: `padding: 4px 12px`, `border-radius: 999px`, `font-size: 12px`.

**"View more" trigger** → Opens the [Skill Notch Snackbar](skill.md).

---

## 6. Tools Section (`.tools-content`)

Displays tool vendor icons: Figma, Lovable, Cursor.

| Property | Value |
|---|---|
| Icon Size | `18px × 18px` |
| Tool Item Display | `flex; align-items: center; gap: 6px` |
| Shadow | Multi-layer depth shadow simulating physical elevation |

**"View more" trigger** → Opens the [Tools Notch Snackbar](tools.md).

---

## 7. Project Section (`.project-content`)

Highlights a featured project.

| Property | Value |
|---|---|
| Logo Size | `42px × 42px` |
| Logo Shadow | Multi-layer dropshadow for floating effect |
| Title Weight | `600` |
| Highlight Color (`.project-highlight`) | `#FF0050` |

**"View more" trigger** → Opens the [Project Modal](project-modal.md).

---

## 8. Action CTA Block (`.action-content`)

Two side-by-side action buttons.

| Button | Background | Border | Text | Hover |
|---|---|---|---|---|
| Read my CV (`.action-cv`) | `#FFFFFF` | `1px solid #D7D7D7` | `#3D3D3D` | `bg: #F5F5F5` |
| Get in touch (`.action-touch`) | `#1F1F1F` | `1px solid #1F1F1F` | `#FFFFFF` | `bg: #333333` |

Both: `border-radius: 20px; padding: 14px 16px; font-size: 16px`.

---

## 9. Available Content Footer (`.available-content`)

A branded footer bar anchored beneath the primary card, communicating availability status.

### Layout & Positioning

| Property | Value |
|---|---|
| Background | `#008B2E` (brand green) |
| Height | `97px` |
| Margin Top | `-38px` (overlaps under `.main-content`) |
| Display | `flex; align-items: flex-end; justify-content: center` |
| Padding Bottom | `20px` |
| Border Radius | `0 0 24px 24px` (bottom corners only) |
| Position | `relative` |
| Z-Index | `0` (behind `.main-content` at `z-index: 1`) |

### Text Styling

| Property | Value |
|---|---|
| Content | "Available for Freelance & Fulltime" |
| Font Size | `16px` |
| Font Weight | `600` |
| Color | `#E6F5EB` (light green on dark green) |

### Visual Logic

The available-content sits behind the main card body using a stacking technique:
- `.main-content` has `z-index: 1` and `border-radius: 24px`
- `.available-content` has `z-index: 0` and `margin-top: -38px`
- The `-38px` negative margin pulls it underneath, creating a "peek-through" footer effect
- Bottom border radius `24px` matches the parent `.card` corners

---

## 10. Responsive Behavior

### Mobile (≤480px)

| Element | Change |
|---|---|
| `body` | `padding: 20px 12px` |
| `.card` | `width: 100%; border-radius: 20px` |
| `.profile-picture` | `100px × 100px` |
| `.name` | `font-size: 20px` |
| `.action-content` | `flex-direction: column` (stacked buttons) |
| `.available-content` | `border-radius: 0 0 20px 20px` |

> **Note**: The available-content bottom corners must match the card's mobile border radius (`20px`) to clip consistently.

---

## 11. Design Tokens Summary

| Token | Value |
|---|---|
| Page background | `#F4F4F4` |
| Card background | `#FFFFFF` |
| Card border | `#D7D7D7` |
| Primary text | `#060606` |
| Secondary text | `#3D3D3D` |
| Brand green | `#008B2E` |
| Available text | `#E6F5EB` |
| Accent red | `#FF0050` |
| Font family | `Inter` (Google Fonts) |
| Spacing unit | `24px` (horizontal padding) |