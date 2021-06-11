const passport = require('passport');
const Student = require('../models/student');
//--------------------- JWT (JSON Web Token is of format xxxx.yyyy.zzzz | Header.Payload.Signature) -----------------------//

const JWTStrategy = require('passport-jwt').Strategy;
// also we will import a module which will help us extract the JWT from the header
const ExtratJWT = require('passport-jwt').ExtractJwt;

// options is an object literal containing options to control how the token is extracted from the request or verified. //

const options = {
    jwtFromRequest : ExtratJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'classmanagementsystem',
}

passport.use(new JWTStrategy(options, function(jwtPayload, done) {

    // jwtPayLoad is containing user infomation in encrypted form
    // we will find that user in database
    Student.findById(jwtPayload._id, function(err, student) {

        if(err) { console.log(`Error finding user from JWT - ${err}`); return; }

        if(student){
            return done(null, student);
        }

        else{
            return done(null, false);
        }

    });
    
}));

module.exports = passport;