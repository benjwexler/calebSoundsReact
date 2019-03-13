import React from 'react';


const fullScreen = (props) => {

    let fullScreenStyle = {
        height: '100vh',
        width: '100vw',
        overflow:  'hidden',
        position: 'fixed'

    }

    return (
        <div style={fullScreenStyle}>
        {props.children}
        </div>

    )
};

export default fullScreen;