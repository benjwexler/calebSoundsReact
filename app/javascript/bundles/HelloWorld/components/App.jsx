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
            tracks: undefined,
            kits: undefined,
            kitPic: undefined,
            kitName: undefined,
            kitPrice: undefined,
            kitId: undefined,
            kitSounds: undefined,
            pads: undefined,
            context: undefined,
            gainNode: undefined,
            tracksObj: undefined,
            currentHoverTrack: undefined,
        }
        

        
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
        let that = this

        $.ajax({
            type: "GET",
            url: "http://localhost:3000/tracks?limit=4",
            success: function(json){
                console.log(json)
                let newTracksObj = {}
                json.forEach(function(track, index){
                    console.log(json[index])
                    newTracksObj[index] = json[index]
                })
                that.setState({
                 tracks: json,
                 tracksObj: newTracksObj,
                 counter: 7
                 })
              
                
            } ,
            error: function(xhr) { 
            }, 
            dataType: "json"
          });
     }

     showCircle = (e) => {
         console.log("showCircle")
        //  console.log(e.currentTarget.childNodes)
        //  console.log(e.currentTarget.dataset.trackNumber)

         let currentHoverTrack = parseInt(e.currentTarget.dataset.trackNumber)

         console.log(currentHoverTrack)
         this.setState({ 
            currentHoverTrack: currentHoverTrack
        })

     }

     hideCircle = () => {
        this.setState({ 
            currentHoverTrack: undefined
        })
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

        let latestTracks
        let tracks = []

        let that = this 

       

        


        if(this.state.tracks) {

            for(let i=0; i<that.state.tracks.length; i++) {

                let spotifyNoStreaming
                let soundcloudNoStreaming
                let appleMusicNoStreaming
                let youtubeNoStreaming

                let currentHoverTrack
                let currentHoverPlayIcon

                if(i === that.state.currentHoverTrack) {
                    currentHoverTrack = "showCircle"
                    currentHoverPlayIcon =  "showPlayIcon"
                }

                if (!that.state.tracks[i].spotify_url) {
                    spotifyNoStreaming = "noStreamingLink"
                }

                if (!that.state.tracks[i].soundcloud_url) {
                    soundcloudNoStreaming = "noStreamingLink"
                }

                if (!that.state.tracks[i].apple_music_url) {
                    appleMusicNoStreaming = "noStreamingLink"
                }

                if (!that.state.tracks[i].youtube_url) {
                    console.log(that.state.tracks[i].youtube_url)
                    youtubeNoStreaming = "noStreamingLink"
                }

                tracks.push(
                <Track
                name = {that.state.tracks[i].name}
                spotifyLink = {that.state.tracks[i].spotify_url}
                spotifyNoStreaming = {spotifyNoStreaming}
                soundcloudLink = {that.state.tracks[i].soundcloud_url}
                soundcloudNoStreaming = {soundcloudNoStreaming}
                appleMusicNoStreaming = {appleMusicNoStreaming}
                appleMusicLink = {that.state.tracks[i].apple_music_url}
                youtubeLink = {that.state.tracks[i].youtube_url}
                youtubeNoStreaming = {youtubeNoStreaming}
                image = {that.state.tracks[i].image}
                showCircle = {this.showCircle}
                trackNumber = {i}
                currentHoverTrack = {currentHoverTrack}
                currentHoverPlayIcon = {currentHoverPlayIcon}
                hideCircle = {() => this.hideCircle()}

                />
            )
            }

       

            tracks = <React.Fragment>{tracks}</React.Fragment>;
            latestTracks = <Section3 tracks = {tracks} />
        }

        
        

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
                {latestTracks}
                <Footer/>
            </div>
        )
        
        
     
    }
}

export default App 