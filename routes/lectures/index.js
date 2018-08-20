const express = require('express');
const app = express();
const router  = express.Router();
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

router.all('/*',(req,res,next)=>{

    req.app.locals.layout = 'lecture';
    next();

});
// ohm's law
router.get('/',(req,res)=>{
    res.render('lecture/index',{title:'Home Page'});
});
router.get('/ohms_law',(req,res)=>{
    // res.render('lecture/ohms_law',{title:"Ohm's Law"});
    res.render('lecture/high_pass_filter',{title:"High Pass Filter",filename:"Week 1 Studio 2_sem1Ay1819_v6b.pdf" } );
});
//AC side
router.get('/RLC_circuit',(req,res)=>{
    res.render('lecture/index_RLC');
});
router.get('/RC_circuit',(req,res)=>{
    res.render('lecture/RC_circuit',{title:"RC Circuit (AC)"});
});
router.get('/RL_circuit',(req,res)=>{
    res.render('lecture/RL_circuit',{title:"RL Circuit (AC)"});
});
router.get('/RLC_series_circuit',(req,res)=>{
    res.render('lecture/RLC_series_circuit',{title:"Series RLC Circuit"});
});
//DC side
router.get('/RLC_circuit_DC',(req,res)=>{
    res.render('lecture/index_RLC_DC',{title:"RLC Circuit (DC)"});
});
router.get('/RC_circuit_DC',(req,res)=>{
    res.render('lecture/RC_circuit_DC',{title:"DC Transient - Capacitor"});
});
router.get('/RL_circuit_DC',(req,res)=>{
    res.render('lecture/RL_circuit_DC',{title:"DC Transient - Inductor"});
});
//filters
router.get('/filter_index',(req,res)=>{
    res.render('lecture/index_filter',);
});
router.get('/high_pass_filter',(req,res)=>{
    res.render('lecture/high_pass_filter',{title:"High Pass Filter",filename:"Week 1 Studio 2_sem1Ay1819_v6b.pdf" } );
});
router.get('/low_pass_filter',(req,res)=>{
    res.render('lecture/low_pass_filter',{title:"Low Pass Filter"});
});
module.exports = router;