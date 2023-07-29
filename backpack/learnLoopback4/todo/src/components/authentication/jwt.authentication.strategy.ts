import {AuthenticationStrategy, TokenService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {SERVICE_BINDING} from '../token/constant';
import {extractCredentials} from '../token/token-extractor';

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
    @inject(SERVICE_BINDING)
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
    return this.tokenService.verifyToken(token);
  }
}
