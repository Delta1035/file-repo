/**
 * 抽象驗證器
 */
export interface Validator<T = any> {
  /**
   * 驗證資料
   *
   * @method public
   * @param data 待驗證的資料
   * @return 回傳資料是否驗證失敗
   */
  validate(data: T): null | Error;
}
