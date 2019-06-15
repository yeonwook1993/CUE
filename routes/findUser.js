var express = require('express');
var router = express.Router();
var fb = require("./firebase");


/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.query.id);
	console.log(req.query.password);

	var id = Buffer.from(req.query.id).toString('base64');
	var pwd = req.query.password;
	
	async function local(){
		var flag = await fb.lgin(id,pwd);
		if(flag){
			res.send('<script> alert("아이디 비밀번호를 확인해 주세요.");history.go(-1)</script>');
		}else {
			res.render('./index.html');
		}
	}
});

module.exports = router;
