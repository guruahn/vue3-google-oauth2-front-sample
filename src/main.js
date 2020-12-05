import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import gAuthPlugin from 'vue3-google-oauth2';
const app = createApp(App)
let gauthClientId = import.meta.env.VITE_GAUTH_CLIENT_ID
if(!gauthClientId) gauthClientId = process.env.VITE_GAUTH_CLIENT_ID
console.log(import.meta.env.VITE_GAUTH_CLIENT_ID, process.env.VITE_GAUTH_CLIENT_ID)
app.use(gAuthPlugin, { clientId: gauthClientId, scope: 'email', prompt: 'consent', fetch_basic_profile: false })

app.mount('#app')
