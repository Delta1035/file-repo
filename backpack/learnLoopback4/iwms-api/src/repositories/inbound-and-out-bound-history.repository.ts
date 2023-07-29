import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IwmsDataSource} from '../datasources';
import {InboundAndOutBoundHistory, InboundAndOutBoundHistoryRelations} from '../models';

export class InboundAndOutBoundHistoryRepository extends DefaultCrudRepository<
  InboundAndOutBoundHistory,
  typeof InboundAndOutBoundHistory.prototype.id,
  InboundAndOutBoundHistoryRelations
> {
  constructor(
    @inject('datasources.iwms') dataSource: IwmsDataSource,
  ) {
    super(InboundAndOutBoundHistory, dataSource);
  }
}
