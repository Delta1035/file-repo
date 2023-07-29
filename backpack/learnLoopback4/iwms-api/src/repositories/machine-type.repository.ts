import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {IwmsDataSource} from '../datasources';
import {MachineType, MachineTypeRelations, MachineErrorLevel, Machine} from '../models';
import {MachineErrorLevelRepository} from './machine-error-level.repository';
import {MachineRepository} from './machine.repository';

export class MachineTypeRepository extends DefaultCrudRepository<
  MachineType,
  typeof MachineType.prototype.id,
  MachineTypeRelations
> {

  public readonly machineErrorLevels: HasManyRepositoryFactory<MachineErrorLevel, typeof MachineType.prototype.id>;

  public readonly machines: HasManyRepositoryFactory<Machine, typeof MachineType.prototype.id>;

  constructor(
    @inject('datasources.iwms') dataSource: IwmsDataSource, @repository.getter('MachineErrorLevelRepository') protected machineErrorLevelRepositoryGetter: Getter<MachineErrorLevelRepository>, @repository.getter('MachineRepository') protected machineRepositoryGetter: Getter<MachineRepository>,
  ) {
    super(MachineType, dataSource);
    this.machines = this.createHasManyRepositoryFactoryFor('machines', machineRepositoryGetter,);
    this.registerInclusionResolver('machines', this.machines.inclusionResolver);
    this.machineErrorLevels = this.createHasManyRepositoryFactoryFor('machineErrorLevels', machineErrorLevelRepositoryGetter,);
    this.registerInclusionResolver('machineErrorLevels', this.machineErrorLevels.inclusionResolver);
  }
}
