/**
 * 專案名稱： poem-api
 * 部門代號： ML8100
 * 檔案說明： 抽象使用者關鍵字查詢行為
 * @CREATE Wednesday, 26th January 2022 5:40:30 pm
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { UserInfoByIdResponse } from './models';

/**
 * 抽象使用者關鍵字查詢行為
 */
export interface KeywordUserAction<R = UserInfoByIdResponse> {
  /**
   * 透過關鍵字查詢使用者資料
   *
   * @method public
   * @param keyword 關鍵字
   * @return 回傳使用者資料
   */
  getUserInfoByKeyword(keyword: string): Promise<R[]>;
}
