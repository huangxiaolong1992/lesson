exports.createCollection = (req,res)=> { 
	const lesson = global.dbHelper.getModel('lesson'); 
	const collection = global.dbHelper.getModel('collection'); 
	const userCode = req.body.userCode;
	const userName = req.body.userName;
    const className = req.body.className;
    const lessonId  = req.body.lessonId;
    const lessonName = req.body.lessonName;
    const lessonVideo = req.body.lessonVideo;
    const faceImg  =  req.body.faceImg;
    const title  = req.body.title;
    const type = req.body.type;
    const collectNum = parseInt(req.body.collectNum) + 1;
    const time = common.timestamp(Date.parse(new Date()));
    
    //更新课程的收藏数量
    new utils.DbOperate(lesson, {_id : lessonId} , { collectNum : collectNum }).update().then((v)=>{
    	if(v.code == 200){
			console.log(`${common.timestampToTime(Date.parse(new Date()))}, 更新收藏数量成功`);
		}else{
			console.log(`${common.timestampToTime(Date.parse(new Date()))}, 更新收藏数量失败`);
		}
    })
     
    //创建收藏数据
    new utils.DbOperate(collection,
     {
     	userCode : userCode,
		userName : userName,
		lessonId : lessonId,
        className : className,
        lessonName : lessonName,
        lessonVideo : lessonVideo,
        faceImg  : faceImg,
        title    : title,
        collectNum : collectNum,
        type : type,
        time : time
     }
    )
    .create().then((v)=>{
    	if(v.code == 200){
	        res.json(v)
    	}else{
    		console.log(`${common.timestampToTime(Date.parse(new Date()))}, 创建收藏失败`);
    	}
    })
}