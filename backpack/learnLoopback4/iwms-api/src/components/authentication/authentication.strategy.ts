/**
 * 專案名稱： POEM进度管理平台
 * 部門代號： MLD600
 * 檔案說明： 授权策略
 * @CREATE Thursday April 06 2020 上午9:36:37
 * @author Fairy Lin
 * @contact Fairy_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import {AuthenticationStrategy, TokenService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {extractCredentials} from './token/token-extractor';
import {TokenServiceConstant} from './token/token.service.constant';

/**
 * 授權策略
 */
export class JwtAuthenticationStrategy implements AuthenticationStrategy {
  /**
   * 授權方式名稱
   *
   * @memberof JwtAuthenticationStrategy
   */
  public name = 'jwt';

  /**
   * @param tokenService Token服務
   */
  constructor(
    @inject(TokenServiceConstant.SERVICE_BINDING)
    public readonly tokenService: TokenService,
  ) {
  }

  /**
   * 授權驗證
   *
   * @method public
   * @param request HTTP請求
   * @return 回傳User簡介
   */
  public async authenticate(
    request: Request,
  ): Promise<UserProfile | undefined> {
    const token = extractCredentials(request);
    const userProfile: UserProfile = await this.tokenService.verifyToken(token);
    return userProfile;
  }
}
