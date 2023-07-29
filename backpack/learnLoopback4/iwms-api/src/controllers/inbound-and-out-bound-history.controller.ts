import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {InboundAndOutBoundHistory} from '../models';
import {InboundAndOutBoundHistoryRepository} from '../repositories';

export class InboundAndOutBoundHistoryController {
  constructor(
    @repository(InboundAndOutBoundHistoryRepository)
    public inboundAndOutBoundHistoryRepository : InboundAndOutBoundHistoryRepository,
  ) {}

  @post('/inbound-and-out-bound-histories')
  @response(200, {
    description: 'InboundAndOutBoundHistory model instance',
    content: {'application/json': {schema: getModelSchemaRef(InboundAndOutBoundHistory)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InboundAndOutBoundHistory, {
            title: 'NewInboundAndOutBoundHistory',
            exclude: ['id'],
          }),
        },
      },
    })
    inboundAndOutBoundHistory: Omit<InboundAndOutBoundHistory, 'id'>,
  ): Promise<InboundAndOutBoundHistory> {
    return this.inboundAndOutBoundHistoryRepository.create(inboundAndOutBoundHistory);
  }

  @get('/inbound-and-out-bound-histories/count')
  @response(200, {
    description: 'InboundAndOutBoundHistory model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(InboundAndOutBoundHistory) where?: Where<InboundAndOutBoundHistory>,
  ): Promise<Count> {
    return this.inboundAndOutBoundHistoryRepository.count(where);
  }

  @get('/inbound-and-out-bound-histories')
  @response(200, {
    description: 'Array of InboundAndOutBoundHistory model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InboundAndOutBoundHistory, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(InboundAndOutBoundHistory) filter?: Filter<InboundAndOutBoundHistory>,
  ): Promise<InboundAndOutBoundHistory[]> {
    return this.inboundAndOutBoundHistoryRepository.find(filter);
  }

  @patch('/inbound-and-out-bound-histories')
  @response(200, {
    description: 'InboundAndOutBoundHistory PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InboundAndOutBoundHistory, {partial: true}),
        },
      },
    })
    inboundAndOutBoundHistory: InboundAndOutBoundHistory,
    @param.where(InboundAndOutBoundHistory) where?: Where<InboundAndOutBoundHistory>,
  ): Promise<Count> {
    return this.inboundAndOutBoundHistoryRepository.updateAll(inboundAndOutBoundHistory, where);
  }

  @get('/inbound-and-out-bound-histories/{id}')
  @response(200, {
    description: 'InboundAndOutBoundHistory model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(InboundAndOutBoundHistory, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(InboundAndOutBoundHistory, {exclude: 'where'}) filter?: FilterExcludingWhere<InboundAndOutBoundHistory>
  ): Promise<InboundAndOutBoundHistory> {
    return this.inboundAndOutBoundHistoryRepository.findById(id, filter);
  }

  @patch('/inbound-and-out-bound-histories/{id}')
  @response(204, {
    description: 'InboundAndOutBoundHistory PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InboundAndOutBoundHistory, {partial: true}),
        },
      },
    })
    inboundAndOutBoundHistory: InboundAndOutBoundHistory,
  ): Promise<void> {
    await this.inboundAndOutBoundHistoryRepository.updateById(id, inboundAndOutBoundHistory);
  }

  @put('/inbound-and-out-bound-histories/{id}')
  @response(204, {
    description: 'InboundAndOutBoundHistory PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() inboundAndOutBoundHistory: InboundAndOutBoundHistory,
  ): Promise<void> {
    await this.inboundAndOutBoundHistoryRepository.replaceById(id, inboundAndOutBoundHistory);
  }

  @del('/inbound-and-out-bound-histories/{id}')
  @response(204, {
    description: 'InboundAndOutBoundHistory DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.inboundAndOutBoundHistoryRepository.deleteById(id);
  }
}
