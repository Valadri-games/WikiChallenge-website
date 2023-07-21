import { useAccountStore } from "@/stores/account";
import { useGeneralStore } from "@/stores/general";

export default class Utils {
    static randomInt(min: number, max: number) {
        return Math.trunc(Math.random() * (max - min + 1)) + min;
    }

    static convertMsToTime(milliseconds: number) {
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);

        seconds = seconds % 60;
        minutes = minutes % 60;

        return `${Utils.padTo2Digits(minutes)}:${Utils.padTo2Digits(seconds)}`;
    }

    static convertMsToDuration(milliseconds: number) {
        let minutes = Math.floor(milliseconds / 1000 / 60);
        let hours = Math.floor(minutes / 60);

        minutes = minutes % 60;
        hours = hours;

        return `${hours}h${Utils.padTo2Digits(minutes)}`;
    }

    static padTo2Digits(num: number) {
        // @ts-ignore
        return num.toString().padStart(2, '0');
    }

    static calcGameTime(gamePauses: Array<number>) {
        let total = 0;

        for(let i = 0; i < gamePauses.length; i+= 2) {
            total += gamePauses[i + 1] - gamePauses[i];
        }

        return total;
    }

    static isUserMobile() {
        return (document.documentElement.clientWidth < 850 ? true : false);
    }

    static regenerateAvatar() {
        let generalStore = useGeneralStore();
        let accountStore = useAccountStore();

        if(accountStore.avatarid < generalStore.avatarCount) accountStore.avatarid += 1;
        else accountStore.avatarid = 1;
    }

    static scrollToBottom() {
        //@ts-ignore
        document.getElementById('app').firstElementChild.scroll({
            top: 1000,
            left: 0,
            behavior: 'smooth'
        }); 
    }

    static getMonths() {
        return ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin","Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    }

    static getDateText(date: number, getDay: boolean = false) {
        let fullDate = new Date(date);
        
        let month = fullDate.getMonth();
        let year = fullDate.getFullYear();
        let day = fullDate.getDate();

        return (getDay == true ? day + " " : "") + Utils.getMonths()[month] + " " + year;
    }

    static getTimeToTomorrow() {
        let now = new Date();
        let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

        return tomorrow.getTime() - now.getTime();
    }
}