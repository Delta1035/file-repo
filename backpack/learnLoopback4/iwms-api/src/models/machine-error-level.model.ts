import {belongsTo, Entity, model, property} from '@loopback/repository';
import {MachineType} from './machine-type.model';

@model({settings: {postgresql: {schema: 'iwmsqas', table: 'MachineErrorLevel'}}})
export class MachineErrorLevel extends Entity {
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
  error_code: string;

  @property({
    type: 'number',
    required: true,
  })
  error_duration: number;

  @property({
    type: 'number',
    name: "l4"
  })
  L4?: number;

  @property({
    type: 'number',
    name: "l3"
  })
  L3?: number;

  @property({
    type: 'number',
    name: "l2"
  })
  L2?: number;

  @property({
    type: 'number',
    name: "l1"
  })
  L1?: number;

  @belongsTo(() => MachineType, {name: 'machine_level_for_machine_type', keyFrom: 'machineTypeId'}, {name: 'machine_type_id'})
  machineTypeId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<MachineErrorLevel>) {
    super(data);
  }
}

export interface MachineErrorLevelRelations {
  // describe navigational properties here
}

export type MachineErrorLevelWithRelations = MachineErrorLevel & MachineErrorLevelRelations;
