/**
 * 專案名稱： POEM 輕量級進度管理平台
 * 部門代號： ML8100
 * 檔案說明： 使用者角色回應資料模型
 * @CREATE Fri Aug 07 2020 上午11:27:41
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

/**
 * 使用者角色回應資料模型
 *
 * @export
 */
export interface UserRoleResponse {
  id: string;
  name: string;
  description: string;
  composite: boolean;
  clientRole: boolean;
  containerId: string;
}
