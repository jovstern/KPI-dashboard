import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getPercentFrom} from '../../filters/filters';

export default class Campaigns extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showComponent: false
        };

        this.timeout();
    }

    timeout() {
        setTimeout(() => {
            this.setState({showComponent: true})
        }, 100)
    }

    render() {
        let {today, ytd, average, color} = this.props;

        const style = {
            background: {
                backgroundColor: color
            },
            todayMark: {
                width: getPercentFrom(today, ytd ) + '%',
                backgroundColor: color
            },
            averageMark: {
                width: getPercentFrom(average, ytd) + '%',
                borderColor: color
            },
            averageMarkCover: {
                width: getPercentFrom(average, ytd)  + '%'
            },
            averageText: {
                left: (getPercentFrom(average, ytd) - 12) + '%'
            },
        };

        return (
            <div className={ "campaigns-container " + (this.state.showComponent ? "show-component" : null) }>
                <main>
                    <div className="numbers-container">
                        <div className="number-wrapper">
                            <h1>{ today ? today : 0 }</h1>
                            <h4>Today</h4></div>
                        <div className="number-wrapper">
                            <h1>{ ytd ? ytd : 0 }</h1>
                            <h4>YTD</h4>
                        </div>
                    </div>

                    <div className="slider-widget-wrapper">
                        <div className="background" style={ style.background }/>
                        <div className="average-mark" style={ style.averageMark }/>
                        <div className="average-mark-cover" style={ style.averageMarkCover }/>
                        <p className="average-text" style={ style.averageText }>
                            Daily Avg
                        </p>
                        <div className="today-mark" style={ style.todayMark }/>
                    </div>
                </main>
            </div>
        )
    }
}

Campaigns.propTypes = {
    today: PropTypes.number,
    ytd: PropTypes.number,
    total: PropTypes.number,
    average: PropTypes.number,
    lie: PropTypes.number,
    color: PropTypes.string,
};