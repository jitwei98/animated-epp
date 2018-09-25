const express = require('express');
const router  = express.Router();
const {isEmpty, uploadDir } = require('../../helpers/upload-helper');
const User = require('../../models/user');
const fs = require('fs');
const lecture = require('../../models/lectures/lecture');
const path = require('path');
var formidable = require('formidable');
//const fileUpload = require('express-fileupload');
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


router.post('/create', (req,res)=>{
    let errors =[];
    let UserId = UserID(req);
    //console.log(req);
   // console.log(req.body.Topic);
   lecture.find({topic:"low_pass_filter"}).then(found=>{

           if (found.length > 0) {
               console.log("true");
               errors.push({message: "Duplicate topic, please delete previous entry"});
               if (errors.length > 0) {
                   console.log('errors');
                   res.render('admin/lecture_upload/create', {UserId: UserId, errors: errors});
               }
           } else {
               var form = new formidable.IncomingForm();
               var filename;
               form.parse(req, function (err, fields, files) {
                   var oldpath = files.filetoupload.path;
                   var newDir = path.join(__dirname, '../../public/uploads/');

                   filename  = Date.now() + '-' + files.filetoupload.name;
                   var newpath = newDir + filename;
                    console.log("this is first" + filename);
                   fs.rename(oldpath, newpath, function (err) {
                       if (err) throw err;
                       });
                   req.app.locals.layout = 'lecture';
                   console.log(filename);
                   res.render('lecture/uploading/high_pass_filter', {
                       files: filename,
                       UserId: UserId,
                       Topic: "low_pass_filter",
                   });
               });
                   // if(!req.files) {
                   //     errors.push({message: "Please include the file"});
                   //     res.render('admin/lecture_upload/create', {UserId: UserId, errors: errors});
                   // }
                   // let filename;
                   // let file = req.files.uploadFiles;
                   // var newDir = path.join(__dirname,'../../public/uploads/');
                   // const mkdirSync = function (newDir) {
                   //     try {
                   //         fs.mkdirSync(newDir);
                   //     } catch (err) {
                   //         if (err.code !== 'EEXIST') throw err
                   //     }
                   // };
                   // filename = Date.now() + '-' + req.files.uploadFiles.name;
                   // console.log(filename);
                   // file.mv(newDir + filename, (err) => {
                   //     if (err) {
                   //         console.log(err);
                   //         throw err;
                   //     }
                   // })

               }



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
        console.log('The data');
        console.log(result);
        console.log(newDir+result.file);
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