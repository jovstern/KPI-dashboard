import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {numbersWithCommas} from '../../filters/filters';

export default class IconValue extends Component {
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
        let {source, value} = this.props;

        return (
            <div className={ "icon-value-container " + (this.state.showComponent ? "show-component" : null)} >
                <div className="wrapper">
                    <div className="icon-bg">
                        <img src={ source }/>
                    </div>
                </div>
                <div className="wrapper">
                    <h1>{numbersWithCommas(value)}</h1>
                </div>
            </div>
        )
    }
}

IconValue.propTypes = {
    source: PropTypes.string
};