/**
 * 專案名稱： POEM 輕量級進度管理平台
 * 部門代號： ML8100
 * 檔案說明： 角色授權工廠
 * @CREATE Thu Aug 06 2020 下午1:03:33
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import {
	AuthorizationContext,
	AuthorizationMetadata
} from '@loopback/authorization';
import {OwnerAuthorization} from './owner-authorization';
import {RoleAuthorization} from './role-authorization';
import {RoleMatchedAuthorization} from './role-matched-authorization';

/**
 * 角色授權工廠
 *
 * @export
 * @class RuleAuthorizationFactory
 */
export class RoleAuthorizationFactory {
	/**
   * 產生對應的授權方式
   *
   * @method public
   * @param authorizationCtx 授權所需內容
   * @param metadata         授權中繼資料
   * @return 回傳對應的授權策略
   */
	public static create(
		authorizationCtx: AuthorizationContext,
		metadata: AuthorizationMetadata
	): RoleAuthorization {
		if (authorizationCtx.invocationContext.methodName === 'findById') {
			return new OwnerAuthorization();
		} else {
			return new RoleMatchedAuthorization();
		}
	}
}
