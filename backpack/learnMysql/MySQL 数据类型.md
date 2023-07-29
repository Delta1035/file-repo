## MySQL 数据类型

 大致可以分为三类 : 数值 、日期/时间 、和字符串(字符);



#### 数值类型

- mysql 支持所有的标准sql数值数据类型. 包括 严格数值类型(INTEGER 整数, SMALLINT 短整型, DECIMAL 十进制小数,NUMERIC 数字) , 近似值类型(![image-20220320225049314](D:\desktop\workflow\docs\git_register\triennium\learnMysql\MySQL 数据类型.assets\image-20220320225049314.png)

#### 日期和时间类型

- DATETIME, DATE, TIMESTAMP(时间戳),TIME和YEAR
- 每一个时间类型有一个有效值范围和一个"零"值, 当指定不喝发的mysql不能表示的值时 使用零值
- TIMESTAMP(时间戳)类型有专有的自动更新特性

![image-20220320225419923](D:\desktop\workflow\docs\git_register\triennium\learnMysql\MySQL 数据类型.assets\image-20220320225419923.png)

#### 字符串类型

- 字符串类型指 CHAR, VARCHAR,BINARY,VARBINARY,BLOB,TEXT,ENUM和SET

![image-20220320225555376](D:\desktop\workflow\docs\git_register\triennium\learnMysql\MySQL 数据类型.assets\image-20220320225555376.png)