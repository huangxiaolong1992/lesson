exports.createLesson = (req,res)=> { 
	const lesson = global.dbHelper.getModel('lesson');  
    const lessonType  = req.body.lessonType;
    const lessonName = req.body.lessonName;
    const className = req.body.className;
    const classId = req.body.classId;
    const title = req.body.title;
    const faceImg = req.body.faceImg;
    const lessonVideo = req.body.lessonVideo;
    const createUserCode = req.body.createUserCode;
    const createUserName = req.body.createUserName;
    const synopsis = req.body.synopsis;
    const responsibleUnit = req.body.responsibleUnit;
    const isDraft = req.body.isDraft;
    const text = req.body.text;
    const type = req.body.type ;  //0 代表视频,1代表图片
    const time = common.timestampToTime(Date.parse(new Date()));

    new utils.DbOperate(lesson,
     {
     	lessonType : lessonType,
     	lessonName : lessonName,
        className  : className,
     	title      : title,
        deleteable  : true,
     	faceImg    : faceImg,
     	lessonVideo: lessonVideo,
        isDraft : isDraft,
        broadcastNum  : 0 ,
     	createUserCode   : createUserCode,
        createUserName   : createUserName,
     	text       : text,
        classId    : classId,
        responsibleUnit :responsibleUnit,
        synopsis   : synopsis,
        type       : type,
     	thumbupNum : 0,
     	commentNum : 0,
     	watchNum   : 0,
        collectNum : 0,
        isCollected: false,
        isThumbup  : false,
     	time       : time
     }
    )
    .create().then((v)=>{
    	if(v.code == 200){
	    	res.json(v)
    	}else{
    		console.log(`${common.timestampToTime(Date.parse(new Date()))}, 创建失败`);
            res.json({
                msg : '服务异常',
                code: 500
            })
    	}
    })
}
