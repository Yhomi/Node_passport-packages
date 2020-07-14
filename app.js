const express = require('express');
const passport = require('passport');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const connectDb = require('./config/database');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
const {ensureAuth} = require('./config/auth')


dotenv.config();
const app = express();

require('./config/local')(passport);
require('./config/google')(passport);
require('./config/fb')(passport);

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



// session
app.use(session({
    secret: 'anything',
    resave: false,
    saveUninitialized: false,
     store: new MongoStore({mongooseConnection:mongoose.connection})
}));

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

//global variables
app.use((req,res,next)=>{
  res.locals.error = req.flash('error')
  next()
})

app.use('/auth',require('./routes/auth'));

app.get('/',ensureAuth,(req,res)=>{
  const user = req.user.name
  res.render('dashboard',{user})
})

const PORT = process.env.PORT || 7000
app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`))
