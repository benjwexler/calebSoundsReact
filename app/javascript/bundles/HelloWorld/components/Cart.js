import React from "react";

const cart = props => {
  console.log(props.isCartEmpty);
  let cartContent;

  if (!props.isCartEmpty) {
    cartContent = (
        <React.Fragment>
        <div id="yourCartText">Your Cart</div>
        {props.items}
        <div id="cartTotal">
          <div id="totalLeft">Total:</div>
          <div id="totalRight">{props.totalPrice}</div>
        </div>
        <div onClick={props.clearCart} id="emptyBagContainer">
          {" "}
          <span id="emptyBagText">Empty Bag</span>
        </div>
        <div id="checkoutBtnOuterContainer">
          <div id="checkoutBtn">
            <a href="/checkout" id="checkoutText">
              Proceed to Checkout: {props.totalPrice}
            </a>
          </div>
        </div>
        </React.Fragment>
    );
  } else {
    cartContent = (
        <div className="cartEmpty"> 
        Your Cart is Empty 
        <br/>
        <br/>
        <span className="frown">:(</span> </div>
    )
  }

  return (
    <div
      id="cart"
      className={props.showCartBoolean + " " + props.cartHeightZero}
      onTransitionEnd={props.cartTransitionEnd}
    >
      <div onClick={props.toggleCart} className="exitCart" id="exitModal">
        <i id="exitCartIcon" className="far fa-times-circle" />
      </div>
      {cartContent}
    </div>
  );
};

export default cart;
