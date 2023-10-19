import { ListNode } from "./list-node";

export function runListNode (list: ListNode | null) {
    console.log('runListNode',JSON.stringify(list));

    while (list) {
        console.log(list.value);
        list = list.next;
    }

}

export function mergeTwoList (l1: ListNode | null,l2: ListNode | null) {
    let head = new ListNode(); // 作为一个头结点,确保链表可以被访问到
    let cur = head;
    while (l1 && l2) {
        if (l1.value < l2.value) {
            cur.next = l1;
            l1 = l1.next;

        } else {
            cur.next = l2;
            l2 = l2.next;
        }
        cur = cur.next;
    }

    cur.next = l1 ? l1 : l2;
    return head.next;
}

// function main () {
//     const l1 = new ListNode(1);
//     l1.next = new ListNode(2);
//     l1.next.next = new ListNode(4);
//     const l2 = new ListNode(1);
//     l2.next = new ListNode(3);
//     l2.next.next = new ListNode(4);
//     // runListNode(l1);
//     // console.log('++++++++++++++++');
//     // runListNode(l2);
//     // console.log('++++++++++++++++');
//     const head = mergeTwoList(l1,l2);
//     runListNode(head);
// }

// main();