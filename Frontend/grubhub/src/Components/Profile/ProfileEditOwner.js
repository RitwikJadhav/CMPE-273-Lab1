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
    height : '1050px',
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
    height: '890px',
    marginTop : '36px',
    width : '450px',
    marginLeft : '550px'
}

const divStyle = {
    fontFamily : 'graphik',
    fontSize : '16px',
    fontWeight : '400',
    marginLeft : '63px',
    color : 'grey',
    width: '260px'
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
    marginLeft : '62px'
}

const buttonStyle = {
    marginLeft : '180px',
    marginTop : '3px'
}

class ProfileEditOwner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FirstName : "",
            LastName : "",
            Email : "",
            PhoneNumber : "",
            RestaurantName : "",
            RestaurantZipCode : "",
            Cuisine : ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentDidMount = () => {
        console.log('Inside profile edit componentDidMount');
        var getLocalString = localStorage.getItem('Email')
        axios.get(`http://localhost:3001/profileOwnerEdit/${getLocalString}`)
        .then((response) => {
            console.log(response.data[0].PhoneNumber);
            this.setState({
                FirstName : response.data[0].FirstName,
                LastName : response.data[0].LastName,
                Email : response.data[0].Email,
                PhoneNumber : response.data[0].PhoneNumber,
                RestaurantName : response.data[0].RestaurantName,
                RestaurantZipCode : response.data[0].RestaurantZipCode,
                Cuisine : response.data[0].Cuisine
            });
            //document.getElementById('LastNameDiv').innerHTML = response.data[0].LastName;
            //document.getElementById('EmailDiv').innerHTML = response.data[0].Email;
            //document.getElementById('PhoneNumberDiv').innerHTML = response.data[0].PhoneNumber;

        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })  
    }

    onUpdate = (e) => {
        console.log('Inside the update post method');
        const data = {
            FirstName : this.state.FirstName,
            LastName : this.state.LastName,
            Email : this.state.Email,
            PhoneNumber : this.state.PhoneNumber,
            RestaurantName : this.state.RestaurantName,
            RestaurantZipCode : this.state.RestaurantZipCode,
            Cuisine : this.state.Cuisine
        }
        console.log(data);
        axios.post("http://localhost:3001/profileOwnerEditUpdate",data)
        .then(response => {
            console.log(response.status);
            console.log(response.data);
            this.props.history.push('/profileOwner/:id');
        })
        .catch(error => {
            console.log(error)
        });
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
                    <div className = "container" style = {containerClass}>
                        <p style = {pStyle}><b>Your account</b></p>
                        <hr/>
                        <label for = "FirstName" style = {labelStyle}>Firstname</label>
                        <input type = "text" className = "form-control" name="FirstName" onChange = {this.handleChange} style = {divStyle}  defaultValue = {this.state.FirstName}></input>
                        <hr/>
                        <label for = "LastName" style = {labelStyle}>Lastname</label>
                        <input type = "text" className = "form-control" name="LastName" onChange = {this.handleChange} style = {divStyle} value = {this.state.LastName}></input>
                        <hr/>
                        <label for = "PhoneNumber" style = {labelStyle}>Phone-number</label>
                        <input type = "text" className = "form-control" name="PhoneNumber" onChange = {this.handleChange} style = {divStyle} value = {this.state.PhoneNumber}></input>
                        <hr/>
                        <label for = "Email" style = {labelStyle}>Email</label>
                        <br/>
                        <input type = "text" className = "form-control" name="Email" onChange = {this.handleChange} style = {divStyle} value = {this.state.Email}></input>
                        <hr/>
                        <label for = "RestaurantName" style = {labelStyle}>Restaurant Name</label>
                        <input type = "text" className = "form-control" name="RestaurantName" onChange = {this.handleChange} style = {divStyle} value = {this.state.RestaurantName}></input>
                        <hr/>
                        <label for = "RestaurantZipCode" style = {labelStyle}>Restaurant Zip Code</label>
                        <input type = "text" className = "form-control" name="RestaurantZipCode" onChange = {this.handleChange} style = {divStyle} value = {this.state.RestaurantZipCode}></input>
                        <hr/>
                        <label for = "Cuisine" style = {labelStyle}>Cuisine</label>
                        <br/>
                        <input type = "text" className = "form-control" name="Cuisine" onChange = {this.handleChange} style = {divStyle} value = {this.state.Cuisine}></input>
                        <hr/>
                        <button class = "btn btn-outline-danger" style = {buttonStyle} onClick = {this.onUpdate}>Save</button>
                    </div>  
                </div>
            </div>
        )
    }
}

export default ProfileEditOwner;