/**
 * 專案名稱： poem-api
 * 部門代號： ML8100
 * 檔案說明： 關鍵字使用者裝飾器
 * @CREATE Thursday, 27th January 2022 8:16:48 am
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { KeywordUser } from '../../../../../models';
import { KeywordUserAction } from '../../keyword-user-action';
import { KeycloakKeywordUserBuilder as Builder } from '../builder';

/**
 * 關鍵字使用者裝飾器
 */
export class KeywordUserDecorator implements KeywordUserAction<KeywordUser> {
  /**
   * @param service 使用者關鍵字查詢服務
   */
  constructor(private readonly service: KeywordUserAction) {}

  /**
   * 透過關鍵字查詢使用者資料
   *
   * @method public
   * @param keyword 關鍵字
   * @return 回傳使用者資料
   */
  public getUserInfoByKeyword(keyword: string): Promise<KeywordUser[]> {
    return this.service
      .getUserInfoByKeyword(keyword)
      .then(users => users.map(user => new Builder(user).build()));
  }
}
