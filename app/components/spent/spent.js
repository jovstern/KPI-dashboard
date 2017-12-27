import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { abbreviateNumber } from '../../filters/filters';
import { centTodollar } from '../../filters/filters';

export default class Spent extends Component{
    constructor(props) {
        super(props);

        this.state = {
            showComponent: false
        };

        this.style = {
            numberWrapper: {
                borderColor: this.props.color
            }
        };

        this.timeout();
    }

    timeout() {
        setTimeout(() => {
            this.setState({showComponent: true})
        }, 100)
    }

    
    render(){
        let { data } = this.props;

        return(
            <div className={'spent-container ' + (this.state.showComponent ? 'show-component' : null)}>
                <div className="numbers-container">
                    <div className="number-wrapper" style={this.style.numberWrapper}>
                        <h1>${ abbreviateNumber(data.todayValue/100) }</h1>
                        <h4>Today</h4>
                    </div>
                    <div className="number-wrapper">
                        <h1>${ abbreviateNumber(data.YTDValue/100) }</h1>
                        <h4>YTD</h4>
                    </div>
                </div>
            </div>
        )
    }
}

Spent.propTypes = {
    data: PropTypes.object,
    color:PropTypes.string
};