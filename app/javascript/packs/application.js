/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb


console.log('Hello World from Webpacker')
// Support component names relative to this directory:
var componentRequireContext = require.context("components", true)
var ReactRailsUJS = require("react_ujs")
ReactRailsUJS.useContext(componentRequireContext)

import ReactOnRails from 'react-on-rails';
import Track from '../bundles/HelloWorld/components/Track.jsx';
import App from '../bundles/HelloWorld/components/App.jsx';
import UserInfo from '../bundles/HelloWorld/components/UserInfo.jsx';
import EditUserInfo from '../bundles/HelloWorld/components/EditUserInfo.jsx';
import NewCheckout from '../bundles/HelloWorld/components/NewCheckout.jsx';
// import Section2 from '../bundles/HelloWorld/components/Section2.jsx';
import DrumMachineSection from '../bundles/HelloWorld/components/DrumMachineSection.jsx';
import Checkout from '../bundles/HelloWorld/components/Checkout.jsx';
import RecoverPassword from '../bundles/HelloWorld/components/RecoverPassword.jsx';
import ChangePassword from '../bundles/HelloWorld/components/ChangePassword.jsx';
import NewTrack from '../bundles/HelloWorld/components/NewTrack.jsx';
import EditTrack from '../bundles/HelloWorld/components/EditTrack.jsx';
import ShowTrack from '../bundles/HelloWorld/components/ShowTrack.jsx';
import ShowKit from '../bundles/HelloWorld/components/ShowKit.jsx';
import TracksIndex from '../bundles/HelloWorld/components/TracksIndex.jsx';


// This is how react_on_rails can see the HelloWorld in the browser.


ReactOnRails.register({
    App
  });

  ReactOnRails.register({
    UserInfo
  });

  ReactOnRails.register({
    EditUserInfo
  });

  ReactOnRails.register({
    NewCheckout
  });

  ReactOnRails.register({
    RecoverPassword
  });

  ReactOnRails.register({
    ChangePassword
  });

  ReactOnRails.register({
    Track
  });

  ReactOnRails.register({
    NewTrack
  });

  ReactOnRails.register({
    EditTrack
  });

  ReactOnRails.register({
    ShowTrack
  });

  ReactOnRails.register({
    TracksIndex
  });

  ReactOnRails.register({
    ShowKit
  });




  // ReactOnRails.register({
  //   Section2
  // });

  ReactOnRails.register({
    DrumMachineSection
  });


  ReactOnRails.register({
    Checkout
  });



