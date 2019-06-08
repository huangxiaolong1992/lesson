exports.analysis = (req,res)=> { 
	const collection = global.dbHelper.getModel('collection'); 
    const rank = global.dbHelper.getModel('rank'); 
    const nowDay = common.getprevDay(1);
    const prevDay= common.getprevDay(-7);
    const type = req.query.type;  //0代表学习量，1代表收藏量
    console.log(type == 0)
    const table = type == 0 ? rank : collection;
    new utils.DbOperate(table, {"$and":[{"time":{"$gt":prevDay}},{"time":{"$lt":nowDay}}]}).query().then((v)=>{
    	if(v.code == 200){
            let dataArr = []; //存數量
            let timeArr = []; //存時間
            
            let time = [];
            v.result.forEach(v=>{
                time.push(v.time);
            })

            let data = JSON.stringify(time);
            for(var i = 6 ; i > -1 ; i--){
                timeArr.push(common.getprevDay(-i))
                try{
                    dataArr.push(eval("data.match(/"+common.getprevDay(-i)+"/ig).length"));
                }catch(err){
                    dataArr.push(0);
                }   
            }

            res.json({
                code: 200,
                meg: "查询成功",
                result:[
                 {time : timeArr},
                 {number: dataArr}
                ]
            })
             
      

    	}else{
    		console.log(`${common.timestampToTime(Date.parse(new Date()))}, 回复评论失败`);
            res.json({
                msg : '服务异常',
                code: 500
            })
    	}
    })
}