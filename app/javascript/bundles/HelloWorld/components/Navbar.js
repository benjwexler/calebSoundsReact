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
    loginSignUp = (<div id="signOutContainer">
    <div className="logInorSignUp">
        SIGN OUT

    </div>
    <i class="fas fa-sign-out-alt"></i>
</div>)
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