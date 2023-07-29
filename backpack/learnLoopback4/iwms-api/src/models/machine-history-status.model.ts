import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Machine} from './machine.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'iwmsqas', table: 'MachineHistoryStatus'},
    strict: false
  }
})
export class MachineHistoryStatus extends Entity {
  // @property({
  //   type: 'number',
  //   id: true,
  //   generated: true,
  //   required: false,
  // postgresql: {columnName: ['id'], dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  // })
  // id?: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'status', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  status: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: true,
    postgresql: {columnName: 'evt_dt', dataType: 'bigint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  evt_dt: number;


  @belongsTo(() => Machine, {name: "machine"}, {
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'machine_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  machine_id: number;

  // machineId: number;

  @property({
    type: 'string',
    postgresql: {columnName: 'mode', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  mode?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'taskType', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  taskType?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'taskInfo', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  taskInfo?: string;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'electric', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  electric?: number;

  @property({
    type: 'string',
    postgresql: {columnName: 'code', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  code?: string;
  @property({
    type: 'string',
    postgresql: {columnName: 'error_code', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  error_code?: string;
  @property({
    type: 'string',
    postgresql: {columnName: 'error_desc', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  error_desc?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'shelf_position', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  shelf_position?: string;

  @property({
    type: 'number',
    required: false,
    scale: 0,
    postgresql: {columnName: 'exception_time', dataType: 'bigint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  exception_time: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  // machine?: string;
  constructor(data?: Partial<MachineHistoryStatus>) {
    super(data);
  }
}

export interface MachineHistoryStatusRelations {
  // describe navigational properties here
}

export type MachineHistoryStatusWithRelations = MachineHistoryStatus & MachineHistoryStatusRelations;

export type MachineHistoryStatusEx = Omit<MachineHistoryStatus, "machine_id"> & {machine_id: string}
