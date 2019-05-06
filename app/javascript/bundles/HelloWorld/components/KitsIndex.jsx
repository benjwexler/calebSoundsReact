import ReactOnRails from "react-on-rails";
import React, { Component } from "react";
import Navbar from "./Navbar.js";
import MobileNav from "./MobileNav.js";
import ShowKits from "./ShowKits.js";
import KitAdmin from "./KitAdmin.js";
import EditKitModal from "./EditKitModal.js";

const convertToUsCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

class KitsIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      railsToken: ReactOnRails.authenticityToken(),
      showMobileNav: false,
      totalPrice: undefined,
      errorMessage: undefined,
      coverArt: undefined,
      newSrc: undefined,
      kits: [],
      currentkit: undefined,
      showModal: false,
      "kit[name]": undefined,
      "kit[price]": undefined,
      kitId: undefined,
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleImgUpload = this.handleImgUpload.bind(this)
  }

  toggleMobileNav = () => {
    let that = this;
    this.setState({
      showMobileNav: !that.state.showMobileNav
    });
  };

  handleResize = () => {
    if (window.innerWidth > 1120) {
      this.setState({
        showMobileNav: false
      });
    } else {
      this.setState({
        showAccountDropdown: false
      });
    }
  };

  updateKitReq = e => {

    this.setState({
      showModal: false,
    });
    let that = this;
    e.preventDefault();
    console.log("Trying to Send!")
    let kitObj = {};
    kitObj.utf8 = "✓";
    kitObj.authenticity_token = that.state.railsToken;
    kitObj.commit = "Edit Kit Info";
    kitObj["_method"] = "patch";

    var data = new FormData();
    data.append("utf8", "✓");
    data.append("authenticity_token", that.state.railsToken);

    data.append("kit[name]", that.state["kit[name]"]);
    data.append("kit[price]", that.state["kit[price]"]);
    data.append("kit[description]", that.state["kit[description]"]);


    data.append("commit", "Edit kit");
    data.append("_method", "patch");
    if(that.state.coverArt) {
      data.append("kit[cover_art]", that.state.coverArt, that.state.coverArt);
    }
   

    let url = `http://localhost:3000/kits/${that.state.kitId}`;

    $.ajax({
      type: "POST",
      enctype: 'multipart/form-data',
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000,

      url: url,
      data: data,
      success: function(json) {
        if (json.errorMessage) {
        } else {
          console.log(json);

          that.setState({
            kits: json
          });
          
        }
      },
      error: function(xhr) {
        console.log("error");
      },
      dataType: "json"
    });
  };

  toggleModal = (kitIndex) => {

    
    let kitName;
    let kitPrice
    let kitDescription;
    let kitId;
    let date;
    if(this.state.kits[kitIndex]) {
     kitName = this.state.kits[kitIndex].name
     kitId = this.state.kits[kitIndex].id
     kitPrice = this.state.kits[kitIndex].price
     kitDescription = this.state.kits[kitIndex].description
     
    }
    
    this.setState({
      showModal: !this.state.showModal,
      currentEditKit: kitName,
      "kit[name]": kitName,
      "kit[price]": kitPrice,
      "kit[description]": kitDescription,
      kitId: kitId,

    });
  };

  handleFormChange (evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleImgUpload = (event) => {
    this.setState({
      coverArt: event.target.files[0]
    })
  }

  deleteKit = (kitIndex) => {
    let that = this;
    console.log(this.state.kits[kitIndex].id)

    let kitId = this.state.kits[kitIndex].id;
  
    var result = confirm("Want to delete?");
if (result) {
  
  $.ajax({
    type: "POST",
    url: `/kits/${kitId}`,
    data: { _method: "delete", authenticity_token: that.state.railsToken },
    success: function(json) {
      console.log("trying to delete");
      console.log(json);
      that.setState(
        {
          kits: json,
          counter: 7

        },
        that.bindWidget
      );
    },
    error: function(xhr) {},
    dataType: "json"
    });
  }  
}


  componentDidMount() {
    let that = this;
    window.addEventListener("resize", this.handleResize);
    fetch(`/kits.json`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        that.setState({
          kits: myJson
        });
      });
  }

  render() {
    let that = this;

    let modal;


    if (this.state.showModal) {
      modal = (
        <EditKitModal
          exitModal={this.toggleModal}
          railsToken={this.state.railsToken}
          kitName={this.state["kit[name]"]}
          kitPrice={this.state["kit[price]"]}
          kitDescription={this.state["kit[description]"]}
          onChange={this.handleFormChange}
          submit={this.updateKitReq}
          handleImgUpload={this.handleImgUpload}
        />
      );
    }

    let mobileNavToggle = "hideMobileNav";

    if (this.state.showMobileNav) {
      mobileNavToggle = "showMobileNav";
    }

    const kits = that.state.kits.map((kit, i) => {
      let oddRow;
      if (i % 2 === 1) {
        oddRow = "oddRow";
      }

      return (
        <KitAdmin
          name={kit.name}
          id={kit.id}
          price={convertToUsCurrency.format(kit.price)}
          description={kit.description}
          coverArt={kit.image}
          bgImage={{background: `url(${kit.image}) center center / cover no-repeat`}} 
          editKit={() => this.toggleModal(i)}
          deleteKit={() => this.deleteKit(i)}
        />
      );
    });

    return (
      <div>
      {modal}
        <Navbar toggleMobileNav={this.toggleMobileNav} />
        <MobileNav
          toggleMobileNav={this.toggleMobileNav}
          mobileNavToggle={mobileNavToggle}
        />

        <ShowKits kits={kits} />
      </div>
    );
  }
}

export default KitsIndex;
