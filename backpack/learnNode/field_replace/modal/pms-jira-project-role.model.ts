import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'pms', table: 'pms_jira_project_role'},
  },
})
export class PmsJiraProjectRole extends Entity {
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
    type: 'string',
    required: true,
    length: 20,
    postgresql: {
      columnName: 'jira_key',
      dataType: 'character varying',
      dataLength: 20,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  jiraKey: string;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {
      columnName: 'jira_project_id',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'YES',
    },
  })
  jiraProjectId?: number;

  @property({
    type: 'string',
    required: true,
    length: 50,
    postgresql: {
      columnName: 'project_role',
      dataType: 'character varying',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  projectRole: string;

  @property({
    type: 'string',
    length: 100,
    postgresql: {
      columnName: 'jira_user_id',
      dataType: 'character varying',
      dataLength: 100,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  jiraUserId?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PmsJiraProjectRole>) {
    super(data);
  }
}

export interface PmsJiraProjectRoleRelations {
  // describe navigational properties here
}

export type PmsJiraProjectRoleWithRelations = PmsJiraProjectRole & PmsJiraProjectRoleRelations;
