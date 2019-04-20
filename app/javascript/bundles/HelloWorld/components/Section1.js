import React from 'react';


const section1 = (props) => {

    let downArrow;
    let opacity;
    let brightness;

    if (props.showDownArrow) {
        downArrow = <i style={{position: 'absolute', right: '30px'}} className="fas fa-arrow-down animateArrow"></i>
        opacity = ".7"
        brightness = "brightness(125%)";
    }

    return (
        <div id="section1">
        <div id="bigTextContainer">
            <div id="bigText">SAMPLE PACK VOL. 1 OUT NOW</div>
            <div 
                onMouseEnter={() => props.toggleDownArrow(true)} 
                onMouseLeave={() => props.toggleDownArrow(false)} 
                onClick={() => document.getElementById("section2").scrollIntoView(false)} 
                id="previewButton">
            Preview
            {/* <i style={{position: 'absolute', top: '19px', right: '30px'}} className="fas fa-arrow-right"></i> */}
            {/* <i style={{position: 'absolute', top: '19px', left: '30px'}} className="fas fa-arrow-left"></i> */}
            {/* {downArrow} */}
            {/* <i style={{position: 'absolute', right: '30px', opacity: opacity, }} className="fas fa-arrow-down animateArrow"></i>
            <i style={{position: 'absolute', left: '30px', opacity: opacity}} className="fas fa-arrow-down animateArrow"></i> */}
            
            {/* <i style={{position: 'absolute', left: '30px'}} className="fas fa-arrow-down animateArrow"></i> */}
            {/* <i style={{position: 'absolute', top: '19px', left: '30px'}} className="fas fa-arrow-up"></i> */}
                <div id="previewSecretBackground"></div>
            </div>
        </div>
    </div>
    )
};

export default section1;


