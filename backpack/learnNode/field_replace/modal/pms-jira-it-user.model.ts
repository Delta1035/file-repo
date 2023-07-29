import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'pms', table: 'pms_jira_it_user'}}
})
export class PmsJiraItUser extends Entity {
  @property({
    type: 'string',
    required: true,
    length: 100,
    id: 1,
    postgresql: {columnName: 'jira_user_id', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  jiraUserId: string;

  @property({
    type: 'string',
    length: 100,
    postgresql: {columnName: 'display_name', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  displayName?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PmsJiraItUser>) {
    super(data);
  }
}

export interface PmsJiraItUserRelations {
  // describe navigational properties here
}

export type PmsJiraItUserWithRelations = PmsJiraItUser & PmsJiraItUserRelations;
