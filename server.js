'use strict'

require('dotenv').config();
const express = require('express');
const pg = require('pg');
const superagent = require('superagent');
const app = express();
const methodOverride = require('method-override');

const PORT = process.env.PORT || 4000;
const DATABASE_URL = process.env.DATABASE_URL;
// const API_URL = '';
// const API_KEY = '';
const client = new pg.Client(DATABASE_URL);
client.on('error', error => console.log(error));

app.use(express.static('./public'));
app.use(express.urlencoded({ extended:true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

app.get('/',loadHomePage);

function loadHomePage(req,res){
    res.send('Welcome Home!');
}

client.connect().then(() =>{
    app.listen(PORT,()=>{`Running on http://localhost:${PORT}`});
});
