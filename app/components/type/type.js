import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Type extends Component{
    constructor(props){
        super(props);
        this.source = this.props.source;
    }
   
    render(){
        return(
            <div className="type-container">
                <img src={this.source} />
            </div>
        )
    }
}

Type.propTypes = {
    source: PropTypes.string
};
