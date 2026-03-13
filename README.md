# Pyret language support for highlight.js

![NPM Version](https://img.shields.io/npm/v/@exercism/highlightjs-pyret)

This repo contains the highlight.js language definition for [Pyret](https://www.pyret.org/).

⚠️ To ensure that the package can be integrated on the Exercism website, don't change the packages' versions:

```json
"highlight.js": "^11.10.0"
```

## Install

- NPM: `npm install @exercism/highlightjs-pyret`
- Yarn: `yarn add @exercism/highlightjs-pyret`
- Bun: `bun add @exercism/highlightjs-pyret`

## Prerequisites

- [Bun](https://bun.sh/)

## Resources

- [Highlight.js](https://highlightjs.readthedocs.io/en/latest/)
  - [Language contributor checklist](https://highlightjs.readthedocs.io/en/latest/language-contribution.html)
  - [Language definition guide](https://highlightjs.readthedocs.io/en/latest/language-guide.html)
  - [Existing language definitions](https://github.com/highlightjs/highlight.js/tree/main/src/languages)

## Structure

The repo's source files are defined in [TypeScript](https://www.typescriptlang.org/) and compiled to [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript).

The repo is structured as follows:

```text
.
├── src
│   ├── <language>.ts (the language definition)
│   ├── <language>.js (the built output)
│   └── <language>.d.ts (the type declarations)
├── test
│   ├── detect (auto-detection test cases)
│   │   └── *.txt (input)
│   ├── markup (markup test cases)
│   │   ├── *.txt (input)
│   │   └── *.expected (expected output)
│   └── <language>.test.ts (test runner for tests/detect)
├── index.html (dev server file)
└── tsconfig.json (TypeScript config)
```

## Setup

Run `bun install` to install all dependencies.

## Developing

To help with development, run `bun run dev`.
This will start a [Vite](https://vite.dev/) dev server (usually at http://localhost:5173/) that renders the `index.html` file.
The page displays a hardcoded sample of source code highlighted using the language definition in `src/<language>.ts`.
Any changes to the language definition will auto-refresh the dev server's rendered output.

## Testing

The `test/detect` and `test/markup` directories contain the test files.
Run `bun test` to run these tests.

Note: test files should be relatively small and focus on a single aspect of the language.

## Publishing

Run `bun publish` to publish the plugin to NPM.
