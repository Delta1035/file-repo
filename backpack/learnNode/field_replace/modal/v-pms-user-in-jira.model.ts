import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'pms', table: 'v_pms_user_in_jira'}}
})
export class VPmsUserInJira extends Entity {
  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'id', dataType: 'bigint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  id?: number;

  @property({
    type: 'string',
    length: 20,
    postgresql: {columnName: 'jira_key', dataType: 'character varying', dataLength: 20, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  jiraKey?: string;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'jira_project_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  jiraProjectId?: number;

  @property({
    type: 'string',
    length: 100,
    postgresql: {columnName: 'jira_user_id', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  jiraUserId?: string;

  @property({
    type: 'string',
    length: 100,
    postgresql: {columnName: 'display_name', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  displayName?: string;

  @property({
    type: 'string',
    length: 100,
    postgresql: {columnName: 'pms_jira_user_id', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  pmsJiraUserId?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'project_role', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  projectRole?: string;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'pms_project_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  pmsProjectId?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'pms_user_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  pmsUserId?: number;

  @property({
    type: 'string',
    postgresql: {columnName: 'division', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  division?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'project_name', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  projectName?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'jira_name', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  jiraName?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<VPmsUserInJira>) {
    super(data);
  }
}

export interface VPmsUserInJiraRelations {
  // describe navigational properties here
}

export type VPmsUserInJiraWithRelations = VPmsUserInJira & VPmsUserInJiraRelations;
