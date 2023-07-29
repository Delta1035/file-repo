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
  MachineHistoryStatus,
} from '../models';
import {MachineRepository} from '../repositories';

export class MachineMachineHistoryStatusController {
  constructor(
    @repository(MachineRepository) protected machineRepository: MachineRepository,
  ) { }

  @get('/machines/{id}/machine-history-statuses', {
    responses: {
      '200': {
        description: 'Array of Machine has many MachineHistoryStatus',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MachineHistoryStatus)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<MachineHistoryStatus>,
  ): Promise<MachineHistoryStatus[]> {
    return this.machineRepository.machineHistoryStatuses(id).find(filter);
  }

  @post('/machines/{id}/machine-history-statuses', {
    responses: {
      '200': {
        description: 'Machine model instance',
        content: {'application/json': {schema: getModelSchemaRef(MachineHistoryStatus)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Machine.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MachineHistoryStatus, {
            title: 'NewMachineHistoryStatusInMachine',
            exclude: ['id'],
            optional: ['machineId']
          }),
        },
      },
    }) machineHistoryStatus: Omit<MachineHistoryStatus, 'id'>,
  ): Promise<MachineHistoryStatus> {
    return this.machineRepository.machineHistoryStatuses(id).create(machineHistoryStatus);
  }

  @patch('/machines/{id}/machine-history-statuses', {
    responses: {
      '200': {
        description: 'Machine.MachineHistoryStatus PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MachineHistoryStatus, {partial: true}),
        },
      },
    })
    machineHistoryStatus: Partial<MachineHistoryStatus>,
    @param.query.object('where', getWhereSchemaFor(MachineHistoryStatus)) where?: Where<MachineHistoryStatus>,
  ): Promise<Count> {
    return this.machineRepository.machineHistoryStatuses(id).patch(machineHistoryStatus, where);
  }

  @del('/machines/{id}/machine-history-statuses', {
    responses: {
      '200': {
        description: 'Machine.MachineHistoryStatus DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MachineHistoryStatus)) where?: Where<MachineHistoryStatus>,
  ): Promise<Count> {
    return this.machineRepository.machineHistoryStatuses(id).delete(where);
  }
}
