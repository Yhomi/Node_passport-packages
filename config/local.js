const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt= require('bcryptjs');

module.exports =  (passport)=>{
  passport.use(
    new LocalStrategy({usernameField:'email'},(username,password,done)=>{

         User.findOne({email:username})
         .then(user=>{
           if(!user){
             return done(null,false,{message:"This Email is not registered"})
           }else{
             // match password
              bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(!isMatch){
                  return done(null,false,{message:"Password is incorrect"})
                }else{
                  return done(null,user)
                }
              })
           }
         })

       .catch( (err) =>{
        console.log(err)
      })
    })
  );

  passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}
