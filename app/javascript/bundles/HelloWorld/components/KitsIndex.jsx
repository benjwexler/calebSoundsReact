import ReactOnRails from "react-on-rails";
import React, { Component } from "react";
import Navbar from "./Navbar.js";
import MobileNav from "./MobileNav.js";
import ShowKits from "./ShowKits.js";
import KitAdmin from "./KitAdmin.js";

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
      currentTrack: undefined,
      showModal: false
    };
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
        />
      );
    });

    return (
      <div>
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
