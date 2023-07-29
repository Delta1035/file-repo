import {HttpErrors, Request} from '@loopback/rest';
import * as jwt from 'jsonwebtoken';
import * as jwtConfig from '../../configs/jwtConfig.json';
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

  // 判斷Bearer開頭
  if (!authHeaderValue.startsWith('Bearer')) {
    throw new HttpErrors.Unauthorized(
      `Authorization header is not of type 'Bearer'.`,
    );
  }

  //token為'Bearer xxx.yyy.zzz`格式，拿到xxx.yyy.zzz
  const parts = authHeaderValue.split(' ');
  if (parts.length !== 2)
    throw new HttpErrors.Unauthorized(
      `Authorization header value has too many parts. It must follow the pattern: 'Bearer xx.yy.zz' where xx.yy.zz is a valid JWT token.`,
    );
  return parts[1];
}

/**
 * 解析Token，進行驗證合法性
 *
 * @function
 * @param token  Token權杖
 * @return 回傳Token內提取的資訊
 */
export function verifyToken<T>(token: string): T {
  console.log(jwtConfig.public_key);

  return jwt.verify(token, jwtConfig.public_key) as T;
}
