import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {MachineStatus} from '../models';
import {InsertMachineParam} from '../models/class/insert-machine-param.model';
import {MachineRepository, MachineStatusRepository} from '../repositories';

export class MachineStatusController {
  constructor(
    @repository(MachineStatusRepository)
    public machineStatusRepository: MachineStatusRepository,
    @repository(MachineRepository)
    public machineRepository: MachineRepository,
  ) { }

  @post('/machine-statuses')
  @response(200, {
    description: 'MachineStatus model instance',
    content: {'application/json': {schema: getModelSchemaRef(MachineStatus)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MachineStatus, {
            title: 'NewMachineStatus',
            exclude: ['id'],
          }),
        },
      },
    })
    machineStatus: Omit<MachineStatus, 'id'>,
  ): Promise<MachineStatus> {
    return this.machineStatusRepository.create(machineStatus);
  }

  @post('/insert-machine-status')
  @response(200, {
    description: 'insert-machine-status',
    content: {'application/json': {schema: getModelSchemaRef(MachineStatus)}},
  })
  async insertMachineStatus(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InsertMachineParam, {
            title: 'NewInsertMachineParam',
          }),
        },
      },
    })
    insertMachineParam: InsertMachineParam,
  ): Promise<MachineStatus> {
    let machine_id = insertMachineParam.machine_id;
    const query = {
      where: {
        machine_id
      }
    };
    let machine = await this.machineRepository.findOne(query);
    if (machine) {
      let id = machine.getId();
      let machineStatus: Omit<MachineStatus, 'id'> = {
        status: 1,
        machineId: id
      }
      return this.machineStatusRepository.create(machineStatus);
    } else {
      throw Error(`${machine} 设备不存在!`)
    }
  }


  @get('/machine-statuses/count')
  @response(200, {
    description: 'MachineStatus model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MachineStatus) where?: Where<MachineStatus>,
  ): Promise<Count> {
    return this.machineStatusRepository.count(where);
  }

  @get('/machine-statuses')
  @response(200, {
    description: 'Array of MachineStatus model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MachineStatus, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MachineStatus) filter?: Filter<MachineStatus>,
  ): Promise<MachineStatus[]> {
    return this.machineStatusRepository.find(filter);
  }

  @patch('/machine-statuses')
  @response(200, {
    description: 'MachineStatus PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MachineStatus, {partial: true}),
        },
      },
    })
    machineStatus: MachineStatus,
    @param.where(MachineStatus) where?: Where<MachineStatus>,
  ): Promise<Count> {
    return this.machineStatusRepository.updateAll(machineStatus, where);
  }

  @get('/machine-statuses/{id}')
  @response(200, {
    description: 'MachineStatus model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MachineStatus, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MachineStatus, {exclude: 'where'}) filter?: FilterExcludingWhere<MachineStatus>
  ): Promise<MachineStatus> {
    return this.machineStatusRepository.findById(id, filter);
  }

  @patch('/machine-statuses/{id}')
  @response(204, {
    description: 'MachineStatus PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MachineStatus, {partial: true}),
        },
      },
    })
    machineStatus: MachineStatus,
  ): Promise<void> {
    await this.machineStatusRepository.updateById(id, machineStatus);
  }

  @put('/machine-statuses/{id}')
  @response(204, {
    description: 'MachineStatus PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() machineStatus: MachineStatus,
  ): Promise<void> {
    await this.machineStatusRepository.replaceById(id, machineStatus);
  }

  @del('/machine-statuses/{id}')
  @response(204, {
    description: 'MachineStatus DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.machineStatusRepository.deleteById(id);
  }

  @get('/machine-statuses/getAllMachineStatuses')
  @response(200, {
    schema: {
      type: 'array',
      items: getModelSchemaRef(MachineStatus),
    },
  })
  async getAllMachineStatuses(

  ): Promise<MachineStatus[]> {
    let machineStatusList = await this.machineStatusRepository.find();
    machineStatusList = await Promise.all(machineStatusList.map(async (status) => {
      // status.machineId => machineID
      let machine = await this.machineRepository.findById(status.machineId);
      status.machine_id = machine.machine_id;
      return status;
    }));
    return machineStatusList;
  }
}
