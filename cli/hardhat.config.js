require('dotenv').config()
require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.1',
  networks: {
    rinkeby: {
      url: process.env.ALCHEMY_ENDPOINT,
      accounts: [process.env.WALLET_PRIVATE_KEY],
    },
  },
};