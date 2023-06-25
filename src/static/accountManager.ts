import router from "@/router/router";

import { socket } from "@/socket";

import { useGeneralStore } from "@/stores/general";

export default class AccountManager {
    static async createAccount(password: string) {
        const generalStore = useGeneralStore();

        if(socket.connected != true) {
            generalStore.showLoginError = true;
            return false;
        }

        generalStore.loading = true;

        router.push('/settings/account/loading');

        let result: any = await new Promise((resolve) => {
            socket.on("createAccount", (data) => {
                socket.off('createAccount');

                setTimeout(() => {
                    resolve(data);
                }, 800);
            });
    
            socket.emit('createAccount', {
                name: generalStore.playerName,
                password: password,
                avatarid: generalStore.avatarID,
            });

            setTimeout(() => {
                resolve(false);
            }, 5000); // Set 5000
        });

        if(result.succes == true) {
            generalStore.loggedIn = true;
            generalStore.sessionId = result.sessionid;

            router.push("/");
        } else {
            generalStore.showUnavailableName = true;

            if(generalStore.showMobile) router.replace("/create-account");
            else router.replace("/settings/account/create");
        }
    }

    static async login(password: string) {
        const generalStore = useGeneralStore();

        if(socket.connected != true) {
            generalStore.showLoginError = true;
            return false;
        }

        generalStore.loading = true;

        router.push('/settings/account/loading');

        let result: any = await new Promise((resolve) => {
            socket.on("login", (data) => {
                socket.off('login');

                setTimeout(() => {
                    resolve(data);
                }, 800);
            });
    
            socket.emit('login', {
                name: generalStore.playerName,
                password: password,
            });

            setTimeout(() => {
                resolve(false);
            }, 5000); // Set 5000
        });

        if(result.succes == true) {
            generalStore.loggedIn = true;
            generalStore.sessionId = result.sessionid;

            generalStore.loadAccountData(result.data);

            router.push("/");
        } else {
            generalStore.showPasswordError = true;

            if(generalStore.showMobile) router.replace("/login");
            else router.replace("/settings/account/login");
        }
    }
}