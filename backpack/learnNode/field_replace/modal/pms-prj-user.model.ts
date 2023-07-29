import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'pms', table: 'pms_prj_user'}},
})
export class PmsPrjUser extends Entity {
  @property({
    type: 'number',
    required: true,
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
    type: 'number',
    scale: 0,
    postgresql: {
      columnName: 'project_id',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'YES',
    },
  })
  projectId?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {
      columnName: 'user_id',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'YES',
    },
  })
  userId?: number;

  @property({
    type: 'boolean',
    required: true,
    postgresql: {
      columnName: 'deleted',
      dataType: 'boolean',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  deleted: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PmsPrjUser>) {
    super(data);
  }
}

export class CustomPmsPrjUser extends PmsPrjUser {
  @property({
    type: 'string',
  })
  projectName?: string;
}

export interface PmsPrjUserRelations {
  // describe navigational properties here
}

export type PmsPrjUserWithRelations = PmsPrjUser & PmsPrjUserRelations;
