import { SelectOption } from "@commonDefine/pms/select-option";


export const PROJECT_PROCESS_STATUS:SelectOption[] = [
  {
    optionLabel:'PMS.ALL',
    optionValue:'',
    disabled:false
  },
  {
    optionLabel:'PMS.SignResult.OPEN',
    optionValue:'OPEN',
    disabled:false
  },
  {
    optionLabel:'PMS.SignResult.APPROVED',
    optionValue:'APPROVED',
    disabled:false
  },
  {
    optionLabel:'PMS.SignResult.REJECTED',
    optionValue:'REJECTED',
    disabled:false
  },
]
