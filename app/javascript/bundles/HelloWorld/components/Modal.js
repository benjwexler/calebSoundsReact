import React from 'react';


const modal = (props) => {

    let pwdConfirm
    let errorMessage 

    if(props.errorMessage) {
        console.log("error Blah Blah")
        console.log(props.errorMessage)
        errorMessage = <div style={{marginBottom: '10px', color: 'black'}}>{props.errorMessage}</div>
    }

    if(props.submitBtnText === 'Sign Up') {

        pwdConfirm = <React.Fragment> <br/>  
    <div className="field">
        <div className="modalIconContainer">
         <input id="userPasswordConfirmationInput" autocomplete="new-password" className="form" placeholder="Confirm Password" type="password" name="user[password]"/>
            <i className="fas fa-unlock-alt modalIcon"></i>
         </div>
    </div> </React.Fragment>


    }

    
    return (
      <div id="modalContainer">
        
      <form className="new_user" id="new_user" action="/users" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"/><input type="hidden" name="authenticity_token" value="nmsCVI3I51ZEhTP7NXDHxwtyKA+a3GeCXXvX09Y5Q6jwGPRWKA/7/FWwLWW7Xux5tWzxbBi2iS9uAgOZmuEjpg=="/>
          <div className="wrapper">
                  <div onClick={props.exitModal} id="exitModal">
                          <i id="exitModalIcon" className="far fa-times-circle"></i>
                  </div>
              <h1 id="formTitle">ACCOUNT</h1>
              <div id="modalInstructions">Please Login or Sign Up</div>
              <div id="modalBtnsContainer">
                  <div id="switchToLogin" onClick={props.setModalContent} className={props.loginInSwitch}>LOGIN</div>
                  <div id="switchToSignUp" onClick={props.setModalContent} className={props.signUpSwitch}>SIGN UP</div>
                  
              </div>
          
                <div className="field" >
                  <div className="modalIconContainer">
                          <input id="userEmailInput" autofocus="autofocus" autocomplete="email" className="form" placeholder="Email" type="email"  name="user[email]" />
                          <i className="far fa-envelope modalIcon"></i>
                      </div>
                      
                </div>
          <br/>
  
              <div className="field">
                  <div className="pwdMinText">(6 character min)</div>
                  <div className="modalIconContainer">
                      <input id="userPasswordInput" autocomplete="new-password" className="form" placeholder="Password" type="password" name="user[password]"/>
                      <i className="fas fa-unlock-alt modalIcon"></i>
                  </div>
              </div>

              {pwdConfirm}

              
          

          <br/>
              <div className="actions">
                  <input  onClick={props.submit} type="submit" name="commit" value={props.submitBtnText} className="btn" data-disable-with="Sign up"/>
              </div>
              <br/>
             

              {errorMessage}
              <a id="forgotPasswordLink" href="/users/password/new">
              Forgot Password?
              <br/>
            <span 
            // style={{color: 'rgba(45, 51, 221, 0.747)'}}
            >Click Here</span>
            </a>
        </div>
      </form>

  </div>

        )
    };
    
    export default modal;