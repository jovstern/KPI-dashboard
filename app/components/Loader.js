/**
 * Created by jovstern on 27/12/2017.
 */
import React, {Component} from 'react';

export default class Loader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="spinner">
                <div className="double-bounce1" />
                <div className="double-bounce2" />
            </div>

        )
    }
}