export function abbreviateNumber(value) {
    if (value < 1000) {
        return value
    }
    else if (value >= 1000 && value < 1000000) {
        return (value / 1000).toFixed(2) + "K"
    }
    else if (value >= 1000000 && value < 1000000000) {
        return (value / 1000000).toFixed(2) + "M"
    }
    else if (value >= 1000000000){
        return (value / 1000000000).toFixed(2) + "B"
    }
}

export function numbersWithCommas(value){
    return value > 0 ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
}


export function setAverage(x, y) {
    return (x / y);
}

export function getPercentFrom(x, y) {
    return Math.ceil((x / y) * 100);
}