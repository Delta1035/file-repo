/**
 * 專案名稱： imp
 * 部門代號： MLD500
 * 檔案說明： 專案上傳資料建構者
 * @CREATE Thursday, 10th March 2022 11:28:37 am
 * @author Steve CY Lin
 * @contact Steve_CY_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { UploadedMember } from "@commonDefine/pms/uploaded-member.model";
import { UploadedProject } from "@commonDefine/pms/uploaded-project.model";
import { UploadedVersion } from "@commonDefine/pms/uploaded-version.model";
import { DataBuilder } from "@pages/pms-user-management/builder/data.builder";
import { ProjectReport } from "../report";

// import {
//   UploadedMember,
//   UploadedProject,
//   UploadedVersion,
// } from '@commonModels/index';
// import { DataBuilder } from "app/core";
// import { ProjectReport } from '../report';

/**
 * 專案上傳資料建構者
 */
export class UploadedProjectBuilder implements ProjectReport, DataBuilder<UploadedProject[]> {
  /**
   * 專案資料
   */
  private projects: UploadedProject[] = [];
  /**
   * 版本資料
   */
  private versions: UploadedVersion[] = [];
  /**
   * 成員資料
   */
  private members: UploadedMember[] = [];

  /**
   * 添加專案資料
   *
   * @method public
   * @param projects 專案資料
   * @return 回傳物件本身
   */
  addProject(projects: UploadedProject[]): this {
    this.projects = projects;
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
    this.versions = versions;
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
    this.members = members;
    return this;
  }

  /**
   * 建構資料
   *
   * @method public
   * @return 回傳建構後的資料
   */
  build(): UploadedProject[] {
    const ver = this.versions;
    const mem = this.members;
    return this.projects
      .map((p) => ({
        ...p,
        version_control: ver.filter((v) => v.project === p.project_name),
      }))
      .map((p) => ({
        ...p,
        users: mem.filter((m) => m.project === p.project_name),
      }));
  }
}
