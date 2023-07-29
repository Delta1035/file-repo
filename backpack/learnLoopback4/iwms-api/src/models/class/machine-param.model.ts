import {Entity, model, property} from '@loopback/repository';


@model()
export class MachineParam extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  machine_id: string;

  @property({
    type: 'string',
    required: true,
  })
  machine_type: string;

  constructor(data?: Partial<MachineParam>) {
    super(data);
  }
}

export interface MachineParamRelations {

}

export type MachineParamWithRelations = MachineParam & MachineParamRelations;
