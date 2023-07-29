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
import {MachineErrorLevel} from '../models';
import {MachineErrorLevelRepository} from '../repositories';

export class MachineErrorLevelController {
  constructor(
    @repository(MachineErrorLevelRepository)
    public machineErrorLevelRepository : MachineErrorLevelRepository,
  ) {}

  @post('/machine-error-levels')
  @response(200, {
    description: 'MachineErrorLevel model instance',
    content: {'application/json': {schema: getModelSchemaRef(MachineErrorLevel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MachineErrorLevel, {
            title: 'NewMachineErrorLevel',
            exclude: ['id'],
          }),
        },
      },
    })
    machineErrorLevel: Omit<MachineErrorLevel, 'id'>,
  ): Promise<MachineErrorLevel> {
    return this.machineErrorLevelRepository.create(machineErrorLevel);
  }

  @get('/machine-error-levels/count')
  @response(200, {
    description: 'MachineErrorLevel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MachineErrorLevel) where?: Where<MachineErrorLevel>,
  ): Promise<Count> {
    return this.machineErrorLevelRepository.count(where);
  }

  @get('/machine-error-levels')
  @response(200, {
    description: 'Array of MachineErrorLevel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MachineErrorLevel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MachineErrorLevel) filter?: Filter<MachineErrorLevel>,
  ): Promise<MachineErrorLevel[]> {
    return this.machineErrorLevelRepository.find(filter);
  }

  @patch('/machine-error-levels')
  @response(200, {
    description: 'MachineErrorLevel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MachineErrorLevel, {partial: true}),
        },
      },
    })
    machineErrorLevel: MachineErrorLevel,
    @param.where(MachineErrorLevel) where?: Where<MachineErrorLevel>,
  ): Promise<Count> {
    return this.machineErrorLevelRepository.updateAll(machineErrorLevel, where);
  }

  @get('/machine-error-levels/{id}')
  @response(200, {
    description: 'MachineErrorLevel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MachineErrorLevel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MachineErrorLevel, {exclude: 'where'}) filter?: FilterExcludingWhere<MachineErrorLevel>
  ): Promise<MachineErrorLevel> {
    return this.machineErrorLevelRepository.findById(id, filter);
  }

  @patch('/machine-error-levels/{id}')
  @response(204, {
    description: 'MachineErrorLevel PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MachineErrorLevel, {partial: true}),
        },
      },
    })
    machineErrorLevel: MachineErrorLevel,
  ): Promise<void> {
    await this.machineErrorLevelRepository.updateById(id, machineErrorLevel);
  }

  @put('/machine-error-levels/{id}')
  @response(204, {
    description: 'MachineErrorLevel PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() machineErrorLevel: MachineErrorLevel,
  ): Promise<void> {
    await this.machineErrorLevelRepository.replaceById(id, machineErrorLevel);
  }

  @del('/machine-error-levels/{id}')
  @response(204, {
    description: 'MachineErrorLevel DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.machineErrorLevelRepository.deleteById(id);
  }
}
