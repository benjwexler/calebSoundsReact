import React from 'react';
import Transition from 'react-transition-group/Transition';

const duration = 0;

const defaultStyle = {
    // transition: `background ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`,
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 1,
    // padding: '10px's
  }

const transitionStyles = {
    // entering: { opacity: 0, background: 'lightgreen' },
    entering: { opacity: 0},
    entered:  { opacity: 1 },
  }



const sample = (props, { in: inProp}) => {


    let icon = <i className="fas fa-play samplePlayIcon"></i>

    if(props.currentSample && props.sampleCurrentlyPlaying) {
        icon = <i className="fas fa-pause samplePauseIcon"></i>
    }

    return(

    <Transition in={props.inProp} timeout={props.delay}>
    {(transitionState) => {
    return (
        <tr key={props.key} onClick={props.toggleTransition} className={props.oddRow} style={{...defaultStyle,
          ...transitionStyles[transitionState]}}>
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
       
    )}}
    </Transition>
    )

}


export default sample;