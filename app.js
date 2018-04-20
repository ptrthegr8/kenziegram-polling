const fs = require('fs');
const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({
    dest: 'public/uploads'
});
app.set('view engine', 'pug');

const items = [{"timestamp": 0}];
// 
app.use(express.static(__dirname + '/public'));
app.use(express.json());


// GET
app.get('/', (req, res) => {
    fs.readdir('./public/uploads', function (err, items) {
        // console.log(items);
        res.render('index', {
            title: 'KenzieGram',
            images: items
        });
    });
});
// POST
app.post('/upload', upload.single('myFile'), function (req, res, next) {
    // req.file is the `myFile` file
    console.log('Uploaded: ' + req.file.filename);
    items.push({
        'images': req.file.filename,
        'timestamp': Date.now()
    });
    console.log(items);
    res.render('upload-screen', {
        image: req.file.filename
    });
    res.end()
});
// POST latest
app.post('/latest', (req, res) => {
    let mostRecent = {
        'images': [],
        'timestamp': Date.now()
    };
    for (let i = 0; i < items.length; i++) {
        // if (items[i].timestamp > items[i-1].timestamp) {
        //     mostRecent.images.push(items[i].image);
        // }
        mostRecent.images.push(items[i].image);
    };
    res.send(mostRecent);
});
//
app.listen(3000, () => console.log(`http://localhost:3000/`));