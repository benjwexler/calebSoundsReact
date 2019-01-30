import React from 'react';


const navbar = (props) => {

    let loginSignUp

    if(!props.userLoggedIn) {

    

    loginSignUp = (<div onClick={props.openModal} id="logInSignUpContainer">
    <div className="logInorSignUp">
        LOG IN/SIGN UP

    </div>
    <i className="fas fa-user-lock"></i>
</div>)
} else {
    loginSignUp = (

    <div id="accountContainer">
        <div onClick={props.toggleAccountDropdown} id="signOutContainer">
            <div className="logInorSignUp">
            ACCOUNT
            </div>
            <i onClick={props.toggleAccountDropdown} class="navbarIconBig fas fa-user-circle"></i>
        </div>

        <div id="accountDropdown" class={props.showAccountDropdown}>
            <div className="carrotContainer">
                <i class="carrot fas fa-caret-up"></i>
            </div>
            <div className="accountLink">
            <a href={'/users/' + props.userId}>Update Info</a>
            
            </div>
            <hr/>
            <div className="accountLink">
            <a href="/users/edit">Change Password</a>
            
            </div>
            <hr/>
            <div onClick={props.signOut} className="accountLink">Sign Out</div>
        </div>
    </div>
)
}


    return (
        <div id="outerNavContainer">
        <div id="nav">
            <div id="navContainer">
                <i onClick={props.toggleMobileNav} className="fas fa-bars"></i>
                <div id="navTitle">Caleb Elias G sounds</div>
                <div className="navLink">Sound Packs</div>
                <div className="navLink">Latest Tracks</div>
                <div id="navStreamingIcons">
                        <div className="navLink">
                                <i className="fab fa-spotify"></i>
                        </div>
                        <div className="navLink">
                            <i className="fab fa-soundcloud"></i>
                        </div>
                        <div className="navLink">
                            <i className="fab fa-apple"></i>
                        </div>
                        <div className="navLink">
                                <i className="fab fa-youtube"></i>
                        </div>
                    </div>
               
                    {loginSignUp}
                <i onClick={props.toggleCart}  className="fas fa-shopping-cart cartWideScreen"></i>


            </div>
            <i onClick={props.toggleCart} className="fas fa-shopping-cart floatRight"></i>
        </div>
        
    </div>
    )

}

export default navbar 