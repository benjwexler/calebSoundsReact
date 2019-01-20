import React from 'react';


const item = (props) => {

    return (
        <div class="item">
            <div class="itemQuantity">{props.quantity}</div>
            <div class="itemName">{props.name}</div>
            <div class="removeItem">
                    <i onClick={props.deleteItem} class="far fa-trash-alt"></i>
            </div>
            <div class="itemTotal">{props.itemPrice}</div>
        </div>

    )
};

export default item;