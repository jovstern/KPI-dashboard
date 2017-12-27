import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {numbersWithCommas} from '../../filters/filters'

export default class ActiveTrends extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showComponent: false
        };

        this.timeout();

        this.style = {
            activeBorder: {
                backgroundImage: []
            }
        }
    }
    
    timeout() {
        setTimeout(() => {
            this.setState({showComponent: true})
        }, 100)
    }


    drawSector(todayTrends, activeTrends) {
        let prec = (todayTrends / activeTrends) * 100;

        if (prec > 100) {
            prec = 100;
        }

        let deg = prec * 3.6;

        if (deg <= 180) {
            this.style.activeBorder.backgroundImage = [
                'linear-gradient(' + (90 + deg) + 'deg, transparent 50%, #d6d6d6 50%),linear-gradient(90deg, #d6d6d6 50%, transparent 50%)'
            ]
        } else {
            this.style.activeBorder.backgroundImage = [
                'linear-gradient(' + (deg - 90) + 'deg, transparent 50%, #335077 50%),linear-gradient(90deg, #d6d6d6 50%, transparent 50%)'
            ]
        }
    }

    makePrec(todayTrends, activeTrends) {

        if (todayTrends !== 0) {
            return Math.round((todayTrends / activeTrends) * 100)
        } else {
            return 0;
        }
    }

    render() {
        let {activeTrends, todayTrends} = this.props;

        this.drawSector(todayTrends, activeTrends);

        return (
            <div className={ "trends-container " + (this.state.showComponent ? "show-component" : null) }>
                <div className="circle-container">
                    <div id="activeBorder" className="active-border" style={this.style.activeBorder}>
                        <div id="circle" className="circle">
                            <h1 className="prec">{this.makePrec(todayTrends, activeTrends)}%</h1>
                        </div>
                    </div>
                </div>
                
                <div className="numbers-container">
                    <h5>Started today:<b> { numbersWithCommas(todayTrends) }</b></h5>
                    <h5>Active trends:<b> { numbersWithCommas(activeTrends) }</b></h5>
                </div>
            </div>
        )
    }
}

ActiveTrends.propTypes = {
    todayTrends: PropTypes.number,
    activeTrends: PropTypes.number,
};