import {Entity, model, property} from '@loopback/repository';

/**
 * 關鍵字使用者資料模型
 */
@model()
export class KeywordUser extends Entity {
  /**
   * 工號
   */
  @property({type: 'string'})
  public id: string;
  /**
   * 使用者名稱
   */
  @property({type: 'string'})
  public name: string;
  /**
   * 信箱
   */
  @property({type: 'string'})
  public email: string;

  /**
   * @param data 關鍵字使用者資料
   */
  constructor(data: Partial<KeywordUser>) {
    super(data);
  }
}
