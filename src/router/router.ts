import { createRouter, createWebHashHistory } from "vue-router";

import Home from "@/views/Home.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        // Prevent 404 route
        {
            path: '/:pathMatch(.*)*',
            component: "" as any,

            beforeEnter: () => {
                return '/';
            },
        },

        {
            path: "/",
            component: Home,
            meta: {
                depth: 0,
                transitionName: "auto",
            },
        }
    ],
});

// let lastRouting: number = 0; // Date in milliseconds since the last page change
// router.beforeResolve((to, from, next) => {
//     // Check if the current page transition is finished before allowing to change to another route
//     // Avoid incomplete page transition animations

//     let date = Date.now();
//     if(lastRouting + 300 < date) {
//         lastRouting = date;
//         next();
//     }
// });

// router.afterEach((to, from) => {
//     // Select the correct page transition animation based on the route settings

//     if(to.meta.depth == from.meta.depth) to.meta.transitionName = "fade";

//     if(to.meta.depth > from.meta.depth) to.meta.transitionName = "slide-in";
//     if(to.meta.depth < from.meta.depth) to.meta.transitionName = "slide-out";
// });

declare module 'vue-router' {
    interface RouteMeta {
        depth: number,
        transitionName: string,
    }
}

export default router;