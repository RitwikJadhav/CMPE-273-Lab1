import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Button extends Component {
    constructor(props) {
        super(props);
        this.handleButtonAction = this.handleButtonAction.bind(this);
    }

    handleButtonAction = () => {
        this.props.onClickChange(this.props.value);
    }

    render() {
        return(
            <button className = "btn btn-outline-secondary" onClick={this.handleButtonAction}>
                {this.props.value}
            </button>
        );
    }
}

export default Button;