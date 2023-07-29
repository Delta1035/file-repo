import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'pms', table: 'pms_prj_list_log'}}
})
export class PmsPrjListLog extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'project_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  projectId: number;

  @property({
    type: 'string',
    required: true,
    length: 50,
    postgresql: {columnName: 'project_name', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  projectName: string;

  @property({
    type: 'string',
    required: true,
    length: 10,
    postgresql: {columnName: 'division', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  division: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    postgresql: {columnName: 'division_supervisor', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  divisionSupervisor: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'division_supervisor_email', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  divisionSupervisorEmail: string;

  @property({
    type: 'string',
    required: true,
    length: 10,
    postgresql: {columnName: 'mode', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  mode: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'product_type', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  productType: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {columnName: 'plan_start', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  planStart: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {columnName: 'plan_end', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  planEnd: string;

  @property({
    type: 'string',
    required: true,
    length: 10,
    postgresql: {columnName: 'jira_key', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  jiraKey: string;

  @property({
    type: 'string',
    required: true,
    length: 100,
    postgresql: {columnName: 'jira_name', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  jiraName: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    postgresql: {columnName: 'user_contact', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  userContact: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'user_contact_email', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  userContactEmail: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    postgresql: {columnName: 'it_contact', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  itContact: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'it_contact_email', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  itContactEmail: string;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'status', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  status: number;

  @property({
    type: 'boolean',
    required: true,
    postgresql: {columnName: 'involve_pms', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  involvePms: boolean;

  @property({
    type: 'date',
    postgresql: {columnName: 'involve_pms_start', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  involvePmsStart?: string;

  @property({
    type: 'date',
    postgresql: {columnName: 'involve_pms_end', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  involvePmsEnd?: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {columnName: 'create_date', dataType: 'timestamp with time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  createDate: string;

  @property({
    type: 'date',
    postgresql: {columnName: 'close_date', dataType: 'timestamp with time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  closeDate?: string;

  @property({
    type: 'date',
    postgresql: {columnName: 'approve_date', dataType: 'timestamp with time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  approveDate?: string;

  @property({
    type: 'string',
    required: true,
    length: 10,
    postgresql: {columnName: 'action', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  action: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {columnName: 'trn_date', dataType: 'timestamp with time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  trnDate: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    postgresql: {columnName: 'trn_user', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  trnUser: string;

  @property({
    type: 'boolean',
    required: true,
    postgresql: {columnName: 'close', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  close: boolean;

  @property({
    type: 'string',
    required: true,
    length: 12,
    postgresql: {columnName: 'project_code', dataType: 'character varying', dataLength: 12, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  projectCode: string;

  @property({
    type: 'string',
    required: true,
    length: 50,
    postgresql: {columnName: 'create_user', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  createUser: string;

  @property({
    type: 'boolean',
    required: true,
    postgresql: {columnName: 'confluence', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  confluence: boolean;

  @property({
    type: 'string',
    length: 10,
    postgresql: {columnName: 'confluence_key', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  confluenceKey?: string;

  @property({
    type: 'string',
    length: 100,
    postgresql: {columnName: 'confluence_name', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  confluenceName?: string;

  @property({
    type: 'date',
    postgresql: {columnName: 'mvp_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  mvpDate?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PmsPrjListLog>) {
    super(data);
  }
}

export interface PmsPrjListLogRelations {
  // describe navigational properties here
}

export type PmsPrjListLogWithRelations = PmsPrjListLog & PmsPrjListLogRelations;
