const express = require('express');
const app = express();
const path = require('path');
const expressHB = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOR = require('method-override');

const session = require('express-session');
const flash = require('connect-flash');
const {mongoDbUrl} = require('./config/database');
const passport = require('passport');
const Handlebars = require('handlebars');
const intro = require('intro.js');

const fileUpload = require('express-fileupload');
mongoose.promiose = global.Promise;

mongoose.connect(mongoDbUrl, { useNewUrlParser: true })
    .then(db=>{
        console.log('Connected to mongodb');
    })
    .catch(err=>{
        console.log(err);
    });




//Method override
app.use(methodOR('_method'));

app.use(express.static(path.join(__dirname,'./public')));
//helpers
const {select} = require('./helpers/handlebars-helper');
//set view engine //set default layout from home
app.engine('handlebars',expressHB({defaultLayout:'home',helpers:{select:select}}));
app.set('view engine', 'handlebars');

//Upload MiddleWare


//app.use(fileUpload());

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.text());

//load session
app.use(session({
    secret:'th123',
    resave:true,
    saveUninitialized:true,

}));

app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());

//local variable using middleware
app.use((req,res,next)=>{
    res.locals.user = req.user || null;
    res.locals.sucess_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    next();

});

//load routes
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');
const lecture = require('./routes/lectures/index');
const quiz = require('./routes/admin/quiz');
const lecture_upload = require('./routes/admin/lecture_upload')
//use routes
app.use('/',home);
app.use('/admin/:id',admin);
app.use('/admin/posts/:id',posts);
//app.use('/admin/posts',posts);
app.use('/lecture', lecture);
app.use('/quiz', quiz);
app.use('/admin/lecture_upload/:id',lecture_upload);
app.use(function(req, res, next) {
    res.status(404).render('error-handle/404');
});
var port = process.env.port || 3000;
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});