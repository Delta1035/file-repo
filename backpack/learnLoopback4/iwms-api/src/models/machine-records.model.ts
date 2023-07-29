import {Entity, model, property} from '@loopback/repository';
@model({settings: {postgresql: {schema: 'iwmsqas', table: 'MachineRecords'}}})
export class MachineRecords extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @property({
    type: 'string',
    required: true,
  })
  machine_type: string;

  @property({
    type: 'string',
    required: true,
  })
  machine_id: string;

  @property({
    type: 'number',
    required: true,
  })
  status: number;

  @property({
    type: 'string',
    required: false,
  })
  mode: string;

  @property({
    type: 'string',
    required: false,
  })
  task_type: string;

  @property({
    type: 'string',
    required: false,
  })
  task_info: string;

  @property({
    type: 'number',
    required: false,
  })
  electric: number;

  @property({
    type: 'string',
    required: false,
  })
  code: string;

  @property({
    type: 'string',
    required: false,
  })
  error_code: string;

  @property({
    type: 'string',
    required: false,
  })
  error_desc: string;

  @property({
    type: 'number',
    required: true,
  })
  evt_dt: number;

  @property({
    type: 'number',
    required: false,
  })
  exception_time?: number;

  /**
   * 0  正常
   * 1  off
   * 2  error
   */
  @property({
    type: 'number',
    required: false,
  })
  exception_status?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<MachineRecords>) {
    super(data);
  }
}

export interface MachineRecordsRelations {
  // describe navigational properties here
}

export type MachineRecordsWithRelations = MachineRecords & MachineRecordsRelations;
