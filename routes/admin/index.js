const express = require('express');
const router  = express.Router();
const Post = require('../../models/post');
const faker = require('faker');
const {userAuthenticated} = require('../../helpers/authentication');
//overwrite default layout
router.all('/*',(req,res,next)=>{

    req.app.locals.layout = 'admin';
    next();

});

// router.get('/',(req,res)=>{
//
//     res.render('admin/index');
// });
//
// router.post('/generate-fake-posts',(req,res)=>{
//     console.log(req.body.amount);
//     for(let i=0 ;i < req.body.amount;i++){
//         let post = new Post();
//         post.title = faker.name.title();
//         post.status = 'public';
//         post.allowComments = faker.random.boolean();
//         post.body = faker.lorem.sentence();
//         post.save().then(savedData=>{
//
//         });
//
//     }
//     res.redirect('/admin/posts');
//
// });


module.exports = router;