exports.clearCollection = (req,res)=> { 
	const collection = global.dbHelper.getModel('collection'); 
    const lesson = global.dbHelper.getModel('lesson'); 
    const userCode = req.body.userCode;

    //更新收藏数量
    new utils.DbOperate(collection, {userCode:userCode}).query().then((v)=>{
        for(var i = 0 , len = v.result.length ; i < len ; i++){
            new utils.DbOperate(lesson, {_id : v.result[i].lessonId} , { collectNum :  parseInt(v.result[i].collectNum) -1 }).update().then((v)=>{
                if(v.code == 200){
                    console.log(`${common.timestampToTime(Date.parse(new Date()))}, 更新收藏数量成功`);
                    clear();
                }else{
                    console.log(`${common.timestampToTime(Date.parse(new Date()))}, 更新收藏数量失败`);
                }
            })
        }
        
    })
    
    const clear = ()=> {
        new utils.DbOperate(collection, {userCode:userCode}).delete().then((v)=>{
            if(v.code == 200){
                res.json(v)
            }else{
                console.log(`${common.timestampToTime(Date.parse(new Date()))}, 清空失败`);
                res.json({
                    msg : '服务异常',
                    code: 500
                })
            }
        })
    }
}