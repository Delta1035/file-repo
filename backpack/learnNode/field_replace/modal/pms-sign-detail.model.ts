import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'pms', table: 'pms_sign_detail'}}
})
export class PmsSignDetail extends Entity {
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
    postgresql: {columnName: 'seq', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  seq: number;

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
    postgresql: {columnName: 'sign_user', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  signUser: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'sign_user_email', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  signUserEmail: string;

  @property({
    type: 'string',
    length: 10,
    postgresql: {columnName: 'result', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  result?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'remark', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  remark?: string;

  @property({
    type: 'date',
    postgresql: {columnName: 'signed_date', dataType: 'timestamp with time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  signedDate?: string;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'sign_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  signId?: number;

  @property({
    type: 'string',
    length: 20,
    postgresql: {columnName: 'sign_user_employee_id', dataType: 'character varying', dataLength: 20, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  signUserEmployeeId?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PmsSignDetail>) {
    super(data);
  }
}

export interface PmsSignDetailRelations {
  // describe navigational properties here
}

export type PmsSignDetailWithRelations = PmsSignDetail & PmsSignDetailRelations;
