/**
 * 專案名稱： POEM 輕量級進度管理平台
 * 部門代號： MLD600
 * 檔案說明： Keycloak認證服務
 * @CREATE Thursday April 06 2020 上午9:36:37
 * @author Fairy Lin
 * @contact Fairy_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { inject } from '@loopback/core';
import * as admin from './../../../configs/keycloak.json';
import { KeycloakApi } from './keycloak-api';
import { KeycloakServiceConstant } from './keycloak.service.constant';
import { KeywordUserAction } from './keyword-user-action';
import {
  ClientIdResponse,
  LoginResponse,
  RoleResponse,
  UserInfoByIdResponse,
  UserInfoResponse,
  UserRoleResponse,
} from './models';
import { UserInfo } from './user-info';

/**
 * Keycloak認證服務
 */
export class KeycloakService implements UserInfo, KeywordUserAction {
  /**
   * @param userRepository User倉庫
   * @param keycloakApi 	 Keycloak RESTful API服務
   */
  constructor(
    @inject(KeycloakServiceConstant.SERVICE_INJECT)
    public readonly keycloakApi: KeycloakApi,
  ) {}

  /**
   * 取得管理員Token
   *
   * @method private
   * @return 回傳管理員Token
   */
  private async getAdminToken(): Promise<string> {
    return (await this.login(admin.k8s[0], admin.k8s[1])).access_token;
  }

  /**
   * 透過Keycloak進行LDAP認證
   *
   * @method public
   * @param username 工號
   * @param password 密碼
   * @return 回傳是否驗證成功
   */
  public login(username: string, password: string): Promise<LoginResponse> {
    return this.keycloakApi.login(username, password);
  }

  /**
   * 取得使用者資料
   *
   * @method public
   * @param token Token
   * @return 回傳使用者資料
   */
  public async getUserInfo(token: string): Promise<UserInfoResponse> {
    return this.keycloakApi.getUserInfo(token);
  }

  /**
   * 取得特定工號的使用者資料
   *
   * @method public
   * @param userId 使用者工號
   * @return 回傳特定工號的使用者資料
   */
  public async getUserInfoById(userId: string): Promise<UserInfoByIdResponse> {
    const adminToken = await this.getAdminToken();
    return this.keycloakApi
      .getUserInfoById(adminToken, userId)
      .then(users => users[0]);
  }

  /**
   * 透過關鍵字查詢使用者資料
   *
   * @method public
   * @param keyword 關鍵字
   * @return 回傳使用者資料
   */
  public async getUserInfoByKeyword(
    keyword: string,
  ): Promise<UserInfoByIdResponse[]> {
    const adminToken = await this.getAdminToken();
    return this.keycloakApi.getUserInfoByKeyword(adminToken, keyword);
  }

  /**
   * 取得Client ID
   *
   * @method public
   * @return 回傳Client ID
   */
  public async getClientId(): Promise<ClientIdResponse> {
    const adminToken = await this.getAdminToken();
    return this.keycloakApi
      .getClientId(adminToken)
      .then(clientId => clientId[0]);
  }

  /**
   * 取得使用者角色
   *
   * @method public
   * @param user 使用者工號
   * @return 回傳使用者角色
   */
  public async getUserRoles(user: string): Promise<UserRoleResponse[]> {
    const adminToken = await this.getAdminToken();
    const userId = (await this.getUserInfoById(user)).id;
    const clientId = (await this.getClientId()).id;
    return this.keycloakApi.getUserRoles(adminToken, userId, clientId);
  }

  /**
   * 取得角色
   *
   * @method public
   * @param role 角色
   * @return 回傳角色
   */
  public async getRole(role: string): Promise<RoleResponse> {
    const adminToken = await this.getAdminToken();
    const clientId = (await this.getClientId()).id;
    return this.keycloakApi.getRole(adminToken, clientId, role);
  }

  /**
   * 取得角色ID
   *
   * @method public
   * @param role 角色
   * @return 回傳角色ID
   */
  public async getRoleId(role: string): Promise<string> {
    const adminToken = await this.getAdminToken();
    const clientId = (await this.getClientId()).id;
    return (await this.keycloakApi.getRole(adminToken, clientId, role)).id;
  }

  /**
   * 新增使用者角色
   *
   * @method public
   * @param user 使用者工號
   * @param role  角色
   */
  public async addUserRole(user: string, role: string) {
    const isUserExist = await this.getUserRoles(user);
    const isUserExistRolePlantPMO = isUserExist.filter(
      dt => dt.name === 'plant-pmo',
    );
    if (isUserExistRolePlantPMO.length > 0) {
      return;
    }
    const adminToken = await this.getAdminToken();
    const userId = (await this.getUserInfoById(user)).id;
    const clientId = (await this.getClientId()).id;
    const roleId = await this.getRoleId(role);
    this.keycloakApi.addUserRole(adminToken, userId, clientId, role, roleId);
  }

  /**
   * 移除使用者角色
   *
   * @method public
   * @param user 使用者工號
   */
  public async removeUserRole(user: string) {
    const adminToken = await this.getAdminToken();
    const userInfo = await this.getUserInfoById(user);
    if (userInfo) {
      const userId = userInfo.id;
      const clientId = (await this.getClientId()).id;
      const detailedRole = await this.getUserRoles(user);
      this.keycloakApi.removeUserRole(
        adminToken,
        userId,
        clientId,
        detailedRole,
      );
    } else {
      throw new Error(`User ${user} not exist`);
    }
  }

  /**
   * 移除使用者特定角色
   *
   * @method public
   * @param user 使用者工號
   * @param role 使用者角色
   */
  public async removeSpecificUserRole(user: string, role: string) {
    const adminToken = await this.getAdminToken();
    const userInfo = await this.getUserInfoById(user);
    if (userInfo) {
      const userId = userInfo.id;
      const clientId = (await this.getClientId()).id;
      const detailedRole = (await this.getUserRoles(user)).filter(
        roles => roles.name === role,
      );
      this.keycloakApi.removeUserRole(
        adminToken,
        userId,
        clientId,
        detailedRole,
      );
    } else {
      throw new Error(`User ${user} not exist`);
    }
  }
}
