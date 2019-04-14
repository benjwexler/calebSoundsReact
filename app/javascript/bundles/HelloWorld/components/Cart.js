import React from 'react';


const cart = (props) => {

    console.log(props.isCartEmpty)
    let proceedToCheckout;

    if (!props.isCartEmpty) {
        proceedToCheckout = (
            <a href="/checkout" id="checkoutText">Proceed to Checkout: {props.totalPrice}</a>
        )
    }

    return (
        <div id="cart" className={props.showCartBoolean + " " + props.cartHeightZero} onTransitionEnd={props.cartTransitionEnd}>
            <div onClick={props.toggleCart} className="exitCart" id="exitModal"><i id="exitCartIcon" className="far fa-times-circle"></i></div>
            <div id="yourCartText">Your Cart</div>
            {props.items}
            <div id="cartTotal">
                <div id="totalLeft">Total:</div>
                <div id="totalRight">{props.totalPrice}</div>
            </div>
            <div onClick={props.clearCart} id="emptyBagContainer"> <span id="emptyBagText">Empty Bag</span></div>
            <div id="checkoutBtnOuterContainer">
            <div id="checkoutBtn">
                {proceedToCheckout}
            </div>
        </div>
        </div>
    )
};

export default cart;