import {Entity, model, property} from '@loopback/repository';

@model({settings: {postgresql: {schema: 'iwmsqas', table: 'MachineStatus', strict: false}}})
export class MachineStatus extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  status: number;
  @property({
    type: 'string',
    required: false,
  })
  error_code?: string;
  @property({
    type: 'string',
    required: false,
  })
  error_desc?: string;
  @property({
    type: 'number',
    required: false,
  })
  exception_time?: number;

  @property({
    type: 'number',
    name: 'machine_id'
  })
  machineId?: number;

  @property({
    type: 'string',
    required: false
  })
  machine_id?: string;
  // @property({
  //   type: 'string',
  //   required: true,
  // })
  // machine_id: string;
  [prop: string]: any;
  constructor(data?: Partial<MachineStatus>) {
    super(data);
  }
}

export interface MachineStatusRelations {
  // describe navigational properties here
}

export type MachineStatusWithRelations = MachineStatus & MachineStatusRelations;
