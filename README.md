# Rajan Maharjan — Personal Website

A responsive personal portfolio for Rajan Maharjan, based on the supplied design, shared CSS system, original photography, and Nepali calendar engine. The homepage and existing content pages work as ordinary HTML on Apache; the React app is an optional Vite-served/build version.

## Features

- Apache-compatible HTML homepage that opens directly at `http://localhost/rajan-maharjan-redesign/index.html`, with no Node.js, Vite, or package install required.
- Optional React application with preserved `.html` page URLs when served or built through Vite.
- Responsive navigation, persistent light/dark theme, and bilingual live date pill.
- Portfolio browsing, category filters, photography lightbox, and blog search.
- Bidirectional Nepali Bikram Sambat (BS) ↔ Gregorian (AD) date converter.
- Local date API examples that use the converter engine without pretending to call a server.
- Existing PHP integration and REST endpoint guidance remains in [PHP_INTEGRATION_GUIDE.md](./PHP_INTEGRATION_GUIDE.md).

## Open directly in Laragon / Apache

Start Apache in Laragon and open:

```text
http://localhost/rajan-maharjan-redesign/index.html
```

The HTML entry loads its relative CSS, images, and browser scripts directly. Existing pages such as `about.html`, `projects.html`, and `date-converter.html` remain standalone HTML too.

## Run the React app (optional)

Requires Node.js 18 or newer:

```sh
npm install
npm run dev
```

Open the URL printed by Vite. The Vite HTML transform replaces the static Apache homepage with the React app shell while leaving the directly served `index.html` intact.

## Production build

```sh
npm run build
npm run preview
```

Deploy the contents of `dist/` to an Apache document root for the built React version. The build emits files for preserved `.html` page URLs. Deploying the production build into the existing PHP site should be coordinated with its `.htaccess` rules and the routing guidance in `PHP_INTEGRATION_GUIDE.md`.

The existing PHP date REST API remains a separate server-side integration; the converter UI and sandbox examples work locally in the browser.

## Date conversion coverage

The existing `assets/js/date-converter.js` engine supports Gregorian dates from 1944–2033 AD and Bikram Sambat dates from 2000–2090 BS. Conversion results are validated against the engine’s supported calendar data.
