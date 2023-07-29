

import {Filter} from '@loopback/repository';

/**
 * 抽象 Loopback Filter 條件查詢建構者
 */
export interface LoopbackFilterBuilder {
  /**
   * 建構查詢條件
   *
   * @method public
   * @param args 查詢所需參數
   * @return 回傳查詢條件
   */
  build(...args: unknown[]): Filter;
}
