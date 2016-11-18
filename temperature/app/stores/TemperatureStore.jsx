import Dispatcher from '../dispatcher/Dispatcher';
import {ActionTypes} from '../constants/Constants';
import {EventEmitter} from 'events';

class TemperatureStore extends EventEmitter {
    constructor() {
        super();
        this.EVENT_CHANGE_TEMPERATURE = 'EVENT_CHANGE_TEMPERATURE';
        this.EVENT_CELSIUS = 'EVENT_CELSIUS';
        this.EVENT_FAHRENHEIT = 'EVENT_FAHRENHEIT';
        this._celsius = 0;
        this._fahrenheit = 0;
    }

    setTemperature(data) {
        this._celsius = data.celsius;
        this._fahrenheit = data.fahrenheit;
        this.emitTemperature();
    }

    get celsius() {
        return this._celsius;
    }

    get fahrenheit() {
        return this._fahrenheit;
    }

    emitTemperature() {
        this.emit(this.EVENT_CHANGE_TEMPERATURE);
    }

    onTemperature(callback) {
        this.on(this.EVENT_CHANGE_TEMPERATURE, callback);
    }

    removeTemperatureListener(callback) {
        this.removeListener(this.EVENT_CHANGE_TEMPERATURE, callback);
    }
}

const temperatureStore = new TemperatureStore();
temperatureStore.dispatchToken = Dispatcher.register((action) => {
    switch (action.actionType) {
        case ActionTypes.FAHRENHEIT_TO_CELSIUS:
            temperatureStore.setTemperature(action.data);
            break;
        case ActionTypes.CELSIUS_TO_FAHRENHEIT:
            temperatureStore.setTemperature(action.data);
            break;
    }
});

export {temperatureStore};
