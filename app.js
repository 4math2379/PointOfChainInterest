const ipfsClient = require('ipfs-http-client');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');



//connect to the ipfs network

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
    const fileName = req.body.fileName;
    const filePath = 'files/' + fileName;


    //move to server twek for coordinate not files 

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


app.listen(3000, () =>{
    console.log('app listen on port 3000');
});