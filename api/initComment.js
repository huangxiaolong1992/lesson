exports.initComment = (req,res)=> { 
	const comment = global.dbHelper.getModel('comment'); 
	const reply = global.dbHelper.getModel('reply'); 
    const lessonId = req.query.lessonId;
    const index = parseInt(req.query.index) || 1;
    const rows  = parseInt(req.query.rows) || 10;
    const userCode = req.query.userCode;

    new utils.DbOperate(comment,
     {
     	lessonId : lessonId
     }
    )
    .query().then((v)=>{
    	if(v.code == 200){
            let commentArr = v.result; //顶级评论的数组
            let replyArr = []; //回复评论的数组
	        new utils.DbOperate(reply,
		     {
		     	lessonId : lessonId
		     }
		    )
		    .query().then((v)=>{
                replyArr = v.result;
                let tree = [];
                let changeTree = (data, id)=>{
                    replyArr.forEach((value,i)=>{
                        value.fromUserCode == userCode ? value.deleteable = true : value.deleteable = false;
                        if(value.replyId == id){
                        	data.child.push(value);         
                        } 
                    })   
                }
              
                commentArr.forEach((val)=>{
                     //判断用户是否可以删除评论
                   val.fromUserCode == userCode ? val.deleteable = true : val.deleteable = false;
                
                	if(val.child.length == 0){
                		tree.push(val)
                	}
                	changeTree(val, val._id)
                })

                let totalItem = tree.length;
                let totalPage = Math.ceil(totalItem / rows); 
                
                let result = tree.slice((index-1)*rows,index * rows);
                 
	            res.json({
	             	result: {
	             		code : 200,
		             	msg : "查詢成功",
		             	totalPage: totalPage,
		             	rows : rows,
		             	index : index,
		             	totalItem : totalItem,
		             	result : result
	             	}
	            })
                
		    })
    	}else{
    		console.log(`${common.timestampToTime(Date.parse(new Date()))}, 评论失败`);
            res.json({
                msg : '服务异常',
                code: 500
            })
    	}
    })
}