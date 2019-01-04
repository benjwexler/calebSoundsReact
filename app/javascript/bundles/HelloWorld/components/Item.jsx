import React from 'react';


const item = (props) => {

    return (



        <div className="item">

            <div className="cartRow">
                <div className="itemQuantity"> {props.quantity} </div>
                <div className="itemTitle"> {props.name} </div>
                <div className="deleteItem">
                    <i onClick={props.deleteItem} data-kit-Id={props.kitId} className="fas fa-trash-alt"></i>
                </div>
                <div className="itemPrice"> {props.price} </div>
            </div>
        </div>
    )
};

export default item;