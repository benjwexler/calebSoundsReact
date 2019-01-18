import React from 'react';


const mobileNav = (props) => {

    return (
        <div id="navDropdownOuterContainer"> 
            <div id="mobileLinksContainer"class={props.mobileNavToggle}>
                <div class="mobileNavLink">
                <div class="mobileNavLinkName">
                    Sound Packs
                </div>
            </div>
            <div class="mobileNavLink">
                <div class="mobileNavLinkName">
                    Beats
                </div>
            </div>
            <div class="mobileNavLink">
                <div class="mobileNavLinkName">
                    Tutorials
                </div>
            </div>
            <div class="mobileNavLink">
                <div class="mobileNavLinkName">
                    Songs
                </div>
            </div>
            <div class="mobileNavLink">
                <div class="mobileNavLinkName">
                    Videos
                </div>
            </div>
            <div class="mobileNavLink">
                <div class="mobileNavLinkName">
                    Log in/Sign up
                </div>
            </div>
        </div>
    </div>
    )
};

export default mobileNav;