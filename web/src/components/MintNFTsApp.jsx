import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import myEpicNft from "../utils/MyEpicNFT.json";
import ConnectToWallet from './ConnectToWalletButton';
import MintNFTButton from './MintNFTButton';

import {
  OPENSEA_LINK,
  TOTAL_MINT_COUNT,
  CONTRACT_ADDRESS
} from '../constants';

const MintNFTsApp = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    }
    console.log("We have the ethereum object", ethereum);

    // Request access the user's wallet
    const accounts = await ethereum.request({ method: "eth_accounts" });

    // User can have multiple authorized accounts, we grab the first one if its there!
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);

      setupEventListener();
    } else {
      console.log("No authorized account found");
    }
  };

  const setupEventListener = async () => {
    // Most of this looks the same as our function askContractToMintNft
    try {
      const { ethereum } = window;

      if (ethereum) {
        // Same stuff again
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          myEpicNft.abi,
          signer
        );

        // THIS IS THE MAGIC SAUCE.
        // This will essentially "capture" our event when our contract throws it.
        // If you're familiar with webhooks, it's very similar to that!
        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber());
          alert(
            `Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
          );
        });

        console.log("Setup event listener!");
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * This runs our function when the page loads.
   */
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const openseaButtonCss = {
    marginTop: '10px',
    display: 'block',
    color: 'white',
  }

  return (
    <div className="header-container">
      <p className="header gradient-text">My NFT Collection</p>
      <p className="sub-text">
        Each unique. Each beautiful. Discover your NFT today.
      </p>
      {currentAccount === "" ? (
        <ConnectToWallet setCurrentAccount={setCurrentAccount} setupEventListener={setupEventListener} />
      ) : (
        <MintNFTButton />
      )}

      <a href={OPENSEA_LINK} style={openseaButtonCss} target="_blank">View complete Collection on OpenSea</a>
    </div>
  );
};

export default MintNFTsApp;
