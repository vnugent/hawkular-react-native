import React, { Component } from 'react';
import { H1 } from 'native-base';
import { observer } from 'mobx-react';
import _ from 'lodash';


import store from './model/Store';
import { pedometerSensor } from './sensors/PedometerSensor';


const HawkularPedometer = observer( class HawkularPedometer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            speed: 0,
            lastSpeed: 0,
        };
        this.pedometer = pedometerSensor(_.throttle(this.getSpeed, 300), 5, 100);
        //this.pedometer = new AccelerometerToHawkular(store.getHawkularClient());
        this.autoReset();
    }

    getSpeed = (v) => {
        this.setState({
            speed: Math.round(v)
        })
    }

    render() {
        if (!store.powerState.get()) {
            return null;
        }
        return (
            <H1>Speed: {this.state.speed.toString()}</H1>
            );
    }


    autoReset = () => {
         setInterval(() => {
            if (this.state.lastSpeed === this.state.speed) {
                this.setState({
                    speed: 0
                });
            } else {
                this.setState({
                    lastSpeed: this.state.speed
                });
            }
        }, 3000);
    }

});

export default HawkularPedometer;