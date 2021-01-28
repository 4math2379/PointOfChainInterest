const ipfsClient = require('ipfs-http-client');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const Web3 = require('web3');
const IPFS = require('ipfs');
const metamaskOnboarding = require('@metamask/onboarding');


//build the contract and the auth





const isMetaMaskInstalled = () => {
    const { ethereum } = window
    return Boolean(ethereum && ethereum.isMetaMask)
}










//end scope initialize



function getPermissionsDisplayString (permissionsArray) {
  if (permissionsArray.length === 0) {
    return 'No permissions found.'
  }
  const permissionNames = permissionsArray.map((perm) => perm.parentCapability)
  return permissionNames.reduce((acc, name) => `${acc}${name}, `, '').replace(/, $/u, '')



    }
    





//connect to the ipfs network

const node =  IPFS.create()


const ipfs = new ipfsClient({host: 'localhost', port: '5001',  protocol:'http'});
const app = express();





app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());


app.get('/', (req, res) => {
res.render('index');


});

app.post('/upload', (req, res )=> {
    const file = req.files.file;
    const fileName = req.body.poiName;
    const filePath = 'files/' + fileName;


    //move to server tweak for coordinate not files 

    file.mv(filePath, async (err)=>{
        if (err) {
            console.log('ERROR : failed to DL the file POI ');
            return res.status(500).send(err);
        }


        const fileHash = await addPoi(poiName, poiPath);
        fs.unlink(filePath, (err) =>{
            if (err) console.log('ERROR: file hash failed');
        });


        res.render('upload', {poiName, poiPath});
    });

});




//addPOI
const addPoi = async(poiName, poiPath) => {
    const poiFile = fs.readFileSync(poiPath);
    const fileAdded = await ipfs.add({path: poiName, content:poiFile});
    const poiHash = fileAdded[0].hash;


    return poiHash;
};

//adding web3 stuff 

let web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
//const accounts = web3.eth.accounts;
//const accounts = await ethereum.request({ method: 'eth_accounts' });





let count = 0;
let prev = 0 
setInterval (function () {
//getweb3 eth block ..... ?
web3.eth.getBlock('latest', function (e, res){
    if (res.number >= prev) {
        console.log('latest', count++ ,  res.number, res.timestamp)
        } else {
            console.log('laster', count++, res.number, res.timestamp, 'Passed age block')
        }
        prev =res.number



})



}, 2000)






app.listen(3000, () =>{
    console.log('app listen on port 3000');
});
