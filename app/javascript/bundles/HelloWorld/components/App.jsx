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

        this.compare = (a, b) => {
            const timestampA = this.state.cart[a].timestamp

            const timestampB = this.state.cart[b].timestamp

            let comparison = 0;

            if (timestampA > timestampB) {
                comparison = 1;
            } else if (timestampA <= timestampB) {
                comparison = -1;
            }
            return comparison;

        }

        this.state = {
            userLoggedIn: props.isLoggedIn,
            modalContent: 'Sign Up',
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
            currentTrack: undefined,
            currentlyPlaying: false,
            cart: undefined
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
                 }, that.bindWidget)
              
                
            } ,
            error: function(xhr) { 
            }, 
            dataType: "json"
          });

          $.ajax({
            method: "GET",
            url: `/carts`,
            dataType: 'json',
            success: this.response
        })
     }

     bindWidget = () => {
     console.log("updated!")
        let soundcloudWidget
        let that = this 
        if(this.state.counter === 7) {
            // console.log(document.getElementById("playAndPauseIcon1"))

            let tracks = document.querySelectorAll('.playAndPauseIcon');
            let soundclouds = document.querySelectorAll('.soundclouds')

            // console.log(soundclouds)

            for(let i=0; i<soundclouds.length; i++) {
                // console.log(soundclouds[i].id)
                soundcloudWidget  = soundclouds[i]
  window[`widget${i}`] = SC.Widget(soundcloudWidget);
//   console.log(soundcloudWidget)

  window[`widget${i}`].bind(SC.Widget.Events.READY, function () {



});

            }
        }}

        response = (json) => {

            let that = this
    
            let totalPrice 
            // if(Object.keys(json).length !== 0) {
    
            //     totalPrice = this.totalPrice(json)
            // } else {
            //     totalPrice = 0
            // }
    
    
            console.log(json)
    
            this.setState({
                cart: json,
    
            }
            )
    
    
    
        }

        addToCart = () => {
            let kitId
            let coverArtPic
            let data
            let price
            let name
            let that = this
    
            console.log("Hitting this function?")
    
    
            data = `authenticity_token=${this.state.railsToken}&kitId=${this.state.kitId}&coverArtPic=${this.state.kitPic}&price=${this.state.kitPrice}&name=${this.state.kitName}`
            data = `authenticity_token=${this.state.railsToken}&kitId=${"1"}&price=${"25.99"}&name=${"blahblah"}`
         
    
            $.ajax({
                method: "POST",
                beforeSend: function(request) {
                    request.setRequestHeader("X-CSRF-Token", that.state.railsToken);
                  },
                url: `/carts`,
                data: data,
                dataType: 'json',
                success: this.response
            })

            this.toggleCart()


            // console.log(this.state)
            this.setState({ 
                showCart: true,
                showMobileNav: false
            }, this.checkToggleCart)
    
    
            // this.setState({
            //     showCart: true,
            // })
    
    
        }

        deleteItem = (e) => {
    
            let kitId = e.target.dataset.kitId
            console.log("about to delete")
        
            let that = this
    
            // let kitId = this.state.kitId
        
            $.ajax({
              method: "DELETE",
              beforeSend: function(request) {
                request.setRequestHeader("X-CSRF-Token", that.state.railsToken);
              },
              url: `carts/${1}`,
              data: `authenticity_token=${that.state.railsToken}`,
              dataType: 'json',
              success: that.response
            })
        
          }

          clearCart = () => {
            let that = this
    
            // let kitId = this.state.kitId
        
            $.ajax({
              method: "DELETE",
              beforeSend: function(request) {
                request.setRequestHeader("X-CSRF-Token", that.state.railsToken);
              },
              url: `carts/all`,
              data: `authenticity_token=${that.state.railsToken}`,
              dataType: 'json',
              success: that.response
            })
          }
    

     showCircle = (e) => {
        //  console.log("showCircle")
        //  console.log(e.currentTarget.childNodes)
        //  console.log(e.currentTarget.dataset.trackNumber)

         let currentHoverTrack = parseInt(e.currentTarget.dataset.trackNumber)

        //  console.log(currentHoverTrack)
         this.setState({ 
            currentHoverTrack: currentHoverTrack
        })

     }

     hideCircle = () => {
        this.setState({ 
            currentHoverTrack: undefined
        })
     }

     setCurrentTrack = (e) => {
        //  console.log("Playing or paused")
        //  console.log(e.currentTarget.parentNode.dataset.trackNumber)

         let currentTrack = parseInt(e.currentTarget.parentNode.dataset.trackNumber)
         let currentlyPlaying = true 

         if(this.state.currentlyPlaying && (this.state.currentTrack === currentTrack)) {
            currentlyPlaying = false 
         }

        //  console.log(currentTrack)
         this.setState({ 
            currentTrack: currentTrack,
            currentlyPlaying: currentlyPlaying
        }, this.playPauseTrack(currentTrack))
     }

     playPauseTrack = (currentTrack) => {
        //  console.log(this.state.tracksObj[this.state.currentTrack])
        //  console.log(this.state.tracksObj[this.state.currentTrack].soundcloud_id)

         if(this.state.currentTrack === currentTrack) {
            window[`widget${currentTrack}`].toggle()
            // console.log("pausing")
            // currentTrack = undefined 
            // isTrackPlaying = !this.state.isTrackPlaying
        } else {
            // console.log("playing")
            window[`widget${currentTrack}`].seekTo(0)
            window[`widget${currentTrack}`].play()
            // isTrackPlaying = true
        }
     }

  
       


     handleResize = () => {

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

    setModalContent = (e) => {

        console.log(e.currentTarget.id)

        let modalContent = "Sign Up"

        if(e.currentTarget.id === "switchToLogin") {
            modalContent = "Log In"
        }

        this.setState({
            modalContent: modalContent,
        }
        )
        // document.getElementById("modalButton").click()
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

        // console.log(this.state)
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
                let currentTrack = false 

                if(i === that.state.currentHoverTrack) {
                    currentHoverTrack = "showCircle"
                    currentHoverPlayIcon =  "showPlayIcon"
                }

                if(i === that.state.currentTrack) {
                    currentTrack = true 
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
                currentTrack = {currentTrack}
                currentlyPlaying = {this.state.currentlyPlaying}
                currentHoverTrack = {currentHoverTrack}
                currentHoverPlayIcon = {currentHoverPlayIcon}
                hideCircle = {() => this.hideCircle()}
                playPauseTrack = {this.setCurrentTrack}
                soundcloud_id = {that.state.tracks[i].soundcloud_id}


                />
            )
            }

       

            tracks = <React.Fragment>{tracks}</React.Fragment>;
            latestTracks = <Section3 tracks = {tracks} />
        }

        let unsortedItems
        if (this.state.cart) {
            unsortedItems = Object.keys(this.state.cart)
            unsortedItems.sort(this.compare)
        } else {
            unsortedItems = []
        }
        let sum = 0

        let items = (

            <React.Fragment>

        {unsortedItems.map((item, index) => {
            sum += this.state.cart[item].price * this.state.cart[item].quantity
            console.log(this.state.cart[item].quantity * 5)
            return <Item
                quantity={this.state.cart[item].quantity}
                name={this.state.cart[item].name}
                key={item}
               
                deleteItem={(e) => this.deleteItem(e)}
                kitId={item}
                kitData={item}
                increaseQuantity={(e) => this.addToCart(e)}
                decreaseQuantity={(e) => this.decreaseQuantity(e)}
                itemPrice={convertToUsCurrency.format(this.state.cart[item].price * this.state.cart[item].quantity)}
            />
        })}

        </React.Fragment>

    )

        
        

        // let items = []
        // let totalPrice = 0
        // let itemPrice = 75

        // for(let i=0; i<2; i++) {
        //     items.push(<Item
        //         itemPrice = {itemPrice}
        //     />)

        //     totalPrice+= itemPrice
        // }

        // items = <React.Fragment>{items}</React.Fragment>;

        console.log(items)
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
            totalPrice = {convertToUsCurrency.format(sum)}
            cartTransitionEnd = {this.cartTransitionEnd}
            cartHeightZero = {cartHeightZero}
            click = {this.clearCart}
            />

        let modal 

        let loginInSwitch = "inactiveBtn"
        let signUpSwitch = "switchFormBtn"

        if(this.state.modalContent === 'Log In') {
            loginInSwitch = "switchFormBtn"
            signUpSwitch = "inactiveBtn"
        }

        if(this.state.showModal) {
            modal = <Modal 
            exitModal = {this.toggleModal}
            setModalContent = {this.setModalContent}
            submitBtnText = {this.state.modalContent}
            loginInSwitch = {loginInSwitch}
            signUpSwitch = {signUpSwitch}

            />
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
                    click = {this.addToCart}
                />
                {latestTracks}
                <Footer/>
            </div>
        )
        
        
     
    }
}

export default App 