/**
 * 專案名稱： POEM 輕量級進度管理平台
 * 部門代號： ML8100
 * 檔案說明： 角色相符授權策略
 * @CREATE Thu Aug 06 2020 下午2:05:48
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import {
  AuthorizationContext,
  AuthorizationDecision,
  AuthorizationMetadata
} from '@loopback/authorization';
import { RoleAuthorization } from './role-authorization';
import { RoleMatchedAuthorization } from './role-matched-authorization';

/**
 * 角色相符授權策略
 *
 * @export
 * @class OwnerAuthorization
 * @implements {RoleAuthorization}
 */
export class OwnerAuthorization implements RoleAuthorization {
  constructor() {}

  /**
   * 進行授權驗證
   *
   * @method public
   * @param authorizationCtx 授權所需內容
   * @param metadata         授權中繼資料
   * @return 回傳授權結果
   */
  public authorize(
    authorizationCtx: AuthorizationContext,
    metadata: AuthorizationMetadata
  ): Promise<AuthorizationDecision> | AuthorizationDecision {
    const roleMatchedAuthorization = new RoleMatchedAuthorization();
    if (!roleMatchedAuthorization.authorize(authorizationCtx, metadata)) {
      return AuthorizationDecision.DENY;
    }

    const userId = authorizationCtx.principals[0].id;
    return userId === authorizationCtx.invocationContext.args[0]
      ? AuthorizationDecision.ALLOW
      : AuthorizationDecision.DENY;
  }
}
