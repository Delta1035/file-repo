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
  Machine,
  MachineStatus,
} from '../models';
import {MachineRepository} from '../repositories';

export class MachineMachineStatusController {
  constructor(
    @repository(MachineRepository) protected machineRepository: MachineRepository,
  ) { }

  @get('/machines/{id}/machine-status', {
    responses: {
      '200': {
        description: 'Machine has one MachineStatus',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MachineStatus),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<MachineStatus>,
  ): Promise<MachineStatus> {
    return this.machineRepository.machineStatus(id).get(filter);
  }

  @post('/machines/{id}/machine-status', {
    responses: {
      '200': {
        description: 'Machine model instance',
        content: {'application/json': {schema: getModelSchemaRef(MachineStatus)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Machine.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MachineStatus, {
            title: 'NewMachineStatusInMachine',
            exclude: ['id'],
            optional: ['machineId']
          }),
        },
      },
    }) machineStatus: Omit<MachineStatus, 'id'>,
  ): Promise<MachineStatus> {
    return this.machineRepository.machineStatus(id).create(machineStatus);
  }

  @patch('/machines/{id}/machine-status', {
    responses: {
      '200': {
        description: 'Machine.MachineStatus PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MachineStatus, {partial: true}),
        },
      },
    })
    machineStatus: Partial<MachineStatus>,
    @param.query.object('where', getWhereSchemaFor(MachineStatus)) where?: Where<MachineStatus>,
  ): Promise<Count> {
    return this.machineRepository.machineStatus(id).patch(machineStatus, where);
  }

  @del('/machines/{id}/machine-status', {
    responses: {
      '200': {
        description: 'Machine.MachineStatus DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MachineStatus)) where?: Where<MachineStatus>,
  ): Promise<Count> {
    return this.machineRepository.machineStatus(id).delete(where);
  }
}
