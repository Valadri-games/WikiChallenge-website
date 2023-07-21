import router from "@/router/router";

import { socket } from "@/socket";

import { useAccountStore } from "@/stores/account";
import { useGeneralStore } from "@/stores/general";

export default class AccountManager {
    static async loadDailyChallengeLeaderboard() {
        const generalStore = useGeneralStore();
        const accountStore = useAccountStore();

        if(socket.connected != true) {
            generalStore.showServerError = true;
            return false;
        }

        generalStore.loading = true;

        router.push('/loading');

        let result: any = await new Promise((resolve) => {
            socket.on("getDailyChallengeLeaderboard", (data) => {
                socket.off('getDailyChallengeLeaderboard');

                setTimeout(() => {
                    resolve(data);
                }, 500);
            });
    
            socket.emit('getDailyChallengeLeaderboard', {
                sessionid: accountStore.sessionid,
            });

            setTimeout(() => {
                resolve(false);
            }, 5000); // Set 5000
        });

        generalStore.loading = false;

        if(result.succes == true) {
            generalStore.leaderboardData = result.result;
            router.replace("/leaderboards/daily-challenge");
        } else {
            generalStore.showServerError = true;
            router.replace("/");
        }
    }

    static async loadGeneralLeaderboard() {
        const generalStore = useGeneralStore();
        const accountStore = useAccountStore();

        if(socket.connected != true) {
            generalStore.showServerError = true;
            return false;
        }

        generalStore.loading = true;

        router.push('/loading');

        let result: any = await new Promise((resolve) => {
            socket.on("getGeneralLeaderboard", (data) => {
                socket.off('getGeneralLeaderboard');

                setTimeout(() => {
                    resolve(data);
                }, 500);
            });
    
            socket.emit('getGeneralLeaderboard', {
                sessionid: accountStore.sessionid,
            });

            setTimeout(() => {
                resolve(false);
            }, 5000); // Set 5000
        });

        generalStore.loading = false;

        if(result.succes == true) {
            generalStore.leaderboardData = result.result;
            router.replace("/leaderboards/general");
        } else {
            generalStore.showServerError = true;
            router.replace("/");
        }
    }
}