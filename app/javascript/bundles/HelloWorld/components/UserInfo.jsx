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

class UserInfo extends React.Component {
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
      userLoggedIn: props.isLoggedIn,
      userId: props.userId,
      userEmail: props.userEmail,
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
      kitId: undefined,
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


  transition = () => {
    this.setState({transition: true})
  }

    componentDidMount() {
      //  this.setState({ in: !this.state.transition });
      this.getRelativePath()
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


  response = (json) => {
    let that = this;

    this.setState({
      cart: json
    });
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

  deleteAccount = () => {
    document.getElementById("hiddenDeleteButton").click()
  }

  render() {

    
    let that = this


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


   

    let showAccountDropdown
    
    if(this.state.showAccountDropdown) {
      showAccountDropdown = "showAccountDropdown"
    } else {
      showAccountDropdown = "hideAccountDropdown"
    }

    let fullScreenStyle = {
        height: '100vh',
        width: '100vw',
        // border: '1px solid white',
        overflow: 'hidden',
        position: 'fixed'
        // paddingTop: '200px'
        // marginTop: '200px',
    }

    let positonAbsoluteBgPicStyle =  {
      position: 'absolute',
      top: '20px',
      left: '0',
      height: '100vh',
        width: '100vw',
        background: 'url(/pics/calebWithBand.jpg) center center scroll',
        opacity: '.3'
    }

    let nameStyle = {
      fontSize: '24px',
      color: 'black',
      // marginBottom: '5px',
      margin: 'auto',
      
  }

  let fontBlue = {
    color: 'rgba(45, 51, 221, 0.747)',
    fontSize: '22px' 
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
            textAlign: 'center',
            // margin: 'auto',
            // marginTop: '120px',
            // border: 'solid 3px black',
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'center',
            alignItems: 'center',
            color: 'rgba(45, 51, 221, 0.747)'  ,
            backgroundColor: 'white',
            borderRadius: '3%',
            fontFamily: 'Josefin Sans, sans-serif !important',
            boxSizing: 'border-box',
            // boxShadow: '1px 3px rgba(0, 0, 0, 0.322)',
            position: 'relative',
            // height: '450px'
            /* font-family: 'Fjalla One', sans-serif; */
       
        
        
    
    }

    let linksContainerStyle = {
      display : 'flex',
      // height: '150px',
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
        marginBottom: '30px'
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
        {/* <div style={positonAbsoluteBgPicStyle}></div> */}
            <div className="editUserInfoContainer"  style={modalStyle}>
                <div style={accountInfoStyle}>ACCOUNT INFO</div>
             
                
                <div className="accountInfoBorder" style={linksContainerStyle}>
                <div style={nameStyle}>Email: <span style={fontBlue}>{this.state.userEmail} </span> </div>
                </div>
                <div style={linksContainerStyle2}>
                <a style={col} href="/">
                  <div style={centerText}>Back</div>
                </a>
                <a style={col} href="/users/edit">
                  <div style={centerText}>Edit Info</div>
                </a>
                <div onClick={this.deleteAccount} style={col}>
                  <div style={centerText}>Cancel Account</div>
                </div>

                  
              
                <form  style={{display: 'none'}}method="post" action="/users">
                <input type="hidden" name="_method" value="delete"/>
                
                <input  id="hiddenDeleteButton" data-confirm="Are you sure?" type="submit" value="Cancel my account"/>
                  
                  
                <input type="hidden" name="authenticity_token" value={this.state.railsToken}/>

                </form>
               
               </div>
            </div>
        </div>
        <Footer footerId="stickyFooter" emailDivStyle="emailStickFooter" />
        
      </div>
    );
  }
}

export default UserInfo;
