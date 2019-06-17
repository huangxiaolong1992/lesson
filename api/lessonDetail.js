exports.lessonDetail = (req,res)=> { 
	const lesson = global.dbHelper.getModel('lesson'); 
	const collection = global.dbHelper.getModel('collection'); 
	const thumbup = global.dbHelper.getModel('thumbup'); 
	const rank = global.dbHelper.getModel('rank');
    const history = global.dbHelper.getModel('history');
    const lessonId  = req.query.lessonId;
    const userCode = req.query.userCode;
    const userName = req.query.userName;
    const watchNum = parseInt(req.query.watchNum) + 1  || 0;
    const department = req.query.department;

   //更新浏览量
    const updateWatchNum = () =>{
        new utils.DbOperate(lesson, {_id:lessonId} ,{watchNum : watchNum}).update().then((v)=>{
            if(v.code == 200){
                console.log(`${common.timestampToTime(Date.parse(new Date()))},更新浏览量成功`);
            }else{
                console.log(`${common.timestampToTime(Date.parse(new Date()))},更新浏览量失败`);
                res.json({
                    msg : '服务异常',
                    code: 500
                })
            }
        })
    }
    

    lesson.find({_id : lessonId},(err,doc)=>{
        if(err){  
            console.log(`${common.timestampToTime(Date.parse(new Date()))}`);
        }else{
            if(doc.length == 0){
                res.json({
                    code : "请求成功",
                    result : []
                })
                
                return;
            }

            updateWatchNum();


            let result = doc[0];
            //查询本课程是否收藏
            new utils.DbOperate(collection, {userCode : userCode}).query().then((val)=>{
                JSON.stringify(val.result).indexOf(result._id) != -1
                ? result.isCollected = true : result.isCollected = false;        
                
                //查询课程列表数据中是否点过赞
                new utils.DbOperate(thumbup, {userCode : userCode}).query().then((val)=>{    
                     JSON.stringify(val.result).indexOf(result._id) != -1
                     ? result.isThumbup = true : result.isThumbup = false;      
            
                    
                    //查询是否有学习过
                     new utils.DbOperate(rank, {userCode : userCode,lessonId:lessonId}).query().then((val)=>{

                        val.result.length == 0 ? result.isStudy = false : result.isStudy = true;
       
                        res.json(result)  
                     })
                    

                }) 
                
                
                new utils.DbOperate(history, {userCode : userCode,lessonId : lessonId}).query().then((val)=>{
                   if(val.code == 200){

                        if(val.result.length == 0){
                            //创建历史记录
                            createHistory(result);     
                        }else{
                            //清除本条数据
                            //removeHistory(result);
                            createHistory(result);  
                        }
                   }else{
                     console.log(val);
                   }
                })
                        
            })

            const createHistory = (result)=>{
                 new utils.DbOperate(history,
                 {
                    userName: userName,
                    userCode:userCode,
                    createUserCode : result.createUserCode,
                    createUserName : result.createUserName,
                    lessonId : result._id,
                    className : result.className,
                    lessonName : result.lessonName,
                    lessonVideo : result.lessonVideo,
                    faceImg  : result.faceImg,
                    title    : result.title,
                    collectNum : result.collectNum
                 }
                )
                .create().then((v)=>{
                    if(v.code == 200){
                        console.log(`${common.timestampToTime(Date.parse(new Date()))}, 创建历史记录成功`);
                    }else{
                        console.log(`${common.timestampToTime(Date.parse(new Date()))}, 创建历史记录失败`);
                    }
                })
            }


            const removeHistory = (result) =>{
                new utils.DbOperate(history,
                 {
                   userCode:userCode,
                   lessonId : result._id
                 }
                )
                .delete().then((v)=>{
                    if(v.code == 200){
                        console.log(`${common.timestampToTime(Date.parse(new Date()))},删除历史记录成功`);
                    }else{
                        console.log(`${common.timestampToTime(Date.parse(new Date()))}, 删除历史记录失败`);
                    }
                })
            }
        }

    })
}