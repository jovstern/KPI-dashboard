import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {DateNoTime, DateAndTime} from '../constans/dates';
import {getCampaigns, getTotalCampaigns, getCampaignsImpressionOrSpent, getYoutubeCampaignsFromFirebase} from '../data';

import {MOCK} from '../mock';
import SpentData from '../classes/SpentData'
import ImpressionData from '../classes/ImpressionData'
import CampaignData from '../classes/CampaignData'
// import * as firebase from 'firebase';

import Type from '../components/type/type';
import Campaigns from '../components/campaigns-new-design/campaigns';
// import Campaigns from '../components/campaigns-test/campaigns';
import Impressions from '../components/impressions/impressions';
import Spent from '../components/spent/spent';
import Loader from '../components/Loader';


export default class Managed extends Component {

    constructor(props) {
        super(props);

        this.refreshInt = 0;

        this.state = {
            mockState: true,

            youtubeCampaigns: null,
            youtubeCampaignsLoader: true,
            gdnCampaigns: null,
            gdnCampaignsLoader: true,

            youtubeImpression: null,
            youtubeImpressionLoader: true,
            gdnImpression: null,
            gdnImpressionLoader: true,

            youtubeSpent: null,
            youtubeSpentLoader: true,
            gdnSpent: null,
            gdnSpentLoader: true,

            dayOfYear: DateAndTime.getDayOfYear(),
        };
    }

    componentDidMount() {
        this.getData();
    }

    componentWillUpdate(newProps) {
        if (newProps.refreshInt !== this.refreshInt) {
            this.getData();
            this.refreshInt = newProps.refreshInt
        }
    }

    getYoutubeCampaigns() {
        this.setState({youtubeCampaignsLoader: true});

        if (this.state.mockState) {
            setTimeout(() => {
                let data = new CampaignData(MOCK.youtubeCampaigns);

                this.setState({
                    youtubeCampaigns: {
                        today: data.today,
                        ytd: data.ytd,
                        total: data.total,
                        average: data.average,
                        dayOfYear: data.dayOfYear,
                    }
                });
                this.setState({youtubeCampaignsLoader: false});
            }, 1000);
        } else {
            Promise.all([
                getCampaigns(DateNoTime.todayDate(), DateNoTime.todayDate(), 'youtube'),
                getCampaigns(DateNoTime.startOfYearDate(), DateNoTime.todayDate(), 'youtube'),
                getTotalCampaigns(DateNoTime.startOfYearDate(), DateNoTime.todayDate(), 'youtube'),
            ]).then((response) => {
                if (response && response[0] && response[1] && response[2]) {
                    let data = new CampaignData(response);

                    this.setState({
                        youtubeCampaigns: {
                            today: data.today,
                            ytd: data.ytd,
                            total: data.total,
                            average: data.average,
                            dayOfYear: data.dayOfYear,
                            lie: data.lieInNumber
                        }
                    });
                    this.setState({youtubeCampaignsLoader: false});
                }
            })
        }
    }

    getGdnCampaigns() {
        this.setState({gdnCampaignsLoader: true});


        if (this.state.mockState) {
            setTimeout(() => {
                let data = new CampaignData(MOCK.gdnCampaigns);

                this.setState({
                    gdnCampaigns: {
                        today: data.today,
                        ytd: data.ytd,
                        total: data.total,
                        average: data.average,
                        dayOfYear: data.dayOfYear
                    }
                });
                this.setState({gdnCampaignsLoader: false});
            }, 700);
        } else {
            Promise.all([
                getCampaigns(DateNoTime.todayDate(), DateNoTime.todayDate(), 'gdn'),
                getCampaigns(DateNoTime.startOfYearDate(), DateNoTime.todayDate(), 'gdn'),
                getTotalCampaigns(DateNoTime.startOfYearDate(), DateNoTime.todayDate(), 'gdn'),
            ]).then((response) => {
                if (response && response[0] && response[1] && response[2]) {

                    let data = new CampaignData(response);

                    this.setState({
                        gdnCampaigns: {
                            today: data.today,
                            ytd: data.ytd,
                            total: data.total,
                            average: data.average,
                            dayOfYear: data.dayOfYear,
                            lie: data.lieInNumber
                        }
                    });
                    this.setState({gdnCampaignsLoader: false});
                }
            })
        }
    }

    getYoutubeImpression() {
        this.setState({youtubeImpressionLoader: true});

        let runData = (dataProvider) => {
            let data = new ImpressionData(dataProvider);

            this.setState({youtubeImpression: data});
            this.setState({youtubeImpressionLoader: false});
        };

        if (this.state.mockState) {
            setTimeout(() => {
                runData(MOCK.youtubeImpression)
            }, 1100)
        }
        else {
            getCampaignsImpressionOrSpent(DateNoTime.startOfYearDate(), DateNoTime.todayDate(), "youtube", 'impressions')
                .then(response => {
                    if (response && response.length) {
                        runData(response)
                    }
                });
        }

    };

