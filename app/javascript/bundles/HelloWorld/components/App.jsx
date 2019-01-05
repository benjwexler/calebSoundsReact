import ReactOnRails from 'react-on-rails';
import React, { Component } from 'react';
import Modal from './Modal.js';
import Navbar from './Navbar.js';
import HomeNavLinks from './HomeNavLinks.js'
import Section1 from './Section1.js';
import Section2 from './Section2.jsx';
import DrumMachineSection from './DrumMachineSection.jsx';
import Item from './Item.jsx';
import { LinkedList, Node } from './linkedList.js';

const convertToUsCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})


// import './Devise.css';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.compare = (a, b) => {
            const timestampA = this.state.cart[a].timestamp

            const timestampB = this.state.cart[b].timestamp

            let comparison = 0;

            if (timestampA > timestampB) {
                comparison = 1;
            } else if (timestampA <= timestampB) {
                comparison = -1;
            }
            return comparison;

        }

        this.initiateOnce = 0;

        this.state = {
            userLoggedIn: props.isLoggedIn,
            modalContent: 'login',
            railsToken: ReactOnRails.authenticityToken(),
            ErrorMessage: undefined,
            cart: undefined,
            showCart: false,
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



    componentDidMount() {

        $.ajax({
            method: "GET",
            url: `/carts`,
            dataType: 'json',
            success: this.response
        })



        window.addEventListener("mouseover", this.initiateAudioContext)


        let kitLinkedlist1 = new LinkedList
        let that = this

        $.ajax({
            type: "GET",
            url: "http://localhost:3000/kits",
            success: function (json) {
                json.forEach((kit) => {
                    kitLinkedlist1.addToTail(kit)
                    console.log(kit)
                    console.log("Moved mounting to APP")
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
            error: function (xhr) {
            },
            dataType: "json"
        });

    }

    response = (json) => {


        console.log(json)

        this.setState({
            cart: json,

        }, () => console.log(this.state)
        )



    }

    showOrHideCart = () => {
        this.setState({
            showCart: !this.state.showCart,
        })
    }

    addToCart = () => {
        let kitId
        let coverArtPic
        let data
        let price
        let name
        let that = this

        console.log("Hitting this function?")


        data = `authenticity_token=${this.state.railsToken}&kitId=${this.state.kitId}&coverArtPic=${this.state.kitPic}&price=${this.state.kitPrice}&name=${this.state.kitName}`

        // var response = (json) => {

        //     console.log(json)

        //     that.setState({
        //         cart: json,

        //         }, () => console.log(this.state)
        //     )



        //    }

        $.ajax({
            method: "POST",
            beforeSend: function(request) {
                request.setRequestHeader("X-CSRF-Token", that.state.railsToken);
              },
            url: `/carts`,
            data: data,
            dataType: 'json',
            success: this.response
        })



    }

    deleteItem = (e) => {
    
        let kitId = e.target.dataset.kitId
        console.log("about to delete")
    
        let that = this

        // let kitId = this.state.kitId
    
        $.ajax({
          method: "DELETE",
          beforeSend: function(request) {
            request.setRequestHeader("X-CSRF-Token", that.state.railsToken);
          },
          url: `carts/${kitId}`,
          data: `authenticity_token=${that.state.railsToken}`,
          dataType: 'json',
          success: that.response
        })
    
      }

      clearCart = () => {
        let that = this

        // let kitId = this.state.kitId
    
        $.ajax({
          method: "DELETE",
          beforeSend: function(request) {
            request.setRequestHeader("X-CSRF-Token", that.state.railsToken);
          },
          url: `carts/all`,
          data: `authenticity_token=${that.state.railsToken}`,
          dataType: 'json',
          success: that.response
        })
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
        catch (err) {
        }

    };

    playAndStop = (bufferNodeName, soundFile) => {
        this.stopSound(bufferNodeName);
        this.playSound(bufferNodeName, soundFile);
    };


    initiateAudioContext = () => {

        let that = this

        if (that.initiateOnce === 0) {
            let AudioContext = window.AudioContext || window.webkitAudioContext;
            window["AudioContext"] = window.AudioContext || window.webkitAudioContext;

            let context = new AudioContext();
            window["context"] = new AudioContext()
            window["gainNode"] = context.createGain();
            let gainNode = context.createGain();


            that.setState({
                context: context,
                gainNode: gainNode

            }, () => console.log(this.state)
            )

            that.initiateOnce = 1

        } else {
            window.removeEventListener("mouseover", this.initiateAudioContext)
        }
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

    loadSounds = (kitId) => {

        let that = this
        let padsObj = {}

        $.ajax({
            type: "GET",
            url: `http://localhost:3000/kits/${kitId}`,
            success: function (json) {
                json.forEach((sound, index) => {
                    padsObj[index] = sound.soundfile
                })

                that.setState({
                    kitSounds: json,
                    pads: padsObj
                })
            },
            error: function (xhr) {
            },
            dataType: "json"
        });

    }

    submitForm = (e) => {
        let that = this
        e.preventDefault()
        let signUpObj = {};
        signUpObj.utf8 = "✓";
        signUpObj.authenticity_token = that.state.railsToken
        signUpObj['user[email]'] = document.getElementById("userEmailInput").value
        signUpObj['user[password]'] = document.getElementById("userPasswordInput").value
        signUpObj.commit = "Log in"
        // signUpObj['CSRFToken'] = that.state.railsToken
        let url = "http://localhost:3000/users/sign_in"
        if (this.state.modalContent === 'signup')
            url = "http://localhost:3000/users"
        signUpObj["user[password_confirmation]"] = document.getElementById("userPasswordConfirmationInput").value
        $.ajax({
            type: "POST",
           
            url: url,
            data: signUpObj,
            success: function (json) {
                if (json.errorMessage) {
                    that.setState({
                        errorMessage: json.errorMessage
                    })
                } else {
                    console.log("signed in or signed up")
                    document.getElementById("modalButton").click()
                    console.log(json.cart)
                    that.setState({
                        railsToken: json.csrfToken,
                        userLoggedIn: true,
                        errorMessage: undefined,
                        cart: JSON.parse(json.cart)
                    }, () => {console.log(that.state)})
                }

            },
            error: function (xhr) {
                that.setState({
                    errorMessage: "Sorry, could not sign you in"
                })
            },
            dataType: "json"
        });
    }

    signOut = () => {
        let that = this
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/users/sign_out",
            data: { "_method": "delete", "authenticity_token": that.state.railsToken },
            success: function (json) {
                console.log("trying to delete")
                console.log(json)

                that.setState({
                    userLoggedIn: false,
                    railsToken: json.csrfToken,
                    cart: json.cart
                })

            },
            error: function (xhr) {
            },
            dataType: "json"
        });
    }


    setModal = (e) => {
        this.setState({
            modalContent: e.target.id,
            errorMessage: undefined
        }
        )
        document.getElementById("modalButton").click()
    }

    render() {
        let unsortedItems
        if (this.state.cart) {
            unsortedItems = Object.keys(this.state.cart)
            unsortedItems.sort(this.compare)
        } else {
            unsortedItems = []
        }
        let sum = 0

        let items
        if (this.state.showCart) {
            items = (
                <div>

                    {unsortedItems.map((item, index) => {
                        sum += this.state.cart[item].price * this.state.cart[item].quantity
                        console.log(this.state.cart[item].quantity * 5)
                        return <Item
                            quantity={this.state.cart[item].quantity}
                            name={this.state.cart[item].name}
                            key={item}
                            coverArtPic={this.state.cart[item].pic}
                            deleteItem={(e) => this.deleteItem(e)}
                            kitId={item}
                            kitData={item}
                            increaseQuantity={(e) => this.addToCart(e)}
                            decreaseQuantity={(e) => this.decreaseQuantity(e)}
                            price={convertToUsCurrency.format(this.state.cart[item].price * this.state.cart[item].quantity)}
                        />
                    })}
                    <div className="totalContainer">
                        <div className="totalText">Total:</div>
                        <div className="totalPrice">{convertToUsCurrency.format(sum)}</div>
                    </div>

                    <div onClick={() => this.clearCart()} className="emptyBag">Empty Bag</div>
                    <div className="checkoutOuterContainer">
                        <div className="proceedToCheckoutContainer">
                            Proceed to Checkout: {convertToUsCurrency.format(sum)}
                        </div>


                    </div>
                </div>
            );
        }

        let that = this
        let displayKits
        let pads = []
        let sound

        let shoppingCart = <div id="shoppingCartListAbsolute"> {items}  </div>

        if (this.state.kitSounds) {
            for (let i = 0; i < 16; i++) {

                if (this.state.kitSounds[i]) {
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

            for (let i = 0; i < 5; i++) {
                kitPics.push(
                    <div className="galleryImageContainer">
                        <img
                            onClick={(e) => that.changeKit(e)}
                            data-kit-name={currentNode.value.name}
                            data-kit-price={currentNode.value.price}
                            data-kit-id={currentNode.value.id}
                            src={currentNode.value.image}
                            className="galleryImage" />
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

        let shoppingCartDiv = (
            <li class="nav-item ">
                <div class="nav-link icon">
                    <i onClick={() => this.showOrHideCart()} id="shoppingCartIcon" class=" fa-2x fas fa-shopping-cart"></i>
                </div>
            </li>
        )
        let userLoggedInStatus
        if (this.state.userLoggedIn) {
            userLoggedInStatus = (
                <ul className="navbar-nav">
                    <li className="nav-item ">
                        <div onClick={() => this.signOut()} id="logout" className="nav-link">
                            logout
                 </div>
                    </li>
                    {shoppingCartDiv}
                </ul>
            )
        } else {
            userLoggedInStatus = (
                <ul className="navbar-nav">
                    <li className="nav-item " >
                        <div onClick={(e) => this.setModal(e)} id="login" className="nav-link">
                            Login
                </div>
                    </li>

                    <li className="nav-item ">
                        <div onClick={(e) => this.setModal(e)} id="signup" className="nav-link">
                            Signup
                </div>
                    </li>
                    {shoppingCartDiv}

                </ul>
            )

        }

        let showModal
        let formAction = "/users/sign_in"
        let formId = "ajax_signin"
        let showOrHidePassworConfirmation = 'hidePasswordConfirmation'

        if (this.state.modalContent === 'signup') {
            formAction = "/users"
            formId = "ajax_signup"
            showOrHidePassworConfirmation = 'showPasswordConfirmation'
        }

        let showOrHideErrorMessage = 'hideErrorMessage'

        if (this.state.errorMessage !== undefined) {
            showOrHideErrorMessage = 'showErrorMessage'
        }

        if (this.state.userLoggedIn === false) {
            showModal = <Modal
                railsToken={this.state.railsToken}
                modalTitle={this.state.modalContent}
                formAction={formAction}
                formId={formId}
                showOrHidePassworConfirmation={showOrHidePassworConfirmation}
                submitForm={(e) => this.submitForm(e)}
                showOrHideErrorMessage={showOrHideErrorMessage}
                errorMessage={this.state.errorMessage}
            />
        }

        let navLinks = <HomeNavLinks/>

        return (
            <div className="App">
                {shoppingCart}
               <Navbar
               navLinks =  {navLinks}
               userLoggedInStatus={userLoggedInStatus} />
                <Section1 />
                <Section2 />
                <DrumMachineSection
                    addToCart={this.addToCart}
                    padsWithContainer={padsWithContainer}
                    displayKits={displayKits}
                    kitName={this.state.kitName}
                    kitPrice={this.state.kitPrice}
                    kitPic={this.state.kitPic}
                />
                {showModal}

            </div>
        );
    }
}

export default App 