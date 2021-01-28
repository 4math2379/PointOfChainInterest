// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.8.1;

contract SimpleStorage {
  uint storedData;
  //address for the travellers
  address[16] public travellers;
  
  
  //pointing the location by a click by a function
function addLocation(uint locationId) public returns (uint){
  //locationId is the click of the POI on the map , location must be in range of the array of the travellers.
  require(locationId >= 0 && locationId <= 15);

  travellers[locationId] = msg.sender;

  return locationId;
}


  //retrieving the locaction data

  function getTravellers() public view returns (address[16] memory) {


    return travellers;
  }

  
}
