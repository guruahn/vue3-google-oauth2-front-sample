import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import gAuthPlugin from './plugins/vue3-google-oauth2.js';
const app = createApp(App)
app.use(gAuthPlugin, { clientId: '768834812579-007e5802er7gj3c93p8qa9568h8bj3na.apps.googleusercontent.com', scope: 'email', prompt: 'consent', fetch_basic_profile: false })

app.mount('#app')
