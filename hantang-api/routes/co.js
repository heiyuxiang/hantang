const express = require('express')
const copool = require('../pool')
const router = express.Router()

router.post('/',(req,res,next)=>{
	var obj = req.body
	obj.ctime = Date.now()
	copool.query('insert into ht_cooperate set ?',[obj],(err,r)=>{
		if(err){
			return next(err)
		}else{
			res.send({code:200,msg:'提交成功'})
		}
	})
})


router.delete('/:cid',(req,res,next)=>{
	var obj = req.params
	copool.query('delete from ht_cooperate where cid = ?',[obj.cid],(err,r)=>{
		if(err){
			return next(err)
		}else{
			if(r.affectedRows===0){
				res.send({code:400,msg:'删除失败'})
			}else{
				res.send({code:200,msg:'删除成功'})
			}
		}
	})
})
module.exports = router