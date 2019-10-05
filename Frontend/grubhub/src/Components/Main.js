import React, {Component} from 'react';
import Login from './Login/Login'
import signup from './Signup/Signup'
import ownersignup from './Signup/OwnerSignup';
import {Route} from 'react-router-dom';
import HomePage from './Landing Page/HomePage';
import home from './Home/home';
import profile from './Profile/profile';
import homeOwner from './Home/homeOwner';
import profileOwner from './Profile/ProfileOwner';
import profileEdit from './Profile/ProfileEdit';
import profileOwnerEdit from './Profile/ProfileEditOwner';
import menuHomePage from './Menu/MenuHomePage';
import addItemPage from './Menu/ItemAddPage';
import removeItemPage from './Menu/ItemRemovePage';
import sectionAddPage from './Menu/SectionAddPage';
import ItemUpdatePage from './Menu/ItemUpdatePage';
import SectionUpdatePage from './Menu/SectionUpdatePage';
import SearchResults from './Buyer/SearchResults';
import ItemSectionUpdate from './Menu/ItemSectionUpdate';
import RestaurantDetailsPage from './Restaurants/RestaurantDetailsPage';
import CheckoutPage from './Restaurants/CheckoutPage';

class Main extends Component {
    render() {
        return(
            <div>
                <Route exact path = "/" component = {HomePage} />
                <Route path = "/login" component = {Login} />
                <Route path = "/Signup" component = {signup} />
                <Route path = "/OwnerSignup" component = {ownersignup} />
                <Route path = "/home" component = {home} />
                <Route path = "/homeOwner" component = {homeOwner} />
                <Route path = "/profile/:id" component = {profile} />
                <Route path = "/profileOwner/:id" component = {profileOwner} />
                <Route path = "/profileEdit/:id" component = {profileEdit} />
                <Route path = "/ProfileEditOwner/:id" component = {profileOwnerEdit} />
                <Route path = "/MenuHomePage" component = {menuHomePage} />
                <Route path = "/ItemAddPage" component = {addItemPage} />
                <Route path = "/ItemRemovePage" component = {removeItemPage} />
                <Route path = "/SectionAddPage" component = {sectionAddPage} />
                <Route path = "/ItemUpdatePage" component = {ItemUpdatePage} />
                <Route path = "/SectionUpdatePage/:id" component = {SectionUpdatePage} />
                <Route path = "/SearchResults" component = {SearchResults} />
                <Route path = "/ItemSectionUpdate" component = {ItemSectionUpdate} />
                <Route path = "/RestaurantDetailsPage/:id" component = {RestaurantDetailsPage} />
                <Route path = "/CheckoutPage" component = {CheckoutPage} />
            </div>
        )
    }
}

export default Main;