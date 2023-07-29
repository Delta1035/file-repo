import {Entity, hasMany, model, property} from '@loopback/repository';
import {MachineErrorLevel} from './machine-error-level.model';
import {Machine} from './machine.model';

@model({settings: {postgresql: {schema: 'iwmsqas', table: 'MachineType'}}})
export class MachineType extends Entity {
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

  @hasMany(() => MachineErrorLevel, {keyTo: 'machineTypeId'})
  machineErrorLevels: MachineErrorLevel[];

  @hasMany(() => Machine, {keyTo: 'machineTypeId'})
  machines: Machine[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<MachineType>) {
    super(data);
  }
}

export interface MachineTypeRelations {
  // describe navigational properties here
}

export type MachineTypeWithRelations = MachineType & MachineTypeRelations;
