exports.cancleCollection = (req,res)=> { 
	const lesson = global.dbHelper.getModel('lesson'); 
	const collection = global.dbHelper.getModel('collection'); 
	const userCode = req.body.userCode;
	const userName = req.body.userName;
    const lessonId  = req.body.lessonId;
    const collectNum = parseInt(req.body.collectNum) - 1;
    

    //更新课程的收藏数量
    new utils.DbOperate(lesson, {_id : lessonId} , { collectNum : collectNum }).update().then((v)=>{
    	if(v.code == 200){
			console.log(`${common.timestampToTime(Date.parse(new Date()))}, 更新收藏数量成功`);
		}else{
			console.log(`${common.timestampToTime(Date.parse(new Date()))}, 更新收藏数量失败`);
		}
    })
     
    //删除收藏数据
    new utils.DbOperate(collection,
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
    		console.log(`${common.timestampToTime(Date.parse(new Date()))},${err}, 删除收藏失败`);
    		res.json({
                msg : '服务异常',
                code: 500
            })
    	}
    })
}