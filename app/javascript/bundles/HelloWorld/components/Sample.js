import React from 'react';


const sample = (props) => {

    return (
        <tr className={props.oddRow}>
            <td className="setWidth">
                <div className="circle">
                    <i className="fas fa-play"></i>
                </div>
            </td>
            <td>{props.name}</td>
            <td>Rock</td>
            <td className="smallPhoneHide">Category</td>
            <td>97</td>
            <td className="mobileHide">Energy</td>
        </tr>
    )
};

export default sample;