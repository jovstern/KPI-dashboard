import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {DateNoTime} from '../constans/dates';
import {getSegmentsStatus, getPlatformsSegments, getURLs} from '../data';

import ProgrammaticImpressions from '../components/programmatic-impressions/programmatic-impressions';
import IconValue from '../components/icon-number/icon-number';

import {MOCK} from '../mock';

import Loader from '../components/Loader';


export default class Programmatic extends Component {
    constructor(props) {
        super(props);

        this.refreshInt = 0;

        this.state = {
            mockState: true,

            activeSegments: null,
            activeSegmentsLoader: true,
            pendingSegments: null,
            pendingSegmentsLoader: true,
            urls: null,
            urlsLoader: true,

            platformsSegments: null,
            platformsSegmentsLoader: true
        }
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

    getActiveSegments() {
        this.setState({activeSegmentsLoader: true});

        if(this.state.mockState){
            setTimeout(() => {
                let data = MOCK.segments.active;

                this.setState({activeSegments: data});
                this.setState({activeSegmentsLoader: false});
            }, 1500);

        }else{
            getSegmentsStatus('active').then(response => {
                if (response >= 0 && response !== null) {
                    this.setState({activeSegments: response});
                    this.setState({activeSegmentsLoader: false});
                }
            });
        }

    }

    getPendingSegments() {
        this.setState({pendingSegmentsLoader: true});

        if(this.state.mockState){
            setTimeout(() => {
                let data = MOCK.segments.pending;

                this.setState({pendingSegments: data});
                this.setState({pendingSegmentsLoader: false});
            }, 1100);

        }else{
            getSegmentsStatus('pending').then(response => {
                if (response >= 0 && response !== null) {
                    this.setState({pendingSegments: response});
                    this.setState({pendingSegmentsLoader: false});
                }

            });
        }
    }

    getURLs() {
        this.setState({urlsLoader: true});

        if(this.state.mockState){
            setTimeout(() => {
                let data = MOCK.segments.urls;

                this.setState({urls: data});
                this.setState({urlsLoader: false})
            }, 1350);

        }else {
            getURLs().then(response => {
                if (response >= 0 && response !== null) {
                    this.setState({urls: response});
                    this.setState({urlsLoader: false});
                }
            });
        }
    }

    getPlatformsSegments() {
        this.setState({platformsSegmentsLoader: true});

        if(this.state.mockState){
            this.setState({
                platformsSegments: {
                    apnSegments: [{date: "01/08/2017", impressions: 678},{date: "02/08/2017", impressions: 321},{date: "03/08/2017", impressions: 423},{date: "04/08/2017", impressions: 710},{date: "05/08/2017", impressions: 312},{date: "06/08/2017", impressions: 455}],
                    ttdSegments: [{date: "01/08/2017", impressions: 540},{date: "02/08/2017", impressions: 400},{date: "03/08/2017", impressions: 128},{date: "04/08/2017", impressions: 212},{date: "05/08/2017", impressions: 555},{date: "06/08/2017", impressions: 645}]
                }
            });
            this.setState({platformsSegmentsLoader: false});
        }else{
            Promise.all([
                getPlatformsSegments(DateNoTime.startOfYearDate(), DateNoTime.todayDate(), 'apn'),
                getPlatformsSegments(DateNoTime.startOfYearDate(), DateNoTime.todayDate(), 'ttd')
            ]).then(response => {
                if (response && response[0] && response[1]) {
                    this.setState({
                        platformsSegments: {
                            apnSegments: response[0],
                            ttdSegments: response[1]
                        }
                    });
                    this.setState({platformsSegmentsLoader: false});
                }

            });
        }

    }

    getData() {
        this.getActiveSegments();
        this.getPendingSegments();
        this.getURLs();
        this.getPlatformsSegments();
    }

    render() {
        let {
            pendingSegments, activeSegments, urls,
            pendingSegmentsLoader, activeSegmentsLoader, urlsLoader,
            platformsSegments, platformsSegmentsLoader
        } = this.state;

        return (
            <div className="col-sm">

                <header className="row-sm">
                    <div className="component-container no-border light-bg">
                        <div className="title">
                            <h2>Programmatic</h2>
                        </div>
                    </div>
                </header>

                <section className="row-md">

                    <div className="col-md">
                        <div className="component-container light-bg">
                            <h3 className="sub-title">Impressions</h3>
                            { platformsSegmentsLoader ?
                                <Loader/>
                                :
                                <ProgrammaticImpressions renderTo={'programmaticImpressions'}
                                                         apnData={platformsSegments.apnSegments}
                                                         ttdData={platformsSegments.ttdSegments}/>
                            }
                        </div>
                    </div>

                    <div className="col-sm">
                        <div className="row-lg">
                            <div className="col-sm " >

                                <div className="component-container light-bg">
                                    <h3 className="sub-title">Active Segments</h3>
                                    { activeSegmentsLoader ?
                                        <Loader/>
                                        :
                                        <IconValue source={require('../assets/lightning.svg')} value={activeSegments}/>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="row-lg">
                            <div className="col-sm " style={{paddingRight: 0}}>

                                <div className="component-container light-bg">
                                    <h3 className="sub-title">Pending Segments</h3>
                                    { pendingSegmentsLoader ?
                                        <Loader/>
                                        :
                                        <IconValue source={require('../assets/hourglass.svg')} value={pendingSegments}/>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="row-lg">
                            <div className="col-sm " style={{paddingRight: 0}}>

                                <div className="component-container light-bg">
                                    <h3 className="sub-title">Live URLs</h3>
                                    { urlsLoader ?
                                        <Loader/>
                                        :
                                        <IconValue source={require('../assets/link.svg')} value={urls}/>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

Programmatic.propTypes = {
    refreshInt: PropTypes.number
};