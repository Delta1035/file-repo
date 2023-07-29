### PostgreSQL INSERT INTO 语句

### 语法

INSERT INTO 语句语法格式如下：

```
INSERT INTO TABLE_NAME (column1, column2, column3,...columnN)
VALUES (value1, value2, value3,...valueN);
```

- column1, column2,...columnN 为表中字段名。
- value1, value2, value3,...valueN 为字段对应的值。

在使用 INSERT INTO 语句时，字段列必须和数据值数量相同，且顺序也要对应。

如果我们向表中的所有字段插入值，则可以不需要指定字段，只需要指定插入的值即可：

```
INSERT INTO TABLE_NAME VALUES (value1,value2,value3,...valueN);
```

```sql
# 语法错误
insert into student values ("3","王五","1997-02-03",1);
```

### 注意

1. 使用单引号
1. nulls last 将null排在最后
1. group by 一般搭配聚合函数使用, 当你使用group by时,出现在select后面的字段 要么是是聚合函数中的,要么是在group by 中的。
1. 注意分组和聚合函数的使用



### group by, on, having,where

`group by` 分组后，只能显示合法数据，一般都是每一组中的其中一条，违反这个规则， 一定会报语法错误。

`having` 是对分组（group by）后的筛选条件，对分组后的数据进行筛选，作用于每个组，限制的是组，而不是行。

WHERE过滤行，HAVING过滤组

当同时含有 `where` 子句、`group by` 子句 、`having` 子句、`聚集函数`时，执行顺序如下：

1. 先执行 where 子句，查找（过滤出）表中符合条件的数据；
2. 再 group by 子句，对where查找出的数据进行分组；
3. 对 group by 子句形成的组，运行聚集函数计算每一组的值；
4. 最后用 having 子句，查找（过滤出）符合条件的组

### distinct on

### 触发器

- ```sql
  SHOW TRIGGERS LIKE 'payments%'; -- 查看有多少触发器
  ```

[39.5. 一个表重写事件触发器例子 (postgres.cn)](http://postgres.cn/docs/12/event-trigger-table-rewrite-example.html)

[【第十章】触发器和事件 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/249041200)

1. 触发时间在(insert,update,drop)事件之(前后中)

2. for each row/statement; 在每行或者每个语句修改后调用一次

   ```sql
   CREATE TRIGGER example_trigger AFTER INSERT ON COMPANY FOR EACH ROW EXECUTE PROCEDURE auditlogfunc();
   ```

   auditlogfunc() 是 PostgreSQL 一个程序，其定义如下：

   ```sql
   CREATE OR REPLACE FUNCTION auditlogfunc() RETURNS TRIGGER AS $example_table$
      BEGIN
         INSERT INTO AUDIT(EMP_ID, ENTRY_DATE) VALUES (new.ID, current_timestamp);
         RETURN NEW;
      END;
   $example_table$ LANGUAGE plpgsql;
   ```

#### mysql触发器

```sql
DELIMITER $$
CREATE TRIGGER payments_after_insert
	-- 每次插入数据到payments表时 每一行都会触发当前触发器
    AFTER INSERT ON payments
    FOR EACH ROW
BEGIN
	-- 更新invoice发票表payment_total字段
	-- NEW 代表新插入的那一行数据
    UPDATE invoices
    SET payment_total = payment_total + NEW.amount
    WHERE invoice_id = NEW.invoice_id;
END$$

DELIMITER ;

INSERT INTO payments value(DEFAULT,5,3,'2023-01-19',10,1);
-- 当执行插入语句后, invoices的payment_total对应的列会发生自动更新
```

#### 示例

```sql
-- DELIMITER $$
DROP TRIGGER IF EXISTS payments_after_insert;
-- CREATE TRIGGER payments_after_insert
-- 	-- 每次插入数据到payments表时 每一行都会触发当前触发器
--     AFTER INSERT ON payments
--     FOR EACH ROW
-- BEGIN
-- 	-- 更新invoice发票表payment_total字段
-- 	-- NEW 代表新插入的那一行数据
--     UPDATE invoices
--     SET payment_total = payment_total + NEW.amount
--     WHERE invoice_id = NEW.invoice_id;
-- END;
-- DELIMITER ;
-- DROP TRIGGER  payments_after_update;
DELIMITER $$
DROP TRIGGER IF EXISTS payments_after_update$$
CREATE TRIGGER payments_after_update
AFTER UPDATE ON payments
FOR EACH ROW 
BEGIN 
	UPDATE invoices SET payment_total = payment_total + NEW.amount + 1
	WHERE invoice_id = NEW.invoice_id;
END;

DELIMITER ;

-- SHOW TRIGGERS LIKE 'payments%';

-- INSERT INTO payments value(DEFAULT,5,3,'2023-01-19',10,1);-- 触发插入 触发器
UPDATE payments SET payments.amount = 199 WHERE payments.invoice_id = 3 AND payments.payment_id = 9;
```

### 事件

事件是一段根据计划执行的代码,可以执行一次或者按照某种规律执行,类似定时任务?

#### 事件的使用场景

1. 足底部规划数据库维护, 将数据从一张表复制到存档表,或者汇总数据生成报告

2. 需要打开mysql事件调度器,这是一个在后台运行的程序,时刻在寻找需要执行的事件

   ```sql 
   SHOW variables; -- 查看所有的系统变量
   SHOW variables LIKE 'event%'; -- 查看以event开头的系统变量,查到event_scheduler系统调度器是默认关闭的, 节约系统资源
   SET GLOBAL event_scheduler = ON ; -- 开启事件调度器
   ```

   

### 约束

1. 同时约束两列, 不允许两列同时相同

   ```sql
   ALTER TABLE public.score ADD CONSTRAINT score_un UNIQUE (course_id, student_id);
   ```

   ![image-20230119140224063](https://raw.githubusercontent.com/Delta1035/tuchuang/main/img/202301191402405.png)



### 事务和并发

#### 并发问题

1. 丢失更新

   - 当事务a和事务b都要更新john的数据时, 两个事务都读取了john的记录,但是a更新了数据但是还没提交之前,事务b更新了数据,那么后执行的b的更新会覆盖a的更新,a的更新会丢失
   - 解决办法: 锁定机制,防止多个事务同时更新同一个数据,必须一个完成后再执行另一个

2. 脏读 

   - 事务a将顾客的积分从10增加到20分,但是在提交前就被事务b读取了,事务b按照这个尚未提交的数据执行了后面的

   
