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
}