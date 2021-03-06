var express = require('express');
var router = express.Router();
var fb = require("./firebase");
var session = require('express-session')
var FileStore = require('session-file-store')(session)


router.use(session({
	secret: 'CUE_PROJECT',
	resave: false,
	saveUninitialized: true,
}))


/* GET home page. */
router.get('/', function(req, res) {
	var show_id = req.session.show_id;
	req.session.originalurl = "/info_show?id="+show_id
	console.log(req.session.reserve);
	console.log(req.session.originalurl);

	async function doReserve(){
		console.log(req.session.email);
		var id = Buffer.from(req.session.email).toString('base64');
		var db = await fb.readPhost(req.session.show_id);
		if(parseInt(db.personLimit,10)-parseInt(db.personNow,10) <=0){
			req.session.reserve = 2;
			res.redirect(req.session.originalurl);
		}else{
			//DB에 예약정보 저장
			fb.makeReservation(id,req.session.show_id);
			req.session.reserve = 1;
			var count = parseInt(db.personNow,10) + 1;
			fb.plusNowCount(req.session.show_id,count);
			res.redirect(req.session.originalurl);
		}
	}

	if(req.session.is_logined){
		doReserve();
	} else {
		req.session.reserve = 10;
		res.redirect("login");
	}

});

module.exports = router;