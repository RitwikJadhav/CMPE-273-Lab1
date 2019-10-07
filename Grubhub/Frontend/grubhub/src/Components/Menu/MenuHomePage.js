import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import MenuPage from './MenuPage';

const bodyStyle = {
    backgroundColor : '#EBEBED',
    height : '2550px'
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
    marginLeft: '910px',
    width : '200px'
}

const buttonStyle2 = {
    marginLeft: '50px',
    width : '200px'
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
    fontSize : '24px',
    marginLeft : '230px',
    paddingTop : '15px',
    textDecoration : 'none',
    fontWeight : '900'
}

const divStyle1 = {
    backgroundColor : '#FEFEFE',
    height: '70px',
    width : '650px',
    marginTop : '10px',
    borderRadius : '3px'
}

const divStyle2 = {
    backgroundColor : '#FEFEFE',
    height: '450px',
    marginTop : '16px',
    width : '370px',
    marginLeft : '50px'
}

const pStyle1 = {
    fontFamily : 'graphik-sans',
    fontSize : '20px',
    fontWeight : '900',
    marginLeft : '35px',
    paddingTop : '20px'
}

const pStyle2 = {
    fontFamily : 'graphik-sans',
    fontSize : '20px',
    fontWeight : '900',
    marginLeft : '35px',
    paddingTop : '10px'
}

const pStyle3 = {
    fontFamily : 'graphik-sans',
    fontSize : '20px',
    fontWeight : '900',
    marginLeft : '35px',
    paddingTop : '0px'
}

const divStyle3 = {
    backgroundColor : '#FEFEFE',
    marginTop : '35px',
    marginLeft : '-15px',
    width : '650px',
    height : '2250px'
}


const inputStyle = {
    width : '200px',
    marginLeft : '200px',
    marginTop : '-200px',
    marginBottom : '65px'
}

const pStyle4 = {
    fontFamily : 'graphik-sans',
    fontSize : '20px',
    fontWeight : '900',
    marginLeft : '35px',
    paddingTop : '0px'
}

const pStyle5 = {
    fontFamily : 'graphik-sans',
    fontSize : '20px',
    fontWeight : '900',
    marginLeft : '35px',
    paddingTop : '0px'
}

class MenuHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }

        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        console.log('Inside component will mount method');
        var localRestaurantName = localStorage.getItem('RestaurantName');
        axios.get(`http://localhost:3001/MenuHomePage/${localRestaurantName}`)
        .then(response => this.setState({ items : response.data })
            /*this.setState({
                itemId : response.data[0].itemid,
                itemName : response.data[0].itemName,
                itemPrice : response.data[0].itemprice,
                itemDesc : response.data[0].description,
                sectionName : response.data[0].SectionName,
                restaurantName : response.data[0].RestaurantName
            })*/
        );
    }

    handleLogout = () => {
        cookie.remove('cookie',{ path : '/' });
    }

    render() {  
        let redirectVar = null;
        if(!cookie.load('cookie')) {
            redirectVar = <Redirect to = '/' />
        }
        return (
            <div>
                {redirectVar}
                <div style = {bodyStyle}>
                    <nav className = "navbar navbar-expand-lg navbar-light bg-light" style = {navStyle} >
                        <a class="navbar-brand" href="#">
                            <img src = {Logo} style={imageStyle} alt="Grubhub"/>
                        </a>   
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav mr-auto">
                                <li class="nav-item dropdown">
                                    <button class = 'btn btn-outline-danger' style = {buttonStyle}><Link to = '/profileOwner/:id' style = {linkStyle}>Your Profile details !</Link></button>
                                </li>
                                <li class="nav-item dropdown">
                                    <button class = 'btn btn-outline-danger' style = {buttonStyle2}><Link to = '/' style = {linkStyle} onClick = {this.handleLogout}>Logout</Link></button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className = "container" style = {divStyle1}>
                        <p style = {pStyle}>Restaurant Menu</p>
                        <div className = "jumbotron" style = {divStyle3}>
                            <MenuPage items = {this.state.items} style = {inputStyle}/>
                        </div>
                    </div>

                    <div className = "containerLeft" style = {divStyle2}>
                        <p style = {pStyle1}><Link to = "/SectionAddPage">Add new sections to the menu</Link></p>
                        <hr/>
                        <p style = {pStyle2}><Link to = "/ItemAddPage">Make your Menu interesting by adding more items </Link></p>
                        <hr/>
                        <p style = {pStyle3}><Link to = "/ItemRemovePage">Remove uninteresting items and sections </Link></p>
                        <hr/>
                        <p style = {pStyle4}><Link to = "/ItemSectionUpdate">Thinking of updating your items in the menu ?</Link></p>
                        <hr/>
                        <p style = {pStyle5}><Link to = "/ItemSectionUpdate">Review your sections and update them</Link></p>
                        <hr/>
                    </div>
                </div>
            </div>
        )
    }
}

export default MenuHomePage;