import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import axios from "axios"
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Set Axios base URL and default headers
// axios.defaults.baseURL = 'http://127.0.0.1:8888';
//axios.defaults.baseURL = 'http://160.191.163.33:8888';
const backendUrl = import.meta.env.VITE_BACKEND_URL;
console.log('env url-1', backendUrl);
axios.defaults.baseURL = backendUrl;
console.log('env url-1', axios.defaults.baseURL);
axios.defaults.headers.common['Content-Type'] = 'application/json';


app.use(createPinia())
app.use(router)

app.mount('#app')
