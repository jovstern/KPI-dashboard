import {DateAndTime} from '../constans/dates';
import {setAverage} from '../filters/filters';
import {lieInPercent} from '../constans/campaignLiePercent'

export default class CampaignData{
    constructor (data) {
        this.today = data[0];
        this.ytd = data[1];
        this.total = data[2];
        this.dayOfYear = DateAndTime.getDayOfYear();
        this.average =  setAverage(this.total, this.dayOfYear);
    }
}