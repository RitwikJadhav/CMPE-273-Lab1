import React, { Component } from 'react';
const axios = require("axios");

const imageStyle = {
    width : '200px',
    height : '200px'
}

const buttonStyle = {
    width : '200px',
    marginLeft : '0px',
    marginTop : '55px'
}

const buttonStyle1 = {
    width : '200px'
}

class UploadItemImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
        this.onChange = this.onChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentDidMount() {
        console.log(localStorage.getItem('ItemName'));
        console.log(this.state.image);
    }

    onChange = (e) => {
        this.setState({
            file : e.target.files[0],
            image : this.state.image
        });
        console.log(e.target.files[0])
    }

    onFormSubmit = (e) => {
        console.log('Inside the item image upload');
        e.preventDefault();
        const formData = new FormData();
        console.log(this.state.file);
        formData.append('myImage',this.state.file);
        console.log(formData);
        const configImage = {
            headers : {
                'content-type' : 'multipart/form-data'
            }
        };
        console.log(configImage);
        console.log(this.props.itemName);
        const itemName = this.props.itemName;
        console.log(itemName);
        axios.post(`http://localhost:3001/uploads/${itemName}`,formData,configImage)
        .then((response) => {
            console.log(response);
            alert("The File is successfully uploaded");
        });
    }

    render() {
        return(
            <form onSubmit = {this.onFormSubmit}>
                <input style = {{ display : 'none' }}type = "file" name = "myImage" onChange = {this.onChange} ref = {fileInput => this.fileInput = fileInput}/>
                <button onClick = {() => this.fileInput.click()} className = "btn btn-info" style = {buttonStyle1}>Choose Image</button>
                <button type = "submit" className = "btn btn-primary" style = {buttonStyle}>Upload</button>
            </form>
        )
    }
}


export default UploadItemImage;