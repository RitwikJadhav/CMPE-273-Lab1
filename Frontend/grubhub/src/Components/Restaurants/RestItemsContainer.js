import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import propTypes from 'prop-types';
import RestDetailItemsPage from './RestDetailItemsPage';


class RestItemsContainer extends Component {
    render() {
        console.log(this.props.items)
        var localitems = this.props.items.map((item) => <RestDetailItemsPage key = {item.itemid} item = {item}/>);
        return (
            <div>
                {localitems}  
            </div>
        );
    }
}

RestItemsContainer.propTypes = {
    items : propTypes.array.isRequired 
}

export default RestItemsContainer;
