# Gatsby MobX starter

Gatsby + MobX + TypeScript starter.

Why? Because Gatsby is excellent [also for React apps (not just static sites)](https://www.gatsbyjs.org/blog/2018-10-15-beyond-static-intro/) and I wanted to have a quick alternative to `create-react-app --typescript` with a couple of things configured.

## Features

- Gatsby v2 + TypeScript
- MobX with decorators
- Two examples based on [@mweststrate's Egghead course](https://egghead.io/courses/manage-complex-state-in-react-apps-with-mobx):
    - "Counter" as a basic store and an observer
    - "Temperature" as a demo of `<Provider>` and type-safe `inject`
- `.editorconfig` & Prettier
- TSLint
- Jest setup

## Usage

1. Make sure you're in a Linux-y shell (on Windows, use e.g. Git Bash or MSYS2; `rm -rf` and similar might be called from npm scripts).
2. `yarn`
3. `yarn start`

Other notable scripts (see [`package.json`](package.json)):

- `yarn build`
    - (You can verify the statically generated site with e.g. `npx local-web-server -d public`.)
- `yarn tsc`
- `yarn lint`
- `yarn prettier`
- `yarn test` or `yarn test --watch`
