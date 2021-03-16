//#region Modules
require('dotenv').config();
const express = require('express');
const pg = require('pg');
const superagent = require('superagent');
const app = express();
const methodOverride = require('method-override');
//#endregion

//#region Environmental Variables
const PORT = process.env.PORT || 4000;
const DATABASE_URL = process.env.DATABASE_URL;

const client = new pg.Client(DATABASE_URL);
client.on('error', error => console.log(error));

app.use(express.static('./public'));
app.use(express.urlencoded({ extended:true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
//#endregion

//#region Routes
app.get('/',loadHomePage);

//#endregion

//#region Route Functions
function loadHomePage(req,res){
    const API_URL = `https://www.googleapis.com/books/v1/volumes?q=in${req.body.selectionType}:${req.body.query}`;
    res.render('index.ejs');
}
//#endregion

//#region Server Connection
client.connect().then(()=>{
    app.listen(PORT,()=>{console.log(`Running on http://localhost:${PORT}`)});
}).catch(error => console.log('Something went wrong', error));
//#endregion
