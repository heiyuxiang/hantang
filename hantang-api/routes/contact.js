const express = require('express')
const contactpool = require('../pool')
const router = express.Router()

router.get('/list',(req,res,next)=>{
	contactpool.query('select * from ht_contact order by cid desc',(err,r)=>{
		if(err){
			return next(err)
		}else{
			res.send({code:200,msg:'联系我们',data: r})
		}
	})
})

module.exports = router