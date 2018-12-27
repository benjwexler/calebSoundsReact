import ReactOnRails from 'react-on-rails';
import React, { Component } from 'react';
import Modal from './Modal.js';
// import './Devise.css';

class App extends React.Component {

    constructor(props) {
        super(props);

        // this.railsToken = ReactOnRails.authenticityToken()

        this.state = {
            userLoggedIn: props.isLoggedIn,
            modalContent: 'login',
            railsToken: ReactOnRails.authenticityToken(),
            ErrorMessage: undefined
        }
    }

    submitForm = (e) => {
        
        let that = this

      
            e.preventDefault() 
            let signUpObj = {};
           signUpObj.utf8 = "✓";
           signUpObj.authenticity_token = that.state.railsToken
           signUpObj['user[email]'] = document.getElementById("userEmailInput").value
           signUpObj['user[password]'] = document.getElementById("userPasswordInput").value
           signUpObj.commit = "Log in"

            // document.getElementById("modal").click()

            console.log(signUpObj)

     
            $.ajax({
              type: "POST",
              url: "http://localhost:3000/users/sign_in",
              data: signUpObj,
              success: function(json){
                 // location.href = "/";;
                 console.log(json)
                 console.log("sucess")

                 document.getElementById("modalButton").click()

                 that.setState({
                    railsToken: json.csrfToken,
                    userLoggedIn: true,
                    errorMessage: undefined
                    })
            
                //  document.getElementById("modal").click()

              },
              error: function() { 
                  
                that.setState({
                    errorMessage: "Sorry, Couldn't log you in"
                    })
     
                 console.log("error")
                //  document.getElementById("wrongLogin").innerText = "Sorry, Couldn't log  in"
                //  $('#js-error-block-login').show();
              }, 
              dataType: "json"
            });
       
     
    }

    signOut = () => {
        let that = this
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/users/sign_out",
            data: {"_method":"delete", "authenticity_token": that.state.railsToken},
            success: function(json){
               console.log("trying to delete")

               that.setState({
                userLoggedIn: false,
                railsToken: json.csrfToken
                })
            
            },
            error: function(xhr) { 
                console.log("error with delete")
            
            }, 
            dataType: "json"
          });
    }

    setModal = (e) => {
        console.log(e.target.id)

        this.setState({
            modalContent: e.target.id,
            errorMessage: undefined 
            }
        )

        document.getElementById("modalButton").click()
    }

    render() {
        let x = 5
        console.log(this.state)
        let userLoggedInStatus

        if (this.state.userLoggedIn) {

            userLoggedInStatus = (
                <ul className="navbar-nav">
                    <li className="nav-item ">
                        <div onClick={() => this.signOut()} id="logout" className="nav-link">
                            logout
                 </div>
                    </li>
                </ul>
            )
        } else {

            userLoggedInStatus = (
                <ul className="navbar-nav">
                    <li className="nav-item " >
                        <div onClick={(e) => this.setModal(e)} id="login" className="nav-link">
                            Login
                </div>
                    </li>

                    <li className="nav-item ">
                        <div onClick={(e) => this.setModal(e)} id="signup" className="nav-link">
                            Signup
                </div>
                    </li>
                </ul>
            )

        }

        let showModal 
        let formAction = "/users/sign_in"
        let formId = "ajax_signin"
        let showOrHidePassworConfirmation = 'hidePasswordConfirmation'

            if(this.state.modalContent === 'signup') {
                formAction = "/users"
                formId = "ajax_signup"
                showOrHidePassworConfirmation = 'showPasswordConfirmation'
            }
        
        let showOrHideErrorMessage = 'hideErrorMessage'

        if(this.state.errorMessage !== undefined) {
            showOrHideErrorMessage = 'showErrorMessage'
        }


       

        if(this.state.userLoggedIn === false) {
            showModal = <Modal
                railsToken = {this.state.railsToken}
                modalTitle = {this.state.modalContent}
                formAction = {formAction}
                formId = {formId}
                showOrHidePassworConfirmation = {showOrHidePassworConfirmation}
                submitForm = {(e) => this.submitForm(e)}
                showOrHideErrorMessage = {showOrHideErrorMessage}
                errorMessage = {this.state.errorMessage}
            />
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

               
                {showModal}



               
            </div>
                );
            }
        }
        
        
        
        
        
        
export default App 