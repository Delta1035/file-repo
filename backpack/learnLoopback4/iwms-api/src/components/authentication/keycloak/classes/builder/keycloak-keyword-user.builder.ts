/**
 * 專案名稱： poem-api
 * 部門代號： ML8100
 * 檔案說明： Keycloak 服務關鍵字使用者建構者
 * @CREATE Thursday, 27th January 2022 8:21:31 am
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import {DataBuilder} from '../../../../../core';
import {KeywordUser} from '../../../../../models';
import {UserInfoByIdResponse} from '../../models';

/**
 * Keycloak 服務關鍵字使用者建構者
 */
export class KeycloakKeywordUserBuilder implements DataBuilder<KeywordUser> {
  /**
   * @param response 使用者資料透過ID查詢後的回應資料模型
   */
  constructor(private response: UserInfoByIdResponse) { }

  /**
   * 建構資料
   *
   * @method public
   * @param args 資料所需參數
   * @return 回傳資料
   */
  public build(): KeywordUser {
    return new KeywordUser({
      id: this.response.username,
      name: this.response.firstName,
      email: this.response.email,
    });
  }
}
