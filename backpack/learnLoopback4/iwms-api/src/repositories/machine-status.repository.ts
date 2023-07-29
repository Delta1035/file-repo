import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IwmsDataSource} from '../datasources';
import {MachineStatus, MachineStatusRelations} from '../models';

export class MachineStatusRepository extends DefaultCrudRepository<
  MachineStatus,
  typeof MachineStatus.prototype.id,
  MachineStatusRelations
> {
  constructor(
    @inject('datasources.iwms') dataSource: IwmsDataSource,
  ) {
    super(MachineStatus, dataSource);
  }
}
