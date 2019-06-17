const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');  
const mongoose = require("mongoose");
//global.request = require("request");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));
app.use(cors());


//管理数据库
global.dbHelper = require( './db/dbHelper' );

const connectDB = require("./db/connectDB");

connectDB.mongoose(mongoose);


//操作数据的方法
global.utils = require("./utils/utils");

//通用的方法
global.common = require("./utils/common");


/*
 * @description  获取课堂类型（时政课堂，公安数据，法制讲堂，专题课程）
 * @method get
 */
  
const lessonType = require('./api/lessonType');

app.get("/v1/mobile/lessonType", lessonType.lessonType);


/*
 * @description  获取课堂类型的列表数据（时政课堂，公安数据，法制讲堂，专题课程）
 * @method get
 */
 const lessonTypeList = require("./api/lessonTypeList");

 app.get("/v1/mobile/lessonTypeList", lessonTypeList.lessonTypeList);

/*
 * @description  获取熱搜課程（热：根据点赞量降序  新：根据时间降序）
 * @method get
 */

const hotOrNew = require("./api/hotOrNew");

app.get("/v1/mobile/hotOrNew", hotOrNew.hotOrNew);



/*
 * @description  获取焦點課程 (根据浏览量降序)
 * @method get 
 */
 const focusLesson = require("./api/focusLesson");

 app.get("/v1/mobile/focusLesson", focusLesson.focusLesson);


 
 /*
 * @description  課程详情页
 * @method get 
 */
 const lessonDetail = require("./api/lessonDetail");

 app.get("/v1/mobile/lessonDetail", lessonDetail.lessonDetail);

 /*
 * @description  创建点赞,更新点赞数量，
 * @method post 
 */
 const createThumbUp = require("./api/createThumbUp");

 app.post("/v1/mobile/createThumbUp", createThumbUp.createThumbUp);


 /*
 * @description  取消点赞,更新点赞数量，
 * @method delete 
 */
 const cancleThumbUp = require("./api/cancleThumbUp");

 app.delete("/v1/mobile/cancleThumbUp", cancleThumbUp.cancleThumbUp);


 /*
 * @description  收藏,更新收藏数量
 * @method post 
 */
 const createCollection = require("./api/createCollection");

 app.post("/v1/mobile/createCollection", createCollection.createCollection);


 /*
 * @description  取消收藏，更新收藏数量
 * @method post 
 */
 const cancleCollection = require("./api/cancleCollection");

 app.delete("/v1/mobile/cancleCollection", cancleCollection.cancleCollection);

/*
 * @description  学霸排行榜 记录学习课程
 * @method post 
 */

 const lessonStudy = require("./api/lessonStudy");

 app.post("/v1/mobile/lessonStudy", lessonStudy.lessonStudy);


/*
 * @description  学霸排行榜 
 * @method get 
 */

 const rank = require("./api/rank");

 app.get("/v1/mobile/rank", rank.rank);

 
 /*
 * @description  收藏列表
 * @method get  
 */

const collectionList = require("./api/collectionList");

app.get("/v1/mobile/collectionList", collectionList.collectionList);

/*
 * @description  专题里的小类
 * @method get  
 */

const smallCategory = require("./api/smallCategory");

app.get("/v1/mobile/smallCategory", smallCategory.smallCategory);

/*
 * @description  专题里的选择类别
 * @method get  
 */
const categoryList = require("./api/categoryList");

app.get("/v1/mobile/categoryList", categoryList.categoryList);

/*
 * @description  历史记录
 * @method get  
 */
const historyList = require("./api/historyList");

app.get("/v1/mobile/historyList", historyList.historyList);

/*
 * @description  搜索
 * @method get  
 */
const lessonSearch = require("./api/lessonSearch");

app.get("/v1/mobile/lessonSearch", lessonSearch.lessonSearch);

/*
 *@description 评论文章
 *@method post
 */
const reportComment = require("./api/reportComment");

app.post("/v1/mobile/reportComment", reportComment.reportComment);


/*
 *@description 回复文章
 *@method post
 */
const reply = require("./api/reply");

app.post("/v1/mobile/reply", reply.reply);

/*
 *@description 拉取评论
 *@method get
 */
const initComment = require("./api/initComment");

app.get("/v1/mobile/initComment", initComment.initComment);



/*
 *@description 删除评论
 *@method get
 */
const deleteComment = require("./api/deleteComment");

app.delete("/v1/mobile/deleteComment", deleteComment.deleteComment);


/*
 *@description 更新视频播放数量
 *@method update
 */
const broadcastVideo = require("./api/broadcastVideo");

app.put("/v1/mobile/broadcastVideo", broadcastVideo.broadcastVideo);


/*
 *@description 清空历史
 *@method update
 */
const clearHistory = require("./api/clearHistory");

app.delete("/v1/mobile/clearHistory", clearHistory.clearHistory);

/*
 *@description 删除历史
 *@method update
 */
const deleteHistory = require("./api/deleteHistory");

app.delete("/v1/mobile/deleteHistory", deleteHistory.deleteHistory);



/*
 *@description 删除收藏
 *@method update
 */
const deleteCollection = require("./api/deleteCollection");

app.delete("/v1/mobile/deleteCollection", deleteCollection.deleteCollection);


/*
 *@description 清空收藏
 *@method update
 */
const clearCollection = require("./api/clearCollection");

app.delete("/v1/mobile/clearCollection", clearCollection.clearCollection);


 //pc 端接口
 
 /*
  * @description  创建文章
  * @method create
  */
 const createLesson = require("./api/createLesson");

 app.post("/v1/createLesson", createLesson.createLesson);



  /*
  * @description  文章列表 分为视频和文章
  * @method create
  */
 const lessonList = require("./api/lessonList");

 app.get("/v1/lessonList", lessonList.lessonList);

 /*
  * @description  删除文章
  * @method delete
  */
 const deleteLesson = require("./api/deleteLesson");

 app.delete("/v1/deleteLesson", deleteLesson.deleteLesson);

 /*
  * @description  修改文章
  * @method delete
  */
 const upDateLesson = require("./api/upDateLesson");

 app.put("/v1/upDateLesson", upDateLesson.upDateLesson);

 /*
  * @description  数据分析
  * @method get
  */
const analysis = require("./api/analysis");

app.get("/v1/analysis", analysis.analysis);




 app.listen(8000);
 