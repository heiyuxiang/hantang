const express = require('express')
const culturepool = require('../pool')
const router = express.Router()
router.get('/:cid',(req,res,next)=>{
	var obj = req.params
	culturepool.query('select * from ht_culture where cid = ?',[obj.cid],(err,r)=>{
		if(err){
			return next(err)
		}else{
			res.send({code:200,msg:'查询成功',data:r})
		}
	})
})
module.exports = router



