/**
 * 專案名稱： POEM进度管理平台
 * 部門代號： MLD600
 * 檔案說明： 使用者控制器
 * @CREATE Thursday April 06 2020 上午9:36:37
 * @author Fairy Lin
 * @contact Fairy_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  Request,
  RestBindings
} from '@loopback/rest';
import CryptoJS from 'crypto-js';
import {
  KeycloakService,
  KeycloakServiceConstant, UserInfo
} from '../components';
import {decodeToken, extractCredentials} from '../components/authentication/token/token-extractor';
import {SECRET} from '../constants/crypto/secret.constant';
import {User} from '../models';
// import {PoemUserInfoRepository, RoleMapRepository} from '../repositories';

/**
 * 使用者控制器
 *
 * @export
 * @class UserController
 */
export class UserController {
  /**
   * Keycloak 認證服務代理者
   */
  private keycloakProxy: UserInfo;

  /**
   * @param req               HTTP請求
   * @param keycloak          Keycloak 認證服務
   * @param roleMapRepository 角色倉庫
   * @param poemUserInfoRepo  POEM 使用者資訊倉庫
   */
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject(KeycloakServiceConstant.SERVICE_BINDING)
    private keycloak: KeycloakService,
    // @repository(RoleMapRepository)
    // public roleMapRepository: RoleMapRepository,
    // @repository(PoemUserInfoRepository)
    // private readonly poemUserInfoRepo: PoemUserInfoRepository,
  ) {
    // this.keycloakProxy = new KeycloakProxy(keycloak, poemUserInfoRepo);
  }

  /**
   * LDAP登入
   *
   * @method public
   * @param username 账号
   * @param password 密码
   * @return 回傳登入後的Token
   */
  @post('/login', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(User)},
        },
      },
    },
  })
  async login(
    @param.query.string('username', {required: true})
    username: string,
    @param.query.string('password', {required: true})
    password: string,
  ): Promise<object> {
    const bytes = CryptoJS.AES.decrypt(password, SECRET);
    const pass_decoded = bytes.toString(CryptoJS.enc.Utf8);
    const message = await this.keycloak.login(username, pass_decoded);
    return message;
  }

  /**
   * 取得使用者的角色
   *
   * @method public
   * @return 回傳此用者的角色
   */
  @authenticate('jwt')
  @get('/role', {
    responses: {
      '200': {
        description: 'RoleMap model count',
        content: {'application/json': {schema: {type: 'string'}}},
      },
    },
  })
  public async role(): Promise<string[]> {
    const token = extractCredentials(this.req);
    const decodedToken = decodeToken(token);
    return decodedToken.resource_access['iwms-dashboard'].roles || [];
  }

  /**
   * 取得使用者的資訊(如英文名及Email等)
   *
   * @method public
   * @return 回傳此用者的資訊
   */
  @authenticate('jwt')
  @get('/info', {
    responses: {
      '200': {
        description: 'User Information',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              title: 'UserInfoResponse',
              properties: {
                enname: {type: 'string'},
                email: {type: 'string'},
                id: {type: 'string'},
              },
            },
          },
        },
      },
    },
  })
  public async getUserInfo(): Promise<object> {
    const token = extractCredentials(this.req);
    const decodedToken = decodeToken(token);
    const reponse = {
      id: decodedToken.preferred_username,
      enname: decodedToken.given_name,
      email: decodedToken.email,
    };
    return reponse;
  }

  // /**
  //  * 取得使用者的資訊(如英文名及Email等)
  //  *
  //  * @method public
  //  * @return 回傳此用者的資訊
  //  */
  // @authenticate('jwt')
  // @get('/info/{id}', {
  //   responses: {
  //     '200': {
  //       description: 'User Information by ID',
  //       content: {
  //         'application/json': {
  //           schema: {
  //             type: 'object',
  //             title: 'UserInfoByIdResponse',
  //             properties: {
  //               enname: {type: 'string'},
  //               chname: {type: 'string'},
  //               email: {type: 'string'},
  //               id: {type: 'string'},
  //               team: {type: 'string'},
  //               plant: {type: 'string'},
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // })
  // public async getUserInfoById(
  //   @param.path.string('id') userId: string,
  // ): Promise<UserById> {
  //   const userInfo = await this.keycloakProxy.getUserInfoById(userId);
  //   let roleMapInfo: RoleMap;
  //   let reponse: UserById;
  //   try {
  //     roleMapInfo = await this.roleMapRepository.findById(userId);
  //     reponse = {
  //       id: userInfo.username,
  //       enname: userInfo.firstName,
  //       chname: userInfo.lastName,
  //       email: userInfo.email,
  //       team: roleMapInfo.team,
  //       plant: roleMapInfo.plant,
  //     };
  //   } catch (error) {
  //     reponse = {
  //       id: userInfo.username,
  //       enname: userInfo.firstName,
  //       chname: userInfo.lastName,
  //       email: userInfo.email,
  //       team: null,
  //       plant: null,
  //     };
  //   }
  //   return reponse;
  // }

  // /**
  //  * 透過關鍵字查詢使用者資料
  //  *
  //  * @method public
  //  * @param keyword 關鍵字
  //  * @return 回傳使用者資料
  //  */
  // @get('/infos/{keyword}', {
  //   responses: {
  //     '200': {
  //       description: 'User Information by keyword',
  //       content: {
  //         'application/json': {
  //           schema: {
  //             type: 'array',
  //             items: getModelSchemaRef(KeywordUser),
  //           },
  //         },
  //       },
  //     },
  //   },
  // })
  // public async getUserInfoByKeyword(
  //   @param.path.string('keyword') keyword: string,
  // ): Promise<KeywordUser[]> {
  //   const decorator = new KeywordUserDecorator(this.keycloak);
  //   return decorator.getUserInfoByKeyword(keyword);
  // }
}
