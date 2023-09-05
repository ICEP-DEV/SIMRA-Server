const express = require('express');
const connection = require("../config/config");
const router = express.Router();

router.get('/login', (req,res)=>{
    var sql = `SELECT * FROM USER WHERE mobileNo =?`   //"0123456789"
    connection.query(sql, [req.body.mobileNo],(err, results)=>{
        if(err) console(err)
        console.log(results.length);
        if(results.length > 0){
            if(results[0].password == req.body.password){
                res.json({message:'Successfully', success:true, results})
            }
            else{
                res.json({message:'wrong username or password', success:false})
            }
        }
        else{
            res.json({message:'wrong username or password', success:false})
        }
    } )
})
 

module.exports = router