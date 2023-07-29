import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {IwmsDataSource} from '../datasources';
import {MachineRecords, MachineRecordsRelations} from '../models';

export class MachineRecordsRepository extends DefaultCrudRepository<
  MachineRecords,
  typeof MachineRecords.prototype.id,
  MachineRecordsRelations
> {
  constructor(
    @inject('datasources.iwms') dataSource: IwmsDataSource,
  ) {
    super(MachineRecords, dataSource);
  }
}
