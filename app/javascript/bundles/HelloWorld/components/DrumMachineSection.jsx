
import React, { Component } from 'react';




class DrumMachineSection extends React.Component {


    render(){

        let pads = []

        for (let i=0; i<16; i++){
            pads.push(
                <div className="padContainer">
                    <div className="padText"> Guitar {i}</div>
                    <div className="pad"></div>
                </div>
            )
        }

        let padsWithContainer = <div className="padRow"> {pads} </div>

        return (
            <div id="drumMachineSection">
                <div id="drumMachineSectionTitle">Drum Machine</div>
                <div id="drumMachineContainer">
                    <div id="drumMachineTopContainer">
                        <a id="drumMachineLogoText" class="navbar-brand">
                            <img id="drumMachineLogo" src="pics/guitarLogo.png"/> Sounds from:
                            <span id="currentKitName"> "New Thang" </span> - 
                            <span id="currentKitPrice"> $3.99</span>
                        </a>
                        <div id="addToCartContainer">
                            <button id="addToCartButton" type="button" className="btn btn-primary">
                                <i className="fas fa-shopping-cart"></i> Add to cart
                            </button>
                        </div>
                    </div>
                    <div id="drumMachineMainContainer">
                        <div id="drumMachineLeftMain">
                            <div id="drumMachineLeftTop">
                                <div id="soundPackImageContainer">
                                    <img id="soundPackImage" src="pics/beatTape18Caleb.jpg" alt="Smiley face"/>
                                </div>
                            </div>
                            <div id="drumMachineLeftBottom">
                                <div id="packsGallery">
                                    <i id="prevBtn" className="fas fa-arrow-left fa-3x"></i>
                                    <div className="galleryImageContainer">
                                        <img src="" className="galleryImage"/>
                                    </div>
                                    <div className="galleryImageContainer">
                                        <img src="" className="galleryImage"/>
                                    </div>
                                    <div className="galleryImageContainer">
                                        <img src="" className="galleryImage"/>
                                    </div>
                                    <div className="galleryImageContainer">
                                        <img src="" className="galleryImage"/>
                                    </div>
                                    <div className="galleryImageContainer">
                                        <img src="" className="galleryImage"/>
                                    </div>
                                    <i id="nextBtn" className="fas fa-arrow-right fa-3x"></i>

                                </div>
                            </div>
                        </div>

                        <div id="drumMachineRightMain">
                            
                            {padsWithContainer}
                        </div>
                        
                    </div>
                    <div id="drumMachineBottomContainer"></div>
                </div>
            </div>

        )
    }

}

export default DrumMachineSection;