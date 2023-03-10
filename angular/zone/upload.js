//图片上传必须用post方法  test是请求参数
router.post('/img',upload.single('test'),(req,res)=>{

    //读取文件路径
    fs.readFile(req.file.path,(err,data)=>{
  
  
    if(err){return res.send('上传失败')}
  
    //如果读取成功*
    //声明图片名字为时间戳和随机数拼接成的尽量确保唯一性*
     let time=Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
  
    
    let extname=req.file.mimetype.split('/')[1]
  
    //拼接成图片名*
    let keepname=time+'.'+extname
  
    
  
    fs.writeFile(path.join(__dirname,'../static/img/'+keepname),data,(err)=>{
  
      if(err){return res.send('写入失败')}
  
      res.send({err:0,msg:'上传ok',data:keepname}) //这里上传成功后的信息
  
    });
  
   });
  
  })
  
  module.exports=router;//导出此路由
  