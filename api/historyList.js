exports.historyList = (req,res)=> { 
	const history = global.dbHelper.getModel('history'); 
	const userCode = req.query.userCode; 
	const index = parseInt(req.query.index) || 1;
    const rows  = parseInt(req.query.rows) || 10;
    utils.pageQuery(history, {userCode : userCode}, index, rows,{_id : -1},(v)=>{

    	if(v.result.code == 200){
             res.json(v)       
		}else{
			res.json({
                msg : '服务异常',
                code: 500
            })
		}
    })
}