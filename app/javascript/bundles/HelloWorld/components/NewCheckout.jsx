import ReactOnRails from "react-on-rails";
import React, { Component } from "react";
import Modal from "./Modal.js";
import Navbar from "./Navbar.js";
import "./test.css";
import HomeNavLinks from "./HomeNavLinks.js";
import Section1 from "./Section1.js";
import MobileNav from "./MobileNav.js";
import Cart from "./Cart.js";
import Section2 from "./Section2.js";
import Section3 from "./Section3.js";
import Sample from "./Sample.js";
import Track from "./Track.js";
import Footer from "./Footer.js";
import DrumMachineSection from "./DrumMachineSection.jsx";
import Item from "./Item.js";
import { LinkedList, Node } from "./linkedList.js";
import StripeCheckout from "react-stripe-checkout";


const convertToUsCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

// import './Devise.css';

class NewCheckout extends React.Component {
  constructor(props) {
    super(props);

    this.compare = (a, b) => {
      const timestampA = this.state.cart[a].timestamp;

      const timestampB = this.state.cart[b].timestamp;

      let comparison = 0;

      if (timestampA > timestampB) {
        comparison = 1;
      } else if (timestampA <= timestampB) {
        comparison = -1;
      }
      return comparison;
    };

    this.state = {
      showLoadingGif: true,
      userLoggedIn: props.isLoggedIn,
      userId: props.userId,
      userEmail: undefined,
      userFirstName: props.userFirstName,
      userLastName: props.userLastName,
      relativePath: undefined,
      modalContent: "Sign Up",
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
      kitId: 10,
      pads: undefined,
      context: undefined,
      gainNode: undefined,
      tracksObj: undefined,
      currentHoverTrack: undefined,
      currentTrack: undefined,
      currentlyPlaying: false,
      cart: undefined,
      kitSounds: [],
      sampleOffset: 0,
      currentSample: undefined,
      sampleCurrentlyPlaying: false,
      transition: true,
      showAccountDropdown: false
    };
  }

  getRelativePath = () => {
    let path = window.location.pathname+window.location.search
    this.setState({
      relativePath: path
      });
    
  }

  onToken = (token) => {

    const data = {...token, amount: this.state.totalPrice * 100, userId: this.state.userId, kitId: this.state.kitId}

    let that = this 

        $.ajax({
            method: "POST",
            beforeSend: function(request) {
                request.setRequestHeader("X-CSRF-Token", that.state.railsToken);
              },
            url: `/charges`,
            data: data,
            dataType: 'json',
            success: this.tokenResponse
        })

       

    }

    tokenResponse = (json) => {
        console.log(json)
    }

  getUserId = () => {
    let that = this;
    fetch(`/users/x.json`, {
      headers: {
          "Content-Type": "application/json"
        }
  })
    .then(function(response) {
      // console.log(response.json())
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson.user_id)
      that.setState({
        userId: myJson.user_id,
        userEmail: myJson.user_email
      });
    })
   

    }

  

  loadSounds = (kitId) => {
    // this.setState({ in: false });
    let that = this;
    let kitSounds 
    let padsObj = {};

    fetch(`/kits/${10}?limit=6&offset=${that.state.sampleOffset}`, {
        headers: {
            "Content-Type": "application/json"
          }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        kitSounds = that.state.kitSounds.concat(myJson)
        that.setState({
            kitSounds: kitSounds,
            sampleOffset: that.state.sampleOffset + 6,
            transition: false
            }, that.transition);
          })

      }

      // getUserInfo = () => {
      //   // this.setState({ in: false });
      //   let that = this;
      //   let kitSounds 
      //   let padsObj = {};
    
      //   fetch(`/kits/${10}?limit=6&offset=${that.state.sampleOffset}`, {
      //       headers: {
      //           "Content-Type": "application/json"
      //         }
      //   })
      //     .then(function(response) {
      //       return response.json();
      //     })
      //     .then(function(myJson) {
      //       kitSounds = that.state.kitSounds.concat(myJson)
      //       that.setState({
      //           kitSounds: kitSounds,
      //           sampleOffset: that.state.sampleOffset + 6,
      //           transition: false
      //           }, that.transition);
      //         })
    
      //     }
      

     

    // $.ajax({
    //   type: "GET",
    //   url: `http://localhost:3000/kits/${7}?limit=6`,
    //   success: function(json) {
    //     // json.forEach((sound, index) => {
    //     //     padsObj[index] = sound.soundfile
    //     // })

    //     that.setState({
    //       kitSounds: json
    //     });
    //   },
    //   error: function(xhr) {},
    //   dataType: "json"
    // });
  

  loadMoreSounds = () => {

  }

  transition = () => {
    this.setState({transition: true})


  }




