const User = require('../models/user');
const MongooseErrorHelper = require('../helper/mongooseError')


exports.auth = function(req, res) {

    
}


exports.register =  function(req, res) {
    const { username, email, password, passwordConfirmation } = req.body;
  
    if (!password || !email) {
      return res.status(422).send({errors: [{title: 'Data missing!', detail: 'Provide email and password!'}]});
    }
  
    if (password !== passwordConfirmation) {
      return res.status(422).send({errors: [{title: 'Invalid passsword!', detail: 'Password is not a same as confirmation!'}]});
    }
  
    User.findOne({email}, function(err, existingUser) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
  
      if (existingUser) {
        return res.status(422).send({errors: [{title: 'Invalid email!', detail: 'User with this email already exist!'}]});
      }
  
      const user = new User({
        username,
        email,
        password
      });
  
      user.save(function(err) {
        if (err) {
          return res.status(422).send({errors:MongooseErrorHelper.normalizeErrors(err.errors)});
        }
  
        return res.json({'registered': true});
      })
    })
  }
  
