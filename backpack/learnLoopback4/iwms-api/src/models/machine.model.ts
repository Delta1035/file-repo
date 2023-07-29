import {belongsTo, Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {MachineHistoryStatus} from './machine-history-status.model';
import {MachineStatus} from './machine-status.model';
import {MachineType} from './machine-type.model';

@model({settings: {postgresql: {schema: 'iwmsqas', table: 'Machine'}}})
export class Machine extends Entity {
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
  machine_id: string;

  @belongsTo(() => MachineType, {name: 'machineType', keyFrom: "machineTypeId"}, {name: "machine_type_id"})
  machineTypeId: number;

  @hasOne(() => MachineStatus)
  machineStatus: MachineStatus;

  @hasMany(() => MachineHistoryStatus, {keyTo: "machine_id"})
  machineHistoryStatuses: MachineHistoryStatus[];

  constructor(data?: Partial<Machine>) {
    super(data);
  }
}

export interface MachineRelations {
  // describe navigational properties here
  machineType: MachineType
}

export type MachineWithRelations = Machine & MachineRelations;
