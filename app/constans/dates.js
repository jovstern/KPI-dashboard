let moment = require('moment-timezone');
const timeZone = moment().tz('America/New_York');


export class DateNoTime {
    static startOfYearDate(){
        return moment().tz('America/New_York').startOf('year').format('YYYY-MM-DD')
    }
    static todayDate(){
        return moment().tz('America/New_York').format('YYYY-MM-DD')
    }
}


export class DateAndTime{
    static now(){
        return moment().tz('America/New_York').format('h:mm A  dddd, D MMMM YYYY')
    }
    static todayDate(){
        return moment().tz('America/New_York').format('YYYY-MM-DDT00:00')
    }
    static tommorowDate(){
        return moment().tz('America/New_York').add(1, 'day').format('YYYY-MM-DDT00:00')
    }
    static dayBeforeYesterday(){
        return moment().tz('America/New_York').subtract(2, 'day').format('YYYY-MM-DDT00:00')
    }
    static startOfYearDate(){
        return moment().tz('America/New_York').startOf('year').format('YYYY-MM-DDT00:00')
    }
    static getDayOfYear(){
        let year = new Date().setFullYear(new Date().getFullYear(), 0, 1);
        let today = Date.now();
        let day = 24 * 60 * 60 * 1000;

        return Math.floor((today - year) / day);
    };
}
