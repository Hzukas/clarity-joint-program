# Clarity Gardens — exclusive pre-roll sell sheet

A one-page sell sheet for the store-exclusive joint two-packs (2 x 0.7g and 2 x 1g in a doob tube), shown to dispensary partners by the Clarity team. Plain HTML, CSS, and JavaScript with no build step.

Live at https://hzukas.github.io/clarity-joint-program/ (GitHub Pages, from the `master` branch). Changes pushed to `master` go live about a minute later.

## Viewing it

Double-click `index.html` to open it in any browser.

## Layout

The title runs across the top, the three "why exclusive" points sit on the left, the tube carousel is in the center (tubes slide out to the left and in from the right), and the pricing panel is on the right. On phones it stacks. The carousel cycles every few seconds, pauses on hover, and supports arrow keys, dots, and swipe.

## Pricing panel

The pricing panel is live while presenting. A blend slider sets what's in the joint, from 100% flower down to 100% trim/shake, and wholesale per tube follows it on a straight line between the two endpoint prices: $4.00 flower / $2.00 trim for the 2 x 0.7g, and $6.00 flower / $3.00 trim for the 2 x 1g. Type the store's out-the-door price and gross margin shows as (out the door - wholesale) / out the door.

The gear at the top right (editor mode only, see below) has **Price endpoints…** to change the four endpoint prices. Slider, out-the-door prices, and endpoints are remembered in that browser; Reset puts the slider back to 100% flower and clears the out-the-door prices but keeps the endpoints. The built-in endpoints live in `BUILT_IN` near the bottom of `index.html`.

## Editing the page

The editor works the same way as the Magnolia Road pitch.

- **Unlock** (top right) and click any text to retype it. Enter finishes.
- While text is selected, a palette floats above it: text color, size (A− / A+ / Reset; select part of a line first to resize only that part), and font. Prices, margins, the blend readout, and the tube caption are filled in by the page, so they take color, size, and font but not new wording.
- The palette also edits the box around the text: fill, border color, and border width. Click a box itself (not its text) to edit just the box. Boxes are the title area, the kicker pill, both side panels, the blend slider card, both SKU cards, both margin boxes, the Sativa / Indica / Hybrid chips, the tube frame, and the type pill under the tube.
- On the three "why exclusive" points, a Badge row colors that point's number square.
- Move nudges the selected item 2px (10px with Shift) or drag the round handle; Size makes the box wider, narrower, taller, or shorter (or drag the corner grip); Reset and Auto put them back.
- Undo steps back through color, size, font, box, badge, position, and box size changes.
- Everything is remembered in that browser.

### Gear menu

- **Save version** downloads every edit (text, colors, sizes, fonts, boxes, positions, pricing) as `clarity-joint-<name>.json`. **Load version** applies one in this browser. **Copy link** copies a link that carries the same edits in the address, so it opens with them in any browser.
- **Publish to client** makes what you see now the look every visitor of the live site gets. It writes `published.json` into this repo through the GitHub API. The first time, paste a GitHub fine-grained token into the menu (repository access to Hzukas/clarity-joint-program, permission Contents: Read and write); it stays in that browser only. Because the publish is a commit made on GitHub, run `git pull` here before your next local change.
- Without a token: **Save version**, then double-click `publish.cmd` (or run `node publish.js`). It takes the newest `clarity-joint-*.json` from Downloads, writes `published.json`, commits, and pushes. `node publish.js path\to\file.json` publishes a specific file.
- **Reset colors** clears every text color, fill, border, and badge (Undo brings them back). **Reset all edits** puts every text and look back to the original and cannot be undone.

### Who sees the controls

- The live link https://hzukas.github.io/clarity-joint-program/ is the client copy. Visitors see the look in `published.json` and no lock or gear.
- To edit, open https://hzukas.github.io/clarity-joint-program/?edit once; that browser shows the lock and gear from then on. A local copy of `index.html` is always in editor mode.
- A browser that has made its own edits (unlocked, loaded a version, or opened a Copy link) keeps them and does not take later publishes. Reset all edits does not change that; clear the site's storage in the browser to follow published looks again.
- Copy link always points at the plain live link, so it never turns a recipient into an editor.

## Adding tube images

1. Put the image files in `labels/`.
2. List them in `labels.js`. Only `src` is required; `name`, `store`, and `type` (Sativa / Indica / Hybrid) show as the caption, and `bg` sets the slide's backdrop to match the photo.

To cut a lineup photo of several tubes into one PNG per tube, run `npm install` once, then:

```bash
node tools/split-tubes.js "C:\path\to\photo.jpg" 8
```

The number is how many tubes are in the photo. It writes `photo-1.png`, `photo-2.png`, ... into `labels/` and prints each crop's background color for `bg`. The script finds each tube by looking for gaps of background between them, so it works best when the tubes don't overlap. Crops keep the photo's background; the carousel stage is black so shots on black blend in. Add `--transparent` to knock the background out instead, which only works when the tubes contrast with it.

The Clarity logo in the header is `logo.png`, the same file the other Clarity apps use. Its center and one triangle are black, so the page sets it on a white disc to keep it visible on the dark background.
