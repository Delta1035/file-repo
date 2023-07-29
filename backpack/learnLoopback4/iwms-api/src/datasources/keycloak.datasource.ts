/**
 * 專案名稱： POEM进度管理平台
 * 部門代號： MLD600
 * 檔案說明： 登录access_token资料来源
 * @CREATE Thursday April 06 2020 上午9:36:37
 * @author Fairy Lin
 * @contact Fairy_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './keycloak.datasource.config.json';

@lifeCycleObserver('datasource')
export class KeycloakDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'keycloak';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.keycloak', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
