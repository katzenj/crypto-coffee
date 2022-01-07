require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    defaultNetwork: {
      url: process.env.MUMBAI_ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
    rinkeby: {
      url: process.env.STAGING_ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
    polygon_mumbai: {
      url: process.env.MUMBAI_ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
