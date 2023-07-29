import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {IwmsDataSource} from '../datasources';
import {MachineErrorLevel, MachineErrorLevelRelations, MachineType} from '../models';
import {MachineTypeRepository} from './machine-type.repository';

export class MachineErrorLevelRepository extends DefaultCrudRepository<
  MachineErrorLevel,
  typeof MachineErrorLevel.prototype.id,
  MachineErrorLevelRelations
> {

  public readonly machine_level_for_machine_type: BelongsToAccessor<MachineType, typeof MachineErrorLevel.prototype.id>;

  constructor(
    @inject('datasources.iwms') dataSource: IwmsDataSource, @repository.getter('MachineTypeRepository') protected machineTypeRepositoryGetter: Getter<MachineTypeRepository>,
  ) {
    super(MachineErrorLevel, dataSource);
    this.machine_level_for_machine_type = this.createBelongsToAccessorFor('machine_level_for_machine_type', machineTypeRepositoryGetter,);
    this.registerInclusionResolver('machine_level_for_machine_type', this.machine_level_for_machine_type.inclusionResolver);
  }
}
