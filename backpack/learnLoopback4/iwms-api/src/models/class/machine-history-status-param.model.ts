import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: true,
    strict: false
  }
})
export class MachineHistoryStatusParam extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
  })
  status: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
  })
  evt_dt: number;


  @property({
    type: 'string',
    required: true,
  })
  machine_id: string | number;

  @property({
    type: 'string',
    required: false
  })
  mode?: string;

  @property({
    type: 'string',
    required: false
  })
  taskType?: string;

  @property({
    type: 'string',
    required: false
  })
  taskInfo?: string;

  @property({
    type: 'number',
    scale: 0,
    required: false
  })
  electric?: number;

  @property({
    type: 'string',
    required: false
  })
  code?: string;
  @property({
    type: 'string',
    required: false
  })
  error_code?: string;
  @property({
    type: 'string',
    required: false
  })
  error_desc?: string;

  @property({
    type: 'number',
    required: false,
  })
  exception_time: number | undefined;
  @property({
    type: 'string',
    required: false
  })
  shelf_position?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  // machine?: string;
  constructor(data?: Partial<MachineHistoryStatusParam>) {
    super(data);
  }
}

export interface MachineHistoryStatusRelations {
  // describe navigational properties here
}

export type MachineHistoryStatusWithRelations = MachineHistoryStatusParam & MachineHistoryStatusRelations;

// export type MachineHistoryStatusEx = Omit<MachineHistoryStatusParam, "machine_id"> & {machine_id: string}
