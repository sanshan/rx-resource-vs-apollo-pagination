# Angular rxResource vs Apollo Client

Small demo about pagination in Angular. It compares two ways to load data:

- **rxResource (Angular Signals)**
- **Apollo Client (watchQuery)**

Both reset data and set `loading=true` when a new request starts. The table blinks while they clear UI. In Apollo you can avoid this with a simple check: keep old state until new data arrives. In rxResource you need a linked signal, store `previous.value`, watch resource status, and add your own show/hide logic. That extra work makes rxResource lose some of its "magic".

## Run the project

1. Install deps: `npm install`.
2. Start dev server: `npm start` or `ng serve`.
3. Open `http://localhost:4200/`. The page reloads on file save.

## Mock backend with MSW

- In dev mode `src/main.ts` calls `initMsw()`. It registers the service worker from `src/mockServiceWorker.js` and uses handlers in `src/mocks/handlers`.
- Network logs show in the browser console as `[MSW][request:*]`. If you see `request:unhandled`, a handler is missing.
- The worker file must sit in `src/` and is loaded via `serviceWorker: { url: '/mockServiceWorker.js' }`.

## Generate fake data

The script `tools/generate-dataset.ts` builds JSON items (faker + date sort).

```bash
npm run gen:dataset           # default 500 records into src/mocks/datasets/items.json
npm run gen:dataset -- 1000   # custom count
npm run gen:dataset -- 200 --out src/mocks/datasets/custom.json
```

The file is created with needed folders. Types `Item` and `ItemType` come from that file.
