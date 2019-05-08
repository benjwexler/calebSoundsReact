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

    let adminView;

    if(props.adminView) {
       adminView= (<React.Fragment>
            <td> 
                <a href={"/sounds/" + props.id + "/edit"}>
                <i style={{marginLeft: '10px'}} className="far fa-edit"> </i>
                </a>
            </td>
            <td style={{paddingLeft: '15px'}}><i className="far fa-trash-alt"></i> </td>
        </React.Fragment>)
    }

    let tempo = props.tempo;

    if(parseFloat(tempo) === 0) {
        tempo = "N/A"
    }


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
            <td>{tempo}</td>
            <td className="mobileHide">
            {/* {props.musicalKey} */}
A#
            </td>
            {adminView}
        </tr>
       
    )}}
    </Transition>
    )

}


export default sample;