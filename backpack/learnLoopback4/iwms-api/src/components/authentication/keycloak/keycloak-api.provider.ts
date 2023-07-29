/**
 * 專案名稱： POEM进度管理平台
 * 部門代號： MLD600
 * 檔案說明： Keycloak RESTful API提供者
 * @CREATE Thursday April 06 2020 上午9:36:37
 * @author Fairy Lin
 * @contact Fairy_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {KeycloakDataSource} from '../../../datasources/keycloak.datasource';
import {KeycloakApi} from './keycloak-api';

/**
 * Keycloak RESTful API提供者
 */
export class KeycloakApiProvider implements Provider<KeycloakApi> {
	/**
	 * @param dataSource 資料來源
	 */
	constructor(
		@inject('datasources.keycloak')
		protected dataSource: KeycloakDataSource = new KeycloakDataSource()
	) { } /**
   * 提供RESTful API Template呼叫窗口
   *
   * @method public
   * @return 回傳API Template
   */

	public value(): Promise<KeycloakApi> {
		return getService(this.dataSource);
	}
}
