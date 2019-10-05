import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Login/grubhub-vector-logo.svg';
import axios from 'axios';

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
    marginLeft: '1174px',
    width: '200px'
}

const linkStyle = {
    color : '#FC8C8C',
    textDecoration : 'none'
}

const linkStyle2 = {
    color : '#63C8F9',
    textDecoration : 'none'
}

const pStyle = {
    fontFamily : 'graphik-sans',
    fontSize : '20px',
    marginLeft : '85px',
    paddingTop : '20px',
    textDecoration : 'none',
    fontWeight : '900'
}

const divStyle1 = {
    backgroundColor : '#FEFEFE',
    height: '70px',
    width : '700px',
    marginTop : '10px',
    borderRadius : '3px',
    marginLeft : '420px'
}

const h6Style = {
    fontFamily : 'graphik-sans',
    fontSize : '13px',
    marginLeft : '200px',
    marginTop : '-21px',
    color : '#A0A0A0'
}

const divStyle2 = {
    backgroundColor : '#FEFEFE',
    height: '470px',
    width : '700px',
    marginLeft : '420px',
    marginTop : '10px'

}

const inputStyle1 = {
    width : '500px',
    marginLeft : '100px',
    marginTop : '0px'
}

const pStyle5 = {
    fontFamily : 'graphik-sans',
    fontSize : '16px',
    fontWeight : '900',
    marginLeft : '100px',
    marginTop : '0px'
}

const inputStyle2 = {
    width : '500px',
    marginLeft : '100px',
    marginTop : '0px'
}

const pStyle6 = {
    fontFamily : 'graphik-sans',
    fontSize : '16px',
    fontWeight : '900',
    marginLeft : '100px',
    marginTop : '15px'
}

const inputStyle3 = {
    width : '300px',
    marginLeft : '250px',
    marginTop : '0px'
}

const pStyle7 = {
    fontFamily : 'graphik-sans',
    fontSize : '16px',
    fontWeight : '900',
    marginLeft : '250px',
    marginTop : '15px'
}

const inputStyle4 = {
    width : '100px',
    marginLeft : '250px',
    marginTop : '0px'
}

const pStyle8 = {
    fontFamily : 'graphik-sans',
    fontSize : '16px',
    fontWeight : '900',
    marginLeft : '250px',
    marginTop : '15px'
}

const buttonUpload = {
    width : '200px',
    marginLeft : '100px',
    marginTop : '-70px'
}

const buttonStyle2 = {
    width : '200px',
    marginLeft : '400px',
    marginTop : '30px'
}

const buttonStyle3 = {
    width : '250px',
    marginLeft : '354px',
    marginTop : '20px'
}

const divStyle3 = {
    backgroundColor : '#FEFEFE',
    height: '70px',
    width : '700px',
    marginTop : '-550px',
    borderRadius : '3px',
    marginLeft : '750px'

}

const divStyle4 = {
    backgroundColor : '#FEFEFE',
    height: '470px',
    width : '700px',
    marginLeft : '750px',
    marginTop : '10px'

}

const buttonUpload1 = {
    width : '200px',
    marginLeft : '100px',
    marginTop : '-60px'
}

const buttonStyle4 = {
    width : '200px',
    marginLeft : '400px',
    marginTop : '40px'
}

class ItemUpdatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionName : "",
            sectionDesc : "",
            restaurantName : "",
            itemName : "",
            itemDesc : "",
            itemPrice : "",
            sectionsName : "",
        }

        this.handleLogout = this.handleLogout.bind(this);
        this.onItemSubmitUpdate = this.onItemSubmitUpdate.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount() {
        console.log('Inside item edit componentDidMount');
        var getLocalString = localStorage.getItem('SectionToUpdate')
        axios.get(`http://localhost:3001/ItemUpdatePage/${getLocalString}`)
        .then((response) => {
            console.log(response.data[0]);
            this.setState({
                sectionName : response.data[0].sectionName,
                sectionDesc : response.data[0].sectionDescription
            });
        })
    }

    handleLogout = () => {
        cookie.remove('cookie',{ path : '/' });
    }

    onItemSubmitUpdate = (e) => {
        e.preventDefault();
        console.log('Inside the item submit button');
        const data = {
            sectionsName : localStorage.getItem('SectionToUpdate'),
            sectionName : this.state.sectionName,
            sectionDesc : this.state.sectionDesc,
            restaurantName : localStorage.getItem('RestaurantName')
        }
        console.log(data);
        localStorage.removeItem('SectionToUpdate');
        localStorage.setItem('SectionToUpdate',data.sectionName);

        axios.post("http://localhost:3001/ItemUpdatePage",data)
        .then(response => {
            console.log(response.status);
            if(response.status === 200) {
                this.props.history.push('/MenuHomePage/:id');
            }
        })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
        
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
                                    <button class = 'btn btn-outline-danger' style = {buttonStyle}><Link to = '/profileOwner/:id' style = {linkStyle}>{localStorage.getItem('FirstName')}'s Profile</Link></button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className = "container" style = {divStyle1}>
                        <p style = {pStyle}>Update your Items<h6 style = {h6Style}>Updating items will attract more crowd</h6></p>
                    </div>
                    <div className = "container1" style = {divStyle2}>
                        <br/>
                        <p style = {pStyle5}>Name your Section</p>
                        <input type = "text" className = "form-control" name = "sectionName" style = {inputStyle1} onChange = {this.handleInput} defaultValue = {this.state.sectionName}></input>
                        <p style = {pStyle6}>Description of your Section</p>
                        <input type = "text" className = "form-control" name = "sectionDesc" style = {inputStyle2} onChange = {this.handleInput} defaultValue = {this.state.sectionDesc}></input>
                        <button className = "btn btn-primary" style = {buttonStyle2}  onClick = {this.onItemSubmitUpdate}>Save and Update</button>
                        <br/>
                        <button className = "btn btn-outline-primary" style = {buttonUpload}>Cancel</button>
                        <button className = "btn btn-outline-primary" style = {buttonStyle3}><Link to = '/ItemAddPage' style = {linkStyle2}>Create items for your section</Link></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemUpdatePage;