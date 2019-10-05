import React, { Component } from 'react';
const axios = require("axios");

const imageStyle = {
    width : '300px',
    height : '300px'
}

const buttonStyle = {
    marginLeft : '100px',
    marginTop : '10px'
}

class UploadImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            image : `http://localhost:3001/uploads/${localStorage.getItem('Email')}`
        };
        this.onChange = this.onChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({
            file : e.target.files[0],
            image : this.state.image
        });
        console.log(e.target.files[0])
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage',this.state.file);
        console.log(formData);
        const config = {
            headers : {
                'content-type' : 'multipart/form-data'
            }
        };
        console.log(config);
        axios.post(`http://localhost:3001/uploads/${localStorage.getItem('Email')}`,formData,config)
        .then((response) => {
            alert("The File is successfully uploaded");
        });
    }

    render() {
        return(
            <form onSubmit = {this.onFormSubmit}>
                <img src = {this.state.image} style = {imageStyle} alt = "not image"/><br/>
                <input type = "file" name = "myImage" onChange = {this.onChange} />
                <button type = "submit" className = "btn btn-primary" style = {buttonStyle}>Upload</button>
            </form>
        )
    }
}


export default UploadImage;