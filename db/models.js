module.exports = {
	//课堂类型
	lessontype : {
		lessonName : String
	},
	//課程
	lesson : {
		lessonType : String,
		lessonName : String,
		title      : String,
		deleteable : Boolean,
		faceImg    : String,
		lessonVideo: String,
		text       : String,
		type       : Number,
		deleteable  : Boolean,
		createUserCode   : String,
        createUserName   : String,
		responsibleUnit : String,
		className  : String,
		classId    : String,
		isDraft :   Boolean,
		broadcastNum  : Number,
        synopsis   : String,
		thumbupNum : Number,
		commentNum : Number,
		watchNum   : Number,
		collectNum : Number,
		isCollected: Boolean,
		isThumbup  : Boolean,
		time       : String,
	},
	//点赞
	thumbup : {
		userCode : String,
		userName : String,
		lessonId : String
	},
	collection : {
		userCode : String,
		userName : String,
		lessonId : String,
	    lessonName : String,
        lessonVideo : String,
        faceImg  : String,
        title    : String,
        collectNum : Number,
        time : String
	},
	rank : {
		userCode   : String,
		userName   : String,
		department : String,
		lessonId   : String,
		time :       String
	},
	smallcategorie: {
		parentId   : String,
		className : String
	},
	history: {
		lessonType : String,
		userName : String,
		userCode: String,
		lessonName : String,
		title      : String,
		faceImg    : String,
		lessonId   : String,
		lessonVideo: String,
		text       : String,
		createUserCode   : String,
        createUserName   : String,
		responsibleUnit : String,
		className  : String,
        synopsis   : String,
		thumbupNum : Number,
		commentNum : Number,
		watchNum   : Number,
		collectNum : Number,
		isCollected: Boolean,
		isThumbup  : Boolean,
		time       : String,
	},
	comment: {
        lessonId : String,
        content : String,
        fromUserCode : String,
        fromUserName : String,
        child : Array,
        time : String,
        thumbupNum: Number,
        deleteable : Boolean,
	},
	reply: {
		lessonId : String,
 	    content : String,
 	    fromUserName: String,
 	    fromUserCode: String,
 	    thumbupNum: Number,
 	    child : Array,
 	    replyId : String,
 	    replyUserCode : String,
 	    replyUserName : String,
 	    time : String,
 	    deleteable : Boolean
	}
};