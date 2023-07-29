/**
 * 專案名稱： imp
 * 部門代號： MLD500
 * 檔案說明： Excel 報表匯出服務
 * @CREATE Tuesday, 8th March 2022 1:20:15 pm
 * @author Steve CY Lin
 * @contact Steve_CY_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx-with-styles';

/**
 * Excel 報表匯出服務
 */
@Injectable({
  providedIn: 'root',
})
export class ExcelReporterService {
  /**
   * 匯出 Excel
   *
   * @method public
   * @param data      要匯出的資料
   * @param sheetname Excel Sheet 名稱
   * @param filename  Excel 檔名
   */
  export<D = any>(
    data: D[],
    header?: string[],
    sheetname = 'Sheet1',
    filename = 'export'
  ): void {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    if (header) {
      XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });
    }

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetname);
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  }

  /**
   * 讀取 Excel 工作表
   *
   * @method public
   * @param binary 讀取 Excel 二進位數據並轉成 json
   * @return 回傳 Excel 工作表
   */
  readWorksheet(binary: string): string[] {
    const workSheets = XLSX.read(binary, {
      type: 'binary',
      cellDates: true,
      cellStyles: true,
    });

    if (workSheets.SheetNames.length === 0) {
      return [];
    } else {
      return workSheets.SheetNames;
    }
  }

  /**
   * 將 Excel 工作表轉換成 JSON
   *
   * @method public
   * @param binary 表單資料
   * @param sheet  表單名稱
   * @return 回傳轉換後的 JSON
   */
  convertToJson<T = any>(binary: string, sheet?: string): T | undefined {
    const workSheets = XLSX.read(binary, {
      type: 'binary',
      cellDates: true,
      cellStyles: true,
    });

    if (workSheets.SheetNames.length === 0) {
      return;
    }

    const sheetName = sheet === undefined ? workSheets.SheetNames[0] : sheet;
    const excelRawData = XLSX.utils.sheet_to_json(workSheets.Sheets[sheetName]);

    return excelRawData as any;
  }
}
