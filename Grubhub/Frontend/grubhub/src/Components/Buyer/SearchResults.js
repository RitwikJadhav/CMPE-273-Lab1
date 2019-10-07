import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';
import SearchResultsContainer from './SearchResultsContainer';

const bodyStyle = {
    backgroundColor : '#EBEBED',
    height : '1250px'
};

const imageStyle = {
    width: '100px',
    height: '100px',
    marginTop: '5px'
}

const navStyle = {
    height : '60px'
};

const buttonStyle = {
    marginLeft: '910px',
    width : '200px'
}

const buttonStyle2 = {
    marginLeft: '50px',
    width : '200px'
}

const linkStyle = {
    color : '#FC8C8C',
    textDecoration : 'none'
}

const containerClass = {
    backgroundColor : '#FEFEFE',
    height: '1090px',
    marginTop : '-270px',
    width : '950px',
    marginLeft : '450px'
}

const containerClassLeft = {
    backgroundColor : '#FEFEFE',
    height: '270px',
    marginTop : '36px',
    width : '350px',
    marginLeft : '50px'
}

const pStyle = {
    fontFamily : 'graphik-sans',
    fontSize : '22px',
    marginLeft : '90px',
    paddingTop : '20px',
    textDecoration : 'none',
    fontWeight : '900'
}


class SearchResults extends Component {
    constructor(props) {
        super(props);
        /*this.state = {
            restauratName : "",
            itemName : "",
            itemPrice : ""
        }*/
        this.state = {
            items : [],
            itemToSearch : "",
            errorMessage : "",
            setShow : false
        }

        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        console.log('Inside the search component did mount');
        const data = {
            itemToSearch : sessionStorage.getItem('ItemToSearch')
        }
        /*if(data.itemToSearch == "") {
            this.setState({
                setShow : true
            });
        }*/
        console.log(data.itemToSearch);
        axios.post('http://localhost:3001/SearchResults',data)
        .then(response => {
            if(response.status === 200) {
                this.setState({
                    items : response.data
                })
            }
            else {
                this.setState({
                    errorMessage : response.data
                })
            }
            
        })
        
    }

    handleLogout = () => {
        sessionStorage.removeItem('ItemSearch');
        cookie.remove('cookie',{ path : '/' });
    }

    render() {  
        return (
            <div>
                <div style = {bodyStyle}>
                    <nav className = "navbar navbar-expand-lg navbar-light bg-light" style = {navStyle} >
                        <a class="navbar-brand" href="#">
                            <img src = {Logo} style={imageStyle} alt="Grubhub"/>
                        </a>   
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav mr-auto">
                                <li class="nav-item dropdown">
                                    <button class = 'btn btn-outline-danger' style = {buttonStyle}><Link to = '/profile/:id' style = {linkStyle}>{localStorage.getItem('FirstName')} Profile details !</Link></button>
                                </li>
                                <li className="nav-item dropdown">
                                    <button className = 'btn btn-outline-danger' style = {buttonStyle2}><Link to = '/' style = {linkStyle} onClick = {this.handleLogout}>Logout</Link></button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className = "containerLeft" style = {containerClassLeft}>
                        <p style = {pStyle}><Link to = "/MenuHomePage/:id">Filter your results</Link></p>
                        <hr/>
                    </div>
                    <div className = "container" style = {containerClass}>
                    <p style = {pStyle}>Your results</p>
                        <SearchResultsContainer items = {this.state.items}/>
                        <p>{this.state.errorMessage}</p>
                    </div>   
                </div>
            </div>
        )
    }
}

export default SearchResults;