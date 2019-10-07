import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Modal,Button } from 'react-bootstrap';

import propTypes from 'prop-types';

const inputStyle = {
    width : '215px',
    marginLeft : '90px',
    fontFamily : 'graphik-sans',
    fontSize : '18px'
}

const inputStyle2 = {
    width : '150px',
    marginLeft: '504px',
    marginTop : '-25px',
    marginBottom : '10px',
    fontFamily : 'graphik-sans',
    fontSize : '16px',
    fontWeight : '600'
}

class CheckoutDetailsPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var existingTotal = sessionStorage.getItem('Total');
        console.log(existingTotal);
        if(existingTotal === 'NaN' || existingTotal == null) {
            existingTotal = '0.0'
        }
        var intExistingTotal = parseFloat(existingTotal);
        console.log(intExistingTotal);
        var intTotalPrice = parseFloat(this.props.cartItem.totalItemPrice);
        console.log(intTotalPrice)
        intExistingTotal = intExistingTotal + intTotalPrice;
        console.log(intExistingTotal);
        existingTotal = intExistingTotal.toString();
        sessionStorage.setItem('Total',existingTotal);
        console.log(existingTotal);
        var tax = intExistingTotal * 0.05;
        sessionStorage.setItem('Tax',tax.toPrecision(4));
        console.log(tax);
        var deliveryFee = intExistingTotal * 0.05;
        sessionStorage.setItem('Delivery Fee',tax.toPrecision(4));
        console.log(deliveryFee);
        var tip = intExistingTotal * 0.05;
        sessionStorage.setItem('Tip',tax.toPrecision(4));
        console.log(tip);
        intExistingTotal = intExistingTotal + tax + deliveryFee + tip;
        var existingTotalwithTaxes = intExistingTotal.toPrecision(4);
        console.log(existingTotalwithTaxes);
        sessionStorage.setItem('TotalwithTaxes',existingTotalwithTaxes);


        
    }

    render() {
        
        return(
            <div>       
                <div style = {inputStyle}>{this.props.cartItem.itemName} </div>
                <div style = {inputStyle2}>--- ${this.props.cartItem.totalItemPrice}</div>
            </div>
        )
    }
}

CheckoutDetailsPage.propTypes = {
    cartItem : propTypes.object.isRequired 
}

export default CheckoutDetailsPage;