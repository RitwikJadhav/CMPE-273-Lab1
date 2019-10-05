import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Modal,Button } from 'react-bootstrap';

import propTypes from 'prop-types';

const labelStyle = {
    marginLeft : '20px'
    
}

const inputStyle = {
    width : '215px',
    marginLeft : '20px'
}

const labelStyle1 = {
    marginLeft : '265px',
    marginTop : '-100px'
}

const inputStyle1 = {
    width : '250px',
    marginLeft: '265px',
    marginTop : '-5px'
}

const labelStyle2 = {
    marginLeft : '545px',
    marginTop : '-75px'
}

const labelStyle3 = {
    marginLeft : '720px',
    marginTop : '-104px'
}

const inputStyle2 = {
    width : '150px',
    marginLeft: '545px',
    marginTop : '-5px',
    marginBottom : '30px'
}

const inputStyle3 = {
    width : '100px',
    marginLeft : '720px',
    marginTop : '-6px'
}

const buttonStyle1 = {
    width : '150px',
    marginTop : '-68px',
    marginLeft : '850px'

}

const linkStyle = {
    textDecoration : 'none',
    color : '#63C8F9'
}

class RestDetailItemsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemName : "",
            totalItemPrice : "",
            show : false,
            setShow : false,
            itemQuantity : 0
        }
        this.handleCartOperations = this.handleCartOperations.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    /*componentDidMount() {
        const data = {
            itemName : "",
            itemPrice : ""
        }
        localStorage.setItem('Cart',JSON.stringify(data));
    }*/

    handleCartOperations = () => {
        /*var cart = [];
        console.log('Inside cart operations');
        this.setState({
            setShow : true
        })
        var existingCartItems = JSON.parse(localStorage.getItem('Cart'));
        console.log(existingCartItems);
        if(existingCartItems != null) {
            cart.push(existingCartItems);
        }    
        console.log(cart);
        const data = {
            itemName : this.props.item.itemName,
            totalItemPrice : this.props.item.itemprice * this.state.itemQuantity
        }
        cart.push(data);
        console.log(cart);
        localStorage.setItem('Cart',JSON.stringify(cart));*/

        console.log('Inside cart operations');
        this.setState({
            setShow : true
        })
        var cart = JSON.parse(localStorage.getItem('Cart'));
        if(cart == null) {
            cart = [];
        }
        console.log(cart);
        const data = {
            itemName : this.props.item.itemName,
            totalItemPrice : this.props.item.itemprice * this.state.itemQuantity
        }
        localStorage.setItem('CartItem',JSON.stringify(data));
        cart.push(data);
        localStorage.setItem('Cart',JSON.stringify(cart));
    }

    handleClose = () => {
        this.setState({
            setShow : false
        })
    }

    handleQuantity = (e) => {
        this.setState({
            itemQuantity : e.target.value
        })
    }
    
    render() {
        
        return(
            <div>       
                        <hr/>
                        <p style = {labelStyle}>Item Name</p>
                        <input type = "text" className = "form-control" name = "itemName" style = {inputStyle} value = {this.props.item.itemName}/>
                        &nbsp;
                        <p style = {labelStyle1}>Item Description</p>
                        <input type = "text" className = "form-control" name = "itemDesc" style = {inputStyle1} value = {this.props.item.description}/>
                        <p style = {labelStyle2}>Item Price</p>
                        <input type = "text" className = "form-control" name = "itemPrice" style = {inputStyle2} value = {this.props.item.itemprice}/>
                        <p style = {labelStyle3}>Enter Quantity</p>
                        <input type = "number" className = "form-control" name = "quantity" style = {inputStyle3} placeholder = "Quantity" onChange = {this.handleQuantity} min = "0"/>
                        <button type = "button" className = "btn btn-primary" style = {buttonStyle1} onClick = {this.handleCartOperations}>Add to Cart</button>
                        <hr/>
                        <Modal show={this.state.setShow} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Information</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Your item has been added to the cart</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Choose more items
                                </Button>
                                <Button variant="primary">
                                    <Link style = {linkStyle} to = '/CheckoutPage'>
                                    Checkout
                                    </Link>
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        
            </div>
        )
    }
}

RestDetailItemsPage.propTypes = {
    item : propTypes.object.isRequired 
}

export default RestDetailItemsPage;