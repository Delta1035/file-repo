import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'blog',
  connector: 'mysql',
  url: 'mysql://blog_dev:blog3363787543@124.221.95.189:3306/blog_dev',
  host: '124.221.95.189',
  port: 3306,
  user: 'blog_dev',
  password: 'blog3363787543',
  database: 'blog_dev'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class BlogDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'blog';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.blog', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
