import { createRouter, createWebHashHistory } from "vue-router";

import { useGeneralStore } from "@/stores/general";

import Home from "@/views/Home/Home.vue";
import MainSlide from "@/views/Home/slides/MainSlide.vue";
import ModeSlide from "@/views/Home/slides/ModeSlide.vue";
import Mode2Slide from "@/views/Home/slides/MultiplayerSlide.vue";
import RestoreSessionSlide from "@/views/Home/slides/RestoreSessionSlide.vue";

import Solo from "@/views/Solo/Solo.vue";
import GameMode from "@/views/Solo/GameMode/GameMode.vue";
import Loader from "@/views/Solo/Loader/Loader.vue";
import Lobby from "@/views/Solo/Lobby/Lobby.vue";
import Game from "@/views/Solo/Game/Game.vue";
import Win from "@/views/Solo/Win/Win.vue";

import Settings from "@/views/Settings/Settings.vue";
import Privacy from "@/views/Settings/Privacy/Privacy.vue";

import Account from "@/views/Settings/Account/Account.vue";
import AccountInfos from "@/views/Settings/Account/AccountInfos/AccountInfos.vue";
import CreateAccount from "@/views/Settings/Account/CreateAccount/CreateAccount.vue";

let firstLoad = true;
let firstLoadAnimation = false;

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        // Prevent 404 route
        { 
            path: '/:pathMatch(.*)*',
            component: Home,
            beforeEnter: () => {
                firstLoadAnimation = true;
                return '/';
            },
        },

        {
            path: "/",
            component: Home,
            children: [
                {
                    path: "",
                    component: MainSlide,
                    name: "homeSlide1",
                    meta: {
                        depth: 0,
                        transitionName: "slide"
                    }
                },

                {
                    path: "mode",
                    component: ModeSlide,
                    name: "homeSlide2",
                    meta: {
                        depth: 1,
                        transitionName: "slide"
                    }
                },

                {
                    path: "mode-2",
                    component: Mode2Slide,
                    name: "homeSlide3",
                    meta: {
                        depth: 2,
                        transitionName: "slide"
                    }
                },

                {
                    path: "restore",
                    component: RestoreSessionSlide,
                    name: "restoreSlide",
                    meta: {
                        depth: 0,
                        transitionName: "fade"
                    }
                },
            ],
            meta: {
                depth: 0,
                transitionName: "fade"
            }
        },

        {
            path: "/solo",
            component: Solo,
            children: [
                {
                    path: "",
                    component: GameMode,
                    name: "gameModeSelection",
                    meta: {
                        depth: 1,
                        transitionName: "fade"
                    }
                },

                {
                    path: "loading",
                    component: Loader,
                    name: "loadingGamePath",
                    meta: {
                        depth: 1,
                        transitionName: "fade"
                    }
                },

                {
                    path: "lobby",
                    component: Lobby,
                    name: "selectPages",
                    meta: {
                        depth: 1,
                        transitionName: "fade"
                    }
                },

                {
                    path: "game",
                    component: Game,
                    name: "soloGame",
                    meta: {
                        depth: 1,
                        transitionName: "fade"
                    }
                },

                {
                    path: "win",
                    component: Win,
                    name: "winGame",
                    meta: {
                        depth: 1,
                        transitionName: "fade"
                    }
                },
            ],
            meta: {
                depth: 1,
                transitionName: "fade"
            }
        },

        {
            path: "/settings",
            component: Settings,
            children: [
                {
                    path: "privacy",
                    component: Privacy,
                    name: "privacyInformations",
                    meta: {
                        depth: 0,
                        transitionName: "fade"
                    }
                },

                {
                    path: "account",
                    component: Account,
                    children: [
                        {
                            path: "",
                            component: AccountInfos,
                            name: "accountInformations",
                            meta: {
                                depth: 0,
                                transitionName: "fade"
                            }
                        },

                        {
                            path: "create",
                            component: CreateAccount,
                            name: "createAccount",
                            meta: {
                                depth: 0,
                                transitionName: "fade"
                            }
                        },
                    ],
                    meta: {
                        depth: 0,
                        transitionName: "fade"
                    }
                },
            ],
            meta: {
                depth: 0,
                transitionName: "fade"
            }
        },
    ],

    scrollBehavior: (to) => {
        if(firstLoad) {
            firstLoad = false;
            firstLoadAnimation = true;

            if(useGeneralStore().proposeRestore) {
                if(to.fullPath != "/restore") {
                    router.replace({ path: '/restore' });
                }
            }
            else router.replace({ path: '/' });
        }

        useGeneralStore().hamburgerChecked = false;
    },
});

router.beforeEach(async (to, from) => {
    if(to.path.includes("loading") && useGeneralStore().loading == false) {
        router.replace({ path: '/' });
    }
});

router.afterEach((to, from) => {
    // Select the correct page transition animation based on the route settings

    if(firstLoadAnimation) {
        to.meta.useTransition = "";
        firstLoadAnimation = false;

        return;
    }

    if(from.meta.transitionName == "fade") {
        to.meta.useTransition = "fade";
        return;
    }

    if(to.meta.transitionName == "slide") {
        if(to.meta.depth > from.meta.depth) to.meta.useTransition = "slide-in";
        if(to.meta.depth < from.meta.depth) to.meta.useTransition = "slide-out";

        if(to.meta.depth == from.meta.depth) to.meta.useTransition = "fade";

        return;
    }

    if(to.meta.transitionName == "fade") {
        to.meta.useTransition = "fade";
        return;
    }
});

declare module 'vue-router' {
    interface RouteMeta {
        depth: number,
        transitionName: string,
        useTransition?: string,
    }
}

export default router