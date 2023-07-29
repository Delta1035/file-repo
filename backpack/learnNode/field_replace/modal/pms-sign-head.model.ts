import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'pms', table: 'pms_sign_head'}}
})
export class PmsSignHead extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    length: 20,
    postgresql: {columnName: 'sign_id', dataType: 'character varying', dataLength: 20, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  signId: string;

  @property({
    type: 'string',
    length: 10,
    postgresql: {columnName: 'result', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  result?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'requester_remark', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  requesterRemark?: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {columnName: 'create_date', dataType: 'timestamp with time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  createDate: string;

  @property({
    type: 'date',
    postgresql: {columnName: 'signed_date', dataType: 'timestamp with time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  signedDate?: string;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'project_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  projectId?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'mcp_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  mcpId?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PmsSignHead>) {
    super(data);
  }
}

export interface PmsSignHeadRelations {
  // describe navigational properties here
}

export type PmsSignHeadWithRelations = PmsSignHead & PmsSignHeadRelations;
