// /**
//  * 專案名稱： poem-api
//  * 部門代號： MLD500
//  * 檔案說明： Keycloak 認證服務代理者
//  * @CREATE Monday, 6th December 2021 2:14:30 pm
//  * @author Steve Y Lin
//  * @contact Wits.SteveYLin@wistron.com #1342
//  * -----------------------------------------------------------------------------
//  * @NOTE
//  */

// import {PoemUserInfoRepository} from '../../../repositories';
// import {UserInfoByIdResponse} from './models';
// import {UserInfo} from './user-info';

// /**
//  * Keycloak 認證服務代理者
//  */
// export class KeycloakProxy implements UserInfo {
//   /**
//    * @param userInfoService 使用者資訊服務
//    * @param userInfoRepo    POEM 使用者資訊倉庫
//    */
//   constructor(
//     private readonly userInfoService: UserInfo,
//     private readonly userInfoRepo: PoemUserInfoRepository,
//   ) { }

//   /**
//    * 取得特定工號的使用者資料
//    *
//    * @method public
//    * @param userId 使用者工號
//    * @return 回傳特定工號的使用者資料
//    */
//   public async getUserInfoById(userId: string): Promise<UserInfoByIdResponse> {
//     const user = await this.userInfoService.getUserInfoById(userId);
//     if (user) {
//       const id = user.username;
//       const enname = user.firstName || '';
//       const chname = user.lastName || '';
//       const email = user.email || '';
//       const existedUser = await this.userInfoRepo
//         .findById(id)
//         .catch(() => undefined);
//       if (!existedUser) {
//         await this.userInfoRepo.create({id, enname, chname, email});
//       }
//     }
//     return user;
//   }
// }
