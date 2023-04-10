const express = require('express')
const aboutpool = require('../pool')
const router = express.Router()
router.get('/info/:aid',(req,res,next)=>{
	var obj = req.params
	aboutpool.query('select * from ht_about where aid = ?',[obj.aid],(err,r)=>{
		if (err){
			return next(err)
		}
		res.send({code:200,msy:'公司简介/董事长致辞',data:r})
	})
	// console.log(obj.aid)
	
})

router.get('/event',(req,res,next)=>{
	aboutpool.query('select * from ht_event',(err,r)=>{
		if (err){
			return next(err)
		}else{
			res.send({code:200,msg:'公司大事件',data:r})
		}
	})
	// res.send('公司大事件')
})

router.get('/member',(req,res,next)=>{
	aboutpool.query('select * from ht_member order by mid asc',(err,r)=>{
		if (err){
			return next(err)
		}else{
			res.send({code:200,msg:'旗下成员',data:r})
		}
	})
	// res.send('旗下成员')
})
module.exports = router