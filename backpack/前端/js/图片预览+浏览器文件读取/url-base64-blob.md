## url base64 blob 互相转换的方法

1. FileReader.result 返回结果是一个DATA URI(base64)
2. window.URL.CreateObjectURL() // `接收File 对象、Blob 对象或者 MediaSource 对象`。​
   - 可以将一个`File` 对象或者 `Blob` 对象转换为一个可用的连接, 突破了URL长度的限制