responseTotalPrice = (json) => {

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

    price = parseFloat(cartObj[item].price)
    quantity = cartObj[item].quantity

    return price * quantity
}).reduce((sum, price) => {
    return sum + price;
});

console.log(totalPrice)

return totalPrice

}

    componentDidMount() {
      //  this.setState({ in: !this.state.transition });

      this.getUserId();
      $.ajax({
        method: "GET",
        url: `/carts`,
        dataType: 'json',
        success: this.responseTotalPrice
    })
      this.getRelativePath()
      document.querySelector(".StripeCheckout").click()
    window.addEventListener("resize", this.handleResize);
    let that = this;


    fetch(`/carts`, {
      headers: {
          "Content-Type": "application/json"
        }
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson)
      that.response(myJson)
    });


  }

  bindWidget = () => {
    let soundcloudWidget;
    let that = this;
    if (this.state.counter === 7) {
      // console.log(document.getElementById("playAndPauseIcon1"))

      let tracks = document.querySelectorAll(".playAndPauseIcon");
      let soundclouds = document.querySelectorAll(".soundclouds");

      // console.log(soundclouds)

      for (let i = 0; i < soundclouds.length; i++) {
        // console.log(soundclouds[i].id)
        soundcloudWidget = soundclouds[i];
        window[`widget${i}`] = SC.Widget(soundcloudWidget);
        //   console.log(soundcloudWidget)

        window[`widget${i}`].bind(SC.Widget.Events.READY, function() {});
      }
    }
  };

  response = (json) => {
    let that = this;

    this.setState({
      cart: json
    });
  };

  setSample = (e) => {
    let sampleNumber = e.currentTarget.dataset.sampleNumber

    let sampleCurrentlyPlaying = true;

    // console.log(sampleNumber)

    if (this.state.sampleCurrentlyPlaying && (this.state.currentSample === parseInt(sampleNumber))) {
      sampleCurrentlyPlaying = false;
    }

    // this.setState({
    //   sampleCurrentlyPlaying: sampleCurrentlyPlaying
    // });

    this.setState({
      currentSample: parseInt(sampleNumber),
      sampleCurrentlyPlaying: sampleCurrentlyPlaying
    }, this.playSample);
  }

  playSample = (sampleNumber) => {
    let audioPlayer = document.getElementById("audioPlayer");
    // let sampleCurrentlyPlaying = true;



    // if (this.state.sampleCurrentlyPlaying && (this.state.currentSample === parseInt(sampleNumber))) {
    //   sampleCurrentlyPlaying = false;
    // }

    // this.setState({
    //   sampleCurrentlyPlaying: sampleCurrentlyPlaying
    // });

    if(this.state.currentTrack || this.state.currentTrack === 0) {
     
      window[`widget${this.state.currentTrack}`].pause()
      window[`widget${this.state.currentTrack}`].seekTo(0);
      
      
    } 

    this.setState({
      currentlyPlaying: false,
      // sampleCurrentlyPlaying: sampleCurrentlyPlaying
    });

    let audioPlayerState = audioPlayer.readyState

    // while(audioPlayerState !== 4) {
      
    //   audioPlayerState = audioPlayer.readyState
    //   console.log(audioPlayerState)
    // }

    // var playPromise = audioPlayer.play();

    if(audioPlayer.paused) {
      audioPlayer.play()
      .then(function() {
        // Automatic playback started!

      })
    } else {
      audioPlayer.pause()
    }

    // if (playPromise !== undefined) {
    //   playPromise.then(_ => {
    //     // Automatic playback started!
    //     // Show playing UI.
       
    //   })
    //   .catch(error => {
    //     console.log("PROBLEMS")
    //     // Auto-play was prevented
    //     // Show paused UI.
    //   });
    // }
    
  
    

  }

  audioEnded = () => {
    this.setState({
      sampleCurrentlyPlaying: false
    });
  }

  addToCart = () => {
    let kitId;
    let coverArtPic;
    let data;
    let price;
    let name;
    let that = this;


    // data = `authenticity_token=${this.state.railsToken}&kitId=${
    //   this.state.kitId
    // }&coverArtPic=${this.state.kitPic}&price=${this.state.kitPrice}&name=${
    //   this.state.kitName
    // }`;
    // data = `authenticity_token=${that.state.railsToken}&kitId=${"1"}&price=${"25.99"}&name=${"4blahblah"}`;

    data = {
    // "authenticity_token":that.state.railsToken,
    "kitId": 1,
    "price": 25.99,
    "name": "5blahblah"
    }


    fetch('/carts', {
        method: "POST",
        body: JSON.stringify(data),
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": that.state.railsToken,
            
          }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        
        that.setState({
            cart: myJson
          });
      })
      .catch((err) => {
        // Handle any error that occurred in any of the previous
        // promises in the chain.
      });
      



    // $.ajax({
    //   method: "POST",
    //   beforeSend: function(request) {
    //     request.setRequestHeader("X-CSRF-Token", that.state.railsToken);
    //   },
    //   url: `/carts`,
    //   data: data,
    //   dataType: "json",
    //   success: this.response
    // });

    this.toggleCart();

    // console.log(this.state)
    this.setState(
      {
        showCart: true,
        showMobileNav: false,
        showAccountDropdown: false
      },
      this.checkToggleCart
    );

    // this.setState({
    //     showCart: true,
    // })
  };

  deleteItem = e => {
    let kitId = e.target.dataset.kitId;

    let that = this;

    // let kitId = this.state.kitId

    fetch(`carts/${1}`, {
      method: "DELETE",
      credentials: 'same-origin',
      headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": that.state.railsToken,
          
        }
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      
      that.response(myJson) 
      
    })
    .catch((err) => {
      // Handle any error that occurred in any of the previous
      // promises in the chain.
    });

    // $.ajax({
    //   method: "DELETE",
    //   beforeSend: function(request) {
    //     request.setRequestHeader("X-CSRF-Token", that.state.railsToken);
    //   },
    //   url: `carts/${1}`,
    //   data: `authenticity_token=${that.state.railsToken}`,
    //   dataType: "json",
    //   success: that.response
    // });
  };

  clearCart = () => {
    let that = this;

    // let kitId = this.state.kitId

    fetch(`carts/all`, {
      method: "DELETE",
      credentials: 'same-origin',
      headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": that.state.railsToken,
          
        }
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {

      that.response(myJson) 
      
    })
    .catch((err) => {
      // Handle any error that occurred in any of the previous
      // promises in the chain.
    });
  }
  //   $.ajax({
  //     method: "DELETE",
  //     beforeSend: function(request) {
  //       request.setRequestHeader("X-CSRF-Token", that.state.railsToken);
  //     },
  //     url: `carts/all`,
  //     data: `authenticity_token=${that.state.railsToken}`,
  //     dataType: "json",
  //     success: that.response
  //   });
  // };

  showCircle = e => {
    //  console.log("showCircle")
    //  console.log(e.currentTarget.childNodes)
    //  console.log(e.currentTarget.dataset.trackNumber)

    let currentHoverTrack = parseInt(e.currentTarget.dataset.trackNumber);

    //  console.log(currentHoverTrack)
    this.setState({
      currentHoverTrack: currentHoverTrack
    });
  };

  hideCircle = () => {
    this.setState({
      currentHoverTrack: undefined
    });
  };

  setCurrentTrack = e => {
    //  console.log("Playing or paused")
    //  console.log(e.currentTarget.parentNode.dataset.trackNumber)

    let currentTrack = parseInt(e.currentTarget.parentNode.dataset.trackNumber);
    let currentlyPlaying = true;

    if (
      this.state.currentlyPlaying &&
      this.state.currentTrack === currentTrack
    ) {
      currentlyPlaying = false;
    }

    //  console.log(currentTrack)
    this.setState(
      {
        currentTrack: currentTrack,
        currentlyPlaying: currentlyPlaying
      },
      this.playPauseTrack(currentTrack)
    );
  };

  playPauseTrack = currentTrack => {
    //  console.log(this.state.tracksObj[this.state.currentTrack])
    //  console.log(this.state.tracksObj[this.state.currentTrack].soundcloud_id)

    let audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.pause()
    audioPlayer.currentTime = 0;

    this.setState({
      sampleCurrentlyPlaying: false
    });

    if (this.state.currentTrack === currentTrack) {
      window[`widget${currentTrack}`].toggle();
      // console.log("pausing")
      // currentTrack = undefined
      // isTrackPlaying = !this.state.isTrackPlaying
    } else {
      // console.log("playing")
      window[`widget${currentTrack}`].seekTo(0);
      window[`widget${currentTrack}`].play();
      // isTrackPlaying = true
    }


  };

  handleResize = () => {
    if (window.innerWidth > 1120){
        this.setState({
          showMobileNav: false
        })
        
      } else {
        this.setState({
          showAccountDropdown: false
        })
      }
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
      showCart: false,
      showMobileNav: false
    });
  };

  setModalContent = e => {

    let modalContent = "Sign Up";

    if (e.currentTarget.id === "switchToLogin") {
      modalContent = "Log In";
    }

    this.setState({
      modalContent: modalContent
    });
    // document.getElementById("modalButton").click()
  };

  submitForm = e => {
    let that = this;
    e.preventDefault();
    let signUpObj = {};
    signUpObj.utf8 = "✓";
    signUpObj.authenticity_token = that.state.railsToken;
    signUpObj["user[email]"] = document.getElementById("userEmailInput").value;
    signUpObj["user[password]"] = document.getElementById("userPasswordInput").value;
    signUpObj.commit = "Log in";
    // signUpObj['CSRFToken'] = that.state.railsToken
    let url = "/users/sign_in.json";
    if (this.state.modalContent === "Sign Up") {
      url = "/users.json";
    signUpObj["user[password_confirmation]"] = document.getElementById("userPasswordConfirmationInput").value;

    }

  //   fetch(url, {
  //     method: "POST",
  //     mode: 'cors',
  //     body: JSON.stringify(signUpObj),
  //     credentials: 'same-origin',
  //     headers: {
  //         "Content-Type": "application/json",
  //         'Accept': 'application/json',
  //         'Access-Control-Allow-Origin':'*',
  //         "X-CSRF-Token": that.state.railsToken,
  //         "Authorization": that.state.railsToken,
          
  //       }
  // })
  //   .then(function(response) {
  //     return response.json();
  //   })
  //   .then(function(myJson) {
      
  //     console.log("wtf")
      
  //     that.setState(
  //       {
  //         railsToken: myJson.csrfToken,
  //         userLoggedIn: true,
  //         errorMessage: undefined,
  //         cart: JSON.parse(myJson.cart)
  //       },
  //       () => {
  //         console.log(that.state);
  //         that.setState({
  //           showModal: false
  //         })
  //       }
  //     );
  //   })
  //   .catch((err) => {
  //     // Handle any error that occurred in any of the previous
  //     // promises in the chain.
  //     console.log(err)
  //     console.log("there was an error")
  //   });
      
    $.ajax({
      type: "POST",

      url: url,
      data: signUpObj,
      success: function(json) {
        if (json.errorMessage) {
          that.setState({
            errorMessage: json.errorMessage
          });
        } else {
          console.log("signed in or signed up");
          // document.getElementById("modalButton").click();
          console.log(json);
          that.setState(
            {
              railsToken: json.csrfToken,
              userLoggedIn: true,
              userId: JSON.parse(json.user_id),
              errorMessage: undefined,
              cart: JSON.parse(json.cart)
            },
            () => {
              console.log(that.state);
              that.setState({
                showModal: false
              })
            }
          );
        }
      },
      error: function(xhr) {
        that.setState({
          errorMessage: "Sorry, could not sign you in"
        });
      },
      dataType: "json"
    });
  };

  signOut = () => {
    let that = this
    $.ajax({
        type: "POST",
        url: "/users/sign_out",
        data: { "_method": "delete", "authenticity_token": that.state.railsToken, "relativePath": that.state.relativePath  },
        success: function (json) {
            console.log("trying to delete")
            console.log(json)

            that.setState({
                userLoggedIn: false,
                railsToken: json.csrfToken,
                cart: json.cart
            })

            window.location.href="/"

        },
        error: function (xhr) {
        },
        dataType: "json"
    });
}


  toggleMobileNav = () => {
    let that = this;
    this.setState({
      showMobileNav: !that.state.showMobileNav,
      showCart: false
    });
  };

  toggleCart = () => {
    let that = this;

    // console.log(this.state)
    this.setState(
      {
        showCart: !that.state.showCart,
        showMobileNav: false,
        showAccountDropdown: false,
      },
      this.checkToggleCart
    );
  };

  toggleAccountDropdown = () => {
    let that = this;

    // console.log(this.state)
    this.setState(
      {
        showAccountDropdown: !this.state.showAccountDropdown,
        showCart: false,
        showMobileNav: false
      },
      // this.checkToggleCart
    );
  };

  checkToggleCart = () => {
    if (this.state.showCart) {
      this.setState({
        cartHeightZero: false
      });
    }
  };

  cartTransitionEnd = () => {
    if (!this.state.showCart) {
      this.setState({
        cartHeightZero: true
      });
    }
  };

  onOpened = () => {
    console.log("Opened")

    this.setState({
      showLoadingGif: false
    });
    
  }

  onClosed = () => {
    console.log("closed")
  }

  render() {
    let samples 
    if (this.state.kitSounds.length > 0) {
    samples = [];
    let oddRow = "";
    
    let that = this
    
    // let currentSample = false;
    for (let i = 0; i < this.state.kitSounds.length; i++) {
      let currentSample = false;
      if (i % 2 === 1) {
        oddRow = "oddRow";
      } else {
        oddRow = "";
      }

      

      if (i === that.state.currentSample) {
        currentSample = true;
      }

      samples.push(<Sample 
      oddRow={oddRow} 
      name={this.state.kitSounds[i].filename} 
      soundfile={this.state.kitSounds[i].soundfile} 
      sampleNumber={i} 
      playSample={this.setSample}  
      currentSample={currentSample}
      sampleCurrentlyPlaying={this.state.sampleCurrentlyPlaying}
      inProp={this.state.transition && (i>= this.state.sampleOffset - 6)}
      key={i}
      delay={i * 70}
      />);
    }

    samples = <React.Fragment>{samples}</React.Fragment>;
  }

    let latestTracks;
    let tracks = [];

    let that = this;

    if (this.state.tracks) {
      for (let i = 0; i < that.state.tracks.length; i++) {
        let spotifyNoStreaming;
        let soundcloudNoStreaming;
        let appleMusicNoStreaming;
        let youtubeNoStreaming;

        let currentHoverTrack;
        let currentHoverPlayIcon;
        let currentTrack = false;

        if (i === that.state.currentHoverTrack) {
          currentHoverTrack = "showCircle";
          currentHoverPlayIcon = "showPlayIcon";
        }

        if (i === that.state.currentTrack) {
          currentTrack = true;
        }

        if (!that.state.tracks[i].spotify_url) {
          spotifyNoStreaming = "noStreamingLink";
        }

        if (!that.state.tracks[i].soundcloud_url) {
          soundcloudNoStreaming = "noStreamingLink";
        }

        if (!that.state.tracks[i].apple_music_url) {
          appleMusicNoStreaming = "noStreamingLink";
        }

        if (!that.state.tracks[i].youtube_url) {
          youtubeNoStreaming = "noStreamingLink";
        }

        tracks.push(
          <Track
            name={that.state.tracks[i].name}
            spotifyLink={that.state.tracks[i].spotify_url}
            spotifyNoStreaming={spotifyNoStreaming}
            soundcloudLink={that.state.tracks[i].soundcloud_url}
            soundcloudNoStreaming={soundcloudNoStreaming}
            appleMusicNoStreaming={appleMusicNoStreaming}
            appleMusicLink={that.state.tracks[i].apple_music_url}
            youtubeLink={that.state.tracks[i].youtube_url}
            youtubeNoStreaming={youtubeNoStreaming}
            image={that.state.tracks[i].image}
            showCircle={this.showCircle}
            trackNumber={i}
            currentTrack={currentTrack}
            currentlyPlaying={this.state.currentlyPlaying}
            currentHoverTrack={currentHoverTrack}
            currentHoverPlayIcon={currentHoverPlayIcon}
            hideCircle={() => this.hideCircle()}
            playPauseTrack={this.setCurrentTrack}
            soundcloud_id={that.state.tracks[i].soundcloud_id}
          />
        );
      }

      tracks = <React.Fragment>{tracks}</React.Fragment>;
      latestTracks = <Section3 tracks={tracks} />;
    }

    let unsortedItems;
    if (this.state.cart) {
      unsortedItems = Object.keys(this.state.cart);
      unsortedItems.sort(this.compare);
    } else {
      unsortedItems = [];
    }
    let sum = 0;

    let items = (
      <React.Fragment>
        {unsortedItems.map((item, index) => {
          sum += this.state.cart[item].price * this.state.cart[item].quantity;
          return (
            <Item
              quantity={this.state.cart[item].quantity}
              name={this.state.cart[item].name}
              key={item}
              deleteItem={e => this.deleteItem(e)}
              kitId={item}
              kitData={item}
              increaseQuantity={e => this.addToCart(e)}
              decreaseQuantity={e => this.decreaseQuantity(e)}
              itemPrice={convertToUsCurrency.format(
                this.state.cart[item].price * this.state.cart[item].quantity
              )}
            />
          );
        })}
      </React.Fragment>
    );

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


    let showCartBoolean;

    let cartHeightZero;

    if (this.state.showCart) {
      showCartBoolean = "showCart";
    } else {
      showCartBoolean = "hideCart";
    }

    if (this.state.cartHeightZero) {
      cartHeightZero = "cartHeightZero";
    }

    let cart = (
      <Cart
        showCartBoolean={showCartBoolean}
        items={items}
        totalPrice={convertToUsCurrency.format(sum)}
        cartTransitionEnd={this.cartTransitionEnd}
        cartHeightZero={cartHeightZero}
        click={this.clearCart}
      />
    );

    let modal;

    let loginInSwitch = "inactiveBtn";
    let signUpSwitch = "switchFormBtn";

    if (this.state.modalContent === "Log In") {
      loginInSwitch = "switchFormBtn";
      signUpSwitch = "inactiveBtn";
    }

    if (this.state.showModal) {
      modal = (
        <Modal
          exitModal={this.toggleModal}
          setModalContent={this.setModalContent}
          submitBtnText={this.state.modalContent}
          loginInSwitch={loginInSwitch}
          signUpSwitch={signUpSwitch}
          submit = {this.submitForm}
        />
      );
    }

    let mobileNavToggle = "hideMobileNav";

    if (this.state.showMobileNav) {
      mobileNavToggle = "showMobileNav";
    }

    let audioPlayer
    let currentSampleSrc 
    if(this.state.currentSample || this.state.currentSample === 0) {
      
      currentSampleSrc = this.state.kitSounds[this.state.currentSample].soundfile
    }
    audioPlayer = <audio onEnded={this.audioEnded} id="audioPlayer" autoplay src={currentSampleSrc}  type="audio/wav"/>

    let showAccountDropdown
    
    if(this.state.showAccountDropdown) {
      showAccountDropdown = "showAccountDropdown"
    } else {
      showAccountDropdown = "hideAccountDropdown"
    }

    let fullScreenStyle = {
        height: '100vh',
        width: '100vw',
        border: '1px solid yellow',
        // paddingTop: '200px'
        // marginTop: '200px',
    }

    let nameStyle = {
      fontSize: '20px',
      color: 'black',
      marginBottom: '5px'
      
  }

  let fontBlue = {
    color: 'rgba(45, 51, 221, 0.747)',
    fontSize: '18px' 
  }

    let modalStyle = {
        // margin: 'auto',
        // marginTop: '100px',
        // width: '100%',
        // maxWidth: '600px',
        // height: '400px',
        // border: '1px solid black',
        // background: 'white',
        // borderRadius: '5px',
        // fontFamily: 'Josefin Sans, sans-serif !important',
        // boxSizing: 'border-box',

   
            width: '100%',
            maxWidth: '500px',
            padding: '40px',
            paddingTop: '20px',
            margin: 'auto',
            marginTop: '120px',
            border: 'solid 3px black',
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'center',
            alignItems: 'center',
            color: 'rgba(45, 51, 221, 0.747)'  ,
            backgroundColor: 'white',
            borderRadius: '3%',
            fontFamily: 'Josefin Sans, sans-serif !important',
            boxSizing: 'border-box',
            boxShadow: '1px 3px rgba(0, 0, 0, 0.322)',
            position: 'relative',
            height: '400px'
            /* font-family: 'Fjalla One', sans-serif; */
       
        
        
    
    }

    let linksContainerStyle = {
      display : 'flex',
      height: '200px',
      width: '100%',
      border: '1px solid black'
    }

    let linksContainerStyle2 = {
      display : 'flex',
      height: '100px',
      width: '100%',
      border: '1px solid black'
    }

    let col = {
      width: '30%',
      height: '44px',
      background: 'rgba(45, 51, 221, 0.89)',
      margin: 'auto',
      position: 'relative',
      // border: '1px solid black',
      borderRadius: '25px'
    }

    let centerText = {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'rgba(255, 255, 255, 0.961)',
      fontFamily: 'Fjalla One, sans-serif',
      textAlign: 'center'
    }

    let accountInfoStyle = {
        fontSize: '32px',
        fontFamily: 'Josefin Sans, sans-serif',
        marginBottom: '20px'
    }

    let displayNoneStyle = {
      display: 'none'
    }

    let loadingGifStyle = {
      width: '80%',
      height: '80%',
      margin: 'auto',
    }

    let loadingGif 

    if(this.state.showLoadingGif) {
      loadingGif = <img style={loadingGifStyle} src="/pics/Spinner-1s-200px.gif"/>
    }

  
    return (
      <div>
        {modal}
        {cart}
        <Navbar
          toggleCart={this.toggleCart}
          openModal={this.toggleModal}
          toggleMobileNav={this.toggleMobileNav}
          userLoggedIn = {this.state.userLoggedIn}
          signOut = {this.signOut}
          userId= {this.state.userId}
          showAccountDropdown = {showAccountDropdown}
          toggleAccountDropdown = {this.toggleAccountDropdown}
        />
        <MobileNav mobileNavToggle={mobileNavToggle} />

       

        <div style={fullScreenStyle}> 
            <div style={modalStyle}>
                <div style={accountInfoStyle}>Checkout</div>
                <div style={linksContainerStyle}>
                  {loadingGif}
                  
                </div>
                <div style={linksContainerStyle2}>
                <a style={col} href="/">
                  <div style={centerText}>Back</div>
                </a>
                <a style={col} href={"/users/" + this.state.userId + "/edit"}>
                  <div style={centerText}>Edit Info</div>
                </a>
                <a style={col} href="/users/edit">
                  <div style={centerText}>Change Password</div>
                </a>
                  
                </div>
            </div>
        </div>
        <div style={displayNoneStyle}>
          <StripeCheckout
                  amount={this.state.totalPrice * 100}
                  stripeKey={process.env.stripe_publishable_key}
                  token={this.onToken}
                  email={this.state.userEmail}
                  reconfigureOnUpdate={true}
                  opened={this.onOpened} // called when the checkout popin is opened (no IE6/7)
                  closed={this.onClosed}
              />
        </div>
        
      </div>
    );
  }
}

export default NewCheckout;
