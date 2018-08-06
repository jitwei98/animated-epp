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
    res.render('lecture/index');
});
router.get('/ohms_law',(req,res)=>{
    res.render('lecture/ohms_law');
});
//AC side
router.get('/RLC_circuit',(req,res)=>{
    res.render('lecture/index_RLC');
});
router.get('/RC_circuit',(req,res)=>{
    res.render('lecture/RC_circuit');
});
router.get('/RL_circuit',(req,res)=>{
    res.render('lecture/RL_circuit');
});
router.get('/RLC_series_circuit',(req,res)=>{
    res.render('lecture/RLC_series_circuit');
});
//DC side
router.get('/RLC_circuit_DC',(req,res)=>{
    res.render('lecture/index_RLC_DC');
});
router.get('/RC_circuit_DC',(req,res)=>{
    res.render('lecture/RC_circuit_DC');
});
router.get('/RL_circuit_DC',(req,res)=>{
    res.render('lecture/RL_circuit_DC');
});
//filters
router.get('/filter_index',(req,res)=>{
    res.render('lecture/index_filter');
});
router.get('/high_pass_filter',(req,res)=>{
    res.render('lecture/high_pass_filter');
});
router.get('/low_pass_filter',(req,res)=>{
    res.render('lecture/low_pass_filter');
});
module.exports = router;