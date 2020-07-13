const express = require('express');
const passport = require('passport');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const connectDb = require('./config/database');
const path = require('path');

dotenv.config();
const app = express();

// database connect
connectDb()

// set static files
app.use(express.static(path.join(__dirname,'public')));

//bodyParser
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// set view engine
app.engine('.hbs',exphbs({defaultLayout:'main',extname:'.hbs'}));
app.set('view engine','.hbs');

app.use('/auth',require('./routes/auth'));

app.get('/',(req,res)=>{
  res.render('dashboard')
})

const PORT = process.env.PORT || 7000
app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`))
