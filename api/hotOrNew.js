exports.hotOrNew = (req,res)=> { 
	const lesson = global.dbHelper.getModel('lesson');   
	const hot = req.query.hot;
	const confident = hot == 1  ? {thumbupNum: -1 , _id: -1} : {_id: -1};
    
	new utils.DbOperate(lesson, {}, null, 2, confident).query().then((v)=>{
		if(v.code == 200){
			let result = v.result;
    		for(let i = 0 , len = result.length ; i < len ; i++ ){
 				result[i].text = ""; 
    		}
			res.json(v);
		}else{
			res.json({
                msg : '服务异常',
                code: 500
            })
		}
	})
}