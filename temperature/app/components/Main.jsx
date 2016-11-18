import React, {Component} from 'react';
import TemperatureInput from './TemperatureInput';
import Boil from './Boil';
import {temperatureAction} from '../actions/TemperatureAction';
import {temperatureStore} from '../stores/TemperatureStore';

class Main extends Component {
    constructor() {
        super();
        this.state = this.updateTemperature();
        this.onTemperature = this.onTemperature.bind(this);
        this.toCelsius = this.toCelsius.bind(this);
        this.toFahrenheit = this.toFahrenheit.bind(this);
    }

    componentDidMount() {
        temperatureStore.onTemperature(this.onTemperature);
    }

    componentWillUnmount() {
        temperatureStore.removeTemperatureListener(this.onTemperature);
    }

    updateTemperature() {
        return {
            celsius: temperatureStore.celsius,
            fahrenheit: temperatureStore.fahrenheit
        };
    }

    onTemperature() {
        this.setState(this.updateTemperature(), () => {
            console.log("temperature updated.", this.state);
        });
    }

    toCelsius(e) {
        temperatureAction.convert({
            type: 'FAHRENHEIT',
            temperature: e.target.value
        });
    }

    toFahrenheit(e) {
        temperatureAction.convert({
            type: 'CELSIUS',
            temperature: e.target.value
        });
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Celsius To Fahrenheit Calculator</h1>
                    Input Celsius: <TemperatureInput value={this.state.celsius} onChange={this.toFahrenheit} /><br/>
                    Input Fahrenheit: <TemperatureInput value={this.state.fahrenheit} onChange={this.toCelsius} />
                    <Boil celsius = {this.state.celsius} />
                </div>
            </div>
        );
    }
}

export default Main;
