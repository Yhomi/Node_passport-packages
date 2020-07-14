const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/User');

module.exports = function(passport){
  passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  }, async (accessToken,refreshToken,profile,done)=>{
    console.log(profile);
    const newUser= await User({
      name:profile.displayName,
      email:profile.emails[0].value,
      image:profile.photos[0].value,
      provider:profile.provider
    })

    try {

      // check if user userExist
      const user = await User.findOne({email:profile.emails[0].value})
      if(user){
        return done(null,user)
      }else{
        const savedUser =await User.create(newUser)
        return done(null,savedUser)
      }

    } catch (err) {
      console.log(err);
    }
  }
));
passport.serializeUser((user, done) => {
      done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => {
        return done(err, user);
      });
  });
}
