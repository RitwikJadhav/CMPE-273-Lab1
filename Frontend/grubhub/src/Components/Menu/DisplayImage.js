import React, { Component } from 'react';
const axios = require("axios");

const imageStyle = {
    width : '150px',
    height : '150px',
    borderRadius : '5px'
}


class DisplayImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image : `http://localhost:3001/uploads/${this.props.imageName}`
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        console.log(this.props.imageName);
        console.log(this.state.image);
    }

    onChange = (e) => {
        this.setState({
            image : this.state.image
        });
        console.log(this.state.image)
    }

    render() {
        return(
            <form onSubmit = {this.onFormSubmit}>
                <img src = {this.state.image} style = {imageStyle} alt = "not image"/><br/>
            </form>
        )
    }
}


export default DisplayImage;