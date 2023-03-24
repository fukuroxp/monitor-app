import './bootstrap';
import {createApp} from "vue";
import router from "./src/router/router";
import "/node_modules/select2/dist/css/select2.css";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import sequentialEntrance from 'vue3-sequential-entrance'
import 'vue3-sequential-entrance/vue-sequential-entrance.css'
import select2 from 'select2';
select2();

import Menu from './src/components/Menu.vue'
import Camera from './src/components/Camera.vue'

import App from "./src/App.vue";

const app = createApp(App)
app.use(router, sequentialEntrance);
app.component(Menu, Camera);
app.mount('#app');
