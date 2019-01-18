import React from 'react';


const item = (props) => {

    return (
        <div class="item">
            <div class="itemQuantity">1</div>
            <div class="itemName">Sound Pack Vol. 1</div>
            <div class="removeItem">
                    <i class="far fa-trash-alt"></i>
            </div>
            <div class="itemTotal">${props.itemPrice}</div>
        </div>

    )
};

export default item;