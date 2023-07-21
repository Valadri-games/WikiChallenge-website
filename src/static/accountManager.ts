import router from "@/router/router";

import { socket } from "@/socket";
import { useAccountStore } from "@/stores/account";

import { useGeneralStore } from "@/stores/general";

export default class AccountManager {
    static async createAccount(password: string) {
        const generalStore = useGeneralStore();
        const accountStore = useAccountStore();

        if(socket.connected != true) {
            generalStore.showLoginError = true;
            return false;
        }

        generalStore.loading = true;

        router.push('/loading');

        let result: any = await new Promise((resolve) => {
            socket.on("createAccount", (data) => {
                socket.off('createAccount');

                setTimeout(() => {
                    resolve(data);
                }, 500);
            });
    
            socket.emit('createAccount', {
                name: accountStore.name,
                password: password,
                avatarid: accountStore.avatarid,
            });

            setTimeout(() => {
                resolve(false);
            }, 5000); // Set 5000
        });

        generalStore.loading = false;

        if(result.succes == true) {
            accountStore.loggedIn = true;
            accountStore.sessionid = result.sessionid;

            /* Set default values */
            accountStore.joinDate = Date.now();
            accountStore.lastlogin = Date.now();

            accountStore.freshDataLoaded = true;

            router.push("/");
        } else {
            generalStore.showUnavailableName = true;

            if(generalStore.showMobile) router.replace("/create-account");
            else router.replace("/settings/account/create");
        }
    }

    static async login(password: string) {
        const generalStore = useGeneralStore();
        const accountStore = useAccountStore();

        if(socket.connected != true) {
            generalStore.showLoginError = true;
            return false;
        }

        generalStore.loading = true;

        router.push('/loading');

        let result: any = await new Promise((resolve) => {
            socket.on("login", (data) => {
                socket.off('login');
                resolve(data);
            });
    
            socket.emit('login', {
                name: accountStore.name,
                password: password,
            });

            setTimeout(() => {
                resolve(false);
            }, 5000); // Set 5000
        });

        generalStore.loading = false;

        if(result.succes == true) {
            accountStore.loggedIn = true;
            accountStore.sessionid = result.sessionid;

            accountStore.loadAccountData(result.data);

            router.push("/");
        } else {
            generalStore.showPasswordError = true;
            router.replace("/login");
        }
    }
}