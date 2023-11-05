const express = require('express')
const app = express()
app.listen(3000)
const web = require('./routers/web')
const connect_db =require('./db/connect_db')
let session = require('express-session')
let flash = require('connect-flash');
const fileUpload = require("express-fileupload");
const cookieparser = require('cookie-parser')
app.use(cookieparser())
app.use(express.urlencoded({extended:false}))
//  view engin Use HTML in Express
app.set('view engine', 'ejs')

//connected to mongodb
connect_db()

app.use(session({
    secret: 'secret',
    cookie: {maxAge:60000},
    resave: false,
    saveUninitialized: false,

}));

app.use(flash());

// insert css
app.use(express.static('public'))

//data get
// parse application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: false }))
app.use(express.urlencoded())

app.use(fileUpload({useTempFiles: true}));

//Router lode
app.use('/',web)

