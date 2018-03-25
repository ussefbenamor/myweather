import { Injectable } from "@angular/core";
import { Weather3Hour } from "../../model/weatherHour";

interface Data {
    data: number[]
}

@Injectable()
export class HomeService {

    constructor() {
    }
    getLineData(weatherArray: Weather3Hour[]): Data[] {
        let res = [];
        for (let index = 0; index < weatherArray.length; index++) {
            const element = weatherArray[index];
            res[index]=+element.temp;
        }
        console.log(res)

        return [
            { data: res }
        ];
    }
    getLineIcons(weatherArray: Weather3Hour[]): any {
        let res: Array<string> = [];
        for (let index = 0; index < weatherArray.length; index++) {
            const element = weatherArray[index];
            res[index] = element.symbol;
        }
        return res;
    }
    getLineLabels(weatherArray: Weather3Hour[]): any {
        let res: Array<string> = [];
        for (let index = 0; index < weatherArray.length; index++) {
            const element = weatherArray[index];
            res[index] = element.hourevent;
            
        }
        console.log(res)
        return res;
    }

    getBarData(): Data[] {
        return [
            { data: [19, 19, 6, 4, 8, -35, 16] }
        ];
    }

    getStaticLineData(): Data[] {
        return [
            { data: [19, 19, 6, 4, 8, -35, 16] }
        ];
    }
}