import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {DateAndTime} from '../constans/dates';
import {topCategories, getActiveTrends, getTodayTrends} from '../data';

import DiscoverCategories from '../components/discoverd-categories/discoverd-categories';
import ActiveTrends from '../components/active-trends/active-trends';

import Loader from '../components/Loader'

import {MOCK} from '../mock';


export default class Trends extends Component {
    constructor(props) {
        super(props);

        this.refreshInt = 0;

        this.state = {
            mockState: true,

            categories: null,
            todayTrends: null,
            activeTrends: null,

            categoriesLoader: true,
            todayTrendsLoader: true,
            activeTrendsLoader: true
        }
    };

    componentDidMount() {
        this.getData();
    }

    componentWillUpdate(newProps) {
        if (newProps.refreshInt !== this.refreshInt) {
            this.getData();
            this.refreshInt = newProps.refreshInt
        }
    }

    getTopCategories() {
        this.setState({categoriesLoader: true});

        if (this.state.mockState) {

            setTimeout(() => {
                let data = MOCK.topCategories;
                this.setState({categories: data});
                this.setState({categoriesLoader: false});
            }, 1350)
        } else {
            topCategories(DateAndTime.todayDate(), DateAndTime.tommorowDate()).then(response => {
                if (response && response.length) {
                    this.setState({categories: response});
                    this.setState({categoriesLoader: false});
                }
            });
        }

    };

    getActiveTrends() {
        this.setState({activeTrendsLoader: true});

        if (this.state.mockState) {
            let data = MOCK.trends.active;

            this.setState({activeTrends: data});
            this.setState({activeTrendsLoader: false});

        } else {
            getActiveTrends(DateAndTime.dayBeforeYesterday(), DateAndTime.dayBeforeYesterday()).then(response => {
                if (response != null || response != undefined) {
                    this.setState({activeTrends: response});
                    this.setState({activeTrendsLoader: false});
                }
            });
        }
    };

    getTodayTrends() {
        this.setState({todayTrendsLoader: true});

        if (this.state.mockState) {
            let data = MOCK.trends.today;

            this.setState({todayTrends: data});
            this.setState({todayTrendsLoader: false});
        } else {
            getTodayTrends(DateAndTime.todayDate(), DateAndTime.tommorowDate()).then(response => {
                if (response != null || response != undefined) {
                    this.setState({todayTrends: response});
                    this.setState({todayTrendsLoader: false});
                }
            });
        }
    };

    getData() {
        this.getTopCategories();
        this.getActiveTrends();
        this.getTodayTrends();
    }

    render() {
        let {categories, todayTrends, activeTrends, categoriesLoader, todayTrendsLoader, activeTrendsLoader} = this.state;

        return (
            <div className="col-sm">

                <header className="row-sm">
                    <div className="component-container no-border light-bg">
                        <div className="title">
                            <h2>Taykey Trends</h2>
                        </div>
                    </div>
                </header>

                <section className="row-lg">

                    <div className="col-md">
                        <div className="component-container light-bg">
                            <h3 className="sub-title">Top 5 categories discovered today</h3>
                            {(categoriesLoader || todayTrendsLoader) ?
                                <Loader/>
                                :
                                <DiscoverCategories renderTo={'discoveredCategoriesChart'}
                                                    data={categories}
                                                    todayTrends={todayTrends}/>
                            }


                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="component-container light-bg">
                            <h3 className="sub-title">Active Trends</h3>
                            {(activeTrendsLoader || todayTrendsLoader) ?
                                <Loader/>
                                :
                                <ActiveTrends activeTrends={activeTrends} todayTrends={todayTrends}/>
                            }
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}


Trends.propTypes = {
    refreshInt: PropTypes.number
};