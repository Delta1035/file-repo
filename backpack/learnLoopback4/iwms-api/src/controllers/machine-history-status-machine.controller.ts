import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MachineHistoryStatus,
  Machine,
} from '../models';
import {MachineHistoryStatusRepository} from '../repositories';

export class MachineHistoryStatusMachineController {
  constructor(
    @repository(MachineHistoryStatusRepository)
    public machineHistoryStatusRepository: MachineHistoryStatusRepository,
  ) { }

  @get('/machine-history-statuses/{id}/machine', {
    responses: {
      '200': {
        description: 'Machine belonging to MachineHistoryStatus',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Machine)},
          },
        },
      },
    },
  })
  async getMachine(
    @param.path.number('id') id: typeof MachineHistoryStatus.prototype.evt_dt,
  ): Promise<Machine> {
    return this.machineHistoryStatusRepository.machine(id);
  }
}
