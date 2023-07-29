import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {PeopleDataSource} from '../datasources';

export interface People {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  getCharacter(personId: number): Promise<object>;
}

export class PeopleProvider implements Provider<People> {
  constructor(
    // restds must match the name property in the datasource json file
    @inject('datasources.people')
    protected dataSource: PeopleDataSource = new PeopleDataSource(),
  ) {}

  value(): Promise<People> {
    return getService(this.dataSource);
  }
}
