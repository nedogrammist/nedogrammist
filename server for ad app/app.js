var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
var mongoose = require('mongoose');
const userController = require('./controllers/userController');
const adsController = require('./controllers/adsController');
const bookmarksController = require('./controllers/bookmarksController');


const url = 'mongodb+srv://admin:admin@cluster0.ddv7p.mongodb.net/database1';


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true   
}, (err)=>{console.log('Connected to mongo succsesfully')})


app.post('/login', userController.store)
app.get('/login', userController.index)
app.post('/adlist', adsController.store)
app.post('/adlist/delete', adsController.delete)
app.get('/adlist', adsController.index)
app.post('/bookmarks', bookmarksController.store)
app.get('/bookmarks', bookmarksController.index)
app.post('/bookmarks/delete', bookmarksController.delete)



app.listen(3210, ()=>{
    console.log('Server is active on port 3210');
})