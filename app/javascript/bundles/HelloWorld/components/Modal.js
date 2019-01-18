import React from 'react';


const modal = (props) => {

    return (
      <div id="modalContainer">
        
      <form class="new_user" id="new_user" action="/users" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"/><input type="hidden" name="authenticity_token" value="nmsCVI3I51ZEhTP7NXDHxwtyKA+a3GeCXXvX09Y5Q6jwGPRWKA/7/FWwLWW7Xux5tWzxbBi2iS9uAgOZmuEjpg=="/>
          <div class="wrapper">
                  <div onClick={props.exitModal} id="exitModal">
                          <i id="exitModalIcon" class="far fa-times-circle"></i>
                  </div>
              <h1 id="formTitle">ACCOUNT</h1>
              <div id="modalInstructions">Please Login or Sign Up</div>
              <div id="modalBtnsContainer">
                  <div class="inactiveBtn">LOGIN</div>
                  <div class="switchFormBtn">SIGN UP</div>
                  
              </div>
          
                <div class="field" >
                  <div class="modalIconContainer">
                          <input autofocus="autofocus" autocomplete="email" class="form" placeholder="Email" type="email"  name="user[email]" />
                          <i class="far fa-envelope modalIcon"></i>
                      </div>
                      
                </div>
          <br/>
  
              <div class="field">
                  <div class="pwdMinText">(6 character min)</div>
                  <div class="modalIconContainer">
                      <input autocomplete="new-password" class="form" placeholder="Password" type="password" name="user[password]" id="user_password"/>
                      <i class="fas fa-unlock-alt modalIcon"></i>
                  </div>
              </div>
          <br/>  
              <div class="field">
                  <div class="modalIconContainer">
                   <input autocomplete="new-password" class="form" placeholder="Confirm Password" type="password" name="user[password]" id="user_password"/>
                      <i class="fas fa-unlock-alt modalIcon"></i>
                   </div>
              </div>

          <br/>
              <div class="actions">
                  <input type="submit" name="commit" value="Sign up" class="btn" data-disable-with="Sign up"/>
              </div>
        </div>
      </form>

  </div>

        )
    };
    
    export default modal;