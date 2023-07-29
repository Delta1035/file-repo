
/**
 * 抽象資料建構者
 */
export interface DataBuilder<D = any> {
  /**
   * 建構資料
   *
   * @method public
   * @return 回傳建構後的資料
   */
  build(): D;
}
