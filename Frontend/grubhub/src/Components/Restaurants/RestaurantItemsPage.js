import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import {Link} from 'react-router-dom';

import propTypes from 'prop-types';
import RestItemsContainer from './RestItemsContainer';

const pStyle = {
    fontFamily : 'graphik-sans',
    fontSize : '19px',
    fontWeight : '900',
    marginLeft : '20px'

}


class RestaurantItemsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            localsection : "",
            items : [],
            restaurantName : ""
        }
        this.onRestClick = this.onRestClick.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
        localStorage.setItem('SectionNameForItem',this.props.section.sectionName);
        const data = {
            localsection : this.props.section.sectionName,
            restaurantName : localStorage.getItem('RestaurantNameForCustomer')
        }
        console.log(data);
        axios.post('http://localhost:3001/RestaurantItemsPage',data)
        .then(response => {
            console.log(response.data);
            this.setState({
                items : response.data
            })
        })
    }

    onRestClick() {
        localStorage.setItem('RestaurantNameForCustomer',this.props.section.RestaurantName);
    }

    render() {
        
        return(
            <div>
                <p style = {pStyle}>{this.props.section.sectionName}</p>
                <RestItemsContainer items = {this.state.items} />        
            </div>
        )
    }
}

RestaurantItemsPage.propTypes = {
    section : propTypes.object.isRequired 
}

export default RestaurantItemsPage;