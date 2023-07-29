/**
 * 專案名稱： POEM 輕量級進度管理平台
 * 部門代號： MLD600
 * 檔案說明： 抽象 Keycloak RESTful API
 * @CREATE Thursday April 06 2020 上午9:36:37
 * @author Fairy Lin
 * @contact Fairy_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import {
  ClientIdResponse,
  LoginResponse,
  RoleResponse,
  UserInfoByIdResponse,
  UserInfoResponse,
  UserRoleResponse,
} from './models';

/**
 * 抽象 Keycloak RESTful API
 */
export interface KeycloakApi {
  /**
   * 登入
   *
   * @method public
   * @param username 使用者名稱
   * @param password 使用者密碼
   * @return 回傳Token
   */
  login(username: string, password: string): Promise<LoginResponse>;

  /**
   * 取得使用者資料
   *
   * @method public
   * @param token Token
   * @return 回傳使用者資料
   */
  getUserInfo(token: string): Promise<UserInfoResponse>;

  /**
   * 取得特定工號的使用者資料
   *
   * @method public
   * @param token  Token
   * @param userId 使用者工號
   * @return 回傳特定工號的使用者資料
   */
  getUserInfoById(
    token: string,
    userId: string,
  ): Promise<UserInfoByIdResponse[]>;

  /**
   * 透過關鍵字查詢使用者資料
   *
   * @method public
   * @param token   Token
   * @param keyword 關鍵字
   * @return 回傳使用者資料
   */
  getUserInfoByKeyword(
    token: string,
    keyword: string,
  ): Promise<UserInfoByIdResponse[]>;

  /**
   * 取得Client ID
   *
   * @method public
   * @param token Token
   * @return 回傳Client ID
   */
  getClientId(token: string): Promise<ClientIdResponse[]>;

  /**
   * 取得使用者角色
   *
   * @method public
   * @param token    Token
   * @param userId   User在Keycloak的ID
   * @param clientId User在Keycloak所屬Client的ID
   * @return 回傳使用者角色
   */
  getUserRoles(
    token: string,
    userId: string,
    clientId: string,
  ): Promise<UserRoleResponse[]>;

  /**
   * 取得角色資料
   *
   * @method public
   * @param token    Token
   * @param clientId 特定Client的ID
   * @param role     角色
   * @return 回傳角色資料
   */
  getRole(token: string, clientId: string, role: string): Promise<RoleResponse>;

  /**
   * 新增使用者角色
   *
   * @method public
   * @param token    Token
   * @param userId   User在Keycloak的ID
   * @param clientId 特定Client的ID
   * @param role     角色
   * @param roleId   角色ID
   */
  addUserRole(
    token: string,
    userId: string,
    clientId: string,
    role: string,
    roleId: string,
  ): void;

  /**
   * 移除使用者角色
   *
   * @method public
   * @param token    Token
   * @param userId   User在Keycloak的ID
   * @param clientId 特定Client的ID
   * @param role     角色細節資料
   */
  removeUserRole(
    token: string,
    userId: string,
    clientId: string,
    role: RoleResponse[],
  ): void;
}
