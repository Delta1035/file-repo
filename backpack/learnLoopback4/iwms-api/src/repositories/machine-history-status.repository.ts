import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {IwmsDataSource} from '../datasources';
import {MachineHistoryStatus, MachineHistoryStatusRelations, Machine} from '../models';
import {MachineRepository} from './machine.repository';

export class MachineHistoryStatusRepository extends DefaultCrudRepository<
  MachineHistoryStatus,
  typeof MachineHistoryStatus.prototype.evt_dt,
  MachineHistoryStatusRelations
> {

  public readonly machine: BelongsToAccessor<Machine, typeof MachineHistoryStatus.prototype.evt_dt>;

  constructor(
    @inject('datasources.iwms') dataSource: IwmsDataSource, @repository.getter('MachineRepository') protected machineRepositoryGetter: Getter<MachineRepository>,
  ) {
    super(MachineHistoryStatus, dataSource);
    this.machine = this.createBelongsToAccessorFor('machine', machineRepositoryGetter,);
    this.registerInclusionResolver('machine', this.machine.inclusionResolver);
  }
}
