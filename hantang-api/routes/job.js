const express = require('express')
const jobpool = require('../pool')
const router = express.Router()

router.get('/list',(req,res,next)=>{
	var obj = req.query
	if(!obj.pnc){
		obj.pnc = 1
	}
	if(!obj.count){
		obj.count = 5
	}
	var start = (obj.pnc-1)*obj.count
	var size = parseInt(obj.count)
	
	jobpool.query('select * from ht_job limit ?,?;select count(*) sum from ht_job',[start,size],(err,r)=>{
		if(err){
			return next(err)
		}else{
			var t = r[1][0].sum
			var p = Math.ceil(t/obj.count)
			res.send({code:200,msg:'职位列表',data:r[0],total:t,pages:p,pnc:obj.pnc})
		}
	})
})
module.exports=router