import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import pizzaImage from './cropped-2.jpg';
import searchIcon from './search.svg';
import { Modal,Button } from 'react-bootstrap';

const bodyStyle = {
    backgroundColor : '#EBEBED',
    height : '1550px'
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
    color : '#FC8C8C'
}

const divStyle1 = {

}

const searchStyle = {
    width : '30px',
    marginLeft : '360px',
    marginTop : '-115px'
}

const inputStyle1 = {
    backgroundColor : '#FEFEFE',
    width : '600px',
    marginLeft : '400px',
    marginTop : '50px'
} 

const divStyle2 = {
    backgroundColor : '#FEFEFE',
    width : '250px',
    height : '250px',
    marginLeft : '0px',
    marginTop : '20px'
}

const divStyle5 = {
    backgroundColor : '#FEFEFE',
    width : '250px',
    height : '250px',
    marginLeft : '800px',
    marginTop : '20px'
}


const pStyle3 = {
    fontFamily : 'graphik',
    fontSize : '20px',
    fontWeight : '900',
    marginLeft : '200px',
    marginTop : '50px'
}

const buttonStyle1 = {
    marginLeft : '1010px',
    marginTop : '-67px',
    width : '200px'
}

const divStyle3 = {
    fontFamily : 'graphik-sans',
    fontSize : '18px',
    fontWeight : '300',
    marginLeft : '30px',
    marginTop : '5px',
    color : '#A2AAAE'

}

const divStyle4 = {
    fontFamily : 'graphik-sans',
    fontSize : '20px',
    fontWeight : '600',
    marginLeft : '30px',
    marginTop : '10px',
    paddingTop : '50px'
    
}

const pStyle4 = {
    marginLeft : '1020px',
    fontFamily : 'graphik',
    fontSize : '20px',
    fontWeight : '900',
    marginTop : '-580px'
}

class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchItem : "",
            errorMessage : "",
            items : [],
            orderid : "",
            orderTotalCost : "",
            restaurantName : "",
            firstName : "",
            lastName : "",
            delivered : [],
            setShow : false
        }

        this.handleLogout = this.handleLogout.bind(this);
        this.handleSearchResults = this.handleSearchResults.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        console.log('Inside the recent order component did mount');
        const data = {
            orderTotalCost : sessionStorage.getItem('TotalwithTaxes'),
            restaurantName : localStorage.getItem('RestaurantNameForCustomer'),
            firstName : localStorage.getItem('FirstName'),
            lastName : localStorage.getItem('LastName')
        }
        console.log(data);
        axios.post('http://localhost:3001/GetRecentOrderRequest',data)
        .then(response => {
            console.log(response.data);
            this.setState({
                items : response.data
            })
            console.log(this.state.items); 
        }).catch(err => {
            console.log(err);
        })

        console.log('past orders request');
        const data1 = {
            firstName : localStorage.getItem('FirstName'),
            lastName : localStorage.getItem('LastName')
        }

        console.log(data1);
        axios.post('http://localhost:3001/GetDeliveredItems',data1)
        .then(response => {
            console.log(response.data)
            this.setState({
                delivered : response.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleLogout = () => {
        localStorage.removeItem('Cart');
        sessionStorage.removeItem('Total');
        sessionStorage.removeItem('Delivery Fee');
        sessionStorage.removeItem('Tip');
        sessionStorage.removeItem('Tax');
        cookie.remove('cookie',{ path : '/' });
    }

    handleClose = () => {
        this.setState({
            setShow : false
        })
    }

    handleSearchResults = () => {
        console.log('inside handle search results');
        console.log(this.state.searchItem);
        if(this.state.searchItem == "") {
            this.setState({
                setShow : true
            })
        }
        else {
            sessionStorage.setItem('ItemToSearch',this.state.searchItem);
            this.props.history.push('/SearchResults');
        }
        /*const data = {
            searchItem : this.state.searchItem
        }
        console.log(data);
        axios.post("http://localhost:3001/home",data)
        .then(response => {
            console.log(response.data)
            if(response.status === 200) {
                console.log(response.data[0])
                sessionStorage.setItem('RestaurantName',response.data[0].RestaurantName);
                sessionStorage.setItem('ItemName',response.data[0].itemName);
                sessionStorage.setItem('ItemPrice',response.data[0].itemprice);
                this.props.history.push('/SearchResults');
            }
        })*/
        
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {  
        let redirectVar = null;
        if(!cookie.load('cookie')) {
            redirectVar = <Redirect to = '/' />
        }
        const orderNameList = this.state.items.map((item) => (
            <div key = {item.orderid} style = {divStyle2}>
                <div style = {divStyle4}>{item.Status}</div>
                <div style = {divStyle3}>{item.ItemNames}</div>
                <div style = {divStyle3}>{item.RestaurantName}</div>
                <div style = {divStyle3}>{item.Total}</div>
            </div>
        ));
        const deliveredList = this.state.delivered.map((delItem) => (
            <div key = {delItem.orderid} style = {divStyle5}>
                <div style = {divStyle4}>Delivered to you</div>
                <div style = {divStyle3}>{delItem.ItemNames}</div>
                <div style = {divStyle3}>{delItem.RestaurantName}</div>
                <div style = {divStyle3}>{delItem.Total}</div>
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
                                    <button className = 'btn btn-outline-danger' style = {buttonStyle}><Link to = '/profile/:id' style = {linkStyle}>Your Profile details !</Link></button>
                                </li>
                                <li className="nav-item dropdown">
                                    <button className = 'btn btn-outline-danger' style = {buttonStyle2}><Link to = '/' style = {linkStyle} onClick = {this.handleLogout}>Logout</Link></button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <form onSubmit = {this.handleSearchResults}>
                        <input type = "text" className = "form-control" name = "searchItem" style = {inputStyle1} placeholder = "Pizza, Sushi, Chinese, Burrito" onChange = {this.handleInput} required/>  
                        <button className = "btn btn-primary" style = {buttonStyle1}>Search</button>
                    </form>    
                    <div>
                        <div style = {divStyle1}>
                            <img src = {searchIcon} alt = "searchIcon" style = {searchStyle}></img>
                        </div>    
                        <hr/>
                        <p style = {pStyle3}>Your Active Orders</p>
                        <div className = "container">
                            <div className = "row">
                                <div className = "col-sm">
                                    {orderNameList}
                                </div>
                            </div>
                        </div>
                        <p style = {pStyle4}>Your Past Orders</p>
                        <div className = "container">
                            <div className = "row">
                                <div className = "col-sm">
                                    <div show = {this.state.show}>{deliveredList}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.setShow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>No item found.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default home;