/**
 * 專案名稱： POEM 輕量級進度管理平台
 * 部門代號： ML8100
 * 檔案說明： 使用者資料回應資料模型
 * @CREATE Thu Aug 06 2020 下午5:51:02
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

/**
 * 使用者資料回應資料模型
 *
 * @export
 */
export interface UserInfoResponse {
  sub: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  email_verified: boolean;
  name: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  preferred_username: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  given_name: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  family_name: string;
  email: string;
}

/**
 * 使用者資料透過ID查詢後的回應資料模型
 *
 * @export
 */
export interface UserInfoByIdResponse {
  id: string;
  createdTimestamp: number;
  username: string;
  enabled: boolean;
  totp: boolean;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  email: string;
  federationLink: string;
  attributes: Attributes;
  notBefore: number;
  access: Access;
}

/**
 *
 *
 * @interface Access
 */
interface Access {
  manageGroupMembership: boolean;
  view: boolean;
  mapRoles: boolean;
  impersonate: boolean;
  manage: boolean;
}

/**
 *
 *
 * @interface Attributes
 */
interface Attributes {
  LDAP_ENTRY_DN: string[];
  modifyTimestamp: string[];
  createTimestamp: string[];
  LDAP_ID: string[];
}
