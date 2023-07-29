import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {MachineType} from '../models';
import {MachineTypeRepository} from '../repositories';

export class MachineTypeController {
  constructor(
    @repository(MachineTypeRepository)
    public machineTypeRepository : MachineTypeRepository,
  ) {}

  @post('/machine-types')
  @response(200, {
    description: 'MachineType model instance',
    content: {'application/json': {schema: getModelSchemaRef(MachineType)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MachineType, {
            title: 'NewMachineType',
            exclude: ['id'],
          }),
        },
      },
    })
    machineType: Omit<MachineType, 'id'>,
  ): Promise<MachineType> {
    return this.machineTypeRepository.create(machineType);
  }

  @get('/machine-types/count')
  @response(200, {
    description: 'MachineType model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MachineType) where?: Where<MachineType>,
  ): Promise<Count> {
    return this.machineTypeRepository.count(where);
  }

  @get('/machine-types')
  @response(200, {
    description: 'Array of MachineType model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MachineType, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MachineType) filter?: Filter<MachineType>,
  ): Promise<MachineType[]> {
    return this.machineTypeRepository.find(filter);
  }

  @patch('/machine-types')
  @response(200, {
    description: 'MachineType PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MachineType, {partial: true}),
        },
      },
    })
    machineType: MachineType,
    @param.where(MachineType) where?: Where<MachineType>,
  ): Promise<Count> {
    return this.machineTypeRepository.updateAll(machineType, where);
  }

  @get('/machine-types/{id}')
  @response(200, {
    description: 'MachineType model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MachineType, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MachineType, {exclude: 'where'}) filter?: FilterExcludingWhere<MachineType>
  ): Promise<MachineType> {
    return this.machineTypeRepository.findById(id, filter);
  }

  @patch('/machine-types/{id}')
  @response(204, {
    description: 'MachineType PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MachineType, {partial: true}),
        },
      },
    })
    machineType: MachineType,
  ): Promise<void> {
    await this.machineTypeRepository.updateById(id, machineType);
  }

  @put('/machine-types/{id}')
  @response(204, {
    description: 'MachineType PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() machineType: MachineType,
  ): Promise<void> {
    await this.machineTypeRepository.replaceById(id, machineType);
  }

  @del('/machine-types/{id}')
  @response(204, {
    description: 'MachineType DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.machineTypeRepository.deleteById(id);
  }
}
