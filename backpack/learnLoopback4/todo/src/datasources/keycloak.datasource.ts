import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './keycloak.datasource.config.json';
// const config = {
//   name: 'keycloak',
//   connector: 'rest',
//   baseURL: 'http://127.0.0.1:8080',
//   crud: false
// };

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class KeycloakDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'keycloak';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.keycloak', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
