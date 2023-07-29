/**
 * 專案名稱： POEM进度管理平台
 * 部門代號： MLD600
 * 檔案說明： 授權元件
 * @CREATE Thursday April 06 2020 上午9:36:37
 * @author Fairy Lin
 * @contact Fairy_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import {AuthorizationTags} from '@loopback/authorization';
import {Binding, Component} from '@loopback/core';
import {AuthorizationProvider} from './authorizer';


/**
 * 授權元件
 */
export class AuthorizationComponent implements Component {

  /**
   * 绑定服务
   * @memberof AuthorizationComponent
   */
  public bindings: Binding[] = [
    Binding.bind('authorizationProvider')
      .toProvider(AuthorizationProvider)
      .tag(AuthorizationTags.AUTHORIZER),
  ];
  constructor() {};
}
