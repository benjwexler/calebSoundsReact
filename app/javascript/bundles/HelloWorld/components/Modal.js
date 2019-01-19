import React from 'react';


const modal = (props) => {

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
                  <div className="inactiveBtn">LOGIN</div>
                  <div className="switchFormBtn">SIGN UP</div>
                  
              </div>
          
                <div className="field" >
                  <div className="modalIconContainer">
                          <input autofocus="autofocus" autocomplete="email" className="form" placeholder="Email" type="email"  name="user[email]" />
                          <i className="far fa-envelope modalIcon"></i>
                      </div>
                      
                </div>
          <br/>
  
              <div className="field">
                  <div className="pwdMinText">(6 character min)</div>
                  <div className="modalIconContainer">
                      <input autocomplete="new-password" className="form" placeholder="Password" type="password" name="user[password]" id="user_password"/>
                      <i className="fas fa-unlock-alt modalIcon"></i>
                  </div>
              </div>
          <br/>  
              <div className="field">
                  <div className="modalIconContainer">
                   <input autocomplete="new-password" className="form" placeholder="Confirm Password" type="password" name="user[password]" id="user_password"/>
                      <i className="fas fa-unlock-alt modalIcon"></i>
                   </div>
              </div>

          <br/>
              <div className="actions">
                  <input type="submit" name="commit" value="Sign up" className="btn" data-disable-with="Sign up"/>
              </div>
        </div>
      </form>

  </div>

        )
    };
    
    export default modal;