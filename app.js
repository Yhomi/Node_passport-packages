const express = require('express');
const passport = require('passport');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');

dotenv.config();
const app = express();

// set view engine

app.engine('.hbs',exphbs({defaultLayout:'main',extname:'.hbs'}));
app.set('view engine','.hbs');

app.get('/',(req,res)=>{
  res.send('Hello World')
})

const PORT = process.env.PORT || 7000
app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`))
