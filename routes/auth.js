const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../models/User');

router.get('/register',(req,res)=>{
  res.render('register');
})

router.get('/login',(req,res)=>{
  res.render('login')
})

router.post('/register', async (req,res)=>{
  // res.redirect('/auth/login')
  const {name,email,password,password2} = req.body

  let errors = [];

  if(!name || !email || !password || !password2){
    errors.push({msg:"Please Fill all fields"})
  }
  if(password !== password2){
    errors.push({msg:'Passwords do not match'})
  }
  if(password.length < 5){
    errors.push({msg:"Password length is too small. Password must be atleast 5 charcters"})
  }
  if(errors.length > 0){
    res.render('register',{
      errors,
      name,
      email
    })
  }else{
    const userExist = await User.findOne({email:email})
    if(userExist){
      errors.push({msg:"This Email already exist"})
      res.render('register',{
        errors,
        name,
        email
      })
    }else{
      const salt= await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password,salt)
      const newUser = new User({
        name:name,
        email:email,
        password:hashedPassword
      })
      try {
        const savedUser = await newUser.save()
        res.redirect('/auth/login')
      } catch (err) {
        console.log(err);
      }
    }
  }

})

module.exports = router;
