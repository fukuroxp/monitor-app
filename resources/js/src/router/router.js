import { createRouter, createWebHistory} from "vue-router";
import Index from "../views/Index.vue";

import TrackReceive from "../views/track/Receive.vue"

const router = createRouter({
    history : createWebHistory('/'),
    routes : [
        {
            path : '/',
            name : 'index',
            component : Index
        },

        //Track Route
        {
            path : '/track/receive',
            name : 'receive',
            component : TrackReceive
        },

    ]
})

export default router
