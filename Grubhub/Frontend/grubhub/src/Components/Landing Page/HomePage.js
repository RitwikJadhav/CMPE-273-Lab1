import React, {Component} from 'react';
import landingImage from './landingImage.jpeg';
import gh from './gh.png';
import {Link} from 'react-router-dom';

const imageStyle = {
    width : '950px',
    height : '753px'
}

const imageStyle1 = {
    width: '270px',
    height: '121px',
    marginTop: '-551px',
    marginLeft: '171px'
}

const pStyle = {
    fontFamily: 'Courier New',
    fontSize: '24.3px',
    color: '#0058b8',
    fontWeight: '900',
    marginLeft: '1200px',
    marginTop: '-580px'
}

class HomePage extends Component {
    render() {
        return(
            <div>
                <img src = {landingImage} alt = 'home' style = {imageStyle}/>  
                <img src = {gh} alt = 'logo' style = {imageStyle1}/>  
                <p style = {pStyle}><Link to = '/Login'>Sign in</Link></p>
            </div>
        )
    }
}

export default HomePage;