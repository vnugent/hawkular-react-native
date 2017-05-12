import React, { Component } from 'react';
import { Text } from 'react-native';
import { observer } from 'mobx-react';
import _ from 'lodash';


import store from './model/Store';
import { pedometerSensor } from './sensors/PedometerSensor';

const HAWKULAR_THROTTLE_RATE = 1000;

const HawkularPedometer = observer( class HawkularPedometer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            speed: 0,
            lastSpeed: 0,
        };
        this.pedometer = pedometerSensor(
                            _.throttle(this.getSpeed, 300), 
                            5, 100);
        this.autoReset();
    }

    getSpeed = (v) => {
        if (!store.powerState.get()) {
            return;
        }
        this.setState({
            speed: Math.round(v)
        });

        this.sendToHawkular(v);
    }


    sendToHawkular = _.throttle((speed) => {
        store.getHawkularClient().sendGauge('speed', 
                                    Math.round(speed),
                                    this.sendOkHandler,
                                    this.sendErrorHandler
                                        );       
    }, HAWKULAR_THROTTLE_RATE)


    sendOkHandler = (json) => {
        console.log(json);
    }

    sendErrorHandler = (error) => {
        console.log(error);
    }

    render() {
        const speed = store.powerState.get() ? this.state.speed.toString() : "Sensor is off";

        return (
            <Text style={{fontSize: 82}}>{speed}</Text>
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