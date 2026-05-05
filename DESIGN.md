---
name: "Vanyan OS Portfolio"
description: "A desktop-inspired portfolio where interaction, evidence, and polish carry the brand."
colors:
  accent: "oklch(0.66 0.22 var(--accent-h))"
  accent-strong: "oklch(0.58 0.24 var(--accent-h))"
  accent-soft: "oklch(0.78 0.14 var(--accent-h))"
  accent-glow: "oklch(0.66 0.22 var(--accent-h) / 0.35)"
  state-warm: "oklch(0.72 0.16 30)"
  bg-0-light: "oklch(0.985 0.005 var(--accent-h))"
  bg-1-light: "oklch(0.965 0.008 var(--accent-h))"
  bg-2-light: "oklch(0.93 0.012 var(--accent-h))"
  fg-0-light: "oklch(0.18 0.02 var(--accent-h))"
  fg-1-light: "oklch(0.32 0.018 var(--accent-h))"
  fg-2-light: "oklch(0.5 0.015 var(--accent-h))"
  border-light: "oklch(0.85 0.01 var(--accent-h) / 0.6)"
  hairline-light: "oklch(0.75 0.01 var(--accent-h) / 0.45)"
  mica-light: "oklch(0.99 0.005 var(--accent-h) / 0.94)"
  mica-strong-light: "oklch(0.99 0.005 var(--accent-h) / 0.98)"
  bg-0-dark: "oklch(0.16 0.02 var(--accent-h))"
  bg-1-dark: "oklch(0.19 0.022 var(--accent-h))"
  bg-2-dark: "oklch(0.22 0.018 var(--accent-h))"
  fg-0-dark: "oklch(0.97 0.005 var(--accent-h))"
  fg-1-dark: "oklch(0.85 0.008 var(--accent-h))"
  fg-2-dark: "oklch(0.62 0.012 var(--accent-h))"
  border-dark: "oklch(0.4 0.018 var(--accent-h) / 0.5)"
  hairline-dark: "oklch(0.5 0.015 var(--accent-h) / 0.35)"
  mica-dark: "oklch(0.18 0.02 var(--accent-h) / 0.94)"
  mica-strong-dark: "oklch(0.18 0.02 var(--accent-h) / 0.98)"
typography:
  display:
    fontFamily: "var(--font-inter), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2rem, 5vw, 4rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0"
  headline:
    fontFamily: "var(--font-inter), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0"
  title:
    fontFamily: "var(--font-inter), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "0"
  body:
    fontFamily: "var(--font-inter), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"
  label:
    fontFamily: "var(--font-inter), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.05em"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0"
rounded:
  chrome: "6px"
  window: "8px"
  focus: "4px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
components:
  window-frame:
    backgroundColor: "{colors.mica-light}"
    textColor: "{colors.fg-0-light}"
    rounded: "{rounded.window}"
  taskbar:
    backgroundColor: "{colors.mica-light}"
    textColor: "{colors.fg-1-light}"
    rounded: "{rounded.window}"
    height: "48px"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.fg-1-light}"
    rounded: "{rounded.chrome}"
    size: "32px"
  search-field:
    backgroundColor: "{colors.bg-1-light}"
    textColor: "{colors.fg-0-light}"
    rounded: "{rounded.chrome}"
    padding: "8px 12px"
  chip:
    backgroundColor: "{colors.bg-1-light}"
    textColor: "{colors.fg-1-light}"
    rounded: "{rounded.chrome}"
    padding: "4px 8px"
  project-row:
    backgroundColor: "transparent"
    textColor: "{colors.fg-0-light}"
    rounded: "{rounded.chrome}"
    padding: "12px 16px"
  palette-result:
    backgroundColor: "transparent"
    textColor: "{colors.fg-1-light}"
    rounded: "{rounded.chrome}"
    padding: "10px 12px"
---

# Design System: Vanyan OS Portfolio

## 1. Overview

**Creative North Star: "The Recruiter Desktop"**

This portfolio behaves like a polished personal operating system. The surface should feel immediately usable, with familiar desktop affordances: taskbar, windows, Start menu, command palette, terminal, Chrome preview, and a VS Code README. The interaction itself is the proof of craft, so every playful detail must also make it easier to inspect Vardan's work.

The mood is polished, inventive, and technically fluent. Surfaces are compact, readable, and tool-like; motion is present but never theatrical. The OS metaphor can wink, but it cannot hide projects, resume, contact, GitHub, or LinkedIn.

The system rejects generic resume templates, static one-page portfolio sameness, SaaS-style hero metrics, novelty desktop effects that slow down basic navigation, and visuals that obscure project evidence.

**Key Characteristics:**
- Familiar desktop shell with portfolio-specific apps.
- Hard, readable panels over atmospheric wallpaper.
- OKLCH theming with accent-swappable neutrals.
- Compact typography, strong focus states, and dense scan paths.
- Motion built from opacity and transform, not layout shifts.

## 2. Colors

The palette is an accent-driven OS palette: tinted neutrals do the work, one electric accent supplies identity, and warm coral is reserved for state.

### Primary
- **Electric Desktop Accent** (`accent`): Used for focus rings, active taskbar indicators, VS Code status bar, selected controls, and high-signal interactive states.
- **Deep Active Accent** (`accent-strong`): Used where the active state needs more weight than hover or selection.
- **Soft Accent Wash** (`accent-soft`): Used for subtle fills and ambient accents.
- **Accent Glow** (`accent-glow`): Used for selected desktop icons, selection, and soft feedback.

### Secondary
- **Operator Accent** (`operator` variant): A hidden green terminal mood unlocked through the Terminal or command palette. It should feel earned, not exposed as a primary brand color.

### Tertiary
- **Warm Signal Coral** (`state-warm`): Used only for notifications, state, and moments that need a human warmth distinct from the main accent.

### Neutral
- **Desktop Canvas** (`bg-0`): The base UI background behind solid app content.
- **Panel Surface** (`bg-1`): The standard inner panel and menu surface.
- **Raised Surface** (`bg-2`): A secondary surface for grouped regions and active content.
- **Primary Text** (`fg-0`): Main text and active labels.
- **Secondary Text** (`fg-1`): Supporting labels, inactive app titles, and dense list copy.
- **Muted Text** (`fg-2`): Metadata, helper copy, timestamps, and path crumbs.
- **Window Border** (`border`): Softer structural borders.
- **Hairline** (`hairline`): Fine dividers inside windows and menus.
- **Mica Surface** (`mica`, `mica-strong`): Window and menu materials. They may feel atmospheric, but they must remain solid enough for text to read over the wallpaper.

### Named Rules

**The Evidence First Rule.** Accent color can guide attention, but screenshots, project details, and working links must carry more visual weight than decoration.

**The Solid Mica Rule.** Mica surfaces must stay readable at rest. If wallpaper texture competes with text, increase opacity or switch to `bg-1`.

## 3. Typography

**Display Font:** Inter via `var(--font-inter)`, with system UI fallback.
**Body Font:** Inter via `var(--font-inter)`, with system UI fallback.
**Label/Mono Font:** UI monospace for terminal and code surfaces.

**Character:** The type system is compact and technical. Most interface text lives between 11px and 15px so windows feel like tools, while project detail views can step up to larger, clearer titles.

### Hierarchy

- **Display** (700, `clamp(2rem, 5vw, 4rem)`, 1): Used sparingly on lock or large detail moments, not inside dense app chrome.
- **Headline** (700, 20px, 1.2): Used for project detail titles and major app headings.
- **Title** (600, 13px, 1.35): Used for window titles, result names, project names, and command labels.
- **Body** (400, 13px, 1.5): Used for descriptions, contact rows, project summaries, and app content. Long prose should stay within 65 to 75 characters per line.
- **Label** (500, 11px, 0.05em when uppercase): Used for column headers, section labels, status text, and tiny OS metadata.
- **Mono** (400, 14px, 1.7): Used for Monaco, terminal output, commands, and faux source snippets.

### Named Rules

**The Tool Text Rule.** Window chrome stays compact. Do not use hero-scale type inside taskbars, menus, file rows, cards, or sidebars.

**The Readme Comfort Rule.** Code and README surfaces need larger text than decorative OS labels. Monaco and terminal content should sit around 14px with generous line height.

## 4. Elevation

This system uses a hybrid of tonal layering, mica material, and soft structural shadows. Resting surfaces are mostly flat and bordered; windows and floating menus use shadow only to establish stacking and focus. Focused windows get the full window shadow, inactive windows step down to the floating shadow.

### Shadow Vocabulary

- **Window Shadow** (`--os-shadow-window`): Three-layer shadow for focused windows, Start menu, command palette, and project detail sheets.
- **Floating Shadow** (`--os-shadow-floating`): Smaller two-layer shadow for taskbar, inactive windows, icons, and lightweight panels.
- **Icon Drop Shadow** (`drop-shadow(0 10px 18px rgba(0,0,0,0.24))`): Used on desktop and Start menu app icons to sell the OS metaphor without adding extra containers.

### Named Rules

**The Stack Only Rule.** Shadows explain stacking. Do not use heavy shadow as decoration on every panel.

**The Border Before Shadow Rule.** Dense app regions should use hairlines and solid surfaces before adding more elevation.

## 5. Components

### Buttons

- **Shape:** Gently squared controls (`6px` chrome radius), with `8px` reserved for full windows.
- **Primary:** Accent-backed only when the action truly needs command weight. Most controls use transparent or neutral backgrounds.
- **Hover / Focus:** Hover uses light neutral fills (`fg-0` at low opacity) and accent text. Focus always uses the global 2px accent outline with 2px offset.
- **Secondary / Ghost:** The default OS button is ghost-like: icon or text, transparent at rest, neutral hover fill, accent on active state.

### Chips

- **Style:** Compact solid chips use `bg-1`, muted text, and a `6px` radius.
- **State:** Selected chips move to an accent tint and stronger foreground. Tech chips should stay informational, not loud.

### Cards / Containers

- **Corner Style:** Windows use `8px`; nested content, previews, and controls use `6px`.
- **Background:** Use `mica` for window shells, `mica-strong` for overlays, and `bg-1` or `bg-0` for panels that must be fully readable.
- **Shadow Strategy:** Window shells may lift; repeated list rows and cards should stay flat with hairlines.
- **Border:** Use `hairline` for internal dividers and `border` for outer edges.
- **Internal Padding:** Dense app rows use 8px to 12px; panels use 16px; larger detail views may use 24px.

### Inputs / Fields

- **Style:** Inputs sit in solid `bg-1` with a hairline border and `6px` radius.
- **Focus:** Border changes to accent and the global focus ring remains visible.
- **Error / Disabled:** No strong error system exists yet. Add it only when a real form workflow needs it.

### Navigation

- **Style:** Taskbar, Start menu, command palette, VS Code activity bar, and window title bars are the navigation system.
- **Active State:** Use accent text, accent-tinted fill, or a small underline/pill indicator. Do not add badges unless they carry state.
- **Mobile Treatment:** Windows clamp to the viewport, taskbar remains fixed, and dense app content should scroll within the window rather than expanding the shell.

### Signature Component: OS Window

The OS window is the core brand component. It uses draggable title bars, resize handles, focused/inactive states, snap previews, rounded `mica` shells, and compact controls. Any new app must feel like it belongs inside this shell before it introduces its own personality.

### Signature Component: VS Code README

The README opens as a real Monaco-backed VS Code surface with explorer, tabs, editor, status bar, and Icons8 attribution. Keep it direct and readable because it is the user's first self-introduction after unlock.

### Signature Component: Command Palette

The command palette is the power-user bridge. It must stay fast, searchable, keyboard-friendly, and slightly secretive. It can contain fun commands, but the first results should still help visitors reach projects, contact, resume, GitHub, and LinkedIn.

## 6. Do's and Don'ts

### Do:

- **Do** keep projects, resume, contact, GitHub, and LinkedIn one or two actions away from the desktop.
- **Do** use solid `bg-1`, `bg-0`, or high-opacity mica when text sits over wallpaper.
- **Do** preserve keyboard access: Enter and Space for icons, Ctrl+K for command palette, Escape for overlays, and visible focus rings.
- **Do** animate with opacity, transform, and CSS variables using `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Do** keep app chrome compact, with 11px to 13px labels and 32px icon controls.
- **Do** use the accent as a scarce signal for selected, focused, active, or unlocked states.

### Don't:

- **Don't** make it look like generic resume templates.
- **Don't** return to static one-page portfolio sameness.
- **Don't** use SaaS-style hero metrics or big stats as the main proof of skill.
- **Don't** add novelty desktop effects that slow down basic navigation.
- **Don't** let visuals obscure project evidence.
- **Don't** rely on low-opacity panels over busy wallpaper when the user is trying to read.
- **Don't** use gradient text, decorative side-stripe borders, nested cards, or glassmorphism as the default answer.
- **Don't** add server-side previews, proxies, API routes, or remote browser infrastructure for static portfolio effects.
