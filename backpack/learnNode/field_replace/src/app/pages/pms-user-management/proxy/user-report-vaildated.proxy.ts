

import { UploadedJiraUser } from "@commonDefine/pms/uploaded-jira-user.model";
import { DataBuilder } from "../builder/data.builder";
import { UserReport } from "../report";
import { Validator } from "../validator/validator";



/**
 * 使用者上傳資料驗證代理者
 */
export class UserReportVaildatedProxy
  implements UserReport, DataBuilder<UploadedJiraUser[]>
{
  /**
   *  @param builder   使用者上傳資料建構者
   * @param validators 使用者上傳資料驗證器
   */
  constructor(
    private readonly builder: UserReport & DataBuilder<UploadedJiraUser[]>,
    private readonly validators: Validator[]
  ) {}

  /**
   * 添加使用者資料
   *
   * @method public
   * @param users 使用者資料
   * @return 回傳物件本身
   */
  addUsers(users: UploadedJiraUser[]): this {
    this.builder.addUsers(users)
    return this;
  }

  /**
   * 建構資料
   *
   * @method public
   * @return 回傳建構後的資料
   */
  build(): UploadedJiraUser[] {
    // 驗證使用者上傳資料
    const users = this.builder.build();
    const validatedResult = this.validators?.map((v) => v.validate(users));

    const isValid = validatedResult
      ? validatedResult.every((result) => result === null)
      : true;

    // 有效則回傳上傳資料
    if (isValid) {
      return users;
    }

    // 無效根據則拋送錯誤訊息
    if (
      validatedResult &&
      validatedResult.filter((item) => item !== null).length > 0
    ) {
      throw validatedResult.filter((item) => item !== null)[0];
    } else {
      return users;
    }
  }
}
