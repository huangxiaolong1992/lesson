exports.deleteLesson = (req,res)=> { 
	const lesson = global.dbHelper.getModel('lesson'); 
	const lessonId = req.body.lessonId;

    for(var i = 0 , len = lessonId.length ; i < len ; i++){
        new utils.DbOperate(lesson, {_id:lessonId}).delete().then((v)=>{
            
        })
    }
    
    res.json({
        code : 200,
        msg : "删除成功"
    })
}