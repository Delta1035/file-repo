import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {IwmsDataSource} from '../datasources';
import {Machine, MachineHistoryStatus, MachineRelations, MachineStatus, MachineType} from '../models';
import {MachineHistoryStatusRepository} from './machine-history-status.repository';
import {MachineStatusRepository} from './machine-status.repository';
import {MachineTypeRepository} from './machine-type.repository';

export class MachineRepository extends DefaultCrudRepository<
  Machine,
  typeof Machine.prototype.id,
  MachineRelations
> {

  public readonly machineType: BelongsToAccessor<MachineType, typeof Machine.prototype.id>;

  public readonly machineStatus: HasOneRepositoryFactory<MachineStatus, typeof Machine.prototype.id>;

  public readonly machineHistoryStatuses: HasManyRepositoryFactory<MachineHistoryStatus, typeof Machine.prototype.id>;

  constructor(
    @inject('datasources.iwms') dataSource: IwmsDataSource, @repository.getter('MachineTypeRepository') protected machineTypeRepositoryGetter: Getter<MachineTypeRepository>, @repository.getter('MachineStatusRepository') protected machineStatusRepositoryGetter: Getter<MachineStatusRepository>, @repository.getter('MachineHistoryStatusRepository') protected machineHistoryStatusRepositoryGetter: Getter<MachineHistoryStatusRepository>,
  ) {
    super(Machine, dataSource);
    this.machineHistoryStatuses = this.createHasManyRepositoryFactoryFor('machineHistoryStatuses', machineHistoryStatusRepositoryGetter,);
    this.registerInclusionResolver('machineHistoryStatuses', this.machineHistoryStatuses.inclusionResolver);
    this.machineStatus = this.createHasOneRepositoryFactoryFor('machineStatus', machineStatusRepositoryGetter);
    this.registerInclusionResolver('machineStatus', this.machineStatus.inclusionResolver);
    this.machineType = this.createBelongsToAccessorFor('machineType', machineTypeRepositoryGetter,);
    this.registerInclusionResolver('machineType', this.machineType.inclusionResolver);
  }
}
