import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'pms', table: 'pms_sign_content'}}
})
export class PmsSignContent extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'sign_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  signId: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'project_content', dataType: 'jsonb', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  projectContent: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'update_user', dataType: 'jsonb', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  updateUser: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PmsSignContent>) {
    super(data);
  }
}

export interface PmsSignContentRelations {
  // describe navigational properties here
}

export type PmsSignContentWithRelations = PmsSignContent & PmsSignContentRelations;
