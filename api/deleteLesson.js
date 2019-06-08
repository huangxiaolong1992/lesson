exports.deleteLesson = (req,res)=> { 
	const lesson = global.dbHelper.getModel('lesson'); 
	const lessonId = req.body.lessonId;
    
    new utils.DbOperate(lesson, {_id:lessonId}).delete().then((v)=>{
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