import React, {Component} from 'react';

class Boil extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const boil = <div>Boil</div>;
        const notBoil = <div>Not Boil</div>;
        return (
            <div>{this.props.celsius >= 100 ? boil : notBoil}</div>
        );
    }
}

export default Boil;
