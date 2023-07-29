/**
 * 專案名稱： api
 * 部門代號： MLD500
 * 檔案說明： 抽象使用者資訊
 * @CREATE Monday, 6th December 2021 2:03:17 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { UserInfoByIdResponse } from './models';

/**
 * 抽象使用者資訊
 */
export interface UserInfo {
  /**
   * 取得特定工號的使用者資料
   *
   * @method public
   * @param userId 使用者工號
   * @return 回傳特定工號的使用者資料
   */
  getUserInfoById(userId: string): Promise<UserInfoByIdResponse>;
}
