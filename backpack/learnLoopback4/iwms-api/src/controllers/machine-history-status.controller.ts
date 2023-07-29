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
import {Machine, MachineHistoryStatus, MachineHistoryStatusRelations, MachineRelations, MachineStatus, MachineStatusRelations} from '../models';
import {MachineHistoryStatusParam} from '../models/class/machine-history-status-param.model';
import {MachineHistoryStatusRepository, MachineRepository, MachineStatusRepository} from '../repositories';

export class MachineHistoryStatusController {
  constructor(
    @repository(MachineHistoryStatusRepository)
    public machineHistoryStatusRepository: MachineHistoryStatusRepository,
    @repository(MachineRepository)
    public machineRepository: MachineRepository,
    @repository(MachineStatusRepository)
    public machineStatusRepository: MachineStatusRepository
  ) { }

  @post('/machine-history-statuses')
  @response(200, {
    description: 'MachineHistoryStatus model instance',
    content: {'application/json': {schema: getModelSchemaRef(MachineHistoryStatus)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MachineHistoryStatus, {
            title: 'NewMachineHistoryStatus',

          }),
        },
      },
    })
    machineHistoryStatus: MachineHistoryStatus,
  ): Promise<MachineHistoryStatus> {
    return this.machineHistoryStatusRepository.create(machineHistoryStatus);
  }

  @get('/machine-history-statuses/count')
  @response(200, {
    description: 'MachineHistoryStatus model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MachineHistoryStatus) where?: Where<MachineHistoryStatus>,
  ): Promise<Count> {
    return this.machineHistoryStatusRepository.count(where);
  }

  @get('/machine-history-statuses')
  @response(200, {
    description: 'Array of MachineHistoryStatus model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MachineHistoryStatus, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MachineHistoryStatus) filter?: Filter<MachineHistoryStatus>,
  ): Promise<MachineHistoryStatus[]> {
    return this.machineHistoryStatusRepository.find(filter);
  }

  @patch('/machine-history-statuses')
  @response(200, {
    description: 'MachineHistoryStatus PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MachineHistoryStatus, {partial: true}),
        },
      },
    })
    machineHistoryStatus: MachineHistoryStatus,
    @param.where(MachineHistoryStatus) where?: Where<MachineHistoryStatus>,
  ): Promise<Count> {
    return this.machineHistoryStatusRepository.updateAll(machineHistoryStatus, where);
  }

  @get('/machine-history-statuses/{id}')
  @response(200, {
    description: 'MachineHistoryStatus model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MachineHistoryStatus, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MachineHistoryStatus, {exclude: 'where'}) filter?: FilterExcludingWhere<MachineHistoryStatus>
  ): Promise<MachineHistoryStatus> {
    return this.machineHistoryStatusRepository.findById(id, filter);
  }

  @patch('/machine-history-statuses/{id}')
  @response(204, {
    description: 'MachineHistoryStatus PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MachineHistoryStatus, {partial: true}),
        },
      },
    })
    machineHistoryStatus: MachineHistoryStatus,
  ): Promise<void> {
    await this.machineHistoryStatusRepository.updateById(id, machineHistoryStatus);
  }

  @put('/machine-history-statuses/{id}')
  @response(204, {
    description: 'MachineHistoryStatus PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() machineHistoryStatus: MachineHistoryStatus,
  ): Promise<void> {
    await this.machineHistoryStatusRepository.replaceById(id, machineHistoryStatus);
  }

  @del('/machine-history-statuses/{id}')
  @response(204, {
    description: 'MachineHistoryStatus DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.machineHistoryStatusRepository.deleteById(id);
  }

  /**
  * 插入数据
  */
  @post('/insert-machine-history-status')
  @response(200, {
    description: 'MachineStatus model instance',
    content: {'application/json': {schema: getModelSchemaRef(MachineHistoryStatus)}},
  })
  async insert(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MachineHistoryStatusParam, {
            title: 'MachineHistoryStatusParam'
          }),
        },
      },
    })
    machineHistoryStatus: MachineHistoryStatusParam,
  ): Promise<MachineHistoryStatusParam | void> {
    const {
      machine_id
    } = machineHistoryStatus;
    //根据machine_id [A02_048] 获取到 Machine表的PK

    let machineModel = await this.getMachinePKByMachineId(machine_id as string);

    // 设备PK[machineId]
    let machineId: number = machineModel?.getId();
    //根据PK找最近的一条数据  machineHistoryStatusRepository
    let last_status = await this.findNearest(machineId);

    // A02_048 => 2
    machineHistoryStatus.machine_id = machineId;
    //之前无历史数据
    let machineStatus = await this.getMachineStatusPKByMachineId(machineId);
    if (!last_status) {
      // 找到设备状态表的PK=>根据设备ID

      let duration;
      switch (machineHistoryStatus.status) {
        // 离线
        case 0:
          duration = new Date().getTime() - machineHistoryStatus.evt_dt
          machineHistoryStatus.exception_time = duration < 0 ? 0 : duration;
          await this.machineStatusRepository.updateById(machineStatus?.getId(), {
            error_code: undefined,
            error_desc: undefined,
            status: 0,
            exception_time: machineHistoryStatus.exception_time
          });
          break;
        // 正常
        case 1:
          machineHistoryStatus.exception_time = undefined;
          await this.machineStatusRepository.updateById(machineStatus?.getId(), {
            error_code: undefined,
            error_desc: undefined,
            status: 1,
            exception_time: machineHistoryStatus.exception_time
          });
          break;
        // 异常
        case 2:
          duration = new Date().getTime() - machineHistoryStatus.evt_dt
          machineHistoryStatus.exception_time = duration < 0 ? 0 : duration;
          await this.machineStatusRepository.updateById(machineStatus?.getId(), {
            error_code: machineHistoryStatus.error_code,
            error_desc: machineHistoryStatus.error_desc,
            status: 2,
            exception_time: machineHistoryStatus.exception_time
          });
          break;
        default:
          break;
      };
      await this.machineHistoryStatusRepository.create(machineHistoryStatus as MachineHistoryStatus);
      machineHistoryStatus.machine_id = machine_id;// 具体设备名字
      let machine = await this.getMachineTypeByMachineId(machine_id as string);
      machineHistoryStatus.machine_type = machine?.machineType.machine_type
      return machineHistoryStatus;
    } else {
      //之前有历史数据
      //状态是否一致
      //
      if (last_status.status == machineHistoryStatus.status) {
        //是否连续 查询到最近的一个连续数据 通过设备和status查询
        let duration;
        switch (machineHistoryStatus.status) {
          case 0:
            duration = await this.getDuration(machineId, machineHistoryStatus.status)
            machineHistoryStatus.exception_time = duration;
            break;
          case 1:
            machineHistoryStatus.exception_time = undefined;
            break;
          case 2:
            duration = await this.getDuration(machineId, machineHistoryStatus.status)
            machineHistoryStatus.exception_time = duration;
            break;
          default:
            break;
        }
        try {
          await this.machineHistoryStatusRepository.create(machineHistoryStatus as MachineHistoryStatus);
        } catch (error) {
          console.log('error :>> ', JSON.stringify(error));
          throw Error('create machineHistoryStatus Error In MachineHistoryStatusController')
        }

        try {
          await this.machineStatusRepository.updateById(machineStatus?.getId(), {
            exception_time: machineHistoryStatus.exception_time,
            status: machineHistoryStatus.status
          });
        } catch (error) {
          console.log('error :>> ', error);
          throw Error('updateById  Error In MachineHistoryStatusController')
        }

        machineHistoryStatus.machine_id = machine_id;// 具体设备名字
        let machine = await this.getMachineTypeByMachineId(machine_id as string);
        machineHistoryStatus.machine_type = machine?.machineType.machine_type
        return machineHistoryStatus;
      } else {
        let duration;
        switch (machineHistoryStatus.status) {
          // 离线
          case 0:
            duration = new Date().getTime() - machineHistoryStatus.evt_dt
            machineHistoryStatus.exception_time = duration < 0 ? 0 : duration;
            await this.machineStatusRepository.updateById(machineStatus?.getId(), {
              error_code: undefined,
              error_desc: undefined,
              status: 0,
              exception_time: machineHistoryStatus.exception_time
            })

            break;
          // 正常
          case 1:
            machineHistoryStatus.exception_time = undefined;
            await this.machineStatusRepository.updateById(machineStatus?.getId(), {
              error_code: undefined,
              error_desc: undefined,
              status: 1,
              exception_time: machineHistoryStatus.exception_time
            })
            break;
          // 异常
          case 2:
            duration = new Date().getTime() - machineHistoryStatus.evt_dt
            machineHistoryStatus.exception_time = duration < 0 ? 0 : duration;
            await this.machineStatusRepository.updateById(machineStatus?.getId(), {
              error_code: machineHistoryStatus.error_code,
              error_desc: machineHistoryStatus.error_desc,
              status: 2,
              exception_time: machineHistoryStatus.exception_time
            })
            break;
          default:
            break;
        };
        //相当于是第一条数据


        await this.machineHistoryStatusRepository.create(machineHistoryStatus as MachineHistoryStatus);
        machineHistoryStatus.machine_id = machine_id;// 具体设备名字
        let machine = await this.getMachineTypeByMachineId(machine_id as string);

        machineHistoryStatus.machine_type = machine?.machineType.machine_type
        return machineHistoryStatus;
      }
    }

  }

  @get("/findPrevStatusByMachineId")
  @response(200, {
    description: 'getMachinePKByMachineId',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MachineHistoryStatus, {includeRelations: true}),
      },
    },
  })
  async findNearest(
    @param.query.number('machine_id') machine_id: number
  ): Promise<(MachineHistoryStatus & MachineHistoryStatusRelations) | null> {
    const query: any = {
      limit: 1,
      order: "evt_dt DESC",
      where: {
        machine_id: machine_id
      }
    };

    return this.machineHistoryStatusRepository.findOne(query);
  }
  @get("/getMachinePKByMachineId")
  @response(200, {
    description: 'getMachinePKByMachineId',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Machine, {includeRelations: true}),
      },
    },
  })
  async getMachinePKByMachineId(
    @param.query.string('machine_id') machine_id: string): Promise<(Machine & MachineRelations) | null> {
    const query = {
      where: {
        machine_id: machine_id
      }
    };

    return this.machineRepository.findOne(query)
  }
  @get("/getMachineStatusPKByMachineId")
  @response(200, {
    description: 'getMachineStatusPKByMachineId',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MachineStatus, {includeRelations: true}),
      },
    },
  })
  async getMachineStatusPKByMachineId(
    @param.query.string('machine_id') machine_id: number): Promise<(MachineStatus & MachineStatusRelations) | null> {
    const query = {
      where: {
        machineId: machine_id
      }
    };

    return this.machineStatusRepository.findOne(query)
  }
  @get("/getMachineStatusByMachineId")
  @response(200, {
    description: 'getMachineStatusByMachineId',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Machine, {includeRelations: true}),
      },
    },
  })
  async getMachineStatusByMachineId(
    @param.query.string('machine_id') machine_id: string): Promise<(Machine & MachineRelations) | null> {
    const query = {
      where: {
        machine_id: machine_id
      },
      include: [
        {
          relation: "machineStatus"
        }
      ]
    };

    return this.machineRepository.findOne(query)
  }

  @get("/getMachineHistoryStatusByMachineIdAndStatus")
  @response(200, {
    description: 'getMachineHistoryStatusByMachineIdAndStatus',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Machine, {includeRelations: true}),
      },
    },
  })
  async getMachineHistoryStatusByMachineIdAndStatus(
    @param.query.string('machine_id') machine_id: string,
    @param.query.number('status') status: number,
  ): Promise<(Machine & MachineRelations) | null> {
    const query = {
      where: {
        machine_id: machine_id
      },
      include: [
        {
          relation: "machineHistoryStatuses",
          scope: {
            where: {
              status: status
            },
          }
        },
      ]
    };

    return this.machineRepository.findOne(query)
  }
  @get("/getLatestHistoryStatusByMachineIdAndStatus")
  @response(200, {
    description: 'getLatestHistoryStatusByMachineIdAndStatus',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MachineHistoryStatus, {includeRelations: true})
        }
      },
    },
  })
  async getLatestHistoryStatusByMachineIdAndStatus(
    @param.query.string('machine_id') machine_id: number,
    @param.query.number('status') status: number
  ): Promise<(MachineHistoryStatus & MachineHistoryStatusRelations)[]> {
    const query = {
      where: {
        machine_id: machine_id,
        status: status,
      }
    }

    return this.machineHistoryStatusRepository.find(query);
  }

  getSeries(arr: any[], attr: string, dis: number): MachineHistoryStatus[][] {
    return arr.reduce((pre, cur) => {
      if (pre.length == 0) {
        pre.push([cur]);
      } else {
        let lastSereis = pre[pre.length - 1];
        let lastEle = lastSereis[lastSereis.length - 1];
        if (cur[attr] - lastEle[attr] <= dis) {
          lastSereis.push(cur)
        } else {
          pre.push([cur])
        }
      }
      return pre
    }, []);
  }

  async getDuration(machineId: number, status: number): Promise<number> {
    let lastHistoryStatus = await this.getLatestHistoryStatusByMachineIdAndStatus(machineId, status);
    let serials = this.getSeries(lastHistoryStatus, 'evt_dt', 50 * 1000);
    let List = serials[serials.length - 1];
    const data_first = List[0];
    let duration = new Date().getTime() - data_first.evt_dt < 0 ? 0 : new Date().getTime() - data_first.evt_dt;
    return duration;
  }


  @get("/getMachineTypeByMachineId")
  @response(200, {
    description: 'getMachineTypeByMachineId',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Machine, {includeRelations: true}),
      },
    },
  })
  async getMachineTypeByMachineId(
    @param.query.string('machine_id') machine_id: string,
  ): Promise<(Machine & MachineRelations) | null> {
    const query = {
      where: {
        machine_id: machine_id
      },
      include: [
        {
          relation: "machineType"
        },
      ]
    };

    return this.machineRepository.findOne(query)
  }
}
