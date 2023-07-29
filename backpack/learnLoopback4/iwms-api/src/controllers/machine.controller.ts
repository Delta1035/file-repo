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
import {Machine, MachineType} from '../models';
import {MachineParam} from '../models/class/machine-param.model';
import {MachineRepository, MachineTypeRepository} from '../repositories';

export class MachineController {
  constructor(
    @repository(MachineRepository)
    public machineRepository: MachineRepository,
    @repository(MachineTypeRepository)
    public machineTypeRepository: MachineTypeRepository,
  ) { }

  @post('/machines')
  @response(200, {
    description: 'Machine model instance',
    content: {'application/json': {schema: getModelSchemaRef(Machine)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Machine, {
            title: 'NewMachine',
            exclude: ['id'],
          }),
        },
      },
    })
    machine: Omit<Machine, 'id'>,
  ): Promise<Machine> {
    return this.machineRepository.create(machine);
  }

  @post('/insert-machine')
  @response(200, {
    description: 'Machine model instance',
    content: {'application/json': {schema: getModelSchemaRef(Machine)}},
  })
  async insertMachine(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MachineParam, {
            title: 'NewMachineParam'
          }),
        },
      },
    })
    machine: MachineParam,
  ): Promise<Machine> {
    /**
     * 查询type的typeID
     *   "machine_id": "AAAA",
         "machine_type": "TOWER"
     */
    console.log('machine :>> ', machine);
    const query = {
      where: {
        "machine_type": machine.machine_type
      }
    };
    let machine_type = await this.machineTypeRepository.findOne(query);
    console.log('query :>> ', query);
    console.log('machine_type :>> ', machine_type);
    if (machine_type) {
      let machineInsert: any = {
        machine_id: machine.machine_id,
        machineTypeId: (machine_type as MachineType).id
      };
      return this.machineRepository.create(machineInsert)
    } else {
      throw Error("MachineType Not Exists!")
    }
  }

  @get('/machines/count')
  @response(200, {
    description: 'Machine model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Machine) where?: Where<Machine>,
  ): Promise<Count> {
    return this.machineRepository.count(where);
  }

  @get('/machines')
  @response(200, {
    description: 'Array of Machine model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Machine, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Machine) filter?: Filter<Machine>,
  ): Promise<Machine[]> {
    return this.machineRepository.find(filter);
  }

  @patch('/machines')
  @response(200, {
    description: 'Machine PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Machine, {partial: true}),
        },
      },
    })
    machine: Machine,
    @param.where(Machine) where?: Where<Machine>,
  ): Promise<Count> {
    return this.machineRepository.updateAll(machine, where);
  }

  @get('/machines/{id}')
  @response(200, {
    description: 'Machine model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Machine, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Machine, {exclude: 'where'}) filter?: FilterExcludingWhere<Machine>
  ): Promise<Machine> {
    return this.machineRepository.findById(id, filter);
  }

  @patch('/machines/{id}')
  @response(204, {
    description: 'Machine PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Machine, {partial: true}),
        },
      },
    })
    machine: Machine,
  ): Promise<void> {
    await this.machineRepository.updateById(id, machine);
  }

  @put('/machines/{id}')
  @response(204, {
    description: 'Machine PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() machine: Machine,
  ): Promise<void> {
    await this.machineRepository.replaceById(id, machine);
  }

  @del('/machines/{id}')
  @response(204, {
    description: 'Machine DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.machineRepository.deleteById(id);
  }
}
