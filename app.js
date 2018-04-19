const fs = require('fs');
const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({
    dest: 'public/uploads'
});
app.set('view engine', 'pug');

const items = [];
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
// GET latest
app.get('/latest', (req, res) => {
    fs.readdir('./', function (err, items) {
        res.send("test");
    });
})
// POST latest
app.post('/latest', (req, res) => {
    let mostRecent = {
        'images': [],
        'timestamp': Date.now()
    };

    fs.readdir('./public/latest', function (err, items) {
        // var modified = fs.statSync(imagePath).mtimeMs;
        // if (modified > after) {};
        res.send(mostRecent);
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
});

app.listen(3000, () => console.log(`http://localhost:3000/`));