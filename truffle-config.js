const path = require("path");
//require("dotenv");

module.exports = {
  
  //contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 7545,
      network: 5777
    },
    ganache: {
      host:"127.0.0.1",
      port:7545,
      network:5777,
      network_id:5777
    }
  }
};
