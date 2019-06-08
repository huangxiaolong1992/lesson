exports.collectionList = (req,res)=> { 
    const collection = global.dbHelper.getModel('collection'); 
    const thumbup = global.dbHelper.getModel('thumbup'); 
    const index = parseInt(req.query.index) || 1;
    const rows  = parseInt(req.query.rows) || 10;
    const userCode = req.query.userCode;
    
    utils.pageQuery(collection, {userCode : userCode}, index, rows,{_id : -1},(v)=>{
    	if(v.result.code == 200){
            
            let result = v.result.result; 
          
            for(let i = 0 , len = result.length ; i < len ; i++ ){
                result[i].text = "";      
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