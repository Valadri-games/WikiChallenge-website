import router from "@/router/router";

import { socket } from "@/socket";

import { useGeneralStore } from "@/stores/general";
import { useSoloModeStore } from "@/stores/soloMode";

export default class SoloMode {
    static async generateRandomPath(): Promise<void> {
        const soloModeStore = useSoloModeStore();

        if(socket.connected != true) {
            router.go(-1);
            soloModeStore.showError = true;
        }

        const generalStore = useGeneralStore();
        generalStore.loading = true;

        router.replace('/solo/loading');

        let result = await SoloMode.getStartPage();
        if(result == false) {
            router.go(-1);
            soloModeStore.showError = true;
        }

        result = await SoloMode.getEndPage();
        if(result == false) {
            router.go(-1);
            soloModeStore.showError = true;
        }

        generalStore.loading = false;
        router.replace('/solo/lobby');
    }

    static async getStartPage(): Promise<boolean> {
        const soloModeStore = useSoloModeStore();

        return new Promise((resolve) => {
            socket.on("getStartPage", (data) => {
                soloModeStore.startPage = data.title;
                soloModeStore.currentPage = data.title;

                socket.off('getStartPage');
                resolve(true);
            });
    
            socket.emit('getStartPage', SoloMode.generateDifficultyLevel(soloModeStore));

            setTimeout(() => {
                resolve(false);
            }, 5000); // Set 5000
        });
    }

    static async getEndPage(): Promise<boolean> {
        const soloModeStore = useSoloModeStore();

        return new Promise((resolve) => {
            socket.on("getEndPage", async (data) => {
                let endPageSummary = await SoloMode.getEndPageSummary(data.title);
                if(endPageSummary == false) {
                    router.go(-1);
                    soloModeStore.showError = true;
                }

                soloModeStore.endPage = data.title;
                soloModeStore.endPageSummary = endPageSummary;

                socket.off('getEndPage');
                resolve(true);
            });
    
            socket.emit('getEndPage', SoloMode.generateDifficultyLevel(soloModeStore));

            setTimeout(() => {
                resolve(false);
            }, 5000); // Set 5000
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
            interestLow = 85;
            interestHigh = 100;
            difficultyLow = 0;
            difficultyHigh = 2;
        }

        if(level == 2) {
            interestLow = 60;
            interestHigh = 100;
            difficultyLow = 1;
            difficultyHigh = 3;
        }

        if(level == 3) {
            interestLow = 20;
            interestHigh = 100;
            difficultyLow = 7;
            difficultyHigh = 10;
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