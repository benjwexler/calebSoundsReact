
import React, { Component } from 'react';
import {LinkedList, Node} from './linkedList.js';

class DrumMachineSection extends React.Component {

    constructor(props) {
        super(props);

        this.initiateOnce = 0;
        this.works = undefined ; 

        this.props = props

        this.state = {
            kits: undefined,
            kitPic: undefined,
            kitName: undefined,
            kitPrice: undefined,
            kitId: undefined,
            kitSounds: undefined,
            pads: undefined,
            context: undefined,
            gainNode: undefined   
        }
    }

    initiateAudioContext = () => {

        let that = this

        if(that.initiateOnce === 0) {
            let AudioContext = window.AudioContext || window.webkitAudioContext;
            window["AudioContext"] = window.AudioContext || window.webkitAudioContext;

            let context = new AudioContext();
            window["context"] = new AudioContext()
            window["gainNode"] = context.createGain();
            let gainNode = context.createGain();


        that.setState({
            context: context,
            gainNode: gainNode 
        
            })

        that.initiateOnce = 1

        } else {
            window.removeEventListener("mouseover", this.initiateAudioContext)
        }
    }

    playSound = (number, soundFile) => {
        let that = this
        window[`bufferNode${number}`] = that.state.context.createBufferSource();
        var request = new XMLHttpRequest();
        request.open('GET', soundFile, true);
        request.responseType = 'arraybuffer';
        request.onload = function () {
            that.state.context.decodeAudioData(
                request.response,
                function (buffer) {
                    window[`bufferNode${number}`].buffer = buffer;
                    window[`bufferNode${number}`].connect(gainNode);
                    gainNode.connect(that.state.context.destination);
                    gainNode.gain.setValueAtTime(1, that.state.context.currentTime);
                },
                function (e) { console.log("Error with decoding audio data" + e.err); }
            );
        };
        request.send()
        window[`bufferNode${number}`].start()
    };

    stopSound = (number) => {
        let that = this
        let bufferNodeName = window[`bufferNode${number}`]
        // try/catch is used because first time a pad is played stopSound won't work and needs to be ignored
        try {
            bufferNodeName.stop(that.state.context.currentTime);
          }
        catch(err) {
        }
       
    };

    playAndStop = (bufferNodeName, soundFile) => {
        this.stopSound(bufferNodeName);
        this.playSound(bufferNodeName, soundFile);
    };

    componentDidMount() {

    window.addEventListener("mouseover", this.initiateAudioContext)

    
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
            kitPrice: kitLinkedlist1.head.value.price,
            kitId: kitLinkedlist1.head.value.id
            }, that.loadSounds(kitLinkedlist1.head.value.id))
        },
        error: function(xhr) { 
        }, 
        dataType: "json"
      });

    }

    loadSounds = (kitId) => {

        let that = this
        let padsObj = {}

        $.ajax({
            type: "GET",
            url: `http://localhost:3000/kits/${kitId}`,
            success: function(json){
                json.forEach((sound, index) => {
                    padsObj[index] = sound.soundfile
                   })

                that.setState({
                    kitSounds: json,
                    pads: padsObj 
                    })
            },
            error: function(xhr) { 
            }, 
            dataType: "json"
          });
    
        }

    changeKit = (e) => {
        this.loadSounds(e.target.dataset.kitId)
        this.setState({
            kitPic: e.target.src,
            kitName: e.target.dataset.kitName,
            kitPrice: e.target.dataset.kitPrice,
            kitId: e.target.dataset.kitId
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
        let sound

        if(this.state.kitSounds) {
        for (let i=0; i<16; i++){
            
            if(this.state.kitSounds[i]) {
                sound = this.state.kitSounds[i].filename
            } else {
                sound = ""
            }

            pads.push(
                <div className="padContainer">
                    <div className="padText"> {sound} {i}</div>
                    <div onClick={() => that.playAndStop(i, that.state.kitSounds[i].soundfile)} className="pad"></div>
                </div>
            )
        }
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
                        data-kit-id={currentNode.value.id}
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