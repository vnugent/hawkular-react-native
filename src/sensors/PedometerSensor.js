import { Accelerometer } from 'react-native-sensors';
import _ from 'lodash';


const accelerationObservable = new Accelerometer({
  updateInterval: 300, 
});


const pedometerSensor =(fn, minSentivity) => {
    
    var lastSpeed=0;

    accelerationObservable
        .map(({ x, y, z }) => Math.abs(x + y + z))
        .filter(speed => speed >= minSentivity)
        .subscribe(speed => {
            lastSpeed = speed;
            fn(speed);
        });
}


pedometerSensorAutoReset = function (fn, minSentivity, idle) {
    var currentSpeed = 0;
    var lastSpeed = 0;

    getSpeed = function(v) {
        currentSpeed = v;
        lastSpeed = v;
        fn(v);
    }

    setInterval(
        function() {
            if (lastSpeed === currentSpeed) {
                fn(0);
            } else {
                lastSpeed = currentSpeed;
            }
        },
        idle);

    pedometerSensor(getSpeed, minSentivity);
}


module.exports = {
  pedometerSensor: pedometerSensor,
  pedometerSensorAutoReset: pedometerSensorAutoReset
};