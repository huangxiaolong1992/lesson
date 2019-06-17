exports.deleteCollection = (req,res)=> { 
	const collection = global.dbHelper.getModel('collection'); 
    const lesson = global.dbHelper.getModel('lesson'); 
    const userCode = req.body.userCode;
    const lessonInfo = req.body.lessonInfo;
    //[{'lessonId':"111",'collectNum':2}]
    for(var i = 0 , len = lessonInfo.length ; i < len ; i++){
        var lessonId = lessonInfo[i].lessonId;
        var collectNum = parseInt(lessonInfo[i].collectNum) -1;
        //删除收藏数据
        new utils.DbOperate(collection, {lessonId:lessonId,userCode:userCode}).delete().then((v)=>{
            //更新收藏数量
            new utils.DbOperate(lesson, {_id : lessonId} , { collectNum :  collectNum }).update().then((v)=>{
                if(v.code == 200){
                    console.log(`${common.timestampToTime(Date.parse(new Date()))}, 更新收藏数量成功`);
                }else{
                    console.log(`${common.timestampToTime(Date.parse(new Date()))}, 更新收藏数量失败`);
                }
            })
        })
    }

    res.json({
        code : 200,
        msg : "删除成功"
    })
}
