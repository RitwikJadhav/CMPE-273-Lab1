import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './grubhub-vector-logo.svg';
import axios from 'axios';

const loginContainerStyle = {
    backgroundColor : '#FEFEFE',
    height: '550px',
    marginTop : '36px',
    width : '448px',
    marginLeft : '550px'
    
};

const imageStyle = {
    width: '100px',
    height: '100px',
    marginTop: '5px'
}

const bodyStyle = {
    backgroundColor : '#EBEBED',
    height : '750px'
};


const navStyle = {
    height : '60px'
};

const pStyle1 = {
    marginLeft: '60px',
    fontFamily : 'grubhubsans-bold',
    fontWeight : '400',
    fontSize : '24px',
    paddingTop : '40px'

}

const pStyle2 = {
    marginLeft: '130px',
    fontFamily : 'graphik',
    fontWeight : '400',
    fontSize : '14px',
    marginTop: '13px'

}

const pStyle4 = {
    marginLeft: '70px',
    fontFamily : 'graphik',
    fontWeight : '400',
    fontSize : '14px',
    marginTop: '13px'

}

const pstyle3 = {
    fontFamily : 'graphik',
    fontWeight : '400',
    fontSize : '12px',
    marginLeft: '18px'
}

const formInputStyle = {
    width: '36%',
    marginLeft : '58px'
};

const formInputStyle1 = {
    width: '38%',
    marginLeft: '216px',
    marginTop: '-62px'
};

const formInputStyle2 = {
    width: '76%',
    marginLeft : '58px'
};

const labelStyle = {
    width: '72%',
    marginLeft : '60px',
    fontFamily: 'graphik'
};

const labelStyleP = {
    width: '72%',
    marginLeft : '60px',
    fontFamily: 'graphik',
    marginTop : '19px'    
};

const labelStyle1 = {
    marginLeft: '-130px',
    fontFamily: 'graphik',
};

const buttonClass = {
    marginLeft : '57px',
    width: '73%',
    fontFamily: 'grubhubsans-bold'
};

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName : "",
            lastName : "",
            email : "",
            password : "",
            buyer : "Buyer",
            authFlag : false
        }
        this.emailHandler = this.emailHandler.bind(this);
        this.lastNameHandler = this.lastNameHandler.bind(this);
        this.firstNameHandler = this.firstNameHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    componentWillMount() {
        this.setState({
            authFlag : false
        });
    }

    lastNameHandler = (e) => {
        this.setState({
            lastName : e.target.value
        })
    }

    firstNameHandler = (e) => {
        this.setState({
            firstName : e.target.value
        })
    }

    emailHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }

    passwordHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }

    submitLogin = (e) => {
        console.log("Inside signup post request");
        e.preventDefault();

        const data = {
            email : this.state.email,
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            password : this.state.password,
            buyer : this.state.buyer
        }

        axios.post('http://localhost:3001/Signup',data)
        .then(response => {
            console.log(response.status);
            if(response.status === 200) {
                this.setState({
                    authFlag : true
                })
                this.props.history.push('/login');
            }
        })
    }

    render() {
        return(
            <div>
                <div style = {bodyStyle}>
                    <nav className = "navbar navbar-expand-lg navbar-light bg-light" style = {navStyle} >
                    <a class="navbar-brand" href="#">
                        <img src = {Logo} style={imageStyle} alt="Grubhub   "/>
                    </a>
                    </nav>   
                    <div className = "form-group" style = {loginContainerStyle}>
                        <p style={pStyle1}><b>Create your Account</b></p>
                        <table>
                            <tr>
                                <td>
                                    <label for = "FirstName" style={labelStyle}>Firstname</label>
                                    &nbsp;
                                    <label for = "LastName" style={labelStyle1}>Lastname</label>
                                    <input type="text" class="form-control" id="fName" style={formInputStyle} onChange = {this.firstNameHandler}/>
                                    &nbsp;
                                    <input type="text" class="form-control" id="lName" style={formInputStyle1} onChange = {this.lastNameHandler}/>
                                    <br/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for = "Email" style={labelStyle}>Email</label>
                                    <input type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp" style={formInputStyle2} onChange = {this.emailHandler}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for = "Password" style={labelStyleP}>Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" style={formInputStyle2} onChange = {this.passwordHandler}/>
                                </td>
                            </tr>
                        </table>
                       
                        <br/>
                        <button type="button" class="btn btn-primary" style={buttonClass} onClick = {this.submitLogin}>
                            <b>Create your account</b>
                        </button>
                        <p style={pStyle2}>Have an account ?<Link to = '/Login'> Sign in</Link></p>
                        <p style={pStyle4}>Do you own a restaurant? Partner with us<Link to = '/OwnerSignup'> Signup !</Link></p>
                        <p style = {pstyle3}>By creating your Grubhub account, you agree to the <Link>Terms of Use</Link> and <Link>Privacy Policy</Link></p>
                    </div>     
                </div>
            </div>    
        )
    }
}

export default Signup;