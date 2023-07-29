import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'pms', table: 'pms_prj_user_log'}},
})
export class PmsPrjUserLog extends Entity {
  @property({
    type: 'number',
    scale: 0,
    id: 1,
    postgresql: {
      columnName: 'id',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  id: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {
      columnName: 'project_user_id',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  projectUserId: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {
      columnName: 'user_id',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  userId: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {
      columnName: 'project_id',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  projectId: number;

  @property({
    type: 'string',
    required: true,
    length: 20,
    postgresql: {
      columnName: 'project_role',
      dataType: 'character varying',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  projectRole: string;

  @property({
    type: 'string',
    required: true,
    length: 15,
    postgresql: {
      columnName: 'jira_role',
      dataType: 'character varying',
      dataLength: 15,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  jiraRole: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {
      columnName: 'join_date',
      dataType: 'timestamp with time zone',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  joinDate: string;

  @property({
    type: 'string',
    required: true,
    length: 10,
    postgresql: {
      columnName: 'action',
      dataType: 'character varying',
      dataLength: 10,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  action: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {
      columnName: 'trn_date',
      dataType: 'timestamp with time zone',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  trnDate: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    postgresql: {
      columnName: 'trn_user',
      dataType: 'character varying',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  trnUser: string;

  @property({
    type: 'boolean',
    required: true,
    postgresql: {
      columnName: 'approved',
      dataType: 'boolean',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  approved: boolean;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'email',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  email: string;

  @property({
    type: 'string',
    length: 20,
    postgresql: {
      columnName: 'employee_id',
      dataType: 'character varying',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  employeeId?: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    postgresql: {
      columnName: 'user_name',
      dataType: 'character varying',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  userName: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PmsPrjUserLog>) {
    super(data);
  }
}

export interface PmsPrjUserLogRelations {
  // describe navigational properties here
}

export type PmsPrjUserLogWithRelations = PmsPrjUserLog & PmsPrjUserLogRelations;
