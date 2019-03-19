import React from 'react';


const navbar = (props) => {

    let goToSection = (section, scrollIntoViewBool) => {

        console.log(window.location.pathname)

        let pathname = window.location.pathname;

        if(pathname === "/") {
            document.getElementById(`${section}`).scrollIntoView(scrollIntoViewBool)
        } else {
            window.location=`http://localhost:3000#${section}`
        }
       
    }

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
            
            <a href={'/users/' + props.userId}>
            <div className="accountLink">
            Account Info
            </div>
            </a>
            
            
            <hr/>
            
            <a href="/users/edit">
            <div className="accountLink">
            Update Info
            </div>
            </a>
            
            
            <hr/>
            <div onClick={props.signOut} className="accountLink">Sign Out</div>
        </div>
    </div>
)
}

// let hamburgerIcon 

// if(!props.showMobileNav) {
//     hamburgerIcon = "fas fa-bars"
// } else {
//     hamburgerIcon ="hamburgerX fas fa-times-circle"
// }


    return (
        <div id="outerNavContainer">
        <div id="nav">
            <div id="navContainer">
                <i onClick={props.toggleMobileNav} className="fas fa-bars"></i>
                <a href="/" id="navTitle">Caleb Elias G sounds</a>
                <div onClick={() => goToSection("section2", false)} className="navLink">Sound Packs</div>
                <div onClick={() => goToSection("section3", true)} className="navLink">Latest Tracks</div>
                <div id="navStreamingIcons">
                        <a href="https://open.spotify.com/artist/3KfwtF94LanpNpDp6yVCji?si=TZgT40K1Ry-StUGIRznfFw" target="_blank" className="navLink">
                                <i className="fab fa-spotify streamingIcon"></i>
                        </a>
                        <a href="https://soundcloud.com/calebeliasgmusic" target="_blank" className="navLink">
                            <i className="fab fa-soundcloud streamingIcon"></i>
                        </a>
                        <a href="https://itunes.apple.com/us/artist/caleb-elias-g/1441180549" target="_blank" className="navLink">
                            <i className="fab fa-apple streamingIcon"></i>
                        </a>
                        <a href="https://www.youtube.com/channel/UCTtEZQLWH7zD5XLguxAu-8Q" target="_blank" className="navLink">
                                <i className="fab fa-youtube streamingIcon"></i>
                        </a>
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