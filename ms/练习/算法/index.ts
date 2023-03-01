/*
 * @Author: delta 528491526@qq.com
 * @Date: 2023-02-27 13:21:37
 * @LastEditors: delta 528491526@qq.com
 * @LastEditTime: 2023-02-27 13:25:55
 * @FilePath: \算法\index.ts
 * @Description:
 *
 */
export interface TreeNodeInterface {
  key: string;
  name: string;
  age?: number;
  level?: number;
  expand?: boolean;
  address?: string;
  children?: TreeNodeInterface[];
  parent?: TreeNodeInterface;
}
const listOfMapData: TreeNodeInterface[] = [
  {
    key: `1`,
    name: "John Brown sr.",
    age: 60,
    address: "New York No. 1 Lake Park",
    children: [
      {
        key: `1-1`,
        name: "John Brown",
        age: 42,
        address: "New York No. 2 Lake Park",
      },
      {
        key: `1-2`,
        name: "John Brown jr.",
        age: 30,
        address: "New York No. 3 Lake Park",
        children: [
          {
            key: `1-2-1`,
            name: "Jimmy Brown",
            age: 16,
            address: "New York No. 3 Lake Park",
          },
        ],
      },
      {
        key: `1-3`,
        name: "Jim Green sr.",
        age: 72,
        address: "London No. 1 Lake Park",
        children: [
          {
            key: `1-3-1`,
            name: "Jim Green",
            age: 42,
            address: "London No. 2 Lake Park",
            children: [
              {
                key: `1-3-1-1`,
                name: "Jim Green jr.",
                age: 25,
                address: "London No. 3 Lake Park",
              },
              {
                key: `1-3-1-2`,
                name: "Jimmy Green sr.",
                age: 18,
                address: "London No. 4 Lake Park",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: `2`,
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
];

function visitNode(
  node: TreeNodeInterface,
  hashMap: { [key: string]: boolean },
  array: TreeNodeInterface[]
): void {
  if (!hashMap[node.key]) {
    hashMap[node.key] = true;
    array.push(node);
  }
}
function convertTreeToList(root: TreeNodeInterface): TreeNodeInterface[] {
  const stack: TreeNodeInterface[] = [];
  const array: TreeNodeInterface[] = [];
  const hashMap = {};
  stack.push({ ...root, level: 0, expand: false });

  while (stack.length !== 0) {
    const node = stack.pop()!;
    visitNode(node, hashMap, array);
    if (node.children) {
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push({
          ...node.children[i],
          level: node.level! + 1,
          expand: false,
          parent: node,
        });
      }
    }
  }

  return array;
}

console.log(convertTreeToList(listOfMapData[0]));
