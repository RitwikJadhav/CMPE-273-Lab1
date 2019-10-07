import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import SearchPageItem from './SearchPageItem';
import propTypes from 'prop-types';


class SearchResultsContainer extends Component {
    render() {
        console.log(this.props.items)
        return this.props.items.map((item) => (
            <SearchPageItem key = {item.itemid} item = {item}/>
        ));
    }
}

SearchResultsContainer.propTypes = {
    items : propTypes.array.isRequired 
}

export default SearchResultsContainer;