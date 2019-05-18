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

class EditUserInfo extends React.Component {
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
      userWantsToChangePassword: false,
      userLoggedIn: props.isLoggedIn,
      userId: props.userId,
      userFirstName: props.userFirstName,
      userLastName: props.userLastName,
      userEmail: props.userEmail,
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
    let path = window.location.pathname + window.location.search;
    this.setState({
      relativePath: path
    });
  };

  transition = () => {
    this.setState({ transition: true });
  };

  componentDidMount() {
    //  this.setState({ in: !this.state.transition });
    this.getRelativePath();
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
        that.response(myJson);
      });
  }

  response = json => {
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
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": that.state.railsToken
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        that.response(myJson);
      })
      .catch(err => {
        // Handle any error that occurred in any of the previous
        // promises in the chain.
      });

  };

  clearCart = () => {
    let that = this;

    // let kitId = this.state.kitId

    fetch(`carts/all`, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": that.state.railsToken
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        that.response(myJson);
      })
      .catch(err => {
        // Handle any error that occurred in any of the previous
        // promises in the chain.
      });
  };

  handleResize = () => {
    if (window.innerWidth > 1120) {
      this.setState({
        showMobileNav: false
      });
    } else {
      this.setState({
        showAccountDropdown: false
      });
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

  signOut = () => {
    let that = this;
    $.ajax({
      type: "POST",
      url: "/users/sign_out",
      data: {
        _method: "delete",
        authenticity_token: that.state.railsToken,
        relativePath: that.state.relativePath
      },
      success: function(json) {
        that.setState({
          userLoggedIn: false,
          railsToken: json.csrfToken,
          cart: json.cart
        });

        window.location.href = "/";
      },
      error: function(xhr) {},
      dataType: "json"
    });
  };

  toggleMobileNav = () => {
    let that = this;
    this.setState({
      showMobileNav: !that.state.showMobileNav,
      showCart: false
    });
  };

  toggleCart = () => {
    let that = this;
    this.setState(
      {
        showCart: !that.state.showCart,
        showMobileNav: false,
        showAccountDropdown: false
      },
      this.checkToggleCart
    );
  };

  toggleAccountDropdown = () => {
    let that = this;
    this.setState(
      {
        showAccountDropdown: !this.state.showAccountDropdown,
        showCart: false,
        showMobileNav: false
      }
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

  handleUserEmailChange = event => {
    this.setState({
      userEmail: event.target.value
    });
  };

  togglePasswordChangeForm = () => {
    this.setState({
      userWantsToChangePassword: !this.state.userWantsToChangePassword
    });
  };

  render() {
    let that = this;

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
        clearCart={this.clearCart}
        toggleCart={this.toggleCart}
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
          submit={this.submitForm}
        />
      );
    }

    let mobileNavToggle = "hideMobileNav";

    if (this.state.showMobileNav) {
      mobileNavToggle = "showMobileNav";
    }

    let showAccountDropdown;

    if (this.state.showAccountDropdown) {
      showAccountDropdown = "showAccountDropdown";
    } else {
      showAccountDropdown = "hideAccountDropdown";
    }

    let fullScreenStyle = {
      width: "100vw",
      flexGrow: '1',
    };

    let modalStyle = {
      width: "100%",
      maxWidth: "500px",
      padding: "40px",
      paddingTop: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "rgba(45, 51, 221, 0.747)",
      backgroundColor: "white",
      borderRadius: "3%",
      fontFamily: "Josefin Sans, sans-serif !important",
      boxSizing: "border-box",
      position: "relative"
    };

    let linksContainerStyle = {
      display: "flex",
      height: "800px",
      width: "100%"
    };


    let accountInfoStyle = {
      fontSize: "32px",
      fontFamily: "Josefin Sans, sans-serif",
      marginBottom: "20px"
    };


    let changePasswordContainerStyle = {
      display: "flex"
    };

    let changePasswordStyle = {
      width: "100%",
      position: "relative",
      color: "#23a184"
    };

    let centerDiv = {
      position: "absolute",
      left: "0%",
      top: "50%",
      transform: "translate(0%, -50%)",
      fontSize: "18px",
      whiteSpace: "nowrap"
    };

    let sliderContainerStyle = {
      marginRight: "0px",
      width: "50%",
      marginLeft: "50px"
    };

    let changePasswordInputs;

    if (this.state.userWantsToChangePassword) {
      changePasswordInputs = (
        <React.Fragment>
          <div className="field">
            <div className="modalIconContainer">
              <input
                id="user_password"
                autocomplete="new-password"
                className="form"
                placeholder="New Password (6 char min)"
                type="password"
                name="user[password]"
              />
              <i className="fas fa-unlock-alt modalIcon" />
            </div>
          </div>

          <div className="field">
            <div className="modalIconContainer">
              <input
                id="user_password_confirmation"
                autocomplete="new-password"
                className="form"
                placeholder="Confirm New Password"
                type="password"
                name="user[password_confirmation]"
              />
              <i className="fas fa-unlock-alt modalIcon" />
            </div>
          </div>
        </React.Fragment>
      );
    }

    const outerStyle = {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    }


    return (
      <div style={outerStyle}>
        {modal}
        {cart}
        <Navbar
          toggleCart={this.toggleCart}
          openModal={this.toggleModal}
          toggleMobileNav={this.toggleMobileNav}
          userLoggedIn={this.state.userLoggedIn}
          signOut={this.signOut}
          userId={this.state.userId}
          showAccountDropdown={showAccountDropdown}
          toggleAccountDropdown={this.toggleAccountDropdown}
        />
        <MobileNav
          mobileNavToggle={mobileNavToggle}
          userLoggedIn={this.state.userLoggedIn}
          signOut={this.signOut}
          toggleMobileNav={this.toggleMobileNav}
        />

        <div style={fullScreenStyle}>
          <div className="editUserInfoContainer" style={modalStyle}>
            <div style={accountInfoStyle}>EDIT INFO</div>
            <div className="formBorder" style={linksContainerStyle}>
              <form
                className="edit_user"
                id="edit_user"
                action="/users"
                accept-charset="UTF-8"
                method="post"
              >
                <input name="utf8" type="hidden" value="✓" />
                <input type="hidden" name="_method" value="put" />
                <input
                  type="hidden"
                  name="authenticity_token"
                  value={this.state.railsToken}
                />

                <div className="field">
                  <div className="modalIconContainer">
                    <input
                      onChange={this.handleUserEmailChange}
                      id="user_email"
                      autofocus="autofocus"
                      autocomplete="email"
                      value={this.state.userEmail}
                      className="form"
                      placeholder="Email"
                      type="email"
                      name="user[email]"
                    />
                    <i className="far fa-envelope modalIcon" />
                  </div>
                </div>

                <div className="field">
                  <div className="modalIconContainer">
                    <input
                      id="user_current_password"
                      autocomplete="current-password"
                      className="form"
                      placeholder="Current Password"
                      type="password"
                      name="user[current_password]"
                    />
                    <i className="fas fa-unlock-alt modalIcon" />
                  </div>
                </div>

                <div style={changePasswordContainerStyle}>
                  <div style={changePasswordStyle}>
                    <div style={centerDiv}> Change Password: </div>
                  </div>

                  <div style={sliderContainerStyle}>
                    <label class="switch">
                      <input
                        onClick={this.togglePasswordChangeForm}
                        type="checkbox"
                      />
                      <span class="slider round" />
                    </label>
                  </div>
                </div>

                {changePasswordInputs}

                {/* <div className="actions">
    <input type="submit" name="commit" value="Update" data-disable-with="Update"/>
  </div> */}
                <div className="actions">
                  <input
                    type="submit"
                    name="commit"
                    value="Update"
                    className="btn"
                    data-disable-with="Update"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        <Footer footerId="footer2" emailDivStyle="emailStickFooter" />
      </div>
    );
  }
}

export default EditUserInfo;
