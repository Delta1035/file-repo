
/**
 * 專案名稱： POEM进度管理平台
 * 部門代號： MLD600
 * 檔案說明： Keycloak服務常數集
 * @CREATE Thursday April 06 2020 上午9:36:37
 * @author Fairy Lin
 * @contact Fairy_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import {BindingKey} from '@loopback/core';
import {KeycloakService} from './keycloak.service';

/**
 * Keycloak服務常數集
 */
export namespace KeycloakServiceConstant {
  /**
   * Keycloak RESTful API注入名稱
   */
  export const SERVICE_INJECT = 'services.keycloak.api';
  /**
   * Keycloak服務綁定
   */
  export const SERVICE_BINDING = BindingKey.create<KeycloakService>(
    'services.keycloak',
  );
}
