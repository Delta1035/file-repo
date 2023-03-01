export const listOfData: Person[] = [
  {
    key: '1',
    name: 'John Brown',
    name1: 'John Brown',
    name12: 'John Brown',
    name123: 'John Brown',
    name1234: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    name1: 'John Brown',
    name123: 'John Brown',
    name12: 'John Brown',
    name1234: 'John Brown',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    name1: 'John Brown',
    name12: 'John Brown',
    name123: 'John Brown',
    name1234: 'John Brown',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];
export const listOfThead: Thead[] = [
  {
    text: 'key',
    width: 125,
  },
  {
    text: 'name',
    width: 125,
  },
  {
    text: 'name1',
    width: 125,
  },
  {
    text: 'name12',
    width: 125,
  },
  {
    text: 'name123',
    width: 125,
  },
  {
    text: 'name1234',
    width: 125,
  },
  {
    text: 'age',
    width: 125,
  },
  {
    text: 'address',
    width: 125,
  },
];

export interface Person {
  key: string;
  name: string;
  name1: string;
  name12: string;
  name123: string;
  name1234: string;
  age: number;
  address: string;
}

export interface Thead {
  width: number;
  text: string;
}

export interface listOfData extends Thead, Person {}
