



## Kafka

#### 介绍

- 资料整合, 数据交换总线

## ElasticSearch

- kibana	数据可视化

- logstash  数据抓取

- beats 数据抓取

- elasticsearch 是 elastic stack的核心, 负责存储, 搜索, 分析数据

  - 文档: 一条数据就是一个文档, es中是json格式
  - 字段: json文档中的字段
  - 索引: 同类型文档的集合
  - 映射索引中文档的约束, 比如字段名称和类型
  - - 一般es负责搜索数据
    - mysql负责数据的存储, 然后把数据同步到es
  - 中文分词器 `IK `

- ![image-20220510101253425](E:\desktop\triennium\培训\java\kafka.assets\image-20220510101253425.png)

- DSL 查询语法

  - 查询所有, 对能分词的内容 倒排查询

    - match_query 
      - ![image-20220510103501719](E:\desktop\triennium\培训\java\kafka.assets\image-20220510103501719.png)
    - multi_match_query

  - 精确查询, 一般查找keyword, 数值, 日期, 博哦了安等类型

    - ids
    - range(一般用在价格查询)
    - term(词条)

  - 地理查询, 根据经纬度查询

    - geo_distance: 查询到指定中心店小于某个距离的文档, 以FIELD为中心,distance为半径的圆的范围所有文档

      ![image-20220510105145132](E:\desktop\triennium\培训\java\kafka.assets\image-20220510105145132.png)

    - geo_bounding_box: 查询geo_point值落在某个矩形范围的所有文档

  - 符合查询compound, 将上述各种查询条件组合自来,合并查询

    - bool
    - function_score : 算分函数查询, 可以控制文档相关性算分, 控制文档排名,

#### MyBatis

- 一款优秀的持久层框架

- 入门
  1. 创建user表, 添加数据
  2. 创建模块,导入坐标
  3. 编写mybatis核心配置文件, --> 替换连接信息, 解决硬编码问题
  4. 编写sql映射文件-->  统一管理sql语句, 解决硬编码问题
  5. 编码:
     - 定义pojo类
     - 加载核心配置文件, 获取SqlSessionFactory对象
     - 获取SqlSession对象, 执行SQL语句
     - 释放资源

- 标准数据层CURD功能
  - ![image-20220509171402214](E:\desktop\triennium\培训\java\kafka.assets\image-20220509171402214.png![image-20220509171433112](E:\desktop\triennium\培训\java\kafka.assets\image-20220509171433112.png)
