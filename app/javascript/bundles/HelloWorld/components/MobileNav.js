import React from 'react';


const mobileNav = (props) => {

    return (
        <div id="navDropdownOuterContainer"> 
            <div id="mobileLinksContainer" className={props.mobileNavToggle}>
            <div onClick={props.openModal} className="mobileNavLink">
                <div className="mobileNavLinkName">
                    Log in/Sign up
                </div>
            </div>
                <div onClick={() => {document.getElementById("section2").scrollIntoView(false); props.toggleMobileNav()}} className="mobileNavLink">
                <div className="mobileNavLinkName">
                    Sound Packs
                </div>
            </div>
            <div onClick={() => {document.getElementById("section3").scrollIntoView(); props.toggleMobileNav()}} className="mobileNavLink">
                <div className="mobileNavLinkName">
                    Latest Tracks
                </div>
            </div>
            <div className="mobileNavLink">
                <div className="mobileNavLinkName">
                <div id="navStreamingIcons">
                        <a href="https://open.spotify.com/artist/3KfwtF94LanpNpDp6yVCji?si=TZgT40K1Ry-StUGIRznfFw" target="_blank" className="navLinkMobile">
                                <i onClick={() => props.toggleMobileNav()} style={{displau: "flex !important"}} className="fab fa-spotify streamingIcon"></i>
                        </a>
                        <a href="https://soundcloud.com/calebeliasgmusic" target="_blank" className="navLinkMobile">
                            <i onClick={() => props.toggleMobileNav()} className="fab fa-soundcloud streamingIcon"></i>
                        </a>
                        <a href="https://itunes.apple.com/us/artist/caleb-elias-g/1441180549" target="_blank" className="navLinkMobile">
                            <i onClick={() => props.toggleMobileNav()} className="fab fa-apple streamingIcon"></i>
                        </a>
                        <a href="https://www.youtube.com/channel/UCTtEZQLWH7zD5XLguxAu-8Q" target="_blank" className="navLinkMobile">
                                <i onClick={() => props.toggleMobileNav()} className="fab fa-youtube streamingIcon"></i>
                        </a>
                    </div>
                </div>
            </div>
        
            
        </div>
    </div>
    )
};

export default mobileNav;