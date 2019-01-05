import ReactOnRails from 'react-on-rails';
import React, { Component } from 'react';


import Navbar from './Navbar.js';
import HomeNavLinks from './HomeNavLinks.js'
import Section1 from './Section1.js';

class Checkout extends React.Component {

    render() {

        let navLinks = <HomeNavLinks/>
        let userLoggedInStatus = <div> </div>

        return (
            <div>
            <Navbar
               navLinks = {navLinks}
               userLoggedInStatus={userLoggedInStatus} />
            <Section1 />
            </div>
        )
    }

}

export default Checkout 