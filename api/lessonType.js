exports.lessonType = (req,res)=> { 
	const lessontype = global.dbHelper.getModel('lessontype');   

	new utils.DbOperate(lessontype, {}).query().then((v)=>{
		if(v.code == 200){
			res.json(v)
		}else{
			console.log(v);
		}
	})
}