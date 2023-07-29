## JS记录

----

#### async/await

1. async function() 执行之后返回的是fuli状态的promise 

   ``` 
   async function method(){
   	
   }
   method();//返回值
   ```

   ![](E:/desktop/triennium/%E5%89%8D%E7%AB%AF%E5%A4%8D%E4%B9%A0/js/JS%E8%AE%B0%E5%BD%95.assets/imgimage-20211130234750636.png)

2.总结一下`async/await`的知识点

- await只能在async函数中使用，不然会报错
- async函数返回的是一个Promise对象，有无值看有无return值
- await后面最好是接Promise，虽然接其他值也能达到排队效果
- async/await作用是**用同步方式，执行异步操作**

