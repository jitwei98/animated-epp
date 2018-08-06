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

        res.render('admin/posts/quiz',{posts:posts,list,question,TotalMark:posts.length});

    });

});
router.post('/quiz',(req,res)=>{
    let errors =[];
    let ans = req.body.Question0;
    let text = req.body.quesionArray;
    let arr = text.split(",");
    let count =0;
    let out ='';
    Post.find({}).then(posts=>{

        ans = req.body.Question0;
        out += ans;

        if(ans == posts[arr[0]].answer){
            count ++;

        }else{
            errors.push({message:`Question:${posts[arr[0]].question} is wrong \n
             Answer : ${posts[arr[0]].answer}`});
        }
        if(posts.length>1){
            ans = req.body.Question1;
            out += ans;
            if(ans == posts[arr[1]].answer){
                count ++;
            }else{
                errors.push({message:`Question:${posts[arr[1]].question} is wrong \n
             Answer : ${posts[arr[1]].answer}`});
            }
        }
        if(posts.length>2){
            ans = req.body.Question2;
            out += ans;
            if(ans == posts[arr[2]].answer){
                count ++;
            }else{
                errors.push({message:`Question:${posts[arr[2]].question} is wrong \n
             Answer : ${posts[arr[2]].answer}`});
            }
        }
        if(posts.length>3){
            ans = req.body.Question3;
            out += ans;
            if(ans == posts[arr[3]].answer){
                count ++;
            }else{
                errors.push({message:`Question:${posts[arr[3]].question} is wrong \n
             Answer : ${posts[arr[3]].answer}`});
            }
        }
        if(posts.length>4){
            ans = req.body.Question4;
            out += ans;
            if(ans == posts[arr[4]].answer){
                count ++;
            }else{
                errors.push({message:`Question:${posts[arr[4]].question} is wrong \n
             Answer : ${posts[arr[4]].answer}`});
            }
        }
        if(posts.length>5){
            ans = req.body.Question5;
            out += ans;
            if(ans == posts[arr[5]].answer){
                count ++;
            }else{
                errors.push({message:`Question:${posts[arr[5]].question} is wrong \n
             Answer : ${posts[arr[5]].answer}`});
            }
        }
        if(posts.length>6){
            ans = req.body.Question6;
            out += ans;
            if(ans == posts[arr[6]].answer){
                count ++;
            }else{
                errors.push({message:`Question:${posts[arr[6]].question} is wrong \n
             Answer : ${posts[arr[6]].answer}`});
            }
        }
        if(posts.length>7){
            ans = req.body.Question7;
            out += ans;
            if(ans == posts[arr[7]].answer){
                count ++;
            }else{
                errors.push({message:`Question:${posts[arr[7]].question} is wrong \n
             Answer : ${posts[arr[7]].answer}`});
            }
        }
        if(posts.length>8){
            ans = req.body.Question8;
            out += ans;
            if(ans == posts[arr[8]].answer){
                count ++;
            }else{
                errors.push({message:`Question:${posts[arr[8]].question} is wrong \n
             Answer : ${posts[arr[8]].answer}`});
            }
        }
        if(posts.length>9){
            ans = req.body.Question9;
            out += ans;
            if(ans == posts[arr[9]].answer){
                count ++;
            }else{
                errors.push({message:`Question:${posts[arr[9]].question} is wrong \n
             Answer : ${posts[arr[9]].answer}`});
            }
        }
        if(posts.length>10){
            ans = req.body.Question10;
            out += ans;
            if(ans == posts[arr[10]].answer){
                count ++;
            }else{
                errors.push({message:`Question:${posts[arr[10]].question} is wrong \n
             Answer : ${posts[arr[10]].answer}`});
            }
        }
        if(posts.length>11){
            ans = req.body.Question11;
            out += ans;
            if(ans == posts[arr[11]].answer){
                count ++;
            }else{
                errors.push({message:`Question:${posts[arr[11]].question} is wrong \n
             Answer : ${posts[arr[11]].answer}`});
            }
        }
        if(posts.length>12){
            ans = req.body.Question12;
            out += ans;
            if(ans == posts[arr[12]].answer){
                count ++;
            }else{
                errors.push({message:`Question:${posts[arr[12]].question} is wrong \n
             Answer : ${posts[arr[12]].answer}`});
            }
        }
        if(posts.length>13){
            ans = req.body.Question13;
            out += ans;
            if(ans == posts[arr[13]].answer){
                count ++;
            }else{
                errors.push({message:`Question:${posts[arr[13]].question} is wrong \n
             Answer : ${posts[arr[13]].answer}`});
            }
        }
        if(posts.length>14){
            ans = req.body.Question14;
            out += ans;
            if(ans == posts[arr[14]].answer){
                count ++;
            }else{
                errors.push({message:`Question:${posts[arr[14]].question} is wrong \n
             Answer : ${posts[arr[14]].answer}`});
            }
        }
        if(posts.length>15){
            ans = req.body.Question15;
            out += ans;
            if(ans == posts[arr[15]].answer){
                count ++;
            }else{
                errors.push({message:`Question:${posts[arr[15]].question} is wrong \n
             Answer : ${posts[arr[15]].answer}`});
            }
        }
        if(posts.length>16){
            ans = req.body.Question16;
            out += ans;
            if(ans == posts[arr[16]].answer){
                count ++;
            }else{
                errors.push({message:`Question:${posts[arr[16]].question} is wrong \n
             Answer : ${posts[arr[16]].answer}`});
            }
        }
        if(posts.length>17){
            ans = req.body.Question17;
            out += ans;
            if(ans == posts[arr[17]].answer){
                count ++;
            }else{
                errors.push({message:`Question:${posts[arr[17]].question} is wrong \n
             Answer : ${posts[arr[17]].answer}`});
            }
        }
        if(posts.length>18){
            ans = req.body.Question18;
            out += ans;
            if(ans == posts[arr[18]].answer){
                count ++;
            }else{
                errors.push({message:`Question:${posts[arr[18]].question} is wrong \n
             Answer : ${posts[arr[18]].answer}`});
            }
        }
        if(posts.length>19){
            ans = req.body.Question19;
            out += ans;
            if(ans == posts[arr[19]].answer){
                count ++;
            }else{
                errors.push({message:`Question:${posts[arr[19]].question} is wrong \n
             Answer : ${posts[arr[19]].answer}`});
            }
        }
        if(posts.length>20){
            ans = req.body.Question20;
            out += ans;
            if(ans == posts[arr[20]].answer){
                count ++;
            }else{
                errors.push({message:`Question:${posts[arr[20]].question} is wrong \n
             Answer : ${posts[arr[20]].answer}`});
            }
        }
        res.render('admin/posts/quiz',{posts:posts,list,question,count:count,errors:errors,TotalMark:posts.length,});
        //res.send(`${ans} , ${arr[0]} ${posts[0].answer}`);

    });



});


module.exports = router;