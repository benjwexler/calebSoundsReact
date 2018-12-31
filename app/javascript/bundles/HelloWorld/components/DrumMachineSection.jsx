
import React, { Component } from 'react';
import {LinkedList, Node} from './linkedList.js';

class DrumMachineSection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            kits: undefined,
            kitPic: undefined,
            kitName: undefined,
            kitPrice: undefined
        }
    }

    componentDidMount() {

    let kitLinkedlist1 = new LinkedList
    let that = this

    $.ajax({
        type: "GET",
        url: "http://localhost:3000/kits",
        success: function(json){
           json.forEach((kit) => {
            kitLinkedlist1.addToTail(kit)
           }
        )

        kitLinkedlist1.head.prev = kitLinkedlist1.tail
        kitLinkedlist1.tail.next = kitLinkedlist1.head

        that.setState({
            kits: kitLinkedlist1,
            kitPic: kitLinkedlist1.head.value.image,
            kitName: kitLinkedlist1.head.value.name,
            kitPrice: kitLinkedlist1.head.value.price
            })


       
        },
        error: function(xhr) { 
        }, 
        dataType: "json"
      });

    }

    changeKit = (e) => {
        this.setState({
            kitPic: e.target.src,
            kitName: e.target.dataset.kitName,
            kitPrice: e.target.dataset.kitPrice
            })
    }

    nextImage = () => {
        let newLinkedList = this.state.kits
        newLinkedList.head = newLinkedList.head.next
        this.setState({
            kits: newLinkedList
            })
    }

    prevImage = () => {
        let newLinkedList = this.state.kits
        newLinkedList.head = newLinkedList.head.prev
        this.setState({
            kits: newLinkedList
            })
    }

    render(){
        let that = this
        let displayKits
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

        if (this.state.kits) {
            let kitPics = []
            let currentNode = this.state.kits.head

            for (let i=0; i<5; i++){
                kitPics.push(
                    <div className="galleryImageContainer">
                        <img 
                        onClick={(e) => that.changeKit(e)} 
                        data-kit-name={currentNode.value.name} 
                        data-kit-price={currentNode.value.price}
                        src={currentNode.value.image} 
                        className="galleryImage"/>
                    </div>
                )

                currentNode = currentNode.next
            }

            displayKits = ( 
                <div id="packsGallery">
                    <i onClick={() => that.prevImage()} id="prevBtn" className="fas fa-arrow-left fa-3x"></i>
                        {kitPics}
                    <i onClick={() => that.nextImage()} id="nextBtn" className="fas fa-arrow-right fa-3x"></i>
                </div>
            )

        }

        return (
            <div id="drumMachineSection">
                <div id="drumMachineSectionTitle">Drum Machine</div>
                <div id="drumMachineContainer">
                    <div id="drumMachineTopContainer">
                        <a id="drumMachineLogoText" class="navbar-brand">
                            <img id="drumMachineLogo" src="pics/guitarLogo.png"/> Sounds from:
                            <span id="currentKitName"> {this.state.kitName} </span> - 
                            <span id="currentKitPrice"> {this.state.kitPrice} </span>
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
                                    <img id="soundPackImage" src={this.state.kitPic} alt="Smiley face"/>
                                </div>
                            </div>
                            <div id="drumMachineLeftBottom">{displayKits}</div>
                        </div>
                        <div id="drumMachineRightMain"> {padsWithContainer}</div>   
                    </div>
                    <div id="drumMachineBottomContainer"></div>
                </div>
            </div>

        )
    }

}

export default DrumMachineSection;