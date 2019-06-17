exports.clearHistory = (req,res)=> { 
	const history = global.dbHelper.getModel('history'); 
    const userCode = req.body.userCode;

    new utils.DbOperate(history, {userCode:userCode}).delete().then((v)=>{
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