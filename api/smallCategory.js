exports.smallCategory = (req,res)=> { 
	const smallcategory = global.dbHelper.getModel('smallcategorie'); 

    new utils.DbOperate(smallcategory, {}).query().then((v)=>{
        res.json(v)      
    })   
}