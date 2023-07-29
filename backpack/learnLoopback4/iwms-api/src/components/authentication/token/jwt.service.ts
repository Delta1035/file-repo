/**
 * 專案名稱： POEM进度管理平台
 * 部門代號： MLD600
 * 檔案說明： JWT服務
 * @CREATE Thursday April 06 2020 上午9:36:37
 * @author Fairy Lin
 * @contact Fairy_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import {TokenService} from '@loopback/authentication';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {decodeToken} from './token-extractor';

/**
 * JWT服務
 */
export class JwtService implements TokenService {
  /**
   * @param jwtSecret    Token密鑰
   * @param jwtExpiresIn Token時效
   */
  constructor() { }
  generateToken(userProfile: UserProfile): Promise<string> {
    throw new Error('Method not implemented.');
  }
  revokeToken?(token: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

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
      const decodedToken = await decodeToken<any>(token);
      userProfile = Object.assign(
        {
          [securityId]: [],
          name: [],
          givenName: '',
          id: '',
          email: '',
        },
        {
          [securityId]: decodedToken.resource_access['account'].roles || [],
          name: decodedToken.resource_access['account'].roles || [],
          givenName: decodedToken.given_name,
          id: decodedToken.preferred_username,
          email: decodedToken?.email,
        },
      );
    } catch (error) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : ${error.message}`,
      );
    }
    return userProfile;
  }
}
