import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IwmsDataSource} from '../datasources';
import {InventoryHistory, InventoryHistoryRelations} from '../models';

export class InventoryHistoryRepository extends DefaultCrudRepository<
  InventoryHistory,
  typeof InventoryHistory.prototype.id,
  InventoryHistoryRelations
> {
  constructor(
    @inject('datasources.iwms') dataSource: IwmsDataSource,
  ) {
    super(InventoryHistory, dataSource);
  }
}
