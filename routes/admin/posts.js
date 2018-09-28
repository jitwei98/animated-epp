const express = require('express');
const router  = express.Router();
const Post = require('../../models/post');
const {isEmpty} = require('../../helpers/upload-helper');
const {userAuthenticated} = require('../../helpers/authentication');
//const {list,question,questionTracker} = require('../../helpers/handlebars-helper');
const {list,question,questionTracker} = require('../../helpers/quiz-helper');
const User = require('../../models/user');
//overwrite default layout
router.all('/*',(req,res,next)=>{

    req.app.locals.layout = 'admin';
    next();

});

router.get('/',(req,res)=>{
    var url = req.baseUrl;
    if(url){
        var UserId = url.substring(url.lastIndexOf('/') + 1);
    }
    //var id = url.substring(url.lastIndexOf('/') + 1);
    User.findOne({_id:UserId}).then(user=> {
        if(user){
            Post.find({}).then(posts=>{
                if(user.authentication.toString() == "lecturer" ){

                    res.render('admin/posts/index',{posts:posts,UserId:UserId});
                }else{
                    req.app.locals.layout = 'home';
                    res.render('home/index');
                }

            });
        }else{
            req.app.locals.layout = 'home';
            res.render('home/index');
        }

    });

});


router.get('/create',(req,res)=>{
    var url = req.baseUrl;
    if(url){
        var UserId = url.substring(url.lastIndexOf('/') + 1);
    }
    User.findOne({_id:UserId}).then(user=> {
        if(user){
            Post.find({}).then(posts=>{
                if(user.authentication.toString() == "lecturer" ){
                    res.render('admin/posts/create',{UserId:UserId});
                }else{
                    req.app.locals.layout = 'home';
                    res.render('home/index');
                }

            });
        }else{
            req.app.locals.layout = 'home';
            res.render('home/index');
        }

    });


});

router.post('/create',(req,res)=>{
    var url = req.baseUrl;
    if(url){
        var Userid = url.substring(url.lastIndexOf('/') + 1);
    }
    let errors =[];
    if(!req.body.question){
        errors.push({message:'please add a Question    '});
    }
    if(!req.body.answer){
        errors.push({message:'please add a Answer '});
    }

    if(errors.length>0){
        res.render('admin/posts/create',{
            errors:errors,
            UserId:Userid,
        })
    }else {
        const newPost = new Post({
            question:req.body.question,
            answer:req.body.answer,
            category:req.body.category,
            dp:req.body.dp,
            answer_hint:req.body.answer_hint,
            wrongAnswer1:req.body.wrongAnswer1,
            wrongAnswer1_hint:req.body.wrongAnswer1_hint,
            wrongAnswer2:req.body.wrongAnswer2,
            wrongAnswer2_hint:req.body.wrongAnswer2_hint,
            wrongAnswer3:req.body.wrongAnswer3,
            wrongAnswer3_hint:req.body.wrongAnswer3_hint,
        });

        newPost.save().then(datasaved => {
            req.flash('success_message',`${datasaved.question} saved successfully`);
            res.redirect('/admin/posts/'+Userid);
        }).catch(err => {
            console.log(err);
        });

    }

});

router.get('/edit/:id',(req,res)=>{
    var url = req.baseUrl;
    if(url){
        var UserId = url.substring(url.lastIndexOf('/') + 1);
    }
    User.findOne({_id:UserId}).then(user=> {
        if(user){
            Post.findOne({_id: req.params.id}).then(post=>{
                if(user.authentication.toString() == "lecturer" ){
                        res.render('admin/posts/edit',{post:post,UserId:UserId});
                }else{
                    req.app.locals.layout = 'home';
                    res.render('home/index');
                }

            });
        }else{
            req.app.locals.layout = 'home';
            res.render('home/index');
        }

    });

   //res.render('admin/posts/edit');
});

router.put('/edit/:id',(req,res)=>{
    var url = req.baseUrl;
    if(url){
        var UserId = url.substring(url.lastIndexOf('/') + 1);
    }

    Post.findOne({_id: req.params.id}).then(post=>{
        post.question = req.body.question;
        post.answer = req.body.answer;
        post.category = req.body.category;
        post.save().then(updatedPost=>{
            req.flash('success_message',`${updatedPost.question}was successfully updated`);
            res.redirect('/admin/posts/'+UserId);
        });

    });


});
router.delete('/:id',(req,res)=>{
    var url = req.baseUrl;
    if(url){
        var UserId = url.substring(url.lastIndexOf('/') + 1);
    }
    Post.remove({_id: req.params.id})
        .then(result=>{

            req.flash('success_message',`Question was successfully deleted`);
            res.redirect('/admin/posts/'+UserId);
        });

});

router.get('/quiz',(req,res)=>{
    var url = req.baseUrl;;
    if(url){
        var UserId = url.substring(url.lastIndexOf('/') + 1);
    }
    Post.find({}).then(posts=>{
       // res.status(200);
        res.render('admin/posts/quiz',{posts:posts,list,question,TotalMark:posts.length,UserId:UserId});
       // res.end();

    });

});
router.post('/quiz',(req,res)=>{

    let text = req.body.questionArr;

    let arr = text.split(",");

    let ansArr ='';
    Post.find({}).then(posts=>{

        var qesLen;
        if(posts.length>19){
            qesLen = 20;
        }else{
            qesLen = posts.length;
        }
        for(let i=0;i<qesLen;i++){
            ansArr += posts[arr[i]].answer;
            ansArr +=',';
        }
        //res.status(200);
        res.send(ansArr);
        //        // res.render("empty",{posts:posts,list,question,count:count,TotalMark:qesLen,ansArr :ansArr});
        //       //  res.end();
        //res.send(`${ans} , ${arr[0]} ${posts[0].answer}`);

    });


});




module.exports = router;