    getGdnImpression() {
        this.setState({gdnImpressionLoader: true});

        let runData = (dataProvider) => {
            let data = new ImpressionData(dataProvider);

            this.setState({gdnImpression: data});
            this.setState({gdnImpressionLoader: false});
        };

        if (this.state.mockState) {
            setTimeout(() => {
                runData(MOCK.gdnImpression)
            }, 1300)
        }
        else {
            getCampaignsImpressionOrSpent(DateNoTime.startOfYearDate(), DateNoTime.todayDate(), "gdn", 'impressions')
                .then(response => {
                    if (response && response.length) {
                        runData(response)
                    }
                });
        }
    };

    getYoutubeSpent() {
        this.setState({youtubeSpentLoader: true});

        let runData = (dataProvider) => {
            let data = new SpentData(dataProvider);
            this.setState({youtubeSpent: data});
            this.setState({youtubeSpentLoader: false});
        };

        if (this.state.mockState) {
            runData(MOCK.youtubeSpent);
        }
        else {
            getCampaignsImpressionOrSpent(DateNoTime.startOfYearDate(), DateNoTime.todayDate(), "youtube", 'spent')
                .then(response => {
                    if (response && response.length) {
                        runData(MOCK.response);
                    }
                });
        }
    };

    getGdnSpent() {
        this.setState({gdnSpentLoader: true});

        let runData = (dataProvider) => {
            let data = new SpentData(dataProvider);
            this.setState({gdnSpent: data});
            this.setState({gdnSpentLoader: false});
        };

        if (this.state.mockState) {
            setTimeout(() => {
                runData(MOCK.gdnSpent)
            }, 999);
        }
        else {
            getCampaignsImpressionOrSpent(DateNoTime.startOfYearDate(), DateNoTime.todayDate(), "gdn", 'spent')
                .then(response => {
                    if (response && response.length) {
                        runData(response);
                    }
                });
        }
    }

    getData() {
        this.getGdnCampaigns();
        this.getYoutubeCampaigns();
        this.getYoutubeImpression();
        this.getGdnImpression();
        this.getYoutubeSpent();
        this.getGdnSpent();

        this.setState({dayOfYear: DateAndTime.getDayOfYear()})
    }

    render() {
        let {
            youtubeImpression, youtubeImpressionLoader, gdnImpression, gdnImpressionLoader,
            youtubeSpent, gdnSpent, youtubeSpentLoader, gdnSpentLoader, gdnCampaigns, gdnCampaignsLoader,
            youtubeCampaigns, youtubeCampaignsLoader
        } = this.state;

        return (
            <div className="col-sm">

                <header className="row-sm">
                    <div className="col-sm">
                        <div className="component-container no-border light-bg">
                            <div className="title">
                                <h2>Managed</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="component-container no-border light-bg">
                            <div className="title">
                                <h2>Campaigns</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="component-container no-border light-bg">
                            <div className="title">
                                <h2 >Impressions</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="component-container no-border light-bg">
                            <div className="title">
                                <h2 >Media Spent</h2>
                            </div>
                        </div>
                    </div>
                </header>

                <section className="row-md">
                    <div className="col-sm">
                        <div className="component-container light-bg">
                            <Type source={require('../assets/you-tube-logo.png')}/>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="component-container light-bg">
                            { youtubeCampaignsLoader ?
                                <Loader />
                                :
                                <Campaigns ytd={ youtubeCampaigns.ytd }
                                           today={ youtubeCampaigns.today }
                                           total={ youtubeCampaigns.total }
                                           average={ youtubeCampaigns.average }
                                           color={'#D25211'}/>
                            }
                        </div>
                    </div>

                    <div className="col-md">
                        <div className="component-container light-bg">
                            { youtubeImpressionLoader ?
                                <Loader />
                                :
                                <Impressions data={youtubeImpression}
                                             color={"#D25211"}
                                             renderTo={'youTubeImpressionsChart'}/>
                            }
                        </div>
                    </div>

                    <div className="col-sm">
                        <div className="component-container light-bg">
                            { youtubeSpentLoader ?
                                <Loader />
                                :
                                <Spent data={youtubeSpent} color={'#D25211'}/>
                            }
                        </div>
                    </div>
                </section>

                <section className="row-md">
                    <div className="col-sm">
                        <div className="component-container light-bg">
                            <Type source={require('../assets/ad-words-logo.png')}/>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="component-container light-bg">
                            { gdnCampaignsLoader ?
                                <Loader />
                                :
                                <Campaigns ytd={ gdnCampaigns.ytd }
                                           today={ gdnCampaigns.today }
                                           total={ gdnCampaigns.total }
                                           average={ gdnCampaigns.average }
                                           lie={ gdnCampaigns.lie }
                                           color={'#2A82B8'}/>
                            }
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="component-container light-bg">
                            { gdnImpressionLoader ?
                                <Loader />
                                :
                                <Impressions data={gdnImpression}
                                             color={"#2A82B8"}
                                             renderTo={'gdn'}/>
                            }
                        </div>
                    </div>
                    <div className="col-sm ">
                        <div className="component-container light-bg">
                            { gdnSpentLoader ?
                                <Loader />
                                :
                                <Spent data={gdnSpent} color={'#2A82B8'}/>
                            }
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}


Managed.propTypes = {
    refreshInt: PropTypes.number
};