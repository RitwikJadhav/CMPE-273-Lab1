import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import propTypes from 'prop-types';
import RestaurantItemsPage from './RestaurantItemsPage';


class RestaurantDetailsContainer extends Component {
    render() {
        console.log(this.props.sections)
        return this.props.sections.map((section) => (
            <RestaurantItemsPage key = {section.sectionid} section = {section}/>
        ));
    }
}

RestaurantDetailsContainer.propTypes = {
    sections : propTypes.array.isRequired 
}

export default RestaurantDetailsContainer;