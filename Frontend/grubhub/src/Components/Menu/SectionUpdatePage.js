import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';

const bodyStyle = {
    backgroundColor : '#EBEBED',
    height : '1250px'
};

const imageStyle = {
    width: '100px',
    height: '100px',
    marginTop: '5px'
}

const navStyle = {
    height : '60px'
};

const buttonStyle = {
    marginLeft: '1174px',
    width: '200px'
}

const linkStyle = {
    color : '#FC8C8C',
    textDecoration : 'none'
}

const linkStyle2 = {
    color : '#63C8F9',
    textDecoration : 'none'
}

const pStyle = {
    fontFamily : 'graphik-sans',
    fontSize : '20px',
    marginLeft : '85px',
    paddingTop : '20px',
    textDecoration : 'none',
    fontWeight : '900'
}

const divStyle1 = {
    backgroundColor : '#FEFEFE',
    height: '70px',
    width : '700px',
    marginTop : '10px',
    borderRadius : '3px',
    marginLeft : '420px'
}

const h6Style = {
    fontFamily : 'graphik-sans',
    fontSize : '13px',
    marginLeft : '200px',
    marginTop : '-21px',
    color : '#A0A0A0'
}

const divStyle2 = {
    backgroundColor : '#FEFEFE',
    height: '470px',
    width : '700px',
    marginLeft : '420px',
    marginTop : '10px'

}

const inputStyle1 = {
    width : '500px',
    marginLeft : '100px',
    marginTop : '0px'
}

const pStyle5 = {
    fontFamily : 'graphik-sans',
    fontSize : '16px',
    fontWeight : '900',
    marginLeft : '100px',
    marginTop : '0px'
}

const inputStyle2 = {
    width : '500px',
    marginLeft : '100px',
    marginTop : '0px'
}

const pStyle6 = {
    fontFamily : 'graphik-sans',
    fontSize : '16px',
    fontWeight : '900',
    marginLeft : '100px',
    marginTop : '15px'
}

const buttonUpload = {
    width : '200px',
    marginLeft : '100px',
    marginTop : '-70px'
}

const buttonStyle2 = {
    width : '200px',
    marginLeft : '400px',
    marginTop : '30px'
}

const buttonStyle3 = {
    width : '250px',
    marginLeft : '354px',
    marginTop : '20px'
}



class SectionUpdatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName : "",
            itemDesc : "",
            itemPrice : "",
            itemsName : "",
            restaurantName : ""
        }

        this.handleLogout = this.handleLogout.bind(this);
        this.onItemSubmitUpdate = this.onItemSubmitUpdate.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount() {
        console.log('Inside item edit componentDidMount');
        var getLocalString = localStorage.getItem('ItemToUpdate')
        axios.get(`http://localhost:3001/SectionUpdatePage/${getLocalString}`)
        .then((response) => {
            console.log(response.data[0]);
            this.setState({
                itemName : response.data[0].itemName,
                itemDesc : response.data[0].description,
                itemPrice : response.data[0].itemprice
            });
        })
    }

    handleLogout = () => {
        cookie.remove('cookie',{ path : '/' });
    }

    onItemSubmitUpdate = (e) => {
        e.preventDefault();
        console.log('Inside the item submit button');
        const data = {
            itemsName : localStorage.getItem('ItemToUpdate'),
            itemName : this.state.itemName,
            itemDesc : this.state.itemDesc,
            itemPrice : this.state.itemPrice,
            restaurantName : localStorage.getItem('RestaurantName')
        }
        console.log(data);
        localStorage.removeItem('ItemToUpdate');
        localStorage.setItem('ItemToUpdate',data.itemName);

        axios.post("http://localhost:3001/SectionUpdatePage",data)
        .then(response => {
            console.log(response.status);
            if(response.status === 200) {
                this.props.history.push('/MenuHomePage/:id');
            }
        })
    }

    handleInput = (e) => {
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
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav mr-auto">
                                <li class="nav-item dropdown">
                                    <button class = 'btn btn-outline-danger' style = {buttonStyle}><Link to = '/profileOwner/:id' style = {linkStyle}>{localStorage.getItem('FirstName')}'s Profile</Link></button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className = "container" style = {divStyle1}>
                        <p style = {pStyle}>Update your Sections<h6 style = {h6Style}>Updating your sections and serve with love</h6></p>
                    </div>
                    <div className = "container1" style = {divStyle2}>
                        <br/>
                        <p style = {pStyle5}>Name your Items</p>
                        <input type = "text" className = "form-control" name = "itemName" style = {inputStyle1} onChange = {this.handleInput} defaultValue = {this.state.itemName}></input>
                        <p style = {pStyle6}>Price of your item</p>
                        <input type = "text" className = "form-control" name = "itemPrice" style = {inputStyle2} onChange = {this.handleInput} defaultValue = {this.state.itemPrice}></input>
                        <p style = {pStyle6}>Description of your Item</p>
                        <input type = "text" className = "form-control" name = "itemDesc" style = {inputStyle2} onChange = {this.handleInput} defaultValue = {this.state.itemDesc}></input>
                        <button className = "btn btn-primary" style = {buttonStyle2}  onClick = {this.onItemSubmitUpdate}>Save and Update</button>
                        <br/>
                        <button className = "btn btn-outline-primary" style = {buttonUpload}>Cancel</button>
                    </div>

                </div>
            </div>
        )
    }
}

export default SectionUpdatePage;