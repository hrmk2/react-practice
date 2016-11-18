import React, {Component} from 'react';

class TemperatureInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span>
                <input placeholder = "Input value"
                    value = {this.props.value}
                    onChange = {this.props.onChange} />    
            </span>
        );
    }
}

export default TemperatureInput;
