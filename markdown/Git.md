## Git

- 你随时都可以用“objective”命令来打开这个对话框！*

#### 基础

- git commit 提交 

  `形成一次提交记录（快照）`

- git branch 分支   git branch + '分支名'

  `分支只是简单的指向某个提交记录，不会造成存储和内存行的开销`

   按照逻辑分解工作到不同的分支要比维护臃肿的分支简单的多， 开出一个新的分支相当于基于当前提交以及他的所有父提交进行新的工作.

  1. git branch newImage （当前还在main分支）

  2. git checkout newImage （切换到newImage分支）

     此时可以在新开的分支上进行开发

  3. git commit （此时会新增一个快照，也就是说把修改）

  

- git merge 合并

  1. git merge bugFix  （将bugFix分支合并到当前分支*）

- git rebase 

  > Rebase 实际上就是取出一系列的提交记录，“复制”它们，然后在另外一个地方逐个的放下去。
  >
  > Rebase 的优势就是可以创造更线性的提交历史 

  1. git rebase + '分支名'   让目标分支和当前分支看起来在同一条时间线上， 但是实际上是并行开发的

     将当前分支的工作直接平移到目标分支上

  2. git rebase + 'main'   上面一步目标分支是继承了main 分支， 这一步同步两个分支的代码

#### 高级

- head 分离
- ^ 相对引用
- ~ 相对引用2
- 撤销变更

#### 移动提交记录（自由修改提交树）

- git cherry-pick
- 交互式rebase

#### 杂项（git技术、技巧集合）

- 只取一个提交记录
- 提交技巧1
- 提交技巧2
- git tag

- git describe

#### 高级话题

- 多次rebase
- 两个父节点
- 纠缠不清的分支
