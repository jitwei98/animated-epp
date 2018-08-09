// wiki.js - Wiki route module.

var express = require('express');
var router = express.Router();

// Home page route.
router.get('/', function (req, res) {
  // res.send('Quiz home page');
  res.render('admin/posts/quiz.html');
})

// About page route.
router.get('/about', function (req, res) {
  res.send('About this quiz');
})

module.exports = router;


// const express = require('express');
// const router  = express.Router();
// const Post = require('../../models/post');
// const {isEmpty} = require('../../helpers/upload-helper');
// const {userAuthenticated} = require('../../helpers/authentication');
// const {question} = require('../../helpers/quiz-helper')
// const User = require('../../models/user');
// //overwrite default layout
// router.all('/*',(req,res,next)=>{
//     res.send('this is quiz.js');
//     req.app.locals.layout = 'admin';
//     next();
// });

// router.get('/',(req,res)=>{
//    res.render('admin/posts/quiz_landingPage');
//    // res.render('admin/posts/quiz.handlebars');
// });

// router.post('/',(req,res)=>{
//     var questionBank =[];
//     if(req.body.RLC_Circuit){
//         questionBank.push("RLC_Circuit");
//     }
//     if(req.body.ohmLaw){
//         questionBank.push('ohmLaw');
//     }
//     if(req.body.filter){
//         questionBank.push('filter');
//     }
//     if(req.body.TEC){
//         questionBank.push('TEC');
//     }
//     function printArr(){
//         for(let i=0;i<questionBank.length;i++){
//             console.log(questionBank[i]);
//             console.log(Math.floor(Math.random() * questionBank.length));
//         }
//     }
//     Post.find({category:questionBank}).then(posts=>{
//         if(posts){
//             // console.log(posts.length);
//             // console.log('question:')
//             // console.log(posts);
//             let totalMark = req.body.questionNo;
//             if(totalMark>posts.length){
//                 totalMark= posts.length;
//             }
//             res.render('admin/posts/quiz_user',{posts:posts,question,TotalMark:totalMark,questionBank:questionBank});
//         }else{
//             console.log('no question');
//             res.render('home/index');
//         }

//     })
//    // printArr();


// });

// router.post('/answer',(req,res)=>{
//     let text2 = req.body.questionBank;
//     let text = req.body.questionArr;

//     let arr = text.split(",");
//     let questionBank = text2.split(',');
//     let ansArr ='';
//     Post.find({category:questionBank}).then(posts=>{

//         var qesLen = req.body.TotalMark;

//         for(let i=0;i<qesLen;i++){
//             ansArr += posts[arr[i]].answer;
//             ansArr +=',';
//         }
//         //res.status(200);
//         res.send(ansArr);
//         //        // res.render("empty",{posts:posts,list,question,count:count,TotalMark:qesLen,ansArr :ansArr});
//         //       //  res.end();
//         //res.send(`${ans} , ${arr[0]} ${posts[0].answer}`);

//     });
// });


// module.exports = router;