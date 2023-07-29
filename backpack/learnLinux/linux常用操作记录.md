## 常用操作

- `wget` url 下载指定资源
- `whereis` filename 查找指定文件

- `cat` 查看文件内容

- `vi` filename 使用vi编辑器编辑文件

- `pwd` 查看当前位置

  

### Shell

#### 变量

1. 定义变量不需要$ ,  等号两边不能有空格

   ```shell
   your_name="delta"
   ```

2. 使用$+变量

   ```shell
   echo ${your_name}   
   echo $your_name
   ```

3. 只读变量 readonly

   ```shell
   your_name="delta"
   readonly your_name
   your_name="法外狂徒"
   # 结果:>> /bin/sh: NAME: This variable is read only.
   ```

4. 删除变量 unset

   ```shell
   unset your_name
   ```

5. 变量类型三种: 

   |               |                                                              |
   | ------------- | ------------------------------------------------------------ |
   | **局部变量**  | 局部变量在脚本或命令中定义，仅在当前shell实例中有效，其他shell启动的程序不能访问局部变量。 |
   | **环境变量**  | 所有的程序，包括shell启动的程序，都能访问环境变量，有些程序需要环境变量来保证其正常运行。必要的时候shell脚本也可以定义环境变量。 |
   | **shell变量** | shell变量是由shell程序设置的特殊变量。shell变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了shell的正常运行 |

6. shell字符串

   - 单引号字符串的限制：
     - ​		单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的；
     - ​		单引号字串中不能出现单独一个的单引号（对单引号使用转义符后也不行），但可成对出现，作为字符串拼接使用。
   - 双引号的优点：
     - ​		双引号里可以有变量
     - ​		双引号里可以出现转义字符

7. shell命令, 类似默认函数

   常用命令:

   - sleep 1000 窗口1000ms后关闭


