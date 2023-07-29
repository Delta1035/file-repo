/**
 * IMP 處級資料模型
 */
export interface ImpDivision {
  /**
   * 處級單位流水號
   */
  id: number;
  /**
   * 處級單位群組
   */
  div_group: string;
  /**
   * 處級單位功能
   */
  functions: string;
  /**
   * 處級單位代碼
   */
  div: string;
  /**
   * 待確認
   */
  rate: number;
}
