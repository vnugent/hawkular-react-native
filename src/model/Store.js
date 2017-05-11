import {observable, action, useStrict, computed, toJS} from 'mobx';

import Hawkular from './Hawkular'


useStrict(true);

class Store {
    constructor() {
        this.on = observable.box(false);
        this.hawkular_status = observable({
            version: null,
            gitSHA1: null,
            request_completed: false,
        });

        const basic_auth = {
            username: 'jdoe',
            password: 'password'
        }
        this.hawkular = new Hawkular("https://livingontheedge.hawkular.org", basic_auth);
    }


    toggle = action((currentState) => {
        this.on.set(currentState);
    })


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


    powerState  = computed(() => {
        return toJS(this.on.get());
    })


}

const store = new Store();

export default store;