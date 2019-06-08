
exports.deleteComment = (req,res)=> { 
	const comment = global.dbHelper.getModel('comment'); 
    const reply = global.dbHelper.getModel('reply'); 
    let deleteType  = req.body.deleteType;
    const deleteId = req.body.deleteId; 
    let table = deleteType == 0 ? comment : reply;  //0 代表评论，1代表回复
    console.log(table)
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