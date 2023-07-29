import {Entity, hasMany, model, property} from '@loopback/repository';
import {PmsJiraUserGroup} from './pms-jira-user-group.model';
import {CustomPmsPrjUser} from './pms-prj-user.model';

@model({
  settings: {idInjection: false, postgresql: {schema: 'pms', table: 'pms_jira_user'}},
})
export class PmsJiraUser extends Entity {
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
      columnName: 'user_name',
      dataType: 'character varying',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  userName: string;

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
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {
      columnName: 'status',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  status: number;

  @property({
    type: 'date',
    required: true,
    postgresql: {
      columnName: 'create_date',
      dataType: 'timestamp with time zone',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  createDate: string;

  @property({
    type: 'date',
    postgresql: {
      columnName: 'deleted_date',
      dataType: 'timestamp with time zone',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  deletedDate?: string;

  @property({
    type: 'string',
    length: 10,
    postgresql: {
      columnName: 'org_role',
      dataType: 'character varying',
      dataLength: 10,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  orgRole?: string;

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

  @property({
    type: 'date',
    postgresql: {
      columnName: 'add_to_org_date',
      dataType: 'timestamp with time zone',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  addToOrgDate?: string;

  @property({
    type: 'date',
    postgresql: {
      columnName: 'last_seen_in_jira',
      dataType: 'timestamp with time zone',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  lastSeenInJira?: string;

  @property({
    type: 'string',
    length: 10,
    postgresql: {
      columnName: 'division',
      dataType: 'character varying',
      dataLength: 10,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  division?: string;

  @hasMany(() => PmsJiraUserGroup, {keyTo: 'userId', keyFrom: 'id'})
  jiraUserGroup?: PmsJiraUserGroup[];

  @hasMany(() => CustomPmsPrjUser, {keyTo: 'userId', keyFrom: 'id'})
  projectList?: CustomPmsPrjUser[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PmsJiraUser>) {
    super(data);
  }
}

export interface PmsJiraUserRelations {
  // describe navigational properties here
  jiraUserGroup?: PmsJiraUserGroup[];
  projectList?: CustomPmsPrjUser[];
}

export type PmsJiraUserWithRelations = PmsJiraUser & PmsJiraUserRelations;
