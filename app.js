const fs = require('fs');
const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({
    dest: 'public/uploads'
});
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.static('views'));
app.use(express.json());

app.get('/', (req, res) => {
    const path = './public/uploads/'
    fs.readdir(path, function (err, items) {

        items.sort(function (a, b) {
            return fs.statSync(path + b).mtimeMs -
                fs.statSync(path + a).mtimeMs;
        });
        res.render('index', {
            title: 'KenzieGram',
            images: items
        });
    });
});

app.post('/upload', upload.single('myFile'), function (req, res, next) {
    console.log('Uploaded: ' + req.file.filename);
    res.render('upload-screen', {
        image: req.file.filename
    });
});
app.post('/latest', (req, res, next) => {
    const path = './public/uploads'
    fs.readdir(path, (err, items) => {
        console.log('items: ' + items)
        mostRecent = items.filter((item) => {
            console.log(`${path}/${item}`)
            console.log(`time for after: ${req.body.after}`)
            console.log(fs.statSync(`${path}/${item}`).mtimeMs)
            return fs.statSync(`${path}/${item}`).mtimeMs > req.body.after
        }).sort((a, b) => fs.statSync(`${path}/${a}`).mtimeMs - fs.statSync(`${path}/${b}`).mtimeMs)
        console.log(mostRecent)
        res.send({
            images: mostRecent,
            timestamp: mostRecent.length ? fs.statSync(`${path}/${mostRecent[0]}`).mtimeMs : req.body.after
        })
        mostRecent = [];
    });
});
// Listens for server
app.listen(3000, () => console.log(`http://localhost:3000/`));

//