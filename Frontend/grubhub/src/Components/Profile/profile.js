import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import Upload from './UploadImage';


const bodyStyle = {
    backgroundColor : '#EBEBED',
    height : '750px',
    fontFamily : 'graphik',
    fontSize : '16px'
};

const imageStyle = {
    width: '100px',
    height: '100px',
    marginTop: '5px'
}

const navStyle = {
    height : '60px'
};

const containerClass = {
    backgroundColor : '#FEFEFE',
    height: '560px',
    marginTop : '-366px',
    width : '450px',
    marginLeft : '550px'
}

const divStyle = {
    fontFamily : 'graphik',
    fontSize : '16px',
    fontWeight : '400',
    marginLeft : '63px',
    color : 'grey'
}


const pStyle = {
    fontFamily : 'graphik',
    fontSize : '22px',
    fontWeight : '900',
    marginLeft : '13px',
    paddingTop : '10px'
}

const labelStyle = {
    fontFamily : 'graphik',
    fontSize : '19px',
    marginLeft : '53px'
}

const buttonStyle = {
    marginLeft : '180px',
    marginTop : '3px',
}

const linkStyle = {
    color : '#FC8C8C'
}

const containerLeftClass = {
    marginLeft : '10px',
    backgroundColor : '#FEFEFE',
    width : '300px',
    height : '300px',
    marginTop : '100px',
    marginLeft : '50px'
}

class profile extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount = () => {
        console.log('Inside componentDidMount');
        var getLocalString = localStorage.getItem('Email')
        axios.get(`http://localhost:3001/profile/${getLocalString}`)
        .then((response) => {
            console.log(response.data);
            document.getElementById('FirstNameDiv').innerHTML = response.data[0].FirstName;
            document.getElementById('LastNameDiv').innerHTML = response.data[0].LastName;
            document.getElementById('EmailDiv').innerHTML = response.data[0].Email;
            document.getElementById('PhoneNumberDiv').innerHTML = response.data[0].PhoneNumber;

        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })  
    }

    render() {
        return (
            <div>
                <div style = {bodyStyle}>
                    <nav className = "navbar navbar-expand-lg navbar-light bg-light" style = {navStyle} >
                        <a class="navbar-brand" href="#">
                            <img src = {Logo} style={imageStyle} alt="Grubhub"/>
                        </a>
                    </nav> 
                    <div className = "containerLeft" style = {containerLeftClass}>
                        <Upload />
                    </div>
                    <div className = "container" style = {containerClass}>
                        <p style = {pStyle}><b>Your account</b></p>
                        <hr/>
                        <label for = "FirstName" style = {labelStyle}>Firstname</label>
                        <div id = "FirstNameDiv" onChange = {this.handleChange} style = {divStyle}></div>
                        <hr/>
                        <label for = "LastName" style = {labelStyle}>Lastname</label>
                        <div id = "LastNameDiv" onChange = {this.handleChange} style = {divStyle}></div>
                        <hr/>
                        <label for = "Email" style = {labelStyle}>Email</label>
                        <div id = "EmailDiv" onChange = {this.handleChange} style = {divStyle}></div>
                        <hr/>
                        <label for = "PhoneNumber" style = {labelStyle}>Phone-number</label>
                        <div id = "PhoneNumberDiv" onChange = {this.handleChange} style = {divStyle}></div>
                        <hr/>
                        <button class = "btn btn-outline-danger" style = {buttonStyle}><Link to = '/ProfileEdit/:id' style = {linkStyle}>Edit</Link></button>
                    </div>  
                </div>
            </div>
        )
    }
}

export default profile;