/**
 * 專案名稱： POEM 輕量級進度管理平台
 * 部門代號： ML8100
 * 檔案說明： Keycloak登入回應資料模型
 * @CREATE Thu Aug 06 2020 下午5:44:27
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

/**
 * Keycloak登入回應資料模型
 *
 * @export
 * @interface LoginResponse
 */
export interface LoginResponse {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	access_token: string;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	expires_in: number;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	refresh_expires_in: number;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	refresh_token: string;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	token_type: string;
	'not-before-policy': number;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	session_state: string;
	scope: string;
}
