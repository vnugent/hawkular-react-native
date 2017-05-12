import {observable, action, useStrict, computed, toJS} from 'mobx';

import Hawkular from '../hawkular/Hawkular'
import BasicAuth from './BasicAuth';

useStrict(true);

class Store {
    constructor() {
        this.powerState = observable.box(false);
        this.hawkular_status = observable({
            version: null,
            gitSHA1: null,
            request_completed: false,
        });

        this.basicAuth = new BasicAuth({
            username: 'jdoe',
            password: 'password'
        });
        this.hawkular = new Hawkular("https://livingontheedge.hawkular.org", this.basicAuth);
    }


    togglePower = action((currentState) => {
        this.powerState.set(currentState);
    })


    getHawkularClient = () => (this.hawkular)


    getHawkularStatusAction = () => {
        this.hawkular.getStatus(action((json) => {
            // setting each property individually so that mobx is aware 
            // they may be a better way to set them all at once and still
            // trigger re-rendering
            this.hawkular_status.version = json['Implementation-Version'];
            this.hawkular_status.gitSHA1 = json['Built-From-Git-SHA1'];
            this.hawkular_status.request_completed = true;
            console.log("Hawkular status", this.hawkular_status);
        }))
    }


    resetHawkularStatusAction = action(() => {
        this.hawkular_status.request_completed = false;
    })




}

const store = new Store();

export default store;