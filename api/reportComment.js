exports.reportComment = (req,res)=> { 
	const lesson = global.dbHelper.getModel('lesson'); 
	const comment = global.dbHelper.getModel('comment'); 
    const lessonId = req.body.lessonId;
    const content = req.body.content;
    const userCode = req.body.userCode;
    const userName = req.body.userName;
    const commentNum = parseInt(req.body.commentNum) + 1;
    const avatar = req.body.avatar;
    const time = common.timestampToTime(Date.parse(new Date()));
    
    new utils.DbOperate(lesson, {_id : lessonId} , { commentNum : commentNum }).update().then((v)=>{
        if(v.code == 200){
            console.log(`${common.timestampToTime(Date.parse(new Date()))}, 更新评论成功`);
        }else{
            console.log(`${common.timestampToTime(Date.parse(new Date()))}, 更新评论失败`);
        }
    })

    new utils.DbOperate(comment,
     {
     	lessonId : lessonId,
     	content : content,
        fromUserCode  : userCode,
     	fromUserName  : userName,
     	child : [],
     	deleteable : true,
     	//isThumbup : true,
     	thumbupNum : 0,
     	time : time,
        avatar : avatar
     }
    )
    .create().then((v)=>{
    	if(v.code == 200){
	    	res.json(v)
    	}else{
    		console.log(`${common.timestampToTime(Date.parse(new Date()))}, 评论失败`);
            res.json({
                msg : '服务异常',
                code: 500
            })
    	}
    })
}