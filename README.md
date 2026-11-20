# SpinPick – Random Picker Wheel

A spin-the-wheel random picker you can customize from A to Z, in **English and বাংলা**. Plain HTML/CSS/JS, with no dependencies.

## Features
- **Language switch:** Bangla / English for the whole app, including presets, messages and the WhatsApp form
- **Items:** write your own names, offers or prizes, or set the number of items with the − / + stepper. Presets include Offers and Prizes
- **Design:** 9 color palettes or your own colors, 10 fonts (including Bangla fonts Hind Siliguri, Baloo Da 2 and Noto Sans Bengali), logo (wheel center, top corner or both), background (glow, color, gradient or image), border, pegs, pointer and center button
- **Spin:** 30 smooth turns by default (adjustable 3–60 turns, 3–30 s) with cubic-bezier motion curves and motion blur
- **Result & animation:** result popup, BOOM + fanfare + applause sound, confetti, fireworks, flash and shake. Each one can be switched off
- **Mobile:** big SPIN bar at the bottom for one-hand use, large touch targets, and dialogs that open as bottom sheets
- **Share & embed:** share link, plus `<iframe>` embed code that shows only the wheel
- **WhatsApp leads (optional):** collect a WhatsApp number before the spin or with the result. Consent is required and never pre-ticked. You can also allow one spin per number, export leads as CSV, and add a "Claim on WhatsApp" button that opens a chat with your number
- Results history, wheel export/import (JSON), saved automatically in the browser, dark/light mode, fullscreen

## Run locally
```bash
node serve.js
```
Open http://localhost:5173

## Build for publishing
```bash
node build.js
```
This creates a `dist/` folder with `index.html` (CSS and JS inlined), `favicon.svg` and `manifest.webmanifest`.
To check the build locally, run `node serve.js dist`.

## Receiving WhatsApp leads online
Leads are saved in the browser that collected them (Results tab, then Export CSV). To receive them on your side from every visitor and from embedded wheels, set a webhook in `index.html` before building:

```html
<script>
  window.SPINPICK_CONFIG = { leadWebhook: "https://your-endpoint.example.com/leads" };
</script>
```

Each lead is sent as a JSON `POST` with these fields: `time`, `name`, `phone`, `result`, `wheel`, `consent` and `consentText`. A Google Apps Script web app, Zapier, Make or your own server can receive it. The webhook is never put into share or embed links, so nobody else can redirect your leads.

Only collect numbers you have a lawful reason to keep, and use them only as the consent text says.

## Publish
Upload the **contents of `dist/`** to any static host:
- **Netlify:** drag the `dist` folder onto https://app.netlify.com/drop
- **Vercel:** `npx vercel dist`
- **GitHub Pages:** push the `dist` files to a repo and turn on Pages
- **cPanel / shared hosting:** upload the files into `public_html`

The embed code uses your site's address, so create it from the **published** site, not from localhost.
