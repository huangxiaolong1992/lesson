exports.lessonStudy = (req,res)=> { 
	const lesson = global.dbHelper.getModel('lesson'); 
	const rank = global.dbHelper.getModel('rank'); 
    const lessonId  = req.body.lessonId;
    const userCode = req.body.userCode;
    const userName = req.body.userName;
    const department = req.body.department;
    const time = common.timestamp(Date.parse(new Date()));
    new utils.DbOperate(rank, { userCode : userCode , lessonId : lessonId }).query().then((v)=>{
        if(v.result.length == 0){
            new utils.DbOperate(rank,
             { 
                userCode   : userCode , 
                lessonId   : lessonId,
                userName   : userName,
                department : department,
                time       : time
             }).create().then((v)=>{
                res.json(v)
            })
        }else{
            res.json({
                code : 202,
                msg  : '已经学习过'
            })
        }
    })
}