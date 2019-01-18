import ReactOnRails from 'react-on-rails';
import React, { Component } from 'react';
import Modal from './Modal.js';
import Navbar from './Navbar.js';
import './test.css';
import HomeNavLinks from './HomeNavLinks.js'
import Section1 from './Section1.js';
import MobileNav from './MobileNav.js';
import Cart from './Cart.js'
import Section2 from './Section2.js';
import Section3 from './Section3.js';
import Sample from './Sample.js';
import Track from './Track.js';
import Footer from './Footer.js';
import DrumMachineSection from './DrumMachineSection.jsx';
import Item from './Item.js';
import { LinkedList, Node } from './linkedList.js';
import StripeCheckout from 'react-stripe-checkout';

const convertToUsCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})


// import './Devise.css';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userLoggedIn: props.isLoggedIn,
            modalContent: 'login',
            railsToken: ReactOnRails.authenticityToken(),
            ErrorMessage: undefined,
            cart: undefined,
            totalPrice: undefined,
            showCart: false,
            cartHeightZero: true,
            showModal: false,
            showMobileNav: false,
            kits: undefined,
            kitPic: undefined,
            kitName: undefined,
            kitPrice: undefined,
            kitId: undefined,
            kitSounds: undefined,
            pads: undefined,
            context: undefined,
            gainNode: undefined
        }
        

        
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
     }

     handleResize = () => {
         console.log(window.innerWidth)

         if(window.innerWidth> 1120) [
            this.setState({ 
                showMobileNav: false,
            })
         ]
     }

    toggleModal = () => {
        this.setState({ 
            showModal: !this.state.showModal,
            showCart: false,
            showMobileNav: false
        })
    }

    toggleMobileNav = () => {

        let that = this
        this.setState({ 
            showMobileNav: !that.state.showMobileNav,
            showCart: false
        })
    }

    toggleCart = () => {

        let that = this

        console.log(this.state)
        this.setState({ 
            showCart: !that.state.showCart,
            showMobileNav: false
        }, this.checkToggleCart)

       

    }

    checkToggleCart = () => {
        if(this.state.showCart) {
            this.setState({ 
                cartHeightZero: false
            })
        } 
    }

    cartTransitionEnd = () => {
        if(!this.state.showCart) {
            this.setState({ 
                cartHeightZero: true
            })
        } 

    }


        

       


    render() {

        let samples = []
        let oddRow = ""

        for(let i=0; i<6; i++) {
            if(i%2===1) {
                oddRow = "oddRow"
            } else {
                oddRow = ""
            }
            samples.push(<Sample oddRow = {oddRow}/>)
        }

        samples = <React.Fragment>{samples}</React.Fragment>;

        let tracks = []

        for(let i=0; i<6; i++) {
            tracks.push(<Track/>)
        }

        tracks = <React.Fragment>{tracks}</React.Fragment>;

        let items = []
        let totalPrice = 0
        let itemPrice = 75

        for(let i=0; i<2; i++) {
            items.push(<Item
                itemPrice = {itemPrice}
            />)

            totalPrice+= itemPrice
        }

        items = <React.Fragment>{items}</React.Fragment>;

        let showCartBoolean

        let cartHeightZero

        if(this.state.showCart) {
            showCartBoolean = "showCart"
        } else {
            showCartBoolean = "hideCart"
        }  

        if(this.state.cartHeightZero) {
            cartHeightZero = "cartHeightZero"
        }

        

        let cart = <Cart
            showCartBoolean = {showCartBoolean}
            items = {items}
            totalPrice = {totalPrice}
            cartTransitionEnd = {this.cartTransitionEnd}
            cartHeightZero = {cartHeightZero}
            />

        let modal 

        if(this.state.showModal) {
            modal = <Modal exitModal = {this.toggleModal}/>
        }

        let mobileNavToggle = "hideMobileNav"

        if(this.state.showMobileNav) {
            mobileNavToggle ="showMobileNav"
        }


        
        return (
            <div>
                {modal}
                {cart}
                <Navbar
                    toggleCart = {this.toggleCart}
                    openModal = {this.toggleModal}
                    toggleMobileNav = {this.toggleMobileNav}
                />
                <MobileNav
                    mobileNavToggle = {mobileNavToggle}
                />
                <Section1/>
                <Section2
                    samples = {samples}
                />
                <Section3
                    tracks = {tracks}
                />
                <Footer/>
            </div>
        )
        
        
     
    }
}

export default App 