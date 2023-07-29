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
import {MachineRecords, MachineType} from '../models';
import {MachineErrorLevelRepository, MachineRecordsRepository, MachineTypeRepository} from '../repositories';
export class MachineRecordsController {
  constructor(
    @repository(MachineRecordsRepository)
    public machineRecordsRepository: MachineRecordsRepository,
    @repository(MachineErrorLevelRepository)
    public machineErrorLevelRepository: MachineErrorLevelRepository,
    @repository(MachineTypeRepository)
    public machineTypeRepository: MachineTypeRepository,
  ) { }

  @post('/machine-records')
  @response(200, {
    description: 'MachineRecords model instance',
    content: {'application/json': {schema: getModelSchemaRef(MachineRecords)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MachineRecords, {
            title: 'NewMachineRecords',
            exclude: ['id'],
          }),
        },
      },
    })
    machineRecords: Omit<MachineRecords, 'id'>,
  ): Promise<MachineRecords> {
    return this.machineRecordsRepository.create(machineRecords);
  }
  @post('/insert-machine-records')
  @response(200, {
    description: 'MachineRecords model instance',
    content: {'application/json': {schema: getModelSchemaRef(MachineRecords)}},
  })
  async insert(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MachineRecords, {
            title: 'NewMachineRecords',
            exclude: ['id'],
          }),
        },
      },
    })
    machineRecords: MachineRecords,
  ): Promise<MachineRecords | undefined> {

    //取得machine_id 和 evt_dt,用来查询最近此设备的2min内的所有记录
    let machine_id = machineRecords.machine_id;
    let evt_dt = machineRecords.evt_dt;

    let nearest = await this.findNearest(machine_id, evt_dt, 2);
    nearest.push(machineRecords);
    //把当前的记录放进2min内的所有记录  实际查询的是1.5min内的?
    //最近两分钟有数据
    if (nearest.length) {
      const isOff = nearest.every(i => i.status == 0);
      let last = nearest[nearest.length - 1];
      //最近两分钟状态是否全部是0
      if (isOff) {
        //全部是0，表示进入离线状态
        //查询计算 machineID + status == 0 持续时间
        // machineRecords.exception_time = last.evt_dt - first.evt_dt;
        let offData = await this.findByIdAndStatus(machine_id, 0);
        offData.push(machineRecords);
        let serials = this.getSeries(offData, 'evt_dt', 50 * 1000);
        //找到2这个连续的区间的时间间隔
        let errorList = serials[serials.length - 1];
        const off_first = errorList[0];
        // const off_last = errorList[errorList.length - 1];
        let duration = new Date().getTime() - off_first.evt_dt;
        last.exception_time = duration;
        last.exception_status = 1;
        /**
         * 如果不全为0，最后一条数据是否是2
         */
        return this.machineRecordsRepository.create(last);
      } else if (last.status == 2) {
        let machine_type = machineRecords.machine_type;
        let error_code = machineRecords.error_code;
        /**
         * 最后一条是2
         * 查询，计算machine_id + error_code持续为2的时间间隔,这个和2min无关
         * 有error_code 状态是 2,不需要再加条件判断是否是2了
         */
        let errorData = await this.findByIdAndErrorCode(machine_id, error_code);
        errorData.push(machineRecords);
        let serials = this.getSeries(errorData, 'evt_dt', 50 * 1000);
        //找到2这个连续的区间的时间间隔
        let errorList = serials[serials.length - 1];
        const error_first = errorList[0];
        // const error_last = errorList[errorList.length - 1];
        //计算持续时长
        let duration = new Date().getTime() - error_first.evt_dt < 0 ? 0 : new Date().getTime() - error_first.evt_dt;
        //最后一笔为2  为2应该有error_code
        let typeRes = await this.findByMachineTypeAndErrorCode(machine_type, error_code);
        if (typeRes.length && typeRes[0].machineErrorLevels) {
          //找到标准的最小时长
          let selectedMinDuration = typeRes[0].machineErrorLevels[0].error_duration;
          if (duration >= selectedMinDuration * 60 * 1000) {
            // 超时 Error
            last.exception_time = duration;
            last.exception_status = 2;
            return this.machineRecordsRepository.create(last);
          } else {
            //设备正常
            last.exception_status = 0;
            return this.machineRecordsRepository.create(last);
          }
        } else {
          throw Error("该设备无异常标准");
        }
      } else {
        //设备正常
        last.exception_status = 0;
        return this.machineRecordsRepository.create(last);
      }
    }
  }

  @get('/findNearestRecord')
  @response(200, {
    description: 'find nearest MachineRecords',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MachineRecords),
        },
      },
    },
  })
  async findNearest(
    @param.query.string('machine_id') machine_id: string,
    @param.query.string('evt_dt') evt_dt: number,
    @param.query.string('min') min: number,
  ): Promise<MachineRecords[]> {
    const query: any = {
      order: "evt_dt ASC",
      where: {
        machine_id: machine_id,
        evt_dt: {
          gte: evt_dt - min * 60 * 1000
        }
      }
    };

    return this.machineRecordsRepository.find(query);
  }

  @get('/findByMachineTypeAndErrorCode')
  @response(200, {
    description: 'findByMachineTypeAndErrorCode',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MachineType, {includeRelations: true}),
        },
      },
    },
  })
  async findByMachineTypeAndErrorCode(
    @param.query.string('machine_type') machine_type: string,
    @param.query.string('error_code') error_code: string,
  ): Promise<MachineType[]> {
    const query: any = {
      where: {
        machine_type
      },
      include: [
        {
          relation: 'machineErrorLevels',
          scope: {
            where: {error_code},
          },
        }
      ]
    };
    return this.machineTypeRepository.find(query);
  }

  @get('/findByIdAndErrorCode')
  @response(200, {
    description: 'find nearest MachineRecords',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MachineRecords),
        },
      },
    },
  })
  async findByIdAndErrorCode(
    @param.query.string('machine_id') machine_id: string,
    @param.query.string('error_code') error_code: string,
  ): Promise<MachineRecords[]> {
    const query: any = {
      order: "evt_dt ASC",
      where: {
        machine_id,
        error_code
      }
    };

    return this.machineRecordsRepository.find(query);
  }

  async findByIdAndStatus(
    @param.query.string('machine_id') machine_id: string,
    @param.query.string('status') status: number,
  ): Promise<MachineRecords[]> {
    const query: any = {
      order: "evt_dt ASC",
      where: {
        machine_id,
        status
      }
    };

    return this.machineRecordsRepository.find(query);
  }

  @get('/machine-records/count')
  @response(200, {
    description: 'MachineRecords model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MachineRecords) where?: Where<MachineRecords>,
  ): Promise<Count> {
    return this.machineRecordsRepository.count(where);
  }

  @get('/machine-records')
  @response(200, {
    description: 'Array of MachineRecords model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MachineRecords, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MachineRecords) filter?: Filter<MachineRecords>,
  ): Promise<MachineRecords[]> {
    return this.machineRecordsRepository.find(filter);
  }

  @patch('/machine-records')
  @response(200, {
    description: 'MachineRecords PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MachineRecords, {partial: true}),
        },
      },
    })
    machineRecords: MachineRecords,
    @param.where(MachineRecords) where?: Where<MachineRecords>,
  ): Promise<Count> {
    return this.machineRecordsRepository.updateAll(machineRecords, where);
  }

  @get('/machine-records/{id}')
  @response(200, {
    description: 'MachineRecords model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MachineRecords, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MachineRecords, {exclude: 'where'}) filter?: FilterExcludingWhere<MachineRecords>
  ): Promise<MachineRecords> {
    return this.machineRecordsRepository.findById(id, filter);
  }

  @patch('/machine-records/{id}')
  @response(204, {
    description: 'MachineRecords PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MachineRecords, {partial: true}),
        },
      },
    })
    machineRecords: MachineRecords,
  ): Promise<void> {
    await this.machineRecordsRepository.updateById(id, machineRecords);
  }

  @put('/machine-records/{id}')
  @response(204, {
    description: 'MachineRecords PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() machineRecords: MachineRecords,
  ): Promise<void> {
    await this.machineRecordsRepository.replaceById(id, machineRecords);
  }

  @del('/machine-records/{id}')
  @response(204, {
    description: 'MachineRecords DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.machineRecordsRepository.deleteById(id);
  }

  findSameSerial(arr: any[], attr: string) {
    let result: any[] = [];
    let i = 0;
    result[i] = [arr[0]];
    arr.reduce(function (prev, cur) {
      cur[attr] === prev[attr] ? result[i].push(cur) : result[++i] = [cur];
      return cur;
    });
    return result;
  }

  getSeries(arr: any[], attr: string, dis: number): MachineRecords[][] {
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
}
