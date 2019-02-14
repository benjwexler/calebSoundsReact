import React from 'react';


const mobileNav = (props) => {

    return (
        <div id="navDropdownOuterContainer"> 
            <div id="mobileLinksContainer" className={props.mobileNavToggle}>
                <div className="mobileNavLink">
                <div className="mobileNavLinkName">
                    Sound Packs
                </div>
            </div>
            <div className="mobileNavLink">
                <div className="mobileNavLinkName">
                    Beats
                </div>
            </div>
            <div className="mobileNavLink">
                <div className="mobileNavLinkName">
                    Tutorials
                </div>
            </div>
            <div className="mobileNavLink">
                <div className="mobileNavLinkName">
                    Songs
                </div>
            </div>
            <div className="mobileNavLink">
                <div className="mobileNavLinkName">
                    Videos
                </div>
            </div>
            <div onClick={props.openModal} className="mobileNavLink">
                <div className="mobileNavLinkName">
                    Log in/Sign up
                </div>
            </div>
        </div>
    </div>
    )
};

export default mobileNav;