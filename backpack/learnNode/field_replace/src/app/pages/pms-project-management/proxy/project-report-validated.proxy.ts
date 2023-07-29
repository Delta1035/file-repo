/**
 * 專案名稱： imp
 * 部門代號： MLD500
 * 檔案說明： 專案上傳資料驗證代理者
 * @CREATE Friday, 11th March 2022 9:34:20 am
 * @author Steve CY Lin
 * @contact Steve_CY_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { UploadedMember } from "@commonDefine/pms/uploaded-member.model";
import { UploadedProject } from "@commonDefine/pms/uploaded-project.model";
import { UploadedVersion } from "@commonDefine/pms/uploaded-version.model";
import { DataBuilder } from "@pages/pms-user-management/builder/data.builder";
import { Validator } from "@pages/pms-user-management/validator/validator";
import { ProjectReport } from "../report";


/**
 * 專案上傳資料驗證代理者
 */
export class ProjectReportValidatedProxy
  implements ProjectReport, DataBuilder<UploadedProject[]>
{
  /**
   * @param builder    專案上傳資料建構者
   * @param validators 專案上傳資料驗證器
   */
  constructor(
    private readonly builder: ProjectReport & DataBuilder<UploadedProject[]>,
    private readonly validators?: Validator[]
  ) {}

  /**
   * 添加專案資料
   *
   * @method public
   * @param projects 專案資料
   * @return 回傳物件本身
   */
  addProject(projects: UploadedProject[]): this {
    this.builder.addProject(projects);
    return this;
  }

  /**
   * 添加版本資料
   *
   * @method public
   * @param versions 版本資料
   * @return 回傳物件本身
   */
  addVersion(versions: UploadedVersion[]): this {
    this.builder.addVersion(versions);
    return this;
  }

  /**
   * 添加成員資料
   *
   * @method public
   * @param members 成員資料
   * @return 回傳物件本身
   */
  addMember(members: UploadedMember[]): this {
    this.builder.addMember(members);
    return this;
  }

  /**
   * 建構資料
   *
   * @method public
   * @return 回傳建構後的資料
   */
  build(): UploadedProject[] {
    // 驗證專案上傳資料
    const projects = this.builder.build();
    // @ts-ignore
    const validatedResult = this.validators?.map(v => v.validate(projects));
    const isValid = validatedResult
      ? validatedResult.every((result) => result === null)
      : true;

    // 有效則回傳上傳資料
    if (isValid) {
      return projects;
    }

    // 無效根據則拋送錯誤訊息
    if (
      validatedResult &&
      validatedResult.filter((item) => item !== null).length > 0
    ) {
      throw validatedResult.filter((item) => item !== null)[0];
    } else {
      return projects;
    }
  }
}

