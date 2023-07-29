import { AddList } from '@commonDefine/index';
import moment from 'moment';

export const tableColumns: Array<string> = [
  'tableHead.country',
  'tableHead.year',
  'tableHead.month',
  'tableHead.day',
];
export const externaColumns: Array<string> = [
  'tableHead.empName',
  'tableHead.div',
];

export const countrys = [
  {
    id: 1,
    name: 'TW',
  }
];
const date = new Date();
const year = date.getFullYear();
export const addInfoTable: AddList[] = [
  {
    // id: 1,
    country: 'TW',
    year,
    month: 'JAN',
    date: new Date(year, 0),
    day: 22,
  },
  {
    // id: 2,
    country: 'TW',
    year,
    month: 'FEB',
    date: new Date(year, 1),
    day: 22,
  },
  {
    // id: 3,
    country: 'TW',
    year,
    month: 'MAR',
    date: new Date(year, 2),
    day: 22,
  },
  {
    // id: 4,
    country: 'TW',
    year,
    month: 'APR',
    date: new Date(year, 3),
    day: 22,
  },
  {
    // id: 5,
    country: 'TW',
    year,
    month: 'MAY',
    date: new Date(year, 4),
    day: 22,
  },
  {
    // id: 6,
    country: 'TW',
    year,
    month: 'JUN',
    date: new Date(year, 5),
    day: 22,
  },
  {
    // id: 7,
    country: 'TW',
    year,
    month: 'JUL',
    date: new Date(year, 6),
    day: 22,
  },
  {
    // id: 8,
    country: 'TW',
    year,
    month: 'AUG',
    date: new Date(year, 7),
    day: 22,
  },
  {
    // id: 9,
    country: 'TW',
    year,
    month: 'SEP',
    date: new Date(year, 8),
    day: 22,
  },
  {
    // id: 10,
    country: 'TW',
    year,
    month: 'OCT',
    date: new Date(year, 9),
    day: 22,
  },
  {
    // id: 11,
    country: 'TW',
    year,
    month: 'NOV',
    date: new Date(year, 10),
    day: 22,
  },
  {
    // id: 12,
    country: 'TW',
    year,
    month: 'DEC',
    date: new Date(year, 11),
    day: 22,
  },
];

export const addExtrtnaTable = [
  {
    id: 1,
    empName: '',
    div: '',
    year: moment().year(),
  },
];
