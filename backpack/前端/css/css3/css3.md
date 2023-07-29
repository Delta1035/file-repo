## 选择器

1. 元素

2. id

3. class

4. 群组

5. 层次

6. css3新增三大选择器

   - 属性 [属性选择器 - CSS3 | 绿叶学习网 (lvyestudy.com)](http://www.lvyestudy.com/css3/attribute-selector)

   - 结构伪类

   - ui伪类

     - :focus

     - ::selection

     - :checked

     - :enabled :disabeld

     - :read-write :read-only

   - 其他伪类
   
     - :root
   
     - :empty
   
     - :target
   
       > id被当做锚点链接来使用的元素
   
       ```html
           <div>
               <a href="#music">推荐音乐</a><br />
               <a href="#movie">推荐电影</a><br />
               <a href="#article">推荐文章</a><br />
           </div>
           <div id="music">
               <h3>推荐音乐</h3>
               <ul>
                   <li>林俊杰-被风吹过的夏天</li>
                   <li>曲婉婷-在我的歌声里</li>
                   <li>许嵩-灰色头像</li>
               </ul>
           </div>
           <div id="movie">
               <h3>推荐音乐</h3>
               <ul>
                   <li>林俊杰-被风吹过的夏天</li>
                   <li>曲婉婷-在我的歌声里</li>
                   <li>许嵩-灰色头像</li>
               </ul>
           </div>
           <div id="article">
               <h3>推荐音乐</h3>
               <ul>
                   <li>林俊杰-被风吹过的夏天</li>
                   <li>曲婉婷-在我的歌声里</li>
                   <li>许嵩-灰色头像</li>
               </ul>
           </div>
       ```
   
       
   
     - :not()
   
   

## 文本样式

| 属性          | 说明                            | 语法                                                         |
| ------------- | ------------------------------- | ------------------------------------------------------------ |
| text-shadow   | 文本阴影（box-shadow 盒子阴影） | text-shadow:x-offset  y-offset  blur  color，x-offset  y-offset  blur  color;以逗号分割产生多个阴影 |
| text-stroke   | 文本描边                        | -webkit-text-stroke:width color; 给文字添加边框              |
| text-overflow | 文字溢出                        | text-overflow: clip/ellipsis; 裁剪或省略号                   |
| word-wrap     | 强制换行                        |                                                              |
| @font-face    | 嵌入字体                        |                                                              |

> `white-space` [【TA不知道的CSS】white-space - 掘金 (juejin.cn)](https://juejin.cn/post/7123521272964710436)

嵌入字体

```css
  @font-face {
        font-family: 'xiao nai nao';
        src: url('./小可奶酪体.ttf');
      }
      @font-face {
        font-family: 'xixianti';
        src: url('./庞门正道细线体.ttf');
      }
      :root{
        font-family: "xixianti","xiao nai nao",Arial, "Helvetica Neue", Helvetica, sans-serif;
      }
```

## 颜色样式

1. opacity 包括子元素的透明度

2. RGBA 只改变元素背景颜色透明度，也可以作为文字颜色的参数值

3. CSS3渐变 [CSS3渐变 - CSS3 | 绿叶学习网 (lvyestudy.com)](http://www.lvyestudy.com/css3/css3-gradient)

   - background:linear-gradient(方向, 开始颜色, 结束颜色)

   - background:radial-gradient(position, shape size, start-color, stop-color)

     > ​      background: -webkit-radial-gradient(center,circle,yellow,orangered); 注意加前缀

## 边框样式

| 属性          | 说明     |      |
| ------------- | -------- | ---- |
| border-radius | 圆角效果 |      |
| box-shadow    | 边框阴影 |      |
| border-color  | 边框颜色 |      |
| border-image  | 边框背景 |      |

## 背景样式

| 属性              | 说明                                                         | 属性值                                                       |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| background-size   | 背景大小，一种是长度值，如px、em、百分比等；另外一种是使用关键字， | - cover：将背景图片等比缩放来填满整个元素<br />- contain：将背景图片等比缩放至某一边紧贴元素边沿为止 |
| background-origin | 背景位置                                                     |                                                              |
| background-clip   | 背景裁切                                                     |                                                              |

## CSS3变形 (transform)

| 方法        | 说明 |                                  |
| ----------- | ---- | -------------------------------- |
| translate() | 平移 | transform:translate(-10px,-10px) |
| scale()     | 缩放 |                                  |
| skew()      | 倾斜 |                                  |
| rotate()    | 旋转 |                                  |

## CSS3过渡(transition)

| 属性                       | 说明                         |      |
| -------------------------- | ---------------------------- | ---- |
| transition-property        | 对元素某一个属性进行过渡操作 |      |
| transition-duration        | 过渡持续时间                 |      |
| transition-timing-function | 过渡的速率方式               |      |
| transition-delay           | 过渡延迟时间                 |      |

## CSS3动画

1. 定义动画
2. 调用动画

## 其他样式

1. outline
2. initial
3. calc()
4. overflow-x overflow-y
5. pointer-events