export const permissions: permission[] = [
  {
    name: 'PMS',
    weight: 5,
    rights: [
      { itemName: 'baseData', itemRight: [] },
      { itemName: 'projectList', itemRight: [] },
      { itemName: 'prf', itemRight: [] },
      { itemName: 'ib', itemRight: [] },
      { itemName: 'paj', itemRight: [] },
      { itemName: 'pajmonthly', itemRight: []},
      { itemName: 'pms', itemRight: ['new', 'delete', 'edit', 'query', 'download', 'upload'] },
      { itemName: 'check', itemRight: ['new', 'delete', 'edit', 'query', 'download', 'upload'] },
    ]
  },
  {
    name: 'IT_ADMIN',
    weight: 4,
    rights: [
      { itemName: 'baseData', itemRight: ['agent', 'new', 'delete', 'edit', 'query', 'download', 'upload'] },
      { itemName: 'projectList', itemRight: ['new', 'delete', 'edit', 'query', 'download', 'upload',"post"] },
      { itemName: 'prf', itemRight: ['new', 'delete', 'edit', 'query', 'download','upload',"post"] },
      { itemName: 'ib', itemRight: ['new', 'delete', 'edit', 'query', 'download'] },
      { itemName: 'paj', itemRight: ['new', 'delete', 'edit', 'query', 'download', 'report'] },
      { itemName: 'pajmonthly', itemRight: ['new', 'delete', 'edit', 'query', 'download']},
      { itemName: 'pms', itemRight: ['new', 'delete', 'edit', 'query', 'download', 'upload'] },
      { itemName: 'check', itemRight: ['new', 'delete', 'edit', 'query', 'download', 'upload'] },
    ]
  },
  {
    name: 'IT_PM',
    weight: 3,
    rights: [
      { itemName: 'baseData', itemRight: ['agent', 'query', 'download'] },
      { itemName: 'projectList', itemRight: ['new', 'delete', 'edit', 'query', 'download', 'upload',"post"] },
      { itemName: 'prf', itemRight: ['new', 'delete', 'edit', 'query', 'download','upload',"post"] },
      { itemName: 'ib', itemRight: ['new', 'delete','edit', 'query', 'download'] },
      { itemName: 'paj', itemRight: ['new', 'delete','edit', 'query', 'download'] },
      { itemName: 'pajmonthly', itemRight: [] },
      { itemName: 'pms', itemRight: ['new', 'delete', 'edit', 'query', 'download', 'upload'] },
      { itemName: 'check', itemRight: ['new', 'delete', 'edit', 'query', 'download', 'upload'] },
    ]
  },
  {
    name: 'IT_LEADER',
    weight: 2,
    rights: [
      { itemName: 'baseData', itemRight: ['query', 'download'] },
      { itemName: 'projectList', itemRight: ['new', 'delete', 'edit', 'query', 'download', 'upload',"post"] },
      { itemName: 'prf', itemRight: ['edit', 'query', 'download','upload',"post"] },
      { itemName: 'ib', itemRight: ['edit', 'query', 'download'] },
      { itemName: 'paj', itemRight: ['edit', 'query', 'download'] },
      { itemName: 'pajmonthly', itemRight: [] },
      { itemName: 'pms', itemRight: ['edit', 'query', 'download', 'upload'] },
      { itemName: 'check', itemRight: ['edit', 'query', 'download', 'upload'] },
    ],
  },
  {
    name: 'GUEST',
    weight: 1,
    rights: [
      { itemName: 'baseData', itemRight: ['query'] },
      { itemName: 'projectList', itemRight: ['query'] },
      { itemName: 'prf', itemRight: ['query'] },
      { itemName: 'ib', itemRight: ['query'] },
      { itemName: 'paj', itemRight: ['query'] },
      { itemName: 'pajmonthly', itemRight: [] },
      { itemName: 'pms', itemRight: [] },
      { itemName: 'check', itemRight: [] },
    ],
  },
  {
    name: 'VISITOR',
    weight: 0,
    rights: [
      { itemName: 'baseData', itemRight: [] },
      { itemName: 'projectList', itemRight: [] },
      { itemName: 'prf', itemRight: [] },
      { itemName: 'ib', itemRight: [] },
      { itemName: 'paj', itemRight: [] },
      { itemName: 'pajmonthly', itemRight: [] },
      { itemName: 'pms', itemRight: [] },
      { itemName: 'check', itemRight: [] },
    ],
  }
];

export interface permission {
  name: string;
  weight: number;
  rights: right[];
}

export interface right {
  itemName: string;
  itemRight: string[];
}
