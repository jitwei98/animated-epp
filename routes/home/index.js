const express = require('express');
const app = express();
const router  = express.Router();
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {userAuthenticated} = require('../../helpers/authentication');

//app.use(passport.initialize());
//app.use(passport.session());
router.all('/*',(req,res,next)=>{

    req.app.locals.layout = 'home';
    next();

});
router.get('/',(req,res)=>{

    res.render('home/index');
});

//with registration
router.get('/index/:id',(req,res)=>{
    var authentication ='student';
    User.findOne({_id:req.params.id}).then(user=>{
        if(user){
            authentication = user.authentication;
            res.render('home/index',{authentication:authentication,id:req.params.id});
        }else{
            res.render('home/index');
        }
    });

});
// router.get('/admin/:id',(req,res)=>{
//     User.findOne({_id:req.params.id}).then(user=>{
//         console.log(user.authentication);
//         console.log("string form"+user.authentication.toString());
//         if(user.authentication.toString() == "lecturer" ){
//             console.log('ty')
//             console.log(user.authentication.toString());
//             res.render('admin/index');
//         }else{
//             console.log('no')
//             res.render('home/index');
//         }
//     });
//
// });

router.get('/login',(req,res)=>{

    res.render('home/login');

});
//app login{

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    (email, password, done) => {
        User.findOne({email:email}).then(user=>{
            if(!user) return done(null,false,{message:'No User found'});
           bcrypt.compare(password,user.password,(err,matched)=>{
              if(err) throw err;
              if(matched){
                  return done(null, user);
              }else{
                    return done(null,false,{message:'Incorrect password'});
              }
           });
        });
    }
));
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/login',(req,res,next)=>{

    var id;
    User.findOne({email:req.body.email}).then(user=>{
        if(user){
            id = user.id;
        }
    });
    passport.authenticate('local', {failureFlash:true}, function(err, user, info) {
        if (err) { throw err };
        if (!user) {
            return res.render('home/login', {error_message: info.message})
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/index/' + user._id);
        });
    })(req, res, next);

    //res.render('home/login');

});

router.get('/logout',(req,res)=>{
   req.logout();
   res.redirect('/');
});
router.get('/register',(req,res)=>{

    res.render('home/register');

});

router.post('/register',(req,res)=>{
    let error = [];
    if(!req.body.firstName){
        error.push({message:'please Enter your first Name'});
    }
    if(!req.body.lastName){
        error.push({message:'please Enter your last Name'});
    }
    if(!req.body.email){
        error.push({message:'please Enter your email'});
    }
    if(!req.body.password){
        error.push({message:'please Enter a password'});
    }
    if(!req.body.passwordConfirm){
        error.push({message:'This field cannot be blank'});
    }

    if(req.body.password !== req.body.passwordConfirm){
        console.log(req.body.password+" " + req.body.passwordConfirm);
        error.push({message:'Password field does not match'});
    }
    if(error.length>0){
        res.render('home/register',{
           error: error
        })
    }else{
        User.findOne({email : req.body.email}).then(user=>{
           if(!user){
               const newUser = new User({
                   firstName:req.body.firstName,
                   lastName:req.body.lastName,
                   email:req.body.email,
                   password:req.body.password,
               });
               bcrypt.genSalt(10,(err,salt)=>{
                   bcrypt.hash(newUser.password,salt,(err,hash)=>{
                       newUser.password = hash;
                       newUser.save().then(savedUser=>{
                           req.flash('success_message',"you are now registered,please login");
                           res.redirect('/login');
                       });
                   })
               });
           }else{
                req.flash('error_message','That email exist, please login');
                res.redirect('/login');
           }
        });



        //res.send('home/register');
    }


});
router.get('/change_password',(req,res)=>{

    res.render('home/change_password');
});
router.post('/login',(req,res,next)=>{

    passport.authenticate('local', {
        //console.log('hello2');
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true

    })(req, res, next);
    //res.render('home/login');

});
router.post("/change_password", function(req, res) {
    var email = req.body.email;
    var newPass = req.body.newPassword;
    if(req.body.password !== req.body.confirm_password){
        req.flash('error_message','The confirm password is different from password');
        res.redirect('/change_password');
    }else{
            User.findOne({email:req.body.email}).then(user=>{
              if(user){
                  bcrypt.compare(req.body.password,user.password,(err,matched)=>{
                      if(err) throw err;
                      if(matched){
                          bcrypt.genSalt(10,(err,salt)=>{
                              bcrypt.hash(req.body.newPassword,salt,(err,hash)=>{
                                  user.password = hash;
                                  user.save().then(savedUser=>{
                                      req.flash('success_message','The password has been changed');
                                      res.redirect('/login');
                                  });
                              })
                          });

                      }else{
                          req.flash('error_message','The original password is wrong');
                          res.redirect('/change_password');
                      }
                  })
              }else{
                  req.flash('error_message','The user does not exist, Please register');
                  res.redirect('/register');
              }
        })
    }


});

router.get('/change_auth',(req,res)=>{

    res.render('home/change_auth');
});

router.post('/change_auth',(req,res)=>{
    User.findOne({email:req.body.email}).then(user=>{
       if(user){
           user.authentication = req.body.authentication;
           user.save().then(savedUser=>{
               req.flash('success_message','Changed');
               res.redirect('/login');
           });
       }else{
           req.flash('error_message','The user does not exist');
           res.redirect('/change_auth');
       }
    });
});



module.exports = router;