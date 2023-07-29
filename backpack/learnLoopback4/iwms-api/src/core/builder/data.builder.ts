/**
 * 抽象資料建構者
 */
export interface DataBuilder<T> {
  /**
   * 建構資料
   *
   * @method public
   * @param args 資料所需參數
   * @return 回傳資料
   */
  build(...args: unknown[]): T;
}
