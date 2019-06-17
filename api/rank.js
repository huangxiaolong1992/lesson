exports.rank = (req,res)=> { 
	const rank = global.dbHelper.getModel('rank'); 
    const topNum = req.query.topNum;
    
    let rankArr = [];
    new utils.DbOperate(rank, {}).query().then((v)=>{
        let result = common.statistics(v.result);
        for(var i in result){
            rankArr.push({
                userCode   : result[i].userCode,
                userName   : result[i].userName,
                department : result[i].department,
                avatar     : result[i].avatar,
                times      : result[i].len
            })
        }

        let rankAll = rankArr.sort(common.compare('times')).slice(0,topNum);
        res.json({
           code : 200,
           msg  : '查询成功',
           result: rankAll
        })      
    })   
}