import {TokenService} from '@loopback/authentication';
import {HttpErrors} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {verifyToken} from './token-extractor';

/**
 * JWT服務
 */
export class JwtService implements TokenService {
  /**
   * 驗證Token是否有效
   *
   * @method public
   * @param token Token
   * @return 回傳User簡介資料
   */
  public async verifyToken(token: string): Promise<UserProfile> {
    if (!token) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : 'token' is null`,
      );
    }
    let userProfile: UserProfile;
    try {
      // 驗證token的合法性
      const result = await verifyToken<unknown>(token);
      console.log('result', result);

      // TODO: 可以解析decodeToken來返回userProfile
      userProfile = Object.assign({email: ''});
    } catch (error) {
      throw new HttpErrors.Unauthorized(`${error.message}`);
    }
    return userProfile;
  }

  /**
   * 生成token
   * @param userProfile
   */
  generateToken(userProfile: UserProfile): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
