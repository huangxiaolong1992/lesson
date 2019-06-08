exports.reply = (req,res)=> { 
	const reply = global.dbHelper.getModel('reply'); 
    const lessonId = req.body.lessonId;
    const content = req.body.content;
    const userCode = req.body.userCode;
    const userName = req.body.userName;
    const replyId = req.body.replyId;
    const replyUserCode = req.body.replyUserCode;
    const replyUserName = req.body.replyUserName;
    const time = common.timestampToTime(Date.parse(new Date()));

    new utils.DbOperate(reply,
     { 
     	lessonId : lessonId,
     	content : content,
        fromUserCode  : userCode,
     	fromUserName  : userName,
     	replyId : replyId,
     	replyUserCode : replyUserCode,
     	replyUserName : replyUserName,
     	child : [],
        deleteable : true,
        isThumbup : true,
        thumbupNum : 0,
     	time : time
     }
    )
    .create().then((v)=>{
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