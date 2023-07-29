import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'iwmsqas', table: 'InboundAndOutBoundHistory'}
  }
})
export class InboundAndOutBoundHistory extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    scale: 0,
    required: false,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO', generated: true},
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'Date', dataType: 'bigint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  Date: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'HOUR', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  HOUR: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'TOWEROUTBOUNDRECORDS', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  TOWEROUTBOUNDRECORDS: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'ASRSOUTBOUNDRECORDS', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  ASRSOUTBOUNDRECORDS: number;
  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'TOWERINVENTORY', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  TOWERINVENTORY: number;
  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'ASRSINVENTORY', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  ASRSINVENTORY: number;

  @property({
    type: 'number',
    required: false,
    scale: 0,
    default: new Date().getTime(),
    postgresql: {columnName: 'CREATETIME', dataType: 'bigint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  CREATETIME?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<InboundAndOutBoundHistory>) {
    super(data);
  }
}

export interface InboundAndOutBoundHistoryRelations {
  // describe navigational properties here
}

export type InboundAndOutBoundHistoryWithRelations = InboundAndOutBoundHistory & InboundAndOutBoundHistoryRelations;
