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
// GET
app.get('/', (req, res) => {
    const path = './public/uploads';
    fs.readdir(path, function (err, items) {
        console.log(items);
        res.render('index', {title: 'KenzieGram', images: items});
    });
});
// POST
app.post('/upload', upload.single('myFile'), function (req, res, next) {
    // req.file is the `myFile` file
    console.log('Uploaded: ' + req.file.filename);
    items.push(req.file.filename);
    res.render('upload-screen',{image:req.file.filename});
});
app.listen(3000);