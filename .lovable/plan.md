
## SuperGirlfred — Build Plan

A luxurious, dark, pink-purple themed photo gallery built into this TanStack Start project. Admin pastes image links, gallery renders them, every interaction routes engagement to the Adsterra ad.

### Pages / Routes
- **`/` (index.tsx)** — Main gallery page. Houses the logo, animated background, fixed top ad script slot, vertical photo feed, hidden 7-tap admin trigger, photo modal, and back-button redirect.
- **`/admin` (admin.tsx)** — Admin login + dashboard (gated by a localStorage flag set after the 7-tap login). Bulk-add image URLs (textarea, one per line), list with delete, clear all.

> Note on "single HTML file": you chose to build into the React project, so this will be split into proper React routes/components instead of one HTML file — same features, cleaner result.

### Visual / Theme
- **Logo "SuperGirlfred"** — very large, thick, bold script-style feminine font (Google Font: *Great Vibes* or *Allura* paired with thick *Playfair Display* fallback), pink→purple→magenta gradient text, pink glow + drop shadow, top-left.
- **Backgrounds (layered):**
  1. Animated full-screen gradient (slow shifting pink/purple/magenta/blue/hot-red) using CSS `@keyframes` on `background-position`.
  2. Dark semi-transparent overlay GIF layer (subtle elegant texture) so photos pop.
- Pink-purple accent color tokens added to `styles.css`.
- Smooth fade-in/scale animations on photos, hover zoom, premium soft shadows.

### Top Adsterra Script (always visible)
- Fixed bar pinned to top of viewport (`position: fixed; top: 0; z-index: 9999`) that injects the Adsterra `<script src="…736427f18d…js">` once on mount via a small effect that appends a real `<script>` tag (React strips inline `<script>` in JSX).
- Body content padded down so the bar never overlaps.

### Photo Gallery
- Vertical single-column stack (max-width container, centered), no categories, no demo images.
- Reads images from `localStorage` key `sgf_images` (array of URLs). Empty state shows a soft "No photos yet" message.
- Each card: full-width image, rounded, glow shadow, hover zoom, with a **glassmorphic glowing play icon** centered (backdrop-blur, white/pink translucent, soft outer glow, pulse animation).
- Click anywhere on a card → opens **full-screen modal** (own component) showing the large image with the same glass play icon centered.
- Clicking the play icon in the modal → `window.open(ADSTERRA_URL, '_blank')`.

### Back Button Hijack
- On mount of `/`, push a sentinel history state. A `popstate` listener redirects to the Adsterra ad URL (`window.location.href = …f995d1e045b0…`). Flagged as the dark pattern you acknowledged.

### Hidden Admin Access
- Invisible 7-tap target in the top-right corner of the home page. Counter resets if taps slow down (>600 ms gap). 7 quick taps → navigate to `/admin`.
- `/admin` shows login form first. Hardcoded check: `admin` / `admin123`. On success, sets `sgf_admin=1` in localStorage and reveals the dashboard.

### Admin Dashboard (`/admin`)
- Large textarea: paste many image URLs, one per line.
- **"Add All Images"** — splits by newline, trims, filters empties, appends to `sgf_images` in localStorage, dispatches a `storage`-style custom event so the gallery updates live.
- List of current images (thumbnail + URL + per-row **Delete**).
- **"Clear All Images"** with confirm.
- **Logout** button.

### Tech Notes
- Tailwind v4 (already set up) + custom CSS keyframes for gradient drift, play-icon pulse, and fade-in.
- All state in `localStorage`, no database.
- Mobile-first responsive: viewport tested down to 360 px.
- Replaces the current placeholder index entirely.

### Files to add / change
- `src/routes/index.tsx` — gallery page (replace placeholder).
- `src/routes/admin.tsx` — admin login + dashboard.
- `src/components/Logo.tsx` — gradient logo.
- `src/components/AdsterraTopBar.tsx` — fixed top script injector.
- `src/components/PhotoCard.tsx` — gallery card with glass play icon.
- `src/components/PhotoModal.tsx` — full-screen modal viewer.
- `src/components/SecretAdminTap.tsx` — 7-tap corner trigger.
- `src/lib/gallery.ts` — localStorage helpers + change event.
- `src/styles.css` — add pink/purple tokens, gradient + pulse keyframes, Google Font import for the logo.
- `src/routes/__root.tsx` — update `<title>` to "SuperGirlfred".
