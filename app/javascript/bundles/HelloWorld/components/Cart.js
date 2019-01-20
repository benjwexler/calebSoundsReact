import React from 'react';


const cart = (props) => {

    return (
        <div id="cart" class={props.showCartBoolean + " " + props.cartHeightZero} onTransitionEnd={props.cartTransitionEnd}>
            <div id="yourCartText">Your Cart</div>
            {props.items}
            <div id="cartTotal">
                <div id="totalLeft">Total:</div>
                <div id="totalRight">{props.totalPrice}</div>
            </div>
            <div onClick={props.click} id="emptyBagContainer"> <span id="emptyBagText">Empty Bag</span></div>
            <div id="checkoutBtnOuterContainer">
            <div id="checkoutBtn">
                <div id="checkoutText">Proceed to Checkout: {props.totalPrice}</div>
            </div>
        </div>
        </div>
    )
};

export default cart;