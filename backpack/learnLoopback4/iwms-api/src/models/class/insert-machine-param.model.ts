import {Entity, model, property} from '@loopback/repository';


@model()
export class InsertMachineParam extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  machine_id: string;

  constructor(data?: Partial<InsertMachineParam>) {
    super(data);
  }
}

export interface InsertMachineParamRelations {

}

export type InsertMachineParamWithRelations = InsertMachineParam & InsertMachineParamRelations;
