import React from 'react';


const container = (props) => {

    let modalStyle = {
            width: '100%',
            maxWidth: '500px',
            padding: '40px',
            paddingTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'rgba(45, 51, 221, 0.747)'  ,
            backgroundColor: 'white',
            borderRadius: '3%',
            fontFamily: 'Josefin Sans, sans-serif !important',
            boxSizing: 'border-box',
            position: 'relative',
            height: '300px',
            margin: '120px auto auto',
            border:' solid 3px black',
            boxShadow: '1px 3px rgba(0, 0, 0, 0.322)',
            height: '500px',
    }

    let titleStyle = {
        fontSize: '32px',
        fontFamily: 'Josefin Sans, sans-serif',
        marginBottom: '20px',
    }

    let innerContainerStyle = {
        display : 'flex',
        height: '800px',
        width: '100%',
        border: '1px solid black'
      }
    


    return (
        <div style={modalStyle}>
        <div style={titleStyle}>{props.title}</div>
            <div style={innerContainerStyle}>
                {props.children}
            </div>

        </div>

    )
};

export default container;