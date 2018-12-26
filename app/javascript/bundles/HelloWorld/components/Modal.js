import React from 'react';


const modal = (props) => {

    return (

        <div className="modalContainer">
        
        <button id="modalButton" type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      
      <div className="modal-body">
      <h2>{props.modalTitle}</h2>

        <form onSubmit={props.submitForm} id={props.formId} action={props.formAction} accept-charset="UTF-8" method="post"><input name="utf8"
            type="hidden" value="✓"/>
            <input type="hidden" name="authenticity_token" value={props.railsToken}/>
      
            <div className="field">
                <label for="user_email">Email</label><br/>
                <input autofocus="autofocus" autocomplete="email" type="email" name="user[email]" id="signInUserEmailInput"/>
            </div>

            <div className="field">
                <label for="user_password">Password</label><br/>
                <input autocomplete="current-password" type="password" name="user[password]" id="signInUserPasswordInput"/>
            </div>

            <div id={props.showOrHidePassworConfirmation} className="field">
                 <label for="user_password_confirmation">Password confirmation</label><br/>
                <input autocomplete="new-password" type="password" name="user[password_confirmation]" id="user_password_confirmation"/>
            </div>

            <div class="actions">
                <input type="submit" name="commit" value={props.modalTitle}/>
            </div>
       </form>
            




      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
        
        </div>
        )
    };
    
    export default modal;