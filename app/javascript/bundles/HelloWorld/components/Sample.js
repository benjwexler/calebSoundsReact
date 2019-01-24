import React from 'react';


const sample = (props) => {

    let icon = <i className="fas fa-play samplePlayIcon"></i>

    if(props.currentSample && props.sampleCurrentlyPlaying) {
        console.log("why no work")
        icon = <i className="fas fa-pause samplePauseIcon"></i>
    }

    return (
        <tr className={props.oddRow}>
            <td className="setWidth">
                <div data-sample-number={props.sampleNumber} onClick={props.playSample} className="circle">
                    {icon}
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