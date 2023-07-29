import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  MachineType,
  MachineErrorLevel,
} from '../models';
import {MachineTypeRepository} from '../repositories';

export class MachineTypeMachineErrorLevelController {
  constructor(
    @repository(MachineTypeRepository) protected machineTypeRepository: MachineTypeRepository,
  ) { }

  @get('/machine-types/{id}/machine-error-levels', {
    responses: {
      '200': {
        description: 'Array of MachineType has many MachineErrorLevel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MachineErrorLevel)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<MachineErrorLevel>,
  ): Promise<MachineErrorLevel[]> {
    return this.machineTypeRepository.machineErrorLevels(id).find(filter);
  }

  @post('/machine-types/{id}/machine-error-levels', {
    responses: {
      '200': {
        description: 'MachineType model instance',
        content: {'application/json': {schema: getModelSchemaRef(MachineErrorLevel)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof MachineType.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MachineErrorLevel, {
            title: 'NewMachineErrorLevelInMachineType',
            exclude: ['id'],
            optional: ['machine_type_id']
          }),
        },
      },
    }) machineErrorLevel: Omit<MachineErrorLevel, 'id'>,
  ): Promise<MachineErrorLevel> {
    return this.machineTypeRepository.machineErrorLevels(id).create(machineErrorLevel);
  }

  @patch('/machine-types/{id}/machine-error-levels', {
    responses: {
      '200': {
        description: 'MachineType.MachineErrorLevel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MachineErrorLevel, {partial: true}),
        },
      },
    })
    machineErrorLevel: Partial<MachineErrorLevel>,
    @param.query.object('where', getWhereSchemaFor(MachineErrorLevel)) where?: Where<MachineErrorLevel>,
  ): Promise<Count> {
    return this.machineTypeRepository.machineErrorLevels(id).patch(machineErrorLevel, where);
  }

  @del('/machine-types/{id}/machine-error-levels', {
    responses: {
      '200': {
        description: 'MachineType.MachineErrorLevel DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MachineErrorLevel)) where?: Where<MachineErrorLevel>,
  ): Promise<Count> {
    return this.machineTypeRepository.machineErrorLevels(id).delete(where);
  }
}
