pragma solidity >=0.4.21 <0.8.1;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SimpleStorage.sol";

contract TestSimpleStorage {

  SimpleStorage storeLocation = SimpleStorage(DeployedAddresses.SimpleStorage());
uint expectedLocationId = 8;
address expectedTraveller = address(this);




function testUserCanTravelled() public {
  uint returnedLocId = storeLocation.addLocation(expectedLocationId);

Assert.equal(returnedLocId, expectedLocationId, "Location should be added !");
}


// Testing travellers
function testTravellersByLocId() public {
  address traveller = storeLocation.travellers(expectedLocationId);

  Assert.equal(traveller, expectedTraveller, "Traveller of this location should be this contract");
}



// Testing retrieval of all travellers datas
function testGetTravellerAddressByLocationIdInArray() public {
  // Store travellers in memory rather than contract's storage
  address[16] memory travellers = storeLocation.getTravellers();

  Assert.equal(travellers[expectedLocationId], expectedTraveller, "Traveller of the expected Location should be this contract");
}


}




