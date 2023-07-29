/**
 * 專案名稱： POEM 輕量級進度管理平台
 * 部門代號： ML8100
 * 檔案說明： 角色相符授權策略
 * @CREATE Thu Aug 06 2020 下午1:21:13
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
import {RoleAuthorization} from './role-authorization';

/**
 * 角色相符授權策略
 *
 * @export
 * @class RoleMatchedAuthorization
 * @implements {RoleAuthorization}
 */
export class RoleMatchedAuthorization implements RoleAuthorization {
  constructor() { }

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
    metadata: AuthorizationMetadata,
  ): Promise<AuthorizationDecision> | AuthorizationDecision {
    const clientRoles = authorizationCtx.principals[0].name;
    const allowedRoles: any = metadata.allowedRoles;
    let allow = false;
    clientRoles.forEach((role: string) => {
      if (!allow) {
        allow = allowedRoles.includes(role);
      }
    });
    return allow ? AuthorizationDecision.ALLOW : AuthorizationDecision.DENY;
  }
}
