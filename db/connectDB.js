/**
 * @description  mongodb 配置
 * @param ip : 数据库 ip地址
 * @param port : 数据库端口
 * @param dbName : 数据库名称
 * @param ccountNumber : 数据库账号
 * @param password: 数据库密码
 */

let mongooseConfig = { 
  MaccountNumber : "cloud",
  Mpassword : "xh_123456",
  Mip : '127.0.0.1',
  Mport : '27017',
  MdbName : 'cloud_classroom'
}

let { MaccountNumber, Mpassword, Mip, Mport, MdbName } = mongooseConfig;

const mongoose = (mongoose) => { 

  let db = mongoose.connect(`mongodb\://${MaccountNumber}\:${Mpassword}@${Mip}\:${Mport}/${MdbName}`,(err)=>{
    if(err){
      console.log(err)
      console.log("mongodb数据库连接失败！");
    }else{
      console.log("mongodb数据库连接成功！");
    }
  });  
};

/**
* @description  redis 配置
*  @param ip : 数据库 ip地址
*  @param port : 数据库端口
*  @param password: 数据库密码
*/

let redisConfig = {
  Rip : '127.0.0.1',
  Rport : '6379',
  Rpassword : ""
}

let { Rip, Rport, Rpassword } = redisConfig;

const redis = (redis)=>{

  global.client = redis.createClient(Rport, Rip);

  client.on('ready',function(err){
    console.log('ready');
  });

  client.on("error", function(error) {
    console.log(error);
  })

  // redis 密码验证 (未设置密码验证，此项可不需要)
  client.auth(Rpassword, (error, res) =>{
     console.log('auth error: ',error);
     console.log('auth res: ',res);
  });
}


//将配置导出

module.exports = {
  mongoose : mongoose,
  redis : redis
};


