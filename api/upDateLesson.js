exports.upDateLesson = (req,res)=> { 
    const lesson = global.dbHelper.getModel('lesson');   
	const lessonId = req.body.lessonId;
	const lessonType = req.body.lessonType;
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
    const text = req.body.text;
    const type = req.body.type ;  //0 代表视频,1代表图片 
    
	new utils.DbOperate(lesson, {_id:lessonId} ,{
		lessonType : lessonType,
     	lessonName : lessonName,
        className  : className,
     	title      : title,
     	faceImg    : faceImg,
     	lessonVideo: lessonVideo,
     	createUserCode   : createUserCode,
        createUserName   : createUserName,
     	text       : text,
        classId    : classId,
        responsibleUnit :responsibleUnit,
        synopsis   : synopsis,
        type       : type
	}).update().then((v)=>{
    	if(v.code == 200){
	    	res.json(v)
    	}else{
    		console.log(`${common.timestampToTime(Date.parse(new Date()))}, 更新成功`);
            res.json({
                msg : '服务异常',
                code: 500
            })
    	}
    })
}