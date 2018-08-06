const express = require('express');
const app = express();
const router  = express.Router();
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//app.use(passport.initialize());
//app.use(passport.session());
router.all('/*',(req,res,next)=>{

    req.app.locals.layout = 'home';
    next();

});
router.get('/',(req,res)=>{


    res.render('home/index');
});

router.get('/about',(req,res)=>{

    res.render('home/about');

});


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

    passport.authenticate('local', {
        //console.log('hello2');
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true

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

module.exports = router;