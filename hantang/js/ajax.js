
// 创建函数，封装发送请求的过程
function request(options){
// options接收传递的参数（格式为对象）
// 将对象转为查询字符串
var url = 'http://127.0.0.1:3000'

var arr=[] //用于保存每一组
for(var k in options.data){
	// 将拼接放入到数组
	arr.push(k+'='+options.data[k])
}
// 将数组转为字符串，元素之间用&分隔
var params=arr.join('&') //拼接的参数

options.async = options.async || true
// console.log(params)
// 创建HTTP请求对象
var xhr=new XMLHttpRequest()
// 将请求类型转为大写
options.type=options.type.toUpperCase()	
// 判断是哪一种请求，GET和DELETE请求相同，PUT和POST请求相同
var method=options.type
if(method==='GET' || method==='DELETE'){
	// 打开服务器的连接，请求接口
	// 将一组参数拼接到URL后边
	// console.log(url+options.url+'?'+params)
	xhr.open(method,url+options.url+'?'+params,options.async)
	// 发送请求
	xhr.send()
}else if(method==='POST' || method==='PUT'){
	// 打开服务器的连接，请求接口
	xhr.open(method,url+options.url,options.async)
	// 还需要设置请求的内容类型
	xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
	// 发送请求，将参数添加到请求主体
	xhr.send(params)
}
// 添加事件，监听响应
xhr.onload=function(){
	// 将响应的主体传到外部
	// 使用回调函数
	options.success(JSON.parse(xhr.responseText))
}
}
