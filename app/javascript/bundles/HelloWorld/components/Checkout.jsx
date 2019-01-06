import ReactOnRails from 'react-on-rails';
import StripeCheckout from 'react-stripe-checkout'
import React, { Component } from 'react';


import Navbar from './Navbar.js';
import HomeNavLinks from './HomeNavLinks.js'
import Section1 from './Section1.js';

class Checkout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cart: undefined,
            totalPrice: undefined
            
        }
    }

    componentDidMount() {

       

        $.ajax({
            method: "GET",
            url: `/carts`,
            dataType: 'json',
            success: this.response
        })
    }

    response = (json) => {

        // let totalPrice = (json) => this.totalPrice(json)

        let totalPrice = this.totalPrice(json)



        console.log(json)

        this.setState({
            cart: json,
            totalPrice: totalPrice


        } 
        )


    }

    totalPrice = (cartObj) => {

        let that = this

        let price
        let quantity

        let cartItems = Object.keys(cartObj)
        console.log(cartItems)
        let totalPrice = cartItems.map((item, index) => {

            price = parseInt(cartObj[item].price)
            quantity = cartObj[item].quantity

            return price * quantity
        }).reduce((sum, price) => {
            return sum + price;
        });

        console.log(totalPrice)

        return totalPrice

    }

    render() {

        let navLinks = <HomeNavLinks/>
        let userLoggedInStatus = <div> </div>

        return (
            <div>
            <Navbar
               navLinks = {navLinks}
               userLoggedInStatus={userLoggedInStatus} />
            <Section1 />
            <StripeCheckout
                amount={this.state.totalPrice * 100}
            />
            </div>
        )
    }

}

export default Checkout 