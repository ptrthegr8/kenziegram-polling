const fs = require('fs');
const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({
    dest: 'public/uploads'
});
app.set('view engine', 'pug');
//
const uploadedItems = [];
// 
app.use(express.static('public'));
app.use(express.static('views'));
app.use(express.json());


// GET
app.get('/', (req, res) => {
    const path = './public/uploads/'
    fs.readdir(path, function (err, items) {
        items.forEach(item => {
            fs.statSync(`./public/uploads/${item}`).mtimeMs
        });
        items.sort(function(a, b) {
            return fs.statSync(path + b).mtimeMs - 
                   fs.statSync(path + a).mtimeMs;
        }); 
        res.render('index', {
            // title: 'KenzieGram',
            images: items
        });
    });
});
// POST
app.post('/upload', upload.single('myFile'), function (req, res, next) {
    console.log('Uploaded: ' + req.file.filename);
    // uploadedItems.push({
    //     'images': req.file.filename,
    //     'timestamp': Date.now()
    // });
    //
    uploadedItems.push(req.file.filename);
    //
    console.log(uploadedItems)
    res.render('upload-screen', {
        image: req.file.filename
    });
});
// POST latest
// app.post('/latest', (req, res) => {
//     let mostRecent = {
//         'images': [],
//         'timestamp': Date.now()
//     };
//     for (let i = 0; i < uploadedItems.length; i++) {
//         if (uploadedItems[i].timestamp > req.body.after) {
//             mostRecent.images.push(uploadedItems[i].image);
//         }
//     };
//     res.send(mostRecent);
// });
// POST with direcotry timestamp
app.post('/latest', (req, res, next) => {
const path = './public/uploads'
    fs.readdir(path, (err, items) => {
        console.log('items:' + items)
        const mostRecent = items.filter((item)=> {
            console.log(`${path}/${item}`)
            fs.statSync(`${path}/${item}`).mtimeMs > req.body.after
        });
        console.log(mostRecent)
        res.send(mostRecent);
    });
});
// Listens for server
app.listen(3000, () => console.log(`http://localhost:3000/`));