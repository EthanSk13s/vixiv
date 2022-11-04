import { createApp } from 'vue'
import VueCookies from "vue-cookies";
import { createPinia } from 'pinia';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue'
import router from './router'

import './assets/style.css'

const pinia = createPinia()
const app = createApp(App)

axios.defaults.withCredentials = true;

app.use(pinia)
app.use(router)
app.use(VueCookies)
app.use(VueAxios, axios)

app.mount('#app')
