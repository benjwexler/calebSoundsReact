import React from 'react';


const item = (props) => {

    return (
        <div className="item">
            <div className="itemQuantity">{props.quantity}</div>
            <div className="itemName">{props.name}</div>
            <div className="removeItem">
                    <i onClick={props.deleteItem} className="far fa-trash-alt"></i>
            </div>
            <div className="itemTotal">{props.itemPrice}</div>
        </div>

    )
};

export default item;