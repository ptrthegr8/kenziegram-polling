const fs = require('fs');
const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({
    dest: 'public/uploads'
});
app.set('view engine', 'pug');

const uploadedItems = [];
// 
app.use(express.static(__dirname + '/public'));
app.use(express.static('views'));
app.use(express.json());


// GET
app.get('/', (req, res, next) => {
    const path = './public/uploads/'
    fs.readdir(path, function (err, items) {
        // console.log(items);
        res.render('index', {
            title: 'KenzieGram',
            images: items,
        });
    });
});
// POST
app.post('/upload', upload.single('myFile'), function (req, res, next) {
    // req.file is the `myFile` file
    console.log('Uploaded: ' + req.file.filename);
    uploadedItems.push({
        'images': req.file.filename,
        'timestamp': Date.now()
    });
    console.log(uploadedItems);
    res.render('upload-screen', {
        image: req.file.filename
    });
});
// POST latest
app.post('/latest', (req, res, next) => {
    let mostRecent = {
        'images': [],
        'timestamp': Date.now()
    };
    for (let i = 0; i < uploadedItems.length; i++) {
        if (uploadedItems[i].timestamp > req.body.after) {
            mostRecent.images.push(uploadedItems[i].image);
        }
    };
    res.send(mostRecent);
});
//
app.listen(3000, () => console.log(`http://localhost:3000/`));