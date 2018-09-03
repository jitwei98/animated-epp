const express = require('express');
const app = express();
const router  = express.Router();
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const lecture = require('../../models/lectures/lecture');

router.all('/*',(req,res,next)=>{

    req.app.locals.layout = 'lecture';
    next();

});
// ohm's law
router.get('/',(req,res)=>{
    res.render('lecture/index',{title:'Home Page'});
});
router.get('/ohms_law',(req,res)=>{
    res.render('lecture/Ohms_law',{title:"Ohm's Law",filename:"To be uploaded soon.pdf" } );
    // lecture.findOne({topic:'ohms_law'}).then(content=>{
    //     res.render('lecture/Ohms_law',{title:"Ohm's Law",filename:content.file } );
    // })
});
//AC side
// router.get('/RLC_circuit',(req,res)=>{ //indexing page
//     res.render('lecture/index_RLC');
// });
router.get('/RC_circuit',(req,res)=>{
    res.render('lecture/RC_Circuit',{title:"RC Circuit (AC)",filename:"To be uploaded soon.pdf"  } );
    // lecture.findOne({topic:'RC_Circuit'}).then(content=>{
    //     res.render('lecture/RC_Circuit',{title:"RC Circuit (AC)",filename:content.file } );
    // })
});
router.get('/RL_circuit',(req,res)=>{
    res.render('lecture/RL_Circuit',{title:"RL Circuit (AC)",filename:"To be uploaded soon.pdf"  } );
    // lecture.findOne({topic:'RL_Circuit'}).then(content=>{
    //     res.render('lecture/RL_Circuit',{title:"RL Circuit (AC)",filename:content.file } );
    // })
});
router.get('/RLC_series_circuit',(req,res)=>{
    res.render('lecture/RLC_Series_Circuit',{title:"RLC Circuit (AC)",filename:"To be uploaded soon.pdf" } );
    // lecture.findOne({topic:'RLC_Series_Circuit'}).then(content=>{
    //     res.render('lecture/RLC_Series_Circuit',{title:"RLC Circuit (AC)",filename:content.file } );
    // })
});
//DC side
// router.get('/RLC_circuit_DC',(req,res)=>{   //indexing page
//     res.render('lecture/index_RLC_DC',{title:"RLC Circuit (DC)"});
//
// });
router.get('/RC_circuit_DC',(req,res)=>{
    res.render('lecture/RC_Circuit_DC',{title:"DC Transient - Capacitor",filename:"To be uploaded soon.pdf" } );
    // lecture.findOne({topic:'RC_Circuit_DC'}).then(content=>{
    //     res.render('lecture/RC_Circuit_DC',{title:"DC Transient - Capacitor",filename:content.file } );
    // })
});
router.get('/RL_circuit_DC',(req,res)=>{
    res.render('lecture/RL_Circuit_DC',{title:"DC Transient - Inductor",filename:"To be uploaded soon.pdf" } );
    // lecture.findOne({topic:'RL_Circuit_DC'}).then(content=>{
    //     res.render('lecture/RL_Circuit_DC',{title:"DC Transient - Inductor",filename:content.file } );
    // })
});
//filters
router.get('/filter_index',(req,res)=>{
    res.render('lecture/index_filter',);
});
router.get('/high_pass_filter',(req,res)=>{
    res.render('lecture/high_pass_filter',{title:"High Pass Filter",filename:"To be uploaded soon.pdf" } );
    // lecture.findOne({topic:'high_pass_filter'}).then(content=>{
    //
    //     res.render('lecture/high_pass_filter',{title:"High Pass Filter",filename:content.file } );
    // })

});
router.get('/low_pass_filter',(req,res)=>{
    res.render('lecture/low_pass_filter',{title:"low Pass Filter",filename:"To be uploaded soon.pdf" } );
    // lecture.findOne({topic:'low_pass_filter'}).then(content=>{
    //
    //     res.render('lecture/low_pass_filter',{title:"low Pass Filter",filename:content.file } );
    // })

});
module.exports = router;