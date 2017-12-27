import React from 'react';
import PropTypes from 'prop-types'

export default class Title extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let { main, sub} = this.props;

        return (
                <div className="title">
                    <h2 >{main}</h2>
                    <h3>{sub}</h3>
                </div>
        )
    }
}


Title.PropTypes={
  main: PropTypes.string.isRequired,
  sub: PropTypes.string.isRequired
};
