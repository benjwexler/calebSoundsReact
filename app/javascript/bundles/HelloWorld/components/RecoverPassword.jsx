import ReactOnRails from "react-on-rails";
import React, { Component } from "react";

import Modal from "./Modal.js";
import Cart from "./Cart.js";
import Item from "./Item.js";
import Navbar from "./Navbar.js";
import MobileNav from "./MobileNav.js";
import FullScreen from "./FullScreen.js";
import Container from "./Container.js";
import Footer from "./Footer.js";

const convertToUsCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

class RecoverPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      railsToken: ReactOnRails.authenticityToken(),
      showMobileNav: false,
      showCart: false,
      cartHeightZero: true,
      totalPrice: undefined,
      showModal: false,
      modalContent: "Sign Up",
      errorMessage: undefined,
      cartHeightZero: true
    };
  }

  toggleMobileNav = () => {
    let that = this;
    this.setState({
      showMobileNav: !that.state.showMobileNav,
      showCart: false
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

  clearCart = () => {
    let that = this;
    fetch(`http://localhost:3000/carts/all`, {
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
        that.setCart(myJson);
      })
      .catch(err => {});
  };

  setModalContent = e => {
    let modalContent = "Sign Up";
    if (e.currentTarget.id === "switchToLogin") {
      modalContent = "Log In";
    }
    this.setState({
      modalContent: modalContent,
      errorMessage: undefined
    });
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
      showCart: false,
      showMobileNav: false,
      errorMessage: undefined
    });
  };

  toggleCart = () => {
    let that = this;

    // console.log(this.state)
    this.setState(
      {
        showCart: !that.state.showCart,
        showMobileNav: false,
        showAccountDropdown: false
      },
      this.checkToggleCart
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

  setCart = json => {
    let that = this;

    this.setState({
      cart: json
    });
  };

  deleteItem = e => {
    let kitId = e.target.dataset.kitId;

    let that = this;

    // let kitId = this.state.kitId

    fetch(`http://localhost:3000/carts/${1}`, {
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
      
      that.setCart(myJson) 
      
    })
    .catch((err) => {

    });

  };

  componentDidMount() {
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
        console.log(myJson);
        that.setCart(myJson);
      });

    window.addEventListener("resize", this.handleResize);
  }

  render() {
    let emailInputStyle = {
      marginLeft: "auto",
      marginRight: "auto"
    };

    let mobileNavToggle = "hideMobileNav";

    if (this.state.showMobileNav) {
      mobileNavToggle = "showMobileNav";
    }

    let showCartBoolean;

    

    if (this.state.showCart) {
      showCartBoolean = "showCart";
    } else {
      showCartBoolean = "hideCart";
    }

    let cartHeightZero;

    if (this.state.cartHeightZero) {
      cartHeightZero = "cartHeightZero";
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

    let modal 

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
          // submit = {this.submitForm}
          // errorMessage = {this.state.errorMessage}
        />
      );
    }

  

    return (
      <div>
      {modal}
        <Cart
          showCartBoolean={showCartBoolean}
          toggleCart={this.toggleCart}
          items={items}
          totalPrice={convertToUsCurrency.format(sum)}
          clearCart={this.clearCart}
          cartTransitionEnd={this.cartTransitionEnd}
          cartHeightZero={cartHeightZero}
        />
        <Navbar
          toggleMobileNav={this.toggleMobileNav}
          toggleCart={this.toggleCart}
          openModal={this.toggleModal}
        />
        <MobileNav
          toggleMobileNav={this.toggleMobileNav}
          mobileNavToggle={mobileNavToggle}
          openModal={this.toggleModal}
        />
        <FullScreen>
          <Container title="Recover Password">
            <form
              className="edit_user"
              id="new_user"
              action="/users/password"
              accept-charset="UTF-8"
              method="post"
            >
              <input name="utf8" type="hidden" value="✓" />
              <input
                type="hidden"
                name="authenticity_token"
                value={this.state.railsToken}
              />

              <div class="field">
                <div className="modalIconContainer">
                  <input
                    style={emailInputStyle}
                    className="form"
                    autoFocus="autofocus"
                    autocomplete="email"
                    type="email"
                    name="user[email]"
                    id="user_email"
                    placeholder="Email"
                  />
                  <i
                    style={{ left: "22.5px" }}
                    className="far fa-envelope modalIcon"
                  />
                </div>
              </div>
              <br />
              <div class="actions">
                <input
                  style={{ fontSize: "16px", width: "auto" }}
                  className="btn"
                  type="submit"
                  name="commit"
                  value="Send me reset password instructions"
                  data-disable-with="Send me reset password instructions"
                />
              </div>
            </form>
          </Container>
        </FullScreen>
        <Footer footerId="stickyFooter" emailDivStyle="emailStickFooter" />
      </div>
    );
  }
}

export default RecoverPassword;
