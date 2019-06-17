
exports.deleteComment = (req,res)=> { 
	const comment = global.dbHelper.getModel('comment'); 
    const lesson = global.dbHelper.getModel('lesson');
    const reply = global.dbHelper.getModel('reply'); 
    let deleteType  = req.body.deleteType;
    const lessonId = req.body.lessonId;
    const deleteId = req.body.deleteId; 
    const commentNum = parseInt(req.body.commentNum) -1 ;
    let table = deleteType == 0 ? comment : reply;  //0 代表评论，1代表回复

    new utils.DbOperate(lesson, {_id : lessonId} , { commentNum : commentNum }).update().then((v)=>{
        if(v.code == 200){
            console.log(`${common.timestampToTime(Date.parse(new Date()))}, 更新评论成功`);
        }else{
            console.log(`${common.timestampToTime(Date.parse(new Date()))}, 更新评论失败`);
        }
    })

    new utils.DbOperate(table,
     {
     	_id : deleteId
     }
    )
    .delete().then((v)=>{
    	if(v.code == 200){
            res.json(v);
    	}else{
    		console.log(`${common.timestampToTime(Date.parse(new Date()))}, 评论失败`);
            res.json({
                msg : '服务异常',
                code: 500
            })
    	}
    })
}