import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import OwnerOrderContainer from './OwnerOrderContainer';

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
    height: '1090px',
    marginTop : '-270px',
    width : '1050px',
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

const divStyle4 = {
    fontFamily : 'graphik-sans',
    fontSize : '18px',
    fontWeight : '500',
    marginLeft : '50px'
}


const divStyle1 = {
    fontFamily : 'graphik-sans',
    fontSize : '18px',
    fontWeight : '500',
    marginLeft : '180px'
}

const divStyle2 = {
    fontFamily : 'graphik-sans',
    fontSize : '18px',
    fontWeight : '500',
    marginLeft : '400px'
}

const pStyle4 = {
    fontFamily : 'graphik-sans',
    fontSize : '20px',
    fontWeight : '700',
    marginLeft : '30px'
}

const pStyle1 = {
    fontFamily : 'graphik-sans',
    fontSize : '20px',
    fontWeight : '700',
    marginLeft : '200px',
    marginTop : '-72px'
}

const pStyle2 = {
    fontFamily : 'graphik-sans',
    fontSize : '20px',
    fontWeight : '700',
    marginLeft : '380px',
    marginTop : '-72px'
}

const pStyle3 = {
    fontFamily : 'graphik-sans',
    fontSize : '22px',
    marginLeft : '90px',
    paddingTop : '10px',
    textDecoration : 'none',
    fontWeight : '900'
}

class homeOwner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantName : "",
            orders : [],
            selectedValue : "",
            orderid : "",
            itemName : "",
            delivered : []
        }

        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        console.log('Inside recent orders request');
        const data = {
            restaurantName : localStorage.getItem('RestaurantName')
        }
        axios.post('http://localhost:3001/RecentOrderReq',data)
        .then(response => {
            console.log(response.data);
            let i;
            for(i = 0; i < response.data.length;i++) {
                if(response.data[i].Status == 'Order delivered') {
                    this.setState({
                        delivered : [response.data[i]]
                    })
                }
                else {
                    this.setState({
                        orders : response.data
                    })        
                }
            }
        })
        .catch(err => {
            console.log(err);
        })
        console.log(this.state.delivered);
    }

    handleLogout = () => {
        cookie.remove('cookie',{ path : '/' });
    }

    render() {  
        let redirectVar = null;
        if(!cookie.load('cookie')) {
            redirectVar = <Redirect to = '/' />
        }
        const delivered = this.state.delivered.map((delItem) => (
            <div key = {delItem.orderid}>
                <p style = {pStyle4}>Order id</p>
                <div style = {divStyle4}>{delItem.orderid}</div>
                <p style = {pStyle1}>Item Name</p>
                <div style = {divStyle1}>{delItem.ItemNames}</div>
                <p style = {pStyle2}>Customer Name</p>
                <div  style = {divStyle2}>{delItem.OrderPersonName}</div>
                <div></div>
            </div>
        )); 
        return (
            <div>
                {redirectVar}
                <div style = {bodyStyle}>
                    <nav className = "navbar navbar-expand-lg navbar-light bg-light" style = {navStyle} >
                        <a className="navbar-brand" href="#">
                            <img src = {Logo} style={imageStyle} alt="Grubhub"/>
                        </a>   
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item dropdown">
                                    <button className = 'btn btn-outline-danger' style = {buttonStyle}><Link to = '/profileOwner/:id' style = {linkStyle}>{localStorage.getItem('FirstName')} Profile details</Link></button>
                                </li>
                                <li className="nav-item dropdown">
                                    <button className = 'btn btn-outline-danger' style = {buttonStyle1}><Link to = '/' style = {linkStyle}>Logout</Link></button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className = "containerLeft" style = {containerClassLeft}>
                        <p style = {pStyle}><Link to = {"/MenuHomePage/"+localStorage.getItem('RestaurantName')}>Edit your Menu</Link></p>
                        <hr/>
                    </div>
                    <div className = "container" style = {containerClass}>
                        <p style = {pStyle}>Recent Orders</p>
                        <hr/>
                        <OwnerOrderContainer orders = {this.state.orders}/>
                        <hr/>
                        <p style = {pStyle3}>Delivered Orders</p>
                        <hr/>
                        {delivered}
                    </div>  
                </div>
            </div>
        )
    }
}

export default homeOwner;