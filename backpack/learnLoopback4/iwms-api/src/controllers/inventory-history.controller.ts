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
import {InventoryHistory, InventoryHistoryRelations} from '../models';
import {InventoryHistoryRepository} from '../repositories';

export class InventoryHistoryController {
  constructor(
    @repository(InventoryHistoryRepository)
    public inventoryHistoryRepository: InventoryHistoryRepository,
  ) { }

  @post('/inventory-histories')
  @response(200, {
    description: 'InventoryHistory model instance',
    content: {'application/json': {schema: getModelSchemaRef(InventoryHistory)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventoryHistory, {
            title: 'NewInventoryHistory',
            exclude: ['id'],
          }),
        },
      },
    })
    inventoryHistory: Omit<InventoryHistory, 'id'>,
  ): Promise<InventoryHistory> {
    return this.inventoryHistoryRepository.create(inventoryHistory);
  }

  @get('/inventory-histories/count')
  @response(200, {
    description: 'InventoryHistory model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(InventoryHistory) where?: Where<InventoryHistory>,
  ): Promise<Count> {
    return this.inventoryHistoryRepository.count(where);
  }

  @get('/inventory-histories')
  @response(200, {
    description: 'Array of InventoryHistory model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InventoryHistory, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(InventoryHistory) filter?: Filter<InventoryHistory>,
  ): Promise<InventoryHistory[]> {
    return this.inventoryHistoryRepository.find(filter);
  }

  @patch('/inventory-histories')
  @response(200, {
    description: 'InventoryHistory PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventoryHistory, {partial: true}),
        },
      },
    })
    inventoryHistory: InventoryHistory,
    @param.where(InventoryHistory) where?: Where<InventoryHistory>,
  ): Promise<Count> {
    return this.inventoryHistoryRepository.updateAll(inventoryHistory, where);
  }

  @get('/inventory-histories/{id}')
  @response(200, {
    description: 'InventoryHistory model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(InventoryHistory, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(InventoryHistory, {exclude: 'where'}) filter?: FilterExcludingWhere<InventoryHistory>
  ): Promise<InventoryHistory> {
    return this.inventoryHistoryRepository.findById(id, filter);
  }

  @patch('/inventory-histories/{id}')
  @response(204, {
    description: 'InventoryHistory PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventoryHistory, {partial: true}),
        },
      },
    })
    inventoryHistory: InventoryHistory,
  ): Promise<void> {
    await this.inventoryHistoryRepository.updateById(id, inventoryHistory);
  }

  @put('/inventory-histories/{id}')
  @response(204, {
    description: 'InventoryHistory PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() inventoryHistory: InventoryHistory,
  ): Promise<void> {
    await this.inventoryHistoryRepository.replaceById(id, inventoryHistory);
  }

  @del('/inventory-histories/{id}')
  @response(204, {
    description: 'InventoryHistory DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.inventoryHistoryRepository.deleteById(id);
  }

  @get('/inventory-histories/getToday')
  @response(200, {
    description: 'getToday',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InventoryHistory, {includeRelations: true}),
        },
      },
    },
  })
  async getTodayData(
    @param.query.string('date') date: string
  ): Promise<(InventoryHistory & InventoryHistoryRelations)[]> {
    /**
     * 根据date 得到当前0点和下一天的0点
     * [gte lt)
     */
    let start = this.getTodayZero(date);
    let end = this.getNextDateZero(date);

    const query = {
      where: {
        and: [
          {
            Date: {
              gte: start,
            }
          },
          {
            Date: {
              lt: end
            }
          }
        ]
      }
    };

    return this.inventoryHistoryRepository.find(query);
  }
  getTodayZero(date: string) {
    return new Date(date).setHours(0, 0, 0, 0);
  }
  getNextDateZero(date: string) {
    let dateStamp = new Date(date).setDate(new Date(date).getDate() + 1)
    return new Date(dateStamp).setHours(0, 0, 0, 0);
  }
}
