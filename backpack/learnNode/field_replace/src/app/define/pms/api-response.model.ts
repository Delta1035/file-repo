

/**
 * 新增或修改回傳結果資料模型
 */
export interface ApiResponse<T = any> {

  // 結果
  success: boolean;

  // 回傳訊息
  msg: string;

  // 回傳資料
  data?: T[];
}
