import React from 'react';
import PropTypes from 'prop-types';

import { abbreviateNumber } from '../../filters/filters';
import Chart from './area-chart';


export default class Impressions extends React.Component {

    componentDidMount() {
        let { renderTo, data, color} = this.props;

        this.chart = Chart(renderTo, data.array, color, data.average);
    }

    render() {
        let { renderTo, data } = this.props;
        return (
                <div className="impressions-container">
                    {/*<div className="numbers-container">*/}
                        {/*<div className="number-wrapper">*/}
                            {/*<h1>{ abbreviateNumber(data.todayValue) }</h1>*/}
                            {/*<h4>Today</h4>*/}
                        {/*</div>*/}
                        {/*<div className="number-wrapper">*/}
                            {/*<h1> { abbreviateNumber(data.YTDValue) }</h1>*/}
                            {/*<h4>YTD</h4>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    <div id={ renderTo } className="chart" />
                </div>
            )
    }
}

Impressions.propTypes = {
    data: PropTypes.object,
    color: PropTypes.string,
    renderTo: PropTypes.string
};