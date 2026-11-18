# Clarity Gardens — exclusive pre-roll sell sheet

A one-page sell sheet for the store-exclusive joint two-packs (2 x 0.7g and 2 x 1g in a doob tube), shown to dispensary partners by the Clarity team. Plain HTML, CSS, and JavaScript with no build step.

Live at https://hzukas.github.io/clarity-joint-program/ (GitHub Pages, from the `master` branch). Changes pushed to `master` go live about a minute later.

## Viewing it

Double-click `index.html` to open it in any browser.

## Layout

The title runs across the top, the three "why exclusive" points sit on the left, the tube carousel is in the center (tubes slide out to the left and in from the right), and the pricing panel is on the right. On phones it stacks. The carousel cycles every few seconds, pauses on hover, and supports arrow keys, dots, and swipe.

## Pricing panel

The pricing panel is live while presenting. A blend slider sets what's in the joint, from 100% flower down to 100% trim/shake, and wholesale per tube follows it on a straight line between the two endpoint prices: $4.00 flower / $2.00 trim for the 2 x 0.7g, and $6.00 flower / $3.00 trim for the 2 x 1g. Type the store's out-the-door price and gross margin shows as (out the door - wholesale) / out the door.

The gear at the top right opens a panel to change the four endpoint prices. Slider, out-the-door prices, and endpoints are remembered in that browser only; Reset puts the slider back to 100% flower and clears the out-the-door prices but keeps the endpoints. The built-in endpoints live in `BUILT_IN` near the bottom of `index.html`.

## Appearance

The gear also has an Appearance tab. Click a box on the page (page title, left panel, right panel, a pricing card inside the right panel, or the tube frame), or pick it from the dropdown, and set its background, border color and width, text color, and text size (70% to 150%). The page updates as you change things. Save keeps the look in that browser only; Cancel (or Esc) puts everything back; Restore built-in on that tab returns to the shared default; each Default button next to a control returns just that setting. Secondary text tones (labels, captions) are derived from the text and background colors you pick. The stylesheet defaults are listed in TARGETS inside index.html.

### Making a look the default for everyone

look.js holds the shared default (window.CG_LOOK). It starts empty, which means the stylesheet look. To change it: set the look in the sheet, click **Export for everyone** on the Appearance tab, and a new look.js downloads with the look shown at that moment (saved or not). Replace look.js in this folder with it and push; about a minute later everyone who opens the link sees that look. A look saved on a device (Save) replaces the shared default on that device as a whole, so a teammate who has saved their own look keeps it until they Restore built-in and Save.

## Adding tube images

1. Put the image files in `labels/`.
2. List them in `labels.js`. Only `src` is required; `name`, `store`, and `type` (Sativa / Indica / Hybrid) show as the caption, and `bg` sets the slide's backdrop to match the photo.

To cut a lineup photo of several tubes into one PNG per tube, run `npm install` once, then:

```bash
node tools/split-tubes.js "C:\path\to\photo.jpg" 8
```

The number is how many tubes are in the photo. It writes `photo-1.png`, `photo-2.png`, ... into `labels/` and prints each crop's background color for `bg`. The script finds each tube by looking for gaps of background between them, so it works best when the tubes don't overlap. Crops keep the photo's background; the carousel stage is black so shots on black blend in. Add `--transparent` to knock the background out instead, which only works when the tubes contrast with it.

The Clarity logo in the header is `logo.png`, the same file the other Clarity apps use.
