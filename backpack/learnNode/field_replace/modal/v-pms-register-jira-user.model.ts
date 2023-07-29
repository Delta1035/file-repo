import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'pms', table: 'v_pms_register_jira_user'}
  }
})
export class VPmsRegisterJiraUser extends Entity {
  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  id?: number;

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
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'status', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  status?: number;

  @property({
    type: 'date',
    postgresql: {columnName: 'create_date', dataType: 'timestamp with time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  createDate?: string;

  @property({
    type: 'date',
    postgresql: {columnName: 'deleted_date', dataType: 'timestamp with time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  deletedDate?: string;

  @property({
    type: 'string',
    length: 10,
    postgresql: {columnName: 'org_role', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  orgRole?: string;

  @property({
    type: 'string',
    length: 100,
    postgresql: {columnName: 'jira_user_id', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  jiraUserId?: string;

  @property({
    type: 'date',
    postgresql: {columnName: 'add_to_org_date', dataType: 'timestamp with time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  addToOrgDate?: string;

  @property({
    type: 'date',
    postgresql: {columnName: 'last_seen_in_jira', dataType: 'timestamp with time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  lastSeenInJira?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<VPmsRegisterJiraUser>) {
    super(data);
  }
}

export interface VPmsRegisterJiraUserRelations {
  // describe navigational properties here
}

export type VPmsRegisterJiraUserWithRelations = VPmsRegisterJiraUser & VPmsRegisterJiraUserRelations;
