
import React, { Component } from 'react';


class DrumMachineSection extends React.Component {

    constructor(props) {
        super(props);

    }

    render(){

        return (
            <div id="drumMachineSection">
                <div id="drumMachineSectionTitle">Drum Machine</div>
                <div id="drumMachineContainer">
                    <div id="drumMachineTopContainer">
                        <a id="drumMachineLogoText" class="navbar-brand">
                            <img id="drumMachineLogo" src="pics/guitarLogo.png"/> Sounds from:
                            <span id="currentKitName"> {this.props.kitName} </span> - 
                            <span id="currentKitPrice"> {this.props.kitPrice} </span>
                        </a>
                        <div  id="addToCartContainer">
                            <button onClick={this.props.addToCart} id="addToCartButton" type="button" className="btn btn-primary">
                                <i className="fas fa-shopping-cart"></i> Add to cart
                            </button>
                        </div>
                    </div>
                    <div id="drumMachineMainContainer">
                        <div id="drumMachineLeftMain">
                            <div id="drumMachineLeftTop">
                                <div id="soundPackImageContainer">
                                    <img id="soundPackImage" src={this.props.kitPic} alt="Smiley face"/>
                                </div>
                            </div>
                            <div id="drumMachineLeftBottom">{this.props.displayKits}</div>
                        </div>
                        <div id="drumMachineRightMain"> {this.props.padsWithContainer}</div>   
                    </div>
                    <div id="drumMachineBottomContainer"></div>
                </div>

            </div>

        )
    }

}

export default DrumMachineSection;