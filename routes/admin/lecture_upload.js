const express = require('express');
const router  = express.Router();
const {userAuthenticated} = require('../../helpers/authentication');

const {isEmpty, uploadDir } = require('../../helpers/upload-helper');
const User = require('../../models/user');

const ohms_Law = require('../../models/lectures/ohms_law');
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

                    res.render('admin/lecture_upload/index',{UserId:UserId,topic:"ohms_law"});
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
                    if(slide.order != i+1){
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
       const newSlide = new ohms_Law({
           file: filename,
           order:req.body.slideNum,
       });

       newSlide.save().then(newSlide=>{
           console.log('redirected');
           res.render('lecture/uploading/high_pass_filter',{files:filename});
       });

   }


});
function UserID(req){
    var url = req.baseUrl;
    if(url){
        var UserId = url.substring(url.lastIndexOf('/') + 1);
    }
    return UserId;
}
module.exports = router;