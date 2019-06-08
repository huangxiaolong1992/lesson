exports.lessonList = (req,res)=> { 
	const lesson = global.dbHelper.getModel('lesson');   
	const type = req.query.type;  //0代表视频，1代表图片
    const userCode = req.query.userCode;
    const index = parseInt(req.query.index) || 1;
    const rows  = parseInt(req.query.rows) || 10;
    const isDraft = req.query.isDraft;
    const lessonType = req.query.lessonType  == 0 ? {type : type, isDraft: isDraft} : {type : type , isDraft: isDraft, lessonType: req.query.lessonType}

	utils.pageQuery(lesson, lessonType , index, rows,{_id : -1},(v)=>{
    	if(v.result.code == 200){
            
            let result = v.result.result; 
          
            for(let i = 0 , len = result.length ; i < len ; i++ ){
                result[i].text = "";    
                result[i].deleteable = result[i].createUserCode == userCode ?  true :  false;  
            } 
             
            res.json(v)  
		}else{
			res.json({
                msg : '服务异常',
                code: 500
            })
		}
    })
}



