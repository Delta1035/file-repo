## 进程与线程
- 进程 process os对资源的调度分配最小单位
- 线程 thread os对计算资源的最小分配单位

单进程的内存分配有上限(2g左右)
开启多进程的方式:
web worker
fork  process.fork()
cluster  cluster.fork()