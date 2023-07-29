import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'pms', table: 'v_pms_user_project_division'}
  }
})
export class VPmsUserProjectDivision extends Entity {
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
    length: 50,
    postgresql: {columnName: 'user_name', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  userName?: string;

  @property({
    type: 'string',
    length: 20,
    postgresql: {columnName: 'employee_id', dataType: 'character varying', dataLength: 20, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  employeeId?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'email', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  email?: string;

  @property({
    type: 'date',
    postgresql: {columnName: 'create_date', dataType: 'timestamp with time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  createDate?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'project_name', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  projectName?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'division', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  division?: string;

  @property({
    type: 'date',
    postgresql: {columnName: 'join_date', dataType: 'timestamp with time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  joinDate?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<VPmsUserProjectDivision>) {
    super(data);
  }
}

export interface VPmsUserProjectDivisionRelations {
  // describe navigational properties here
}

export type VPmsUserProjectDivisionWithRelations = VPmsUserProjectDivision & VPmsUserProjectDivisionRelations;
