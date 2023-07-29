import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'pms', table: 'pms_prj_version_control'}
  }
})
export class PmsPrjVersionControl extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    length: 10,
    postgresql: {columnName: 'version_control', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  versionControl: string;

  @property({
    type: 'string',
    required: true,
    length: 10,
    postgresql: {columnName: 'type', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  type: string;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'repo_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  repoId: number;

  @property({
    type: 'string',
    length: 20,
    postgresql: {columnName: 'ut_job_name', dataType: 'character varying', dataLength: 20, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  utJobName?: string;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'project_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  projectId?: number;

  @property({
    type: 'string',
    postgresql: {columnName: 'repo_url', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  repoUrl?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PmsPrjVersionControl>) {
    super(data);
  }
}

export interface PmsPrjVersionControlRelations {
  // describe navigational properties here
}

export type PmsPrjVersionControlWithRelations = PmsPrjVersionControl & PmsPrjVersionControlRelations;
