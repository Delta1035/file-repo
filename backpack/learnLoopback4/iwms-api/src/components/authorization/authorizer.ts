/**
 * 專案名稱： POEM 輕量級進度管理平台
 * 部門代號： ML8100
 * 檔案說明： 授權認證提供者
 * @CREATE Wed Aug 05 2020 下午7:03:59
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import {
	AuthorizationContext,
	AuthorizationDecision,
	AuthorizationMetadata,
	Authorizer
} from '@loopback/authorization';
import {Provider} from '@loopback/core';
import {RoleAuthorizationFactory} from './classes';

/**
 * 授權認證提供者
 *
 * @export
 * @class AuthorizationProvider
 * @implements {Provider<Authorizer>}
 */
export class AuthorizationProvider implements Provider<Authorizer> {
	constructor() {}

	/**
   * 提供授權認證呼叫窗口
   *
   * @method public
   * @returns authenticateFn
   */
	public value(): Authorizer {
		return this.authorize.bind(this);
	}

	/**
   * 授權
   *
   * @method public
   * @param authorizationCtx 授權所需內容
   * @param metadata         授權中繼資料
   * @return 回傳是否授權成功
   */
	public async authorize(
		authorizationCtx: AuthorizationContext,
		metadata: AuthorizationMetadata
	): Promise<AuthorizationDecision> {
		const authorization = RoleAuthorizationFactory.create(
			authorizationCtx,
			metadata
		);
		return authorization.authorize(authorizationCtx, metadata);
	}
}
