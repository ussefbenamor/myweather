import { Injectable } from "@angular/core";

interface Data{
    data: number[]
}

@Injectable()
export class HomeService {
    constructor(){
    }
    getLineData(): Data[] {
        return [
            { data: [13, 13, 12, 12, 12, 12, 12] }
        ];
    }
    getBarData(): Data[] {
        return [
            { data: [19, 19, 6, 4, 8, 16, 16] }
        ];
    }
}