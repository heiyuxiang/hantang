const express = require('express')
const newspool = require('../pool')
const router = express.Router()

router.get('/catlist',(req,res,next)=>{
	newspool.query('select * from ht_cat order by cid asc',(err,r)=>{
		if(err){
			return next(err)
		}else{
			res.send({code:200,msg:'查询成功',data:r})
		}
	})
})

router.get('/list',(req,res,next)=>{
	var obj = req.query
	if (!obj.count){
		obj.count = 5
	}
	if(!obj.pnc){
		obj.pnc = 1
	}
	if(!obj.cat_id){
		return res.send({code:401,msg:'cat_id不能为空'})
	}
	var start = (obj.pnc-1)*obj.count
	var size = parseInt(obj.count)
	newspool.query('select nid,title,ctime,cat_id from ht_news where cat_id = ? limit ?,?;select count(*) sum from ht_news where cat_id = ?',[obj.cat_id,start,size,obj.cat_id],(err,r)=>{
		if(err){
			return next(err)
		}else{
			var t = r[1][0].sum
			var pages = Math.ceil(t/obj.count)
			res.send({code:200,msg:'查询成功',data:r[0],total:t,pages:pages,pnc:obj.pnc,cat_id:obj.cat_id})
		}
	})
})

router.get('/detail/:nid',(req,res,next)=>{
	var obj = req.params
	newspool.query('select * from ht_news where nid = ?',[obj.nid],(err,r)=>{
		if (err){
			return next(err)
		}else{
			if (r.length === 0){
				res.send({code:400,msg:'该新闻不存在'})
			}else{
				res.send({code:200,msg:'查询成功',data:r})
			}
		}
	})
})
module.exports = router