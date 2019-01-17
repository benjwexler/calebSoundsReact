import ReactOnRails from 'react-on-rails';
import React, { Component } from 'react';
import Modal from './Modal.js';
import Navbar from './Navbar.js';
import './test.css'
import HomeNavLinks from './HomeNavLinks.js'
import Section1 from './Section1.js';
import Section2 from './Section2.js';
import Sample from './Sample.js';
import DrumMachineSection from './DrumMachineSection.jsx';
import Item from './Item.jsx';
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

        
        return (
            <div>
                <Navbar/>
                <Section1/>
                <Section2
                    samples = {samples}
                />
            </div>
        )
        
        
     
    }
}

export default App 