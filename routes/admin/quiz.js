const express = require('express');
const router  = express.Router();
const Post = require('../../models/post');
const {isEmpty} = require('../../helpers/upload-helper');
const {userAuthenticated} = require('../../helpers/authentication');
//const {question} = require('../../helpers/quiz-helper')
const {question} = require('../../helpers/quiz-helper-new');
const User = require('../../models/user');
//overwrite default layout
router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'quiz';
    next();
});

router.get('/',(req,res)=>{
   res.render('admin/posts/quiz_landingPage');

   //res.render('admin/posts/quiz_draft');
});


router.post('/',(req,res)=>{
    var questionBank =[];
    if(req.body.RLC_Circuit){
        questionBank.push("RLC_Circuit");
    }
    if(req.body.ohmLaw){
        questionBank.push('ohmLaw');
    }
    if(req.body.filter){
        questionBank.push('filter');
    }
    if(req.body.TEC){
        questionBank.push('TEC');
    }
    function printArr(){
        for(let i=0;i<questionBank.length;i++){
            console.log(questionBank[i]);
            console.log(Math.floor(Math.random() * questionBank.length));
        }
    }
    Post.find({category:questionBank}).then(posts=>{
        if(posts){
            // console.log(posts.length);
            // console.log('question:')
            // console.log(posts);
            console.log(posts);
            let totalMark = req.body.questionNo;
            if(totalMark>posts.length){
                totalMark= posts.length;
            }
                res.render('admin/posts/quiz_user',{posts:posts,question,TotalMark:totalMark,questionBank:questionBank});
        }else{
            console.log('no question');
            res.render('home/index');
        }

    })
   // printArr();


});

router.post('/answer',(req,res)=>{
    let text2 = req.body.questionBank;
    let text = req.body.questionArr;
    let questionBank = text2.split(',');
    let arr = text.split(",");
    let ansArr ='';
    let hintArr = '';
    Post.find({category:questionBank}).then(posts=>{

        var qesLen = req.body.TotalMark;

        for(let i=0;i<qesLen;i++){
            ansArr += posts[arr[i]].answer;
            ansArr +=',';
        }
        for(let i=0;i<qesLen;i++){
            if(posts[arr[i]].answer != null){
                hintArr += posts[arr[i]].answer;
            }
            hintArr +=",";
            if(posts[arr[i]].answer_hint != null){
                hintArr += posts[arr[i]].answer_hint;
            }
            hintArr +=",";
            if(posts[arr[i]].wrongAnswer1 != null){
                hintArr += posts[arr[i]].wrongAnswer1;
            }
            hintArr += ",";
            if(posts[arr[i]].wrongAnswer1_hint != null){
                hintArr += posts[arr[i]].wrongAnswer1_hint;
            }
            hintArr += ",";
            if(posts[arr[i]].wrongAnswer2 != null){
                hintArr += posts[arr[i]].wrongAnswer2;
            }
            hintArr += ",";
            if(posts[arr[i]].wrongAnswer2_hint != null){
                hintArr += posts[arr[i]].wrongAnswer2_hint;
            }
            hintArr += ",";
            if(posts[arr[i]].wrongAnswer3 != null){
                hintArr += posts[arr[i]].wrongAnswer3;
            }
            hintArr += ",";
            if(posts[arr[i]].wrongAnswer3_hint != null){
                hintArr += posts[arr[i]].wrongAnswer3_hint;
            }
            hintArr += ",";

        }
        let array = {ansArr,hintArr};
        //res.status(200);
        res.send(array);
        //        // res.render("empty",{posts:posts,list,question,count:count,TotalMark:qesLen,ansArr :ansArr});
        //       //  res.end();
        //res.send(`${ans} , ${arr[0]} ${posts[0].answer}`);

    });
});


module.exports = router;