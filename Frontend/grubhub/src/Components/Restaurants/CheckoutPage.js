import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import CheckoutPageContainer from './CheckoutPageContainer';

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
    marginLeft: '910px',
    width : '200px'
}

const linkStyle = {
    color : '#FC8C8C',
    textDecoration : 'none'
}

const containerClass = {
    backgroundColor : '#FEFEFE',
    height: '750px',
    marginTop : '10px',
    width : '750px',
    marginLeft : '450px'
}

const pStyle = {
    fontFamily : 'graphik-sans',
    fontSize : '22px',
    marginLeft : '90px',
    paddingTop : '20px',
    textDecoration : 'none',
    fontWeight : '900'
}

const buttonStyle1 = {
    marginLeft: '50px',
    width : '200px'
}

const pStyle1 = {
    fontFamily : 'graphik-sans',
    fontSize : '16px',
    marginLeft : '360px',
    paddingTop : '10px'
}

const pStyle2 = {
    fontFamily : 'graphik-sans',
    fontSize : '16px',
    marginLeft : '360px',
    paddingTop : '10px'
}

const pStyle3 = {
    fontFamily : 'graphik-sans',
    fontSize : '16px',
    marginLeft : '360px',
    paddingTop : '10px'
}

const pStyle4 = {
    fontFamily : 'graphik-sans',
    fontSize : '16px',
    marginLeft : '360px',
    paddingTop : '10px'
}

const divStyle = {
    fontFamily : 'graphik-sans',
    fontSize : '16px',
    fontWeight : '600',
    marginLeft : '525px',
    marginTop : '-15px',
    paddingLeft : '30px',
    paddingTop : '10px'
}

const divStyle1 = {
    fontFamily : 'graphik-sans',
    fontSize : '16px',
    fontWeight : '600',
    marginLeft : '525px',
    marginTop : '-15px',
    paddingLeft : '30px',
    paddingTop : '10px'
}

const divStyle2 = {
    fontFamily : 'graphik-sans',
    fontSize : '16px',
    fontWeight : '600',
    marginLeft : '525px',
    marginTop : '-15px',
    paddingLeft : '30px',
    paddingTop : '10px'
}

const divStyle3 = {
    fontFamily : 'graphik-sans',
    fontSize : '16px',
    fontWeight : '600',
    marginLeft : '525px',
    marginTop : '-15px',
    paddingLeft : '30px',
    paddingTop : '10px'
}

const containerLeftClass = {
    backgroundColor : '#FEFEFE',
    height: '150px',
    marginTop : '10px',
    width : '400px',
    marginLeft : '20px',
    marginTop : '-750px'
}

const buttonStyle2 = {
    marginLeft : '60px',
    marginTop : '50px'
}

const buttonStyle3 = {
    marginLeft : '360px',
    marginTop : '40px',
    width : '220px'
}

const buttonStyle4 = {
    marginLeft : '360px',
    marginTop : '100px',
    width : '220px'
}

const tableStyle = {
    marginLeft : '400px'
}

class CheckoutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems : [],
            itemNameForOrder : [],
            personName : "",
            address : "",
            status : "",
            restaurantName : "",
            orderId : 0,
            totalCost : ""
        }

        this.handleLogout = this.handleLogout.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
        this.calculateTotal = this.calculateTotal.bind(this);
    }

    componentDidMount() {
        const cart = JSON.parse(localStorage.getItem('Cart'));
        this.setState({
            cartItems : cart
        })
        
    }

    handleLogout = () => {
        localStorage.removeItem('Cart');
        sessionStorage.removeItem('Total');
        sessionStorage.removeItem('Delivery Fee');
        sessionStorage.removeItem('Tip');
        sessionStorage.removeItem('Tax');
    }

    handleCheckoutList = () => {
        sessionStorage.removeItem('Total');
        sessionStorage.removeItem('Delivery Fee');
        sessionStorage.removeItem('Tip');
        sessionStorage.removeItem('Tax');
        sessionStorage.removeItem('TotalwithTaxes');
        this.props.history.push(`/RestaurantDetailsPage/${localStorage.getItem('RestaurantNameForCustomer')}`);
    }

    calculateTotal = () => {
        var tax = sessionStorage.getItem('Tax');
        var deliveryFee = sessionStorage.getItem('Delivery Fee');
        var tip = sessionStorage.getItem('Tip');
        var total = sessionStorage.getItem('TotalwithTaxes');
        console.log(tax);
        document.getElementById('TaxDiv').innerHTML = '$'+tax;
        document.getElementById('FeeDiv').innerHTML = '$'+deliveryFee;
        document.getElementById('TipDiv').innerHTML = '$'+tip;
        document.getElementById('TotalDiv').innerHTML = '$'+total;
    }

    placeOrder = () => {
        console.log('Inside the orders post request');
        var cart = localStorage.getItem('Cart');
        var newCart = JSON.parse(cart);
        var arrayItems = [];
        console.log(newCart);
        for(var i = 0; i < newCart.length;i++) {
            console.log(newCart[i].itemName);
            arrayItems.push(newCart[i].itemName)
        }
        const data = {
            orderId : Math.floor((Math.random() * 10000) + 1),
            itemNameForOrder : arrayItems,
            personName : localStorage.getItem('FirstName') + " "+ localStorage.getItem('LastName'),
            status : "Order pending",
            restaurantName : localStorage.getItem('RestaurantNameForCustomer'),
            totalCost : sessionStorage.getItem('TotalwithTaxes')
        }
        sessionStorage.setItem('orderidforcustomer',data.orderId);
        axios.post('http://localhost:3001/CheckoutOrders',data)
        .then(response => {
            console.log(response.status);
            this.props.history.push('/home');
        })
        .catch(err => {
            console.log(err);
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
                                    <button class = 'btn btn-outline-danger' style = {buttonStyle}><Link to = '/profileOwner/:id' style = {linkStyle}>Your Profile details !</Link></button>
                                </li>
                                <li class="nav-item dropdown">
                                    <button class = 'btn btn-outline-danger' style = {buttonStyle1}><Link to = '/' style = {linkStyle} onClick = {this.handleLogout}>Logout</Link></button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className = "container" style = {containerClass}>
                        <p style = {pStyle}>Checkout - Review your order</p>
                        <hr/>
                        <CheckoutPageContainer cartItems = {this.state.cartItems} />
                        <hr/>
                        <table style = {tableStyle}>
                            <tr>
                                <td style = {pStyle1}>Taxes</td>
                                &nbsp;
                                <td id = "TaxDiv" style = {divStyle}></td>
                            </tr>
                            <tr>
                                <td style = {pStyle2}>Delivery Fee</td>
                                &nbsp;
                                <td id = "FeeDiv" style = {divStyle1}></td>
                            </tr>
                            <tr>
                                <td style = {pStyle3}>Driver's Tip</td>
                                &nbsp;
                                <td id = "TipDiv" style = {divStyle2}></td>
                            </tr>
                            <tr>
                                <td style = {pStyle4}>Grand Total</td>
                                &nbsp;
                                <td id = "TotalDiv" style = {divStyle3}></td>
                            </tr>
                        </table>
                        {/*<p style = {pStyle1}>Taxes </p>
                        <div id = "TaxDiv" style = {divStyle}></div>
                        <p style = {pStyle2}>Delivery Fee</p>
                        <div id = "FeeDiv" style = {divStyle1}></div>
                        <p style = {pStyle3}>Driver's Tip</p>
                        <div id = "TipDiv" style = {divStyle2}></div>
                        <p style = {pStyle4}>Grand Total</p>
        <div id = "TotalDiv" style = {divStyle3}></div>*/}
                        <button className = "btn btn-primary" style = {buttonStyle4} onClick = {this.calculateTotal}>Calculate Grand Total</button>
                        <button className = "btn btn-primary" style = {buttonStyle3} onClick = {this.placeOrder}>Place your order</button>
                    </div>   
                    <div className = "cotainerLeft" style = {containerLeftClass} >
                        <button className = "btn btn-outline-primary" onClick = {this.handleCheckoutList} style = {buttonStyle2}>Want to add more item ? Go back</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CheckoutPage;