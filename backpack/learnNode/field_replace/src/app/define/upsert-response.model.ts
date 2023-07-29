
/**
 * 新增或修改回傳結果資料模型
 */
export interface UpsertResponse<T = any> {
  /**
   * 更新的項目
   */
  update: T[];
  /**
   * 新增的項目
   */
  create: T[];
}
