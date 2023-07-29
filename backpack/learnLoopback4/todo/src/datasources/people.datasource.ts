import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'restds',
  connector: 'rest',
  baseURL: 'https://swapi.dev/api/',
  crud: false,
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  },
  operations: [
    {
      template: {
        method: 'GET',
        url: 'https://swapi.dev/api/people/{personId}',
      },
      functions: {
        getCharacter: ['personId'],
      },
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PeopleDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'people';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.people', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
