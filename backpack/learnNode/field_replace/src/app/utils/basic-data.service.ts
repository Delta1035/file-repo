import { Injectable } from '@angular/core';
import { BasicAllData, BasicDataRules, BU } from '@commonDefine/index';

@Injectable({
  providedIn: 'root',
})
export class BasicDataService {
  constructor() {}
  arrayMerge(list: BasicAllData[]): BasicDataRules[] {
    const bgList: any = [];
    const buList: any = [];
    const boList = list.map((item) => {
      return {
        id: item.id,
        bo: item.bo,
      };
    });

    list.forEach((item) => {
      item.bgs.forEach((bgitem) => {
        bgList.push({
          id: bgitem.id,
          bo: bgitem.boId,
          bg: bgitem.bg,
        });
        bgitem.bus?.forEach((buitem) => {
          buList.push({
            id: buitem.id,
            bu: buitem.bu,
            bgId: buitem.bgId,
            bo: item.id,
          });
        });
      });
    });

    return buList.map((buItem: BU) => {
      const bgData = bgList.find(
        (bgItem: { id: any }) => bgItem.id === buItem.bgId
      );

      const boData = boList.find((boItem) => boItem.id === buItem.bo);
      return {
        ...buItem,
        ...bgData,
        ...boData,
        id: buItem.id,
      } as BasicDataRules;
    });
  }
}
