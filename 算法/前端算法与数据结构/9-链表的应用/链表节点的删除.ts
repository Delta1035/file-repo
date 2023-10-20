// 真题描述：给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
// 示例 1:
// 输入: 1->1->2
// 输出: 1->2
// 示例 2:
// 输入: 1->1->2->3->3
// 输出: 1->2->3
// 思路: 已排序的链表可以直接比较前后两个元素是否相等即可

import { ListNode } from "./list-node";
import { runListNode } from "./合并两个链表";

export function deleteDuplicates (head: ListNode | null): ListNode | null {
    let cur = head;
    while (cur && cur.next) {
        if (cur.value === cur.next?.value) {
            const next = cur.next;
            cur.next = next?.next ?? null;
        } else {
            cur = cur.next;
        }
    }
    return head;
}

function main () {
    const head = new ListNode(1);
    head.next = new ListNode(1);
    head.next.next = new ListNode(2);
    const r = deleteDuplicates(head);
    runListNode(r);
}


main();