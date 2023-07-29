
import { TableDataCheck, UserInfo } from 'src/app/define/common.define';


export interface PersonInfo extends UserInfo, TableDataCheck {
    id: number
}
