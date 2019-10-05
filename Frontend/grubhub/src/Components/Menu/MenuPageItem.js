import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import propTypes from 'prop-types';
import DisplayImage from './DisplayImage';

const containerStyle = {
    marginTop : '-50px',
    marginBottom : '75px'
}

const inputStyle = {
    width : '200px',
    marginLeft : '200px',
    marginTop : '-200px',
    marginBottom : '400px'
}

const inputStyle1 = {
    width : '300px',
    marginLeft : '200px',
    marginTop : '-385px',
    marginBottom : '285px'
}

const inputStyle2 = {
    width : '100px',
    marginLeft : '200px',
    marginTop : '-265px',
    marginBottom : '30px'
}

const divStyle4 = {
    backgroundColor : '#EBEBED',
    width : '150px',
    height : '150px',
    marginTop : '29px',
    marginBottom : '50px'
}

class MenuPageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageName : ""
        }
    }
    render() {
        return(
            <div>
                <div class = "container" style = {containerStyle}>
                    <div class = "imageDisplayer" style = {divStyle4}>
                        <DisplayImage imageName = {this.props.item.itemName}/>
                    </div>
                    <input type = "text" name = "itemName" className = "form-control" value = {this.props.item.itemName} style = {inputStyle}></input>
                    <input type = "text" name = "itemDescription" className = "form-control" value = {this.props.item.description} style = {inputStyle1}></input>
                    <input type = "text" name = "itemPrice" className = "form-control" value =  {this.props.item.itemprice} style = {inputStyle2 }></input>
                    <hr/>
                </div>
                
            </div>
        )
    }
}

MenuPageItem.propTypes = {
    item : propTypes.object.isRequired 
}

export default MenuPageItem;