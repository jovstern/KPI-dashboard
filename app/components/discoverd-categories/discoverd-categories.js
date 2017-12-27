import React from 'react';
import PropTypes from 'prop-types';

import Chart from './bar-chart';

export default class DiscoverCategories extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let { renderTo, data, todayTrends } = this.props;
        this.chart = Chart(renderTo, data, todayTrends);

    }

    render() {
        let { renderTo } = this.props;
        return (
            <div className="discovered-categories-container">
                <div id={ renderTo } className="chart" />
            </div>
        )
    }
}

DiscoverCategories.propTypes = {
    renderTo: PropTypes.string,
    data: PropTypes.array,
    todayTrends: PropTypes.number,
};