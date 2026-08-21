# Angular rxResource vs Apollo Client

A focused engineering experiment comparing pagination behavior in Angular with two different data-loading approaches:

- `rxResource` with Angular Signals
- Apollo Client with `watchQuery`

The goal is not to benchmark raw performance. The question is simpler and more practical:

> How much state-management work is required to keep existing UI data stable while a new paginated request is loading?

## Research question

Both approaches can load the same paginated data, but they expose different trade-offs when the UI should keep previously rendered content visible during a new request.

The experiment compares:

- loading-state behavior;
- preservation of previous data;
- amount of explicit state coordination required;
- implementation complexity introduced by each abstraction.

## Result

With Apollo Client, the previous result can remain visible with a small amount of conditional handling around `watchQuery` state.

With `rxResource`, reproducing the same UX requires additional coordination: a linked signal, preservation of the previous value, resource-status tracking, and explicit show/hide logic.

The takeaway is not that one API is universally better. It is that an abstraction that looks simpler at first can move complexity into application state once the UI requires behavior outside its default lifecycle.

## Why this repository exists

This repository is intentionally small. It is a reproducible test case for validating a concrete frontend architecture decision instead of relying only on API ergonomics or documentation examples.

The same dataset and UI behavior are used for both implementations so the comparison stays focused on state handling rather than unrelated application concerns.

## Run the experiment

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

or:

```bash
ng serve
```

Then open:

```text
http://localhost:4200/
```

Interact with pagination and compare how each implementation behaves while a new request is in flight.

## Mock backend

The project uses MSW so the comparison does not depend on a real backend.

In development, `src/main.ts` initializes the service worker and handlers under `src/mocks`.

Network requests are visible in the browser console as MSW request logs. An `unhandled` request indicates that a matching mock handler is missing.

Keeping the backend deterministic makes the experiment about client-state behavior rather than network or server variability.

## Dataset generation

A small utility generates deterministic test data for the mock backend:

```bash
npm run gen:dataset
npm run gen:dataset -- 1000
npm run gen:dataset -- 200 --out src/mocks/datasets/custom.json
```

The generator uses Faker and sorts the produced records by date.

## Engineering takeaway

Framework-provided abstractions should be evaluated against the behavior a product actually needs, not only against the amount of code required for the happy path.

For this pagination case, preserving visible data during refetch makes the difference in state ownership explicit — and that difference is easier to evaluate with a small executable experiment than with an abstract API comparison.
