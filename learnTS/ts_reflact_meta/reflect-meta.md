

### 1 Reflect對象
1. Reflect.set()
2. Reflect.has()
3. Reflect.get()
4. Reflect.construct()
5. Reflect.apply()



### 1 Reflect-metadata增加的语法
1. Reflect.defineMetaData(metaDataKey,metaDataValue,target); // 定義元數據
2. Reflect.defineMetaData(metaDataKey,metaDataValue,target,propertyKey); // 定義元數據
3. Reflect.getMetaData(metaDataKey,target) // 獲取元數據
4. Reflect.getMetaData(metaDataKey,target,propertyKey) // 獲取元數據
> 用於設置和獲取某個類的元數據, 如果後面還傳入了propertyKey 屬性名, 那麽可以單獨為某個屬性設置元數據
> 元數據metadata的存儲位置 如果給類或者靜態屬性添加元數據,那就保存在類上; 如果給實例屬性添加 那就保存在對> 象上類似[metadata] 的屬性上
> 类的属性只能通过ts的特性拿到属性 
  > 1. Object 一般属性  __metadata("design:type", Object)
  > 2. Function 对象方法      __metadata("design:type", Function), // 属性类型
  >                          __metadata("design:paramtypes", [Object, Object]), // 参数类型
  >                          __metadata("design:returntype", void 0) // 返回值类型