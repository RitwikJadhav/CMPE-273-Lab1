import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Modal,Button } from 'react-bootstrap';
import propTypes from 'prop-types';

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

const divStyle3 = {
    fontFamily : 'graphik-sans',
    fontSize : '18px',
    fontWeight : '500',
    marginLeft : '630px'
}

const divStyle4 = {
    fontFamily : 'graphik-sans',
    fontSize : '18px',
    fontWeight : '500',
    marginLeft : '50px'
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
    fontSize : '20px',
    fontWeight : '700',
    marginLeft : '650px',
    marginTop : '-72px'
}

const pStyle4 = {
    fontFamily : 'graphik-sans',
    fontSize : '20px',
    fontWeight : '700',
    marginLeft : '30px'
}

const divMain = {
    marginBottom : '20px'
}

const selectStyle = {
    marginLeft : '-20px',
    width : '150px',
    marginTop : '-10px'
}

const buttonStyle2 = {
    marginLeft : '820px',
    marginTop : '-70px'
}



class OwnerOrderItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedValue : "",
            setShow : false
        }
        this.handleSelectedValue = this.handleSelectedValue.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleSelectedValue = (e) => {
        this.setState({
            selectedValue : e.target.value
        })
        console.log(this.state.selectedValue)
    }

    handleCheckout = () => {
        console.log('Inside order update request');
        const data = {
            selectedValue : this.state.selectedValue,
            orderid : this.props.order.orderid        
        }
        console.log(data);
        axios.post('http://localhost:3001/OrderStatusUpdate',data)
        .then(response => {
            console.log(response.data);
            this.setState({
                setShow : true
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleClose = () => {
        this.setState({
            setShow : false
        })
    }

    render() {
        
        return(
            <div>
                <p style = {pStyle4}>Order id</p>
                <div style = {divStyle4}>{this.props.order.orderid}</div>
                <p style = {pStyle1}>Item Name</p>
                <div style = {divStyle1}>{this.props.order.ItemNames}</div>
                <p style = {pStyle2}>Customer Name</p>
                <div style = {divStyle2}>{this.props.order.OrderPersonName}</div>
                <p style = {pStyle3}>Status</p>
                <div style = {divStyle3}>
                    <select className="custom-select" id = 'checkoutList' onChange = {this.handleSelectedValue} style = {selectStyle}>
                        <option value = "select">--Select--</option>
                        <option value = "Order confirmed">Order confirmed</option>
                        <option value = "Preparing Food">Preparing Food</option>
                        <option value = "Order dispatched">Order dispatched</option>
                        <option value = "Order delivered">Order delivered</option>
                    </select>
                </div>
                <button className = "btn btn-primary" onClick = {this.handleCheckout} style = {buttonStyle2}>Update Order Status</button>
                <Modal show={this.state.setShow} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Information</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Status of the order is updated</Modal.Body>
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

OwnerOrderItem.propTypes = {
    order : propTypes.object.isRequired 
}

export default OwnerOrderItem;