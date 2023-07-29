import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Machine,
  MachineType
} from '../models';
import {MachineRepository} from '../repositories';

export class MachineMachineTypeController {
  constructor(
    @repository(MachineRepository)
    public machineRepository: MachineRepository,
  ) { }

  @get('/machines/{id}/machine-type', {
    responses: {
      '200': {
        description: 'MachineType belonging to Machine',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MachineType)},
          },
        },
      },
    },
  })
  async getMachineType(
    @param.path.number('id') id: typeof Machine.prototype.id,
  ): Promise<MachineType> {
    return this.machineRepository.machineType(id);
  }
}
