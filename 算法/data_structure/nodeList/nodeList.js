function ListNode(val) {
  this.val = val;
  this.next = null;
}

const node = new ListNode(1);
node.next = new ListNode(2);

// 在1,2节点之间插入第三个节点
const node3 = new ListNode(3);
node3.next = node.next;
node.next = node3;

// 删除第三个节点
node.next = node3.next; // 此时node3没有引用了, 会被垃圾回收
