# vue3-google-oauth2-front-sample
> Sample project for [vue3-google-oauth2](https://github.com/guruahn/vue3-google-oauth2) plugin.
> [Demo](https://boring-lamport-199b25.netlify.app/)
## Project setup

### 1. install
```
yarn install
```
### 2. set your google clientId
```javascript
app.use(gAuthPlugin, { clientId: '394838939483-rq7d2rfj39gkdfjd9jenu670ounoi01.apps.googleusercontent.com', scope: 'email', prompt: 'consent', fetch_basic_profile: false })
```

### Compiles and hot-reloads for development
```
yarn run dev
```

### Compiles and minifies for production
```
yarn run build
```