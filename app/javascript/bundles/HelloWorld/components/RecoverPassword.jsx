import ReactOnRails from "react-on-rails";
import React, { Component } from "react";
import Navbar from "./Navbar.js";
import FullScreen from "./FullScreen.js";
import Container from "./Container.js";
import Footer from "./Footer.js";



class RecoverPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      railsToken: ReactOnRails.authenticityToken(),
    };
  }

  componentDidMount() {}

  render() {

    let emailInputStyle = {
      marginLeft: 'auto',
      marginRight: 'auto',
    }
    return (
      <div> 
        <Navbar/>
        <FullScreen>
          <Container title="Recover Password">
 
          <form className="edit_user" id="new_user" action="/users/password" accept-charset="UTF-8" method="post">
            <input name="utf8" type="hidden" value="✓"/>
            <input type="hidden" name="authenticity_token" value={this.state.railsToken}/>
  

  <div class="field">
      <div className="modalIconContainer">
    <input style={emailInputStyle}className="form" autoFocus="autofocus" autocomplete="email" type="email" name="user[email]" id="user_email" placeholder="Email"/>
    <i style={{left: '22.5px'}} className="far fa-envelope modalIcon"></i>
      </div>
  </div>
<br/>
  <div class="actions">
    <input style={{fontSize: '16px', width: 'auto'}}className="btn" type="submit" name="commit" value="Send me reset password instructions" data-disable-with="Send me reset password instructions"/>
  </div>
</form>

          </Container>
        </FullScreen>
        <Footer footerId="stickyFooter" emailDivStyle="emailStickFooter"/>
      </div>
    )
  }
}

export default RecoverPassword;
