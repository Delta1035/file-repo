## ES7

1. ftp://10.50.10.4/temp/20200519/trainingEs7Api.xlsx

2. SFC_LINESTAGE_TEMP_XXX 后面xxx是你们对应名字缩写

3. es的查询方法有两种 一种是参考share_rate的dao层 用avatar的es7util去写查询方法

4. 第二种是用我之前mybatis的写法 在data_monitor里面

5. 
   因为可能有使用方式的不同


   util包我没有帮你们导入


   使用不同方式的时候 自行去导入util


   也利于你们理解配置文件的加载方法

6. application.yml的oracle和es7的连接信息已经更新， oracleutil已经写好了 使用qas环境开发

7. avatarEs7Util example: share_rate
   engineEs7 example: engine_data_monitor