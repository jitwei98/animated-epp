const express = require('express');
const router  = express.Router();
const Post = require('../../models/post');
const {isEmpty} = require('../../helpers/upload-helper');
const {userAuthenticated} = require('../../helpers/authentication');
const {list,question,questionTracker} = require('../../helpers/handlebars-helper')

//overwrite default layout
router.all('/*',(req,res,next)=>{

    req.app.locals.layout = 'admin';
    next();

});

router.get('/',(req,res)=>{
    Post.find({}).then(posts=>{

        res.render('admin/posts/index',{posts:posts});

    });



});

router.get('/create',(req,res)=>{
    res.render('admin/posts/create');

});

router.post('/create',(req,res)=>{
    let errors =[];
    if(!req.body.question){
        errors.push({message:'please add a Question    '});
    }
    if(!req.body.answer){
        errors.push({message:'please add a Answer    '});
    }

    if(errors.length>0){
        res.render('admin/posts/create',{
            errors:errors,

        })
    }else {

        const newPost = new Post({
            question:req.body.question,
            answer:req.body.answer,
        });

        newPost.save().then(datasaved => {
            req.flash('success_message',`${datasaved.question} saved successfully`);
            res.redirect('/admin/posts');
        }).catch(err => {
            console.log(err);
        });

    }
    //console.log(req.body);
});

router.get('/edit/:id',(req,res)=>{

   Post.findOne({_id: req.params.id}).then(post=>{
        res.render('admin/posts/edit',{post:post});
   });
   //res.render('admin/posts/edit');
});

router.put('/edit/:id',(req,res)=>{


    Post.findOne({_id: req.params.id}).then(post=>{
        post.question = req.body.question;
        post.answer = req.body.answer;
        post.save().then(updatedPost=>{
            req.flash('success_message',`${updatedPost.question}was successfully updated`);
            res.redirect('/admin/posts');
        });

    });


});
router.delete('/:id',(req,res)=>{
    Post.remove({_id: req.params.id})
        .then(result=>{
            req.flash('success_message',`Question was successfully deleted`);
            res.redirect('/admin/posts');
        });

});

router.get('/quiz',(req,res)=>{

    Post.find({}).then(posts=>{
       // res.status(200);
        res.render('admin/posts/quiz',{posts:posts,list,question,TotalMark:posts.length});
       // res.end();

    });

});
router.post('/quiz',(req,res)=>{
    let errors =[];
    //let ans = req.body.Question0;
    let text = req.body.questionArr;
    //console.log(text);
    let arr = text.split(",");
    let count =0;
    let out ='';
    let ansArr ='';
    Post.find({}).then(posts=>{

        ans = req.body.Question0;
        out += ans;
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