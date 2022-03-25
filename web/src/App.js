import "./styles/App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import React from "react";
import MintNFTsApp from './components/MintNFTsApp';

import {
  TWITTER_HANDLE,
  TWITTER_LINK,
} from './constants';

const App = () => (
  <div className="App">
    <div className="container">

      <MintNFTsApp />

      <div className="footer-container">
        <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
        <a
          className="footer-text"
          href={TWITTER_LINK}
          target="_blank"
          rel="noreferrer"
        >{`built on @${TWITTER_HANDLE}`}</a>
      </div>
    </div>
  </div>
);

export default App;
