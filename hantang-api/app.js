const express = require('express')
const cors = require('cors')
const aboutrouter = require('./routes/about')
const newsrouter = require('./routes/news')
const corouter = require('./routes/co')
const culturerouter = require('./routes/culture')
const jobrouter = require('./routes/job')
const contactrouter = require('./routes/contact')
const businessrouter = require('./routes/business')
const indexrouter = require('./routes/index')
const app = express()
app.listen(3000,()=>{
	console.log('启动服务器成功')
})
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.static('../hantang'))

app.use('/v1/about',aboutrouter)
app.use('/v1/news',newsrouter)
app.use('/v1/co',corouter)
app.use('/v1/culture',culturerouter)
app.use('/v1/job',jobrouter)
app.use('/v1/contact',contactrouter)
app.use('/v1/bus',businessrouter)
app.use('/v1/index',indexrouter)




// #错误处理
app.use((err,req,res,next)=>{
	console.log(err)
	res.send({code:500,msg:'服务器端错误'})
})