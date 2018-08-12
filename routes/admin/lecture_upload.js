const express = require('express');
const router  = express.Router();
const {userAuthenticated} = require('../../helpers/authentication');

const {isEmpty, uploadDir } = require('../../helpers/upload-helper');
const User = require('../../models/user');
const fs = require('fs');
const ohms_Law = require('../../models/lectures/ohms_law');
const path = require('path');
//overwrite default layout
router.all('/*',(req,res,next)=>{

    req.app.locals.layout = 'admin';
    next();

});
router.get('/ohms_law',(req,res)=>{
    let UserId = UserID(req);
    User.findOne({_id:UserId}).then(user=> {
        if(user){
            ohms_Law.find({}).then(slide=>{
                if(user.authentication.toString() == "lecturer" ){

                    res.render('admin/lecture_upload/index',{UserId:UserId,topic:"ohms_law",slide:slide});
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

router.get('/ohms_law/create',(req,res)=>{
    let UserId = UserID(req);

    User.findOne({_id:UserId}).then(user=> {
        if(user){
            ohms_Law.find({}).then(slide=>{
                let slideNum = slide.length+1;
                for(let i=0;i<slide.length;i++){
                    if(slide[i].order != i+1){
                        slideNum = i+1;
                        break;
                    }
                }
                if(user.authentication.toString() == "lecturer" ){

                    res.render('admin/lecture_upload/create',{UserId:UserId,topic:'ohms_law',slideNum:slideNum});
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


router.post('/ohms_law/create',(req,res)=>{
    let errors =[];
    let UserId = UserID(req);
   if(isEmpty(req.files)){
       errors.push({message:"Please include the file"})
   }
   let filename;
   if(errors.length>0){
       console.log('errors');
       res.render('admin/lecture_upload/create',{UserId:UserId,topic:'ohms_law',errors:errors});
   }else{
       let file = req.files.file;
       filename = Date.now() + '-'+file.name;
       file.mv('./public/uploads/'+filename,(err)=>{
           if(err) throw err;
       })
       res.render('lecture/uploading/high_pass_filter',{files:filename,UserId:UserId,topic:'ohms_law',slideNum:req.body.slideNum});


   }

});

router.post('/ohms_law/create/confirm',(req,res)=>{
    var newDir = path.join(__dirname,'../../public/lecture/ohm_law/')+ req.body.files;
    fs.rename(uploadDir+req.body.files, newDir, (err) => {
        if (err) throw err;
    });
    const newSlide = new ohms_Law({
        file: req.body.files,
        order:req.body.slideNum,
    });
    newSlide.save().then(newSlide=>{
        console.log('redirected');
    });
    res.render('admin/lecture_upload/create');

});

router.post('/ohms_law/create/cancel',(req,res)=> {
    fs.readdir(uploadDir, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(uploadDir, file), err => {
                if (err) throw err;
            });
        }
    });
    res.render('admin/lecture_upload/create');

});
router.delete('/ohms_law/:id',(req,res)=>{
    let UserId = UserID(req);
    ohms_Law.remove({_id: req.params.id})
        .then(result=>{
            req.flash('success_message',`Slide was successfully deleted`);
            res.redirect('/admin/lecture_upload/'+UserId + "/ohms_law");
        });

});
function UserID(req){
    var url = req.baseUrl;
    if(url){
        var UserId = url.substring(url.lastIndexOf('/') + 1);
    }
    return UserId;
}
module.exports = router;