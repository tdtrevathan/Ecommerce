import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useCartStore } from '@/stores/cartStore'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const app = createApp(App)

app.use(router)
app.use(createPinia());

const cartStore = useCartStore();
cartStore.initialize();
console.log('reinitialized')
app.mount('#app')
