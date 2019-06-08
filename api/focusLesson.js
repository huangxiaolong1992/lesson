exports.focusLesson = (req,res)=> { 
	const lesson = global.dbHelper.getModel('lesson'); 
    const collection = global.dbHelper.getModel('collection'); 
    const thumbup = global.dbHelper.getModel('thumbup'); 
    const userCode = req.query.userCode;
    const index = parseInt(req.query.index) || 1;
    const rows  = parseInt(req.query.rows) || 10;
    utils.pageQuery(lesson, null, index, rows, {watchNum: -1 , _id : -1},(v)=>{
        if(v.result.code == 200){
            let result = v.result.result; 
            //查询课程列表数据中是否收藏
            new utils.DbOperate(collection, {userCode : userCode}).query().then((val)=>{

                for(let i = 0 , len = result.length ; i < len ; i++ ){
                    JSON.stringify(val.result).indexOf(result[i]._id) != -1
                    ? result[i].isCollected = true : result[i].isCollected = false;

                    result[i].text = "";     
                }    

                //查询课程列表数据中是否点过赞
                new utils.DbOperate(thumbup, {userCode : userCode}).query().then((val)=>{

                    for(let i = 0 , len = result.length ; i < len ; i++ ){
                        JSON.stringify(val.result).indexOf(result[i]._id) != -1
                        ? result[i].isThumbup = true : result[i].isThumbup = false;        
                    } 

                    res.json(v)  
                })                  
            })
        }else{
            console.log(v);
        }
    })
}