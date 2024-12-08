const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const Users = require('../../db/models/Users'); 
const config = require('../../config'); 

module.exports = function () {
  let strategy = new Strategy(
    {
      secretOrKey: config.JWT.SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    },
    async (payload, done) => {
      try {
        let user = await Users.findOne({ _id: payload.id });

        if (user) {
          done(null, {
            id: user._id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
          });
        } else {

          done(new Error('User not found'), null);
        }
      } catch (error) {
        done(error, null);
      }
    }
  );

  passport.use(strategy);

  return {
    initialize: function () {
      return passport.initialize(); 
    },
    authenticate: function () {
      return passport.authenticate('jwt', { session: false }); 
    },
  };
};
