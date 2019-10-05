import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import UploadItemImage from './UploadItemImage';

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
    marginLeft: '1200px'
}

const linkStyle = {
    color : '#FC8C8C',
    textDecoration : 'none'
}

const containerClass = {
    backgroundColor : '#FEFEFE',
    height: '1090px',
    marginTop : '-270px',
    width : '650px',
    marginLeft : '450px'
}

const containerClassLeft = {
    backgroundColor : '#FEFEFE',
    height: '270px',
    marginTop : '36px',
    width : '350px',
    marginLeft : '50px'
}

const pStyle = {
    fontFamily : 'graphik-sans',
    fontSize : '20px',
    marginLeft : '30px',
    paddingTop : '20px',
    textDecoration : 'none',
    fontWeight : '900'
}

const divStyle1 = {
    backgroundColor : '#FEFEFE',
    height: '70px',
    width : '1250px',
    marginTop : '10px',
    borderRadius : '3px',
    marginLeft : '150px'
}

const h6Style = {
    fontFamily : 'graphik-sans',
    fontSize : '13px',
    marginLeft : '90px',
    marginTop : '-21px',
    color : '#A0A0A0'
}

const divStyle2 = {
    backgroundColor : '#FEFEFE',
    height: '470px',
    width : '1140px',
    marginLeft : '150px',
    marginTop : '10px'

}

const divStyle3 = {
    backgroundColor : '#EBEBED',
    height : '37px',
    width : '128px',
    marginLeft : '20px',
    marginTop : '15px'   
}

const pStyle4 = {
    fontFamily : 'graphik-sans',
    fontSize : '16px',
    fontWeight : '900',
    marginLeft : '25px'
}

const inputStyle1 = {
    width : '500px',
    marginLeft : '250px',
    marginTop : '-10px'
}

const pStyle5 = {
    fontFamily : 'graphik-sans',
    fontSize : '16px',
    fontWeight : '900',
    marginLeft : '250px',
    marginTop : '-70px'
}

const inputStyle2 = {
    width : '500px',
    marginLeft : '250px',
    marginTop : '0px'
}

const pStyle6 = {
    fontFamily : 'graphik-sans',
    fontSize : '16px',
    fontWeight : '900',
    marginLeft : '250px',
    marginTop : '15px'
}

const inputStyle3 = {
    width : '300px',
    marginLeft : '250px',
    marginTop : '0px'
}

const pStyle7 = {
    fontFamily : 'graphik-sans',
    fontSize : '16px',
    fontWeight : '900',
    marginLeft : '250px',
    marginTop : '15px'
}

const inputStyle4 = {
    width : '100px',
    marginLeft : '250px',
    marginTop : '0px'
}

const pStyle8 = {
    fontFamily : 'graphik-sans',
    fontSize : '16px',
    fontWeight : '900',
    marginLeft : '250px',
    marginTop : '15px'
}

const buttonUpload = {
    width : '200px',
    marginLeft : '20px',
    marginTop : '-200px'
}

const buttonStyle2 = {
    width : '200px',
    marginLeft : '900px',
    marginTop : '30px'
}

class ItemAddPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName : "",
            itemDesc : "",
            itemSection : "",
            itemPrice : "",
            restaurantName : ""
        }

        this.handleLogout = this.handleLogout.bind(this);
        this.onItemSubmit = this.onItemSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleLogout = () => {
        cookie.remove('cookie',{ path : '/' });
    }

    onItemSubmit = (e) => {
        e.preventDefault();
        console.log('Inside the item submit button');
        const data = {
            itemName : this.state.itemName,
            itemDesc : this.state.itemDesc,
            itemSection : this.state.itemSection,
            itemPrice : this.state.itemPrice,
            restaurantName : localStorage.getItem('RestaurantName')
        }
        console.log(data);
        localStorage.setItem('ItemName',data.itemName);

        axios.post("http://localhost:3001/ItemAddPage",data)
        .then(response => {
            console.log(response.data);
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
                                    <button class = 'btn btn-outline-danger' style = {buttonStyle}><Link to = '/profileOwner/:id' style = {linkStyle}>Your Profile details</Link></button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className = "container" style = {divStyle1}>
                        <p style = {pStyle}>Item Info <h6 style = {h6Style}>Name your item and add a clear and informative description for your customers</h6></p>
                    </div>
                    <div className = "container1" style = {divStyle2}>
                        <form>
                        <br/>
                        <p style = {pStyle4}>Photo</p>
                        <div className = "photoBox" style = {divStyle3}>
                            <UploadItemImage itemName = {this.state.itemName}/>
                        </div>
                        <p style = {pStyle5}>Name</p>
                        <input type = "text" className = "form-control" name = "itemName" style = {inputStyle1} onChange = {this.handleInput} required></input>
                        <p style = {pStyle6}>Description</p>
                        <input type = "text" className = "form-control" name = "itemDesc" style = {inputStyle2} onChange = {this.handleInput} required></input>
                        <p style = {pStyle7}>Section</p>
                        <input type = "text" className = "form-control" name = "itemSection" style = {inputStyle3} onChange = {this.handleInput} required></input>
                        <p style = {pStyle8}>Price</p>
                        <input type = "text" className = "form-control" name = "itemPrice" style = {inputStyle4} onChange = {this.handleInput} required></input>
                        <button className = "btn btn-primary" style = {buttonStyle2} onClick = {this.onItemSubmit}>Save and Update</button>
                        <br/>
                        <button className = "btn btn-outline-primary" style = {buttonUpload}>Cancel the Update</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemAddPage;