import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MachineErrorLevel,
  MachineType,
} from '../models';
import {MachineErrorLevelRepository} from '../repositories';

export class MachineErrorLevelMachineTypeController {
  constructor(
    @repository(MachineErrorLevelRepository)
    public machineErrorLevelRepository: MachineErrorLevelRepository,
  ) { }

  @get('/machine-error-levels/{id}/machine-type', {
    responses: {
      '200': {
        description: 'MachineType belonging to MachineErrorLevel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MachineType)},
          },
        },
      },
    },
  })
  async getMachineType(
    @param.path.number('id') id: typeof MachineErrorLevel.prototype.id,
  ): Promise<MachineType> {
    return this.machineErrorLevelRepository.machine_level_for_machine_type(id);
  }
}
