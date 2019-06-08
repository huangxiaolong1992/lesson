exports.broadcastVideo = (req,res)=> { 
	const lesson = global.dbHelper.getModel('lesson'); 
    const lessonId = req.body.lessonId;
    const broadcastNum = parseInt(req.body.broadcastNum) + 1;
   
    new utils.DbOperate(lesson, {_id:lessonId} ,{broadcastNum : broadcastNum}).update().then((v)=>{
    	if(v.code == 200){
	    	res.json(v)
    	}else{
    		console.log(`${common.timestampToTime(Date.parse(new Date()))}, 回复评论失败`);
            res.json({
                msg : '服务异常',
                code: 500
            })
    	}
    })
}