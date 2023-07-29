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
  Machine,
} from '../models';
import {MachineTypeRepository} from '../repositories';

export class MachineTypeMachineController {
  constructor(
    @repository(MachineTypeRepository) protected machineTypeRepository: MachineTypeRepository,
  ) { }

  @get('/machine-types/{id}/machines', {
    responses: {
      '200': {
        description: 'Array of MachineType has many Machine',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Machine)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Machine>,
  ): Promise<Machine[]> {
    return this.machineTypeRepository.machines(id).find(filter);
  }

  @post('/machine-types/{id}/machines', {
    responses: {
      '200': {
        description: 'MachineType model instance',
        content: {'application/json': {schema: getModelSchemaRef(Machine)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof MachineType.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Machine, {
            title: 'NewMachineInMachineType',
            exclude: ['id'],
            optional: ['machineTypeId']
          }),
        },
      },
    }) machine: Omit<Machine, 'id'>,
  ): Promise<Machine> {
    return this.machineTypeRepository.machines(id).create(machine);
  }

  @patch('/machine-types/{id}/machines', {
    responses: {
      '200': {
        description: 'MachineType.Machine PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Machine, {partial: true}),
        },
      },
    })
    machine: Partial<Machine>,
    @param.query.object('where', getWhereSchemaFor(Machine)) where?: Where<Machine>,
  ): Promise<Count> {
    return this.machineTypeRepository.machines(id).patch(machine, where);
  }

  @del('/machine-types/{id}/machines', {
    responses: {
      '200': {
        description: 'MachineType.Machine DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Machine)) where?: Where<Machine>,
  ): Promise<Count> {
    return this.machineTypeRepository.machines(id).delete(where);
  }
}
