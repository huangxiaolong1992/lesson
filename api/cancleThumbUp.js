exports.cancleThumbUp = (req,res)=> { 
	const lesson = global.dbHelper.getModel('lesson'); 
	const thumbup = global.dbHelper.getModel('thumbup'); 
	const userCode = req.body.userCode;
	const userName = req.body.userName;
    const lessonId  = req.body.lessonId;
    const thumbUpNum = parseInt(req.body.thumbUpNum) - 1;

    //更新课程的点赞数量
    new utils.DbOperate(lesson, {_id : lessonId} , { thumbupNum : thumbUpNum }).update().then((v)=>{
    	if(v.code == 200){
			console.log(`${common.timestampToTime(Date.parse(new Date()))}, 更新点赞数量成功`);
		}else{
			console.log(`${common.timestampToTime(Date.parse(new Date()))}, 更新点赞数量失败`);
		}
    })
     

    //删除点赞数据
    new utils.DbOperate(thumbup,
     {
     	userCode : userCode,
		userName : userName,
		lessonId : lessonId
     }
    )
    .delete().then((v)=>{
    	if(v.code == 200){
	    	res.json(v)
    	}else{
    		console.log(`${common.timestampToTime(Date.parse(new Date()))}, 删除点赞失败`);
    		res.json({
                msg : '服务异常',
                code: 500
            })
    	}
    })
}