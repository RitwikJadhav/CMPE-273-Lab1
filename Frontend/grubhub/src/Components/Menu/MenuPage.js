import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import MenuPageItem from './MenuPageItem';
import propTypes from 'prop-types';


class MenuPage extends Component {
    render() {
        console.log(this.props.items)
        return this.props.items.map((item) => (
            <MenuPageItem key = {item.itemid} item = {item}/>
        ));
    }
}

MenuPage.propTypes = {
    items : propTypes.array.isRequired 
}

export default MenuPage;