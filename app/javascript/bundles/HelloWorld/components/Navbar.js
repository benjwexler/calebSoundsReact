import React from 'react';


const navbar = (props) => {


    return (
        <nav className="navbar navbar-expand-md navbar-light navbarText">

        <a id="logoText" className="navbar-brand">
            <img id="logo" src="pics/guitarLogo.png" /> Caleb Elias G sounds
        </a>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
            aria-expanded="false" aria-label="Toggle navigation">
            <span id="hamburgerMenu" className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

            <ul className="navbar-nav mr-auto">

               {props.navLinks}

            </ul>
            {props.userLoggedInStatus}
        </div>
    </nav>
    )

}

export default navbar 