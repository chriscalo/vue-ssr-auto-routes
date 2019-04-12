# vue-ssr-auto-routes

This project combines the following:
- Vue project created from the Vue CLI (no need to eject)
- single-file components (SFCs, aka `.vue` files)
- server-side rendering (SSR) with client-side hydration
- automatic code splitting for every page
- a convention for mapping URLs to `.vue` files (no manually writing routes)
- dev server with hot module reloading (HMR)
- API server that gets merged with dev server

## How to manually recreate this project
TODO: explain steps in more detail
1. `vue create my-proj`
2. `vue add router`
3. `vue add @akryum/vue-cli-plugin-ssr`
4. `yarn add vue-route-generator` && `src/router/generate.js` && move pages to `src/pages/**/*.vue`
5. write `api.js` && add `vue.config.js` to merge devServer & apiServer


``` sh
# install dependencies
yarn

# compiles and hot-reloads for development
yarn run ssr:serve

# compiles and minifies for production
yarn run ssr:build

# starts production server
yarn run start
```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
