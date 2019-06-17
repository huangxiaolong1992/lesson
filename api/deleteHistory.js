
exports.deleteHistory = (req,res)=> { 
	const history = global.dbHelper.getModel('history'); 
    const userCode = req.body.userCode;
    const lessonId = req.body.lessonId;
   
    for(var i = 0 , len = lessonId.length ; i < len ; i++){
        new utils.DbOperate(history, {lessonId:lessonId,userCode:userCode}).delete().then((v)=>{
            
        })
    }

    res.json({
        code : 200,
        msg : "删除成功"
    })
}