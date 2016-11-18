import Dispatcher from '../dispatcher/Dispatcher';
import {ActionTypes} from '../constants/Constants';

const temperatureAction = {
    convert: (data) => {
        if (!data.temperature) return;

        if (data.type === 'CELSIUS') {
            const fahrenheit = (data.temperature * 9 / 5) + 32;
            Dispatcher.dispatch({
                actionType: ActionTypes.CELSIUS_TO_FAHRENHEIT,
                data: {celsius: data.temperature, fahrenheit: fahrenheit}
            });
        } else if (data.type === 'FAHRENHEIT') {
            const celsius = (data.temperature - 32) * 5 / 9;
            Dispatcher.dispatch({
                actionType: ActionTypes.FAHRENHEIT_TO_CELSIUS,
                data: {celsius: celsius, fahrenheit: data.temperature}
            });
        }
    }
};

export {temperatureAction};
