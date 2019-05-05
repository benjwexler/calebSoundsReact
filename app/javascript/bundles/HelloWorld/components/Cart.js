import React from "react";

const cart = props => {
  let cartContent;
  let minHeight;

  if(!props.cartHeightZero) {
      minHeight={minHeight: '210px'}
  }

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
        <React.Fragment>
        <div className="cartEmpty"> 
        Your Cart is Empty 
        <br/>
        <br/>
        <span className="frown">:(</span> </div>
            <div style={{position: 'absolute', bottom: '0px'}} id="checkoutBtnOuterContainer">
          <div onClick={props.previewSamples} id="checkoutBtn">
            <a id="checkoutText">
              Preview Samples
            </a>
          </div>
        </div>
        </React.Fragment>
    )
  }

  return (
    <div style={minHeight}
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
