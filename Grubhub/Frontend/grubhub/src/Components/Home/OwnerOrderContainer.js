import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import propTypes from 'prop-types';
import OwnerOrderItem from './OwnerOrderItem';


class OwnerOrderContainer extends Component {
    render() {
        console.log(this.props.orders)
        var localorders = this.props.orders.map((order) => <OwnerOrderItem key = {order.orderid} order = {order}/>);
        return (
            <div>
                {localorders}  
            </div>
        );
    }
}

OwnerOrderContainer.propTypes = {
    orders : propTypes.array.isRequired 
}

export default OwnerOrderContainer;
