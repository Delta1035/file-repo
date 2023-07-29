import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

/**
 * 設定檔載入服務
 */
@Injectable({
  providedIn: 'root',
})
export class ConfigLoaderService {
  /**
   * 設定檔
   */
  private configuration = new Map<string, any>();

  /**
   * @param http HTTP 請求
   */
  constructor(private readonly http: HttpClient) {}

  /**
   * 載入設定檔
   *
   * @method public
   * @param id   設定檔 ID
   * @param path 設定檔路徑
   * @return 回傳載入結果
   */
  public async load(id: string, path: string): Promise<unknown> {
    return this.http
      .get(path)
      .pipe(tap((conf) => this.configuration.set(id, conf)))
      .toPromise();
  }

  /**
   * 取得特定 ID 的設定檔
   *
   * @method public
   * @param id 設定檔 ID
   * @return 回傳對應的設定檔
   */
  public config<T>(id: string): T {
    return this.configuration.get(id);
  }
}
