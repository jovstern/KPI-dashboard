import {setAverage} from '../filters/filters';

export default class ImpressionData{
    constructor (data) {
        this.todayValue = data[data.length - 1].value;
        this.YTDValue = setSum(data);
        this.average = setAverage(this.YTDValue, data.length);
        this.array = data;
    }
}

function setSum(data){
    let sum = 0;

    data.map(item => {
        sum += item.value;
    });
    return sum;
}