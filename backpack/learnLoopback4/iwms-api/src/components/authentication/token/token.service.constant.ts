/**
 * 專案名稱： POEM进度管理平台
 * 部門代號： MLD600
 * 檔案說明： Token服務常數集
 * @CREATE Thursday April 06 2020 上午9:36:37
 * @author Fairy Lin
 * @contact Fairy_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import {TokenService} from '@loopback/authentication';
import {BindingKey} from '@loopback/core';

/**
 * Token服務常數集
 */
export namespace TokenServiceConstant {
  /**
   * Token Secret值
   */
  export const TOKEN_SECRET_VALUE = '3a7d3af4-a57d-11ea-bb37-0242ac130002';
  /**
   * Token時效
   */
  export const TOKEN_EXPIRES_IN_VALUE = '21600';
  /**
   * Token Secret綁定
   */
  export const TOKEN_SECRET = BindingKey.create<string>(
    'authentication.jwt.secret',
  );
  /**
   * Token時效綁定
   */
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expires.in.seconds',
  );
  /**
   * Token服務綁定
   */
  export const SERVICE_BINDING = BindingKey.create<TokenService>(
    'services.authentication.jwt.tokenservice',
  );
}
