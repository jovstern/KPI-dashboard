import React from 'react';
import PropTypes from 'prop-types';
import Chart from './column-chart';


export default class Impressions extends React.Component {

    componentDidMount() {
        let { renderTo, apnData, ttdData } = this.props;
        this.chart = Chart(renderTo, ttdData, apnData);
    }

    render() {
        let { renderTo } = this.props;
        return (
            <div className="programmatic-impressions">
                <div id={ renderTo } className="chart" />
            </div>
        )
    }
}

Impressions.propTypes = {
    apnData: PropTypes.array,
    ttdData: PropTypes.array,
    renderTo: PropTypes.string
};