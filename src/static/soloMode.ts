import router from "@/router/router";

import { socket } from "@/socket";

import { useGeneralStore } from "@/stores/general";
import { useSoloModeStore } from "@/stores/soloMode";

export default class SoloMode {
    static async generateRandomPath(): Promise<void> {
        const soloModeStore = useSoloModeStore();

        if(socket.connected != true) {
            soloModeStore.showError = true;
            return router.go(-1);
        }

        const generalStore = useGeneralStore();
        generalStore.loading = true;

        router.push('/loading');

        let result = await SoloMode.getStartPage();
        if(result == false) {
            soloModeStore.showError = true;
            return router.go(-1);
        }

        result = await SoloMode.getEndPage();
        if(result == false) {
            soloModeStore.showError = true;
            return router.go(-1);
        }

        generalStore.loading = false;
        router.replace('/solo/lobby');
    }

    static async playDailyChallenge(): Promise<any> {
        const soloModeStore = useSoloModeStore();

        if(socket.connected != true) {
            soloModeStore.showError = true;
            return router.go(-1);
        }

        const generalStore = useGeneralStore();
        generalStore.loading = true;

        router.push('/loading');

        soloModeStore.gameMode = 5;

        let result = await SoloMode.getDailyChallengePage();
        if(result == false) {
            soloModeStore.showError = true;
            return router.replace("/solo");
        }

        generalStore.loading = false;
        router.replace('/solo/lobby');
    }

    static async getStartPage(): Promise<boolean> {
        const soloModeStore = useSoloModeStore();

        return new Promise((resolve) => {
            let timeoutId = setTimeout(() => {
                socket.off('getStartPage');
                resolve(false);
            }, 5000); // Set 5000

            socket.on("getStartPage", (data) => {
                clearTimeout(timeoutId);
                socket.off('getStartPage');

                if(data == false || data == "false")  return resolve(false);

                soloModeStore.startPage = data.title;
                soloModeStore.currentPage = data.title;

                resolve(true);
            });
    
            socket.emit('getStartPage', SoloMode.generateDifficultyLevel(soloModeStore));
        });
    }

    static async getEndPage(): Promise<boolean> {
        const soloModeStore = useSoloModeStore();

        return new Promise((resolve) => {
            let timeoutId =  setTimeout(() => {
                socket.off('getEndPage');
                resolve(false);
            }, 5000); // Set 5000

            socket.on("getEndPage", async (data) => {
                clearTimeout(timeoutId);
                socket.off('getEndPage');

                if(data == false || data == "false") return resolve(false);

                let endPageSummary = await SoloMode.getEndPageSummary(data.title);
                if(endPageSummary == false) return resolve(false);

                soloModeStore.endPage = data.title;
                soloModeStore.endPageSummary = endPageSummary;

                resolve(true);
            });
    
            socket.emit('getEndPage', SoloMode.generateDifficultyLevel(soloModeStore));
        });
    }

    static async getDailyChallengePage(): Promise<boolean> {
        const soloModeStore = useSoloModeStore();

        return new Promise((resolve) => {
            let timeoutId =  setTimeout(() => {
                socket.off('getDailyChallenge');
                resolve(false);
            }, 5000); // Set 5000

            socket.on("getDailyChallenge", async (data) => {
                clearTimeout(timeoutId);
                socket.off('getDailyChallenge');

                if(data == false || data == "false") return resolve(false);

                let endPageSummary = await SoloMode.getEndPageSummary(data.endpage);
                if(endPageSummary == false) return resolve(false);

                soloModeStore.startPage = data.startpage;
                soloModeStore.currentPage = data.startpage;

                soloModeStore.endPage = data.endpage;
                soloModeStore.endPageSummary = endPageSummary;

                resolve(true);
            });
    
            socket.emit('getDailyChallenge', SoloMode.generateDifficultyLevel(soloModeStore));
        });
    }

    static getEndPageSummary(endPageTitle: string): Promise<string | boolean> {
        return new Promise(async (resolve) => {
            let apiUrl = "https://fr.wikipedia.org/w/api.php?action=query&format=json&origin=*&curtimestamp=1&titles=" + endPageTitle + "&redirects=1&prop=extracts&exintro&explaintext&utf8=1&ascii=1&formatversion=2"
            
            const pageTextContent = await fetch(apiUrl).then((data) => {
                return data.json();
            }).then((data) => {
                return SoloMode.parseWikiSummary(data.query.pages[0].extract);
            }).catch(() => {
                return false;
            });

            resolve(pageTextContent);
        });
    }

    static generateDifficultyLevel(soloModeStore: any) {
        let interestLow;
        let interestHigh;
        let difficultyLow;
        let difficultyHigh;

        let level = soloModeStore.gameMode;

        if(level == 1) {
            interestLow = 90;
            interestHigh = 100;
            difficultyLow = 0;
            difficultyHigh = 1;
        }

        if(level == 2) {
            interestLow = 55;
            interestHigh = 100;
            difficultyLow = 1;
            difficultyHigh = 3;
        }

        if(level == 3) {
            interestLow = 35;
            interestHigh = 100;
            difficultyLow = 4;
            difficultyHigh = 7;
        }

        if(level == 4) {
            interestLow = 50;
            interestHigh = 100;
            difficultyLow = 0;
            difficultyHigh = 10;
        }

        return {
            interestLow,
            interestHigh,
            difficultyLow,
            difficultyHigh
        }
    }

    static parseWikiSummary(text: any): any {
        // text.replaceAll("", "");

        return text;
    }
}

interface Test {

}