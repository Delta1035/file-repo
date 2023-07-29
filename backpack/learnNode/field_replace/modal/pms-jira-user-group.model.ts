import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'pms', table: 'pms_jira_user_group'},
  },
})
export class PmsJiraUserGroup extends Entity {
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
    length: 50,
    postgresql: {
      columnName: 'jira_group',
      dataType: 'character varying',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  jiraGroup: string;

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

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PmsJiraUserGroup>) {
    super(data);
  }
}

export interface PmsJiraUserGroupRelations {
  // describe navigational properties here
}

export type PmsJiraUserGroupWithRelations = PmsJiraUserGroup & PmsJiraUserGroupRelations;
