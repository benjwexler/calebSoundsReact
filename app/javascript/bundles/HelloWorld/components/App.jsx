import ReactOnRails from 'react-on-rails';
import React, { Component } from 'react';
// import './Devise.css';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.railsToken = ReactOnRails.authenticityToken()

        this.state = {
            userLoggedIn: props.isLoggedIn
        }
    }

    render() {
        let x = 5
        console.log(this.state)
        let userLoggedInStatus

        if(this.state.userLoggedIn) {

        userLoggedInStatus = (
            <ul className="navbar-nav">
            <li className="nav-item ">
                <div id="logout" className="nav-link">
                    logout
                 </div>
            </li>
            </ul>
         ) }else {

            userLoggedInStatus = (
                <ul className="navbar-nav">
            <li className = "nav-item " >
                <div id="login" className="nav-link">
                    Login
                </div>
             </li>

            <li className="nav-item ">
                <div id="signup" className="nav-link">
                    Signup
                </div>
            </li>
            </ul>
            )

         }

            



        return (
            <div className="App">
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

                            <li className="nav-item ">
                                <a id="latestReleasesLink" className="nav-link">Latest Releases</a>
                            </li>

                            <li className="nav-item ">
                                <a id="drumMachineLink" className="nav-link">Drum Machine</a>
                            </li>

                        </ul>

                       
                        {userLoggedInStatus}


                     

                    </div>
                </nav>
            </div>
        );
    }


}



export default App