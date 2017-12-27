/**
 * Created by jovstern on 10/05/2017.
 */
import React, {Component} from 'react';
import {minutes} from '../config';
import {DateAndTime} from './constans/dates';
import Managed from './pages/managed';
import Programmatic from './pages/programmatic';
import Trends from './pages/trends';

export default class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            refreshInt: 0,
            lastSync: 0
        };
    }

    componentDidMount() {
        this.updateApp();
        this.interval();
    }

    interval() {
        setInterval(this.updateApp.bind(this), (1000 * 60) * minutes);
    }

    updateApp() {
        this.setState({refreshInt: this.state.refreshInt + 1});
        this.setState({lastSync: DateAndTime.now()});
    }

    render() {
        let {refreshInt, lastSync} = this.state;

        return (
            <main>
                <div className="row-lg " >
                    <Managed refreshInt={refreshInt} />
                </div>

                <div className="row-md " >
                    <Programmatic refreshInt={refreshInt} />
                    <Trends refreshInt={refreshInt} />
                </div>

                <footer className="row-sm">
                    <div className="col-sm ">
                        <div className="component-container">
                            <div className="logo-and-sync">
                                <div className="logo">
                                    <img src={require('./assets/logo.svg')} />
                                </div>

                                <p>Last Sync: <b>{lastSync}</b></p>

                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        );
    }
}