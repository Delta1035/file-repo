import { ListNode } from "./list-node";

export function createListNode (value: any[]): ListNode | null {
    const head = new ListNode();
    let cur = head;
    if (value.length > 0) {
        value.forEach(v => {
            cur.next = new ListNode(v);
            cur = cur.next;
        });
    }

    return head.next;
}