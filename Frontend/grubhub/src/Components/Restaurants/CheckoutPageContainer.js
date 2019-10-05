import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import propTypes from 'prop-types';
import CheckoutDetailsPage from './CheckoutDetailsPage';


class CheckoutPageContainer extends Component {
    render() {
        console.log(this.props.cartItems)
        var localitems = this.props.cartItems.map((cartItem) => <CheckoutDetailsPage key = {cartItem.itemid} cartItem = {cartItem}/>);
        return (
            <div>
                {localitems}  
            </div>
        );
    }
}

CheckoutPageContainer.propTypes = {
    cartItems : propTypes.array.isRequired 
}

export default CheckoutPageContainer;
