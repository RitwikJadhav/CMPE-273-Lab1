import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import {Link} from 'react-router-dom';

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

const inputStyle2 = {
    width : '150px',
    marginLeft: '545px',
    marginTop : '-5px',
    marginBottom : '30px'
}

const buttonStyle = {
    width : '200px',
    marginLeft : '715px',
    marginTop : '-150px'
}

const linkStyle = {
    textDecoration : 'none',
    color : '#63C8F9'
}


class SearchPageItem extends Component {

    constructor(props) {
        super(props);
        this.onRestClick = this.onRestClick.bind(this);
    }

    onRestClick() {
        localStorage.setItem('RestaurantNameForCustomer',this.props.item.RestaurantName);
    }

    render() {
        
        return(
            <div>
                        <hr/>
                        <p style = {labelStyle}>Restaurant Name</p>
                        <input type = "text" className = "form-control" name = "restauratName" style = {inputStyle} value = {this.props.item.RestaurantName}/>
                        &nbsp;
                        <p style = {labelStyle1}>Item Name</p>
                        <input type = "text" className = "form-control" name = "itemName" style = {inputStyle1} value = {this.props.item.itemName}/>
                        <p style = {labelStyle2}>Item Price</p>
                        <input type = "text" className = "form-control" name = "itemPrice" style = {inputStyle2} value = {this.props.item.itemprice}/>
                        <button className = "btn btn-outline-primary" style = {buttonStyle} onClick = {this.onRestClick}><Link to = {"/RestaurantDetailsPage/" + this.props.item.RestaurantName} style = {linkStyle}>Visit the Restaurant Home Page</Link></button>
                        <hr/>
            </div>
        )
    }
}

SearchPageItem.propTypes = {
    item : propTypes.object.isRequired 
}

export default SearchPageItem;