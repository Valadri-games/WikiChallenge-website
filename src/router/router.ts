import { createRouter, createWebHashHistory } from "vue-router";

import { useGeneralStore } from "@/stores/general";
import { useAccountStore } from "@/stores/account";

import Root from "@/views/Root/Root.vue";
import Home from "@/views/Root/Home/Home.vue";
import PlayMode from "@/views/Root/PlayMode/PlayMode.vue";
import Mode2Slide from "@/views/Root/slides/MultiplayerSlide.vue";
import CreateAccount from "@/views/Root/CreateAccount/CreateAccount.vue";
import HomeAccountInfos from "@/views/Root/AccountInfos/AccountInfos.vue";
import Login from "@/views/Root/Login/Login.vue";
import RestoreSession from "@/views/Root/RestoreSession/RestoreSession.vue";

import Solo from "@/views/Solo/Solo.vue";
import GameMode from "@/views/Solo/GameMode/GameMode.vue";
import Loader from "@/views/Loader/Loader.vue";
import Lobby from "@/views/Solo/Lobby/Lobby.vue";
import Game from "@/views/Solo/Game/Game.vue";
import Win from "@/views/Solo/Win/Win.vue";

import Settings from "@/views/Settings/Settings.vue";
import Privacy from "@/views/Settings/Privacy/Privacy.vue";

import Account from "@/views/Settings/Account/Account.vue";
import AccountInfos from "@/views/Settings/Account/AccountInfos/AccountInfos.vue";
import AccountSettings from "@/views/Settings/Account/AccountSettings/AccountSettings.vue";
import AccountStats from "@/views/Settings/Account/AccountStats/AccountStats.vue";

import Leaderboards from "@/views/Leaderboards/Leaderboards.vue";
import DailyChallenge from "@/views/Leaderboards/DailyChallenge/DailyChallenge.vue";
import GeneralLeaderboard from "@/views/Leaderboards/General/General.vue";

let firstLoad = true;
let firstLoadAnimation = true;

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        // Prevent 404 route
        { 
            path: '/:pathMatch(.*)*',
            component: Root,
            beforeEnter: () => {
                firstLoadAnimation = true;
                return '/';
            },
        },

        {
            path: "/",
            component: Root,
            children: [
                {
                    path: "",
                    component: Home,
                    name: "home",
                    meta: {
                        depth: 0,
                        transitionName: "slide"
                    }
                },

                {
                    path: "mode",
                    component: PlayMode,
                    name: "mode-selection",
                    meta: {
                        depth: 1,
                        transitionName: "slide"
                    }
                },

                {
                    path: "join-group",
                    component: Mode2Slide,
                    name: "jon-group",
                    meta: {
                        depth: 2,
                        transitionName: "slide"
                    }
                },

                {
                    path: "account-infos",
                    component: HomeAccountInfos,
                    name: "account-infos",
                    meta: {
                        depth: -1,
                        transitionName: "slide"
                    }
                },

                {
                    path: "create-account",
                    component: CreateAccount,
                    name: "create-account",
                    meta: {
                        depth: -2,
                        transitionName: "slide"
                    }
                },

                {
                    path: "login",
                    component: Login,
                    name: "login",
                    meta: {
                        depth: -2,
                        transitionName: "slide"
                    }
                },

                {
                    path: "restore",
                    component: RestoreSession,
                    name: "restore-session",
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
                    name: "game-mode-selection",
                    meta: {
                        depth: 1,
                        transitionName: "fade"
                    }
                },

                {
                    path: "lobby",
                    component: Lobby,
                    name: "select-pages",
                    meta: {
                        depth: 1,
                        transitionName: "fade"
                    }
                },

                {
                    path: "game",
                    component: Game,
                    name: "solo-game",
                    meta: {
                        depth: 1,
                        transitionName: "fade"
                    }
                },

                {
                    path: "win",
                    component: Win,
                    name: "win-game",
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
                    name: "privacy-informations",
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
                            name: "account-informations",
                            meta: {
                                depth: 0,
                                transitionName: "fade"
                            }
                        },

                        {
                            path: "edit",
                            component: AccountSettings,
                            name: "account-settings",
                            meta: {
                                depth: 0,
                                transitionName: "fade"
                            }
                        },

                        {
                            path: "stats",
                            component: AccountStats,
                            name: "account-stats",
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

        {
            path: "/leaderboards",
            component: Leaderboards,
            children: [
                { 
                    path: '',
                    component: Home,
                    beforeEnter: () => {
                        firstLoadAnimation = true;
                        return '/';
                    },
                },

                {
                    path: "daily-challenge",
                    component: DailyChallenge,
                    name: "daily-challenge-leaderboard",
                    meta: {
                        depth: 0,
                        transitionName: "fade"
                    }
                },

                {
                    path: "general",
                    component: GeneralLeaderboard,
                    name: "general-leaderboard",
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
            path: "/loading",
            component: Loader,
            name: "loader",
            meta: {
                depth: 0,
                transitionName: "fade"
            }
        },
    ],

    scrollBehavior: (to) => {
        // Close menu
        useGeneralStore().hamburgerChecked = false;
    },
});

router.beforeEach(async (to, from) => {
    let generalStore = useGeneralStore();
    let accountStore = useAccountStore();

    if(firstLoad) {
        if(accountStore.loggedIn && !accountStore.freshDataLoaded) {
            if(to.fullPath != '/loading') router.replace({ path: '/loading' });
        }
        else if(generalStore.proposeRestore) {
            firstLoad = false;
            router.replace({ path: '/restore' });
        }
        else {
            firstLoad = false;
            router.replace({ path: '/' });
        }
    }

    if(to.path.includes("loading") && generalStore.loading == false) {
        router.replace({ path: '/' });
    }

    if(to.path.includes("settings/account") && accountStore.loggedIn == false) {
        router.replace({ path: '/' });
    }

    if((to.path == "/create-account" || to.path == "/login") && accountStore.loggedIn == true) {
        router.replace("/settings/account/");
    }
});

router.afterEach((to, from) => {
    // Select the correct page transition animation based on the route settings

    if(firstLoadAnimation) {
        to.meta.useTransition = "";
        firstLoadAnimation = false;
    }

    else if(from.meta.transitionName == "fade") to.meta.useTransition = "fade";

    else if(to.meta.transitionName == "slide") {
        if(to.meta.depth == from.meta.depth) to.meta.useTransition = "fade";
        else if(to.meta.depth > from.meta.depth) to.meta.useTransition = "slide-in";
        else if(to.meta.depth < from.meta.depth) to.meta.useTransition = "slide-out";
    }

    else if(to.meta.transitionName == "fade") to.meta.useTransition = "fade";
});

declare module 'vue-router' {
    interface RouteMeta {
        depth: number,
        transitionName: string,
        useTransition?: string,
    }
}

export default router