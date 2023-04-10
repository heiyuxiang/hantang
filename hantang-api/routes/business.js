const express = require('express')
const pool = require('../pool')
const router = express.Router()
router.get('/:bid',(req,res,next)=>{
	var obj = req.params
	pool.query('select * from ht_business where bid=?',[obj.bid],(err,r)=>{
		if(err){
			return next(err)
		}else{
			res.send({code:200,msg:'查询成功',data: r})
		}
	})
})

module.exports = router