/**
 * 專案名稱： POEM进度管理平台
 * 部門代號： MLD600
 * 檔案說明： Token提取
 * @CREATE Thursday April 06 2020 上午9:36:37
 * @author Fairy Lin
 * @contact Fairy_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import {HttpErrors, Request} from '@loopback/rest';
import * as jwt from 'jsonwebtoken';

/**
 * Token提取，提取出Bearer Token的內文
 * - Bearer {Token} => Token
 *
 * @function
 * @param request HTTP請求
 * @return 回傳Token
 */
export function extractCredentials(request: Request): string {
  if (!request.headers.authorization) {
    throw new HttpErrors.Unauthorized(`Authorization header not found.`);
  }

  // 授權Token格式: Bearer xxx.yyy.zzz
  const authHeaderValue = request.headers.authorization;

  if (!authHeaderValue.startsWith('Bearer')) {
    throw new HttpErrors.Unauthorized(
      `Authorization header is not of type 'Bearer'.`,
    );
  }

  // 將'Bearer'及'xxx.yyy.zzz'(JWT)的部分分離
  const parts = authHeaderValue.split(' ');
  if (parts.length !== 2)
    throw new HttpErrors.Unauthorized(
      `Authorization header value has too many parts. It must follow the pattern: 'Bearer xx.yy.zz' where xx.yy.zz is a valid JWT token.`,
    );
  const token = parts[1];

  return token;
}

/**
 * 解析Token，將Token中的資訊提取出來
 *
 * @function
 * @param token  Token權杖
 * @return 回傳Token內提取的資訊
 */
export function decodeToken<T>(
  token: string
): any {
  return jwt.decode(token);
}
