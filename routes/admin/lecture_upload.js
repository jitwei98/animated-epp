const express = require('express');
const router  = express.Router();
const {userAuthenticated} = require('../../helpers/authentication');
const fileUpload = require('express-fileupload');
const {isEmpty, uploadDir } = require('../../helpers/upload-helper');
const User = require('../../models/user');
const fs = require('fs');
const lecture = require('../../models/lectures/lecture');
const path = require('path');
//overwrite default layout
router.all('/*',(req,res,next)=>{

    req.app.locals.layout = 'admin';
    next();

});
router.get('/',(req,res)=>{
    let UserId = UserID(req);
    User.findOne({_id:UserId}).then(user=> {
        if(user){
            lecture.find({}).then(slide=>{
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

router.get('/create',(req,res)=>{
    let UserId = UserID(req);

    User.findOne({_id:UserId}).then(user=> {
        if(user){
            lecture.find({}).then(slide=>{
                let contentArr = [];
                for(let i=0;i<slide.length;i++){
                    contentArr.push(slide[i].topic);
                }
                if(user.authentication.toString() == "lecturer" ){

                    res.render('admin/lecture_upload/create',{UserId:UserId, contentArr: contentArr});
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
    let errors =[];
    let UserId = UserID(req);
   if(isEmpty(req.files)){
       errors.push({message:"Please include the file"});
       res.render('admin/lecture_upload/create', {UserId: UserId, errors: errors});
   }


   let filename;
   let file = req.files.upload;
   filename = Date.now() + '-' + file.name;
    var newDir = path.join(__dirname,'../../public/uploads/')+ filename;

   file.mv(newDir, (err) => {
       if (err) throw err;
   });
   req.app.locals.layout = 'lecture';
   res.render('lecture/uploading/high_pass_filter', {
       files: filename,
       UserId: UserId,
       Topic: req.body.Topic
   });

});

router.post('/create/confirm',(req,res)=>{
    var newDir = path.join(__dirname,'../../public/lecture/')+ req.body.files;
    fs.rename(uploadDir+req.body.files, newDir, (err) => {
        if (err) throw err;
    });
    const newSlide = new lecture({
        file: req.body.files,
        topic: req.body.Topic,
    });
    newSlide.save().then(newSlide=>{
    });
    res.render('admin/lecture_upload/create');
});

router.post('/create/cancel',(req,res)=> {
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
router.delete('/:id',(req,res)=>{
    let UserId = UserID(req);
    var newDir = path.join(__dirname,'../../public/lecture/');
    lecture.findOne({_id: req.params.id}).then(result=>{

        fs.unlink(newDir+result.file,err=>{
            if(err) throw err;
        });

            result.remove({})
                .then(deleted=>{

                    req.flash('success_message',`Slide was successfully deleted`);
                    res.redirect('/admin/lecture_upload/'+UserId);
                });
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