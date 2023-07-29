/**
 * 專案名稱： POEM 輕量級進度管理平台
 * 部門代號： ML8100
 * 檔案說明： 角色ID回應資料模型
 * @CREATE Fri Aug 07 2020 下午2:14:33
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

/**
 * 角色ID回應資料模型
 *
 * @export
 */
export interface RoleResponse {
  id: string;
  name: string;
  composite: boolean;
  clientRole: boolean;
  containerId: string;
}
