import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'iwmsqas', table: 'InventoryHistory'}}
})
export class InventoryHistory extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    scale: 0,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id?: number;

  @property({
    type: 'number',
    postgresql: {columnName: 'Date', dataType: 'bigint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  Date: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'ASRSBINQTY', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  ASRSBINQTY?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'ASRSBINUSEQTY', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  ASRSBINUSEQTY?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'ASRSINVENTORY', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  ASRSINVENTORY?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'MATERIALQTY', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  MATERIALQTY?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'TOWERINVENTORY', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  TOWERINVENTORY?: number;

  @property({
    type: 'number',
    scale: 0,
    default: new Date().getTime(),
    postgresql: {columnName: 'CREATETIME', dataType: 'bigint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'}
  })
  CREATETIME?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<InventoryHistory>) {
    super(data);
  }
}

export interface InventoryHistoryRelations {
  // describe navigational properties here
}

export type InventoryHistoryWithRelations = InventoryHistory & InventoryHistoryRelations;
