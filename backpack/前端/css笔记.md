## 一丶 CSS基础

1. css选择器及其优先级

   内联 > id > 类, 伪类,属性选择器 > 标签,伪元素

   1000 100 10 1

   亲戚关系都是0 

   相邻兄弟选择器 + 

   子代选择器 >

   后代选择器 空格

   !important 优先级最高

   相同优先级 后出现的样式生效

   根据样式表来源 :

   内联样式 > style标签里面的样式 > link引入的样式 > 用户自定义??? > 浏览器默认样式

   

   

2. 可继承属性

   - font-family / font-size / font-wight / color
   - visibility: hidden / visible

3. display 属性值及其作用

   - block 
   - inline
   - inline-block

   

   

4. 隐藏元素的方法
   - display:none
   - visibility: hidden
   - opacity: 0;
   - transform:scale(0,0)
   - z-index: 负值
   - clip(已废弃)/clip-path
   - position:absolute
   
5. link 和 @import 的区别
   - link 兼容性好, 可以加载除css文件之外的东西
   - @import是css 规范, 兼容性差
   - link 和页面同时加载, @import 需要等到页面加载完了才加载
   - link 是dom元素可以由javascript控制
   
6. 关于多倍屏幕的问题

   - iphone6的尺寸为750 × 1334  在浏览器模拟界面上给的是375 × 667 , 也就是说所谓的二倍屏

     给定100px 逻辑css像素 实际上会有200的真实物理像素去渲染

- 引入moment前

  > ![](https://raw.githubusercontent.com/Delta1035/tuchuang/main/img/202207302359437.png)
  >
  > 

- 引入moment后

  > ![image-20220531170454610](https://raw.githubusercontent.com/Delta1035/tuchuang/main/img/202207302357870.png)

- moment 大小

  > ![image-20220531170548193](https://raw.githubusercontent.com/Delta1035/tuchuang/main/img/202207302357624.png)