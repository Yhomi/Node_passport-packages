const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/User')

module.exports = function(passport){
  passport.use(new FacebookStrategy({
    clientID:process.env.FACEBOOK_CLIENT_ID,
    clientSecret:process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields:['id','name','emails','photos']
  }, async (accessToken,refreshToken,profile,done)=>{
    console.log(profile);
    const newUser = User({
      name:profile._json.first_name + ' ' + profile._json.last_name,
      email:profile._json.email
    })
    try {
      const userExist = await User.findOne({email:profile._json.email})
      if(userExist){
        return done(null,userExist)
      }else{
        const user = await User.create(newUser)
        return done(null,user)
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
          done(err, user);
      });
  });

}
