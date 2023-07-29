import { Service } from "../utils/request";

// basicinfo数据
export function baseInfo (config) {
  return Service({
    url: `/projectList/basicInfo`,
    params: config
  });
}

// 母階子階 下拉框数据获取
export function selectList (config) {
  return Service({
    url: "/checklist/getParentChildrenStageList",
    data: config
  });
}

// 根据黄单号、子阶、母阶查询任务列表

export function TaskLists (config) {
  return Service({
    url: "/checklist/getTaskList",
    data: config
  });
}

//根据黄单号查询进度

export function developProgress (config) {
  return Service({
    url: "/checklist/getParentDevelopProgressInfo",
    params: config
  });
}

//获取任务资讯详情
export function taskInfoRequest (config) {
  return Service({
    url: "/checklist/taskInfo",
    data: config
  });
}

//更新狀態
export function updateStatus (config) {
  return Service({
    url: "/checklist/updateStatus",
    data: config
  });
}

// 获取sas密钥作文件上传使用
export function azureupload (config) {
  return Service({
    url: "/azureStorage/getSAS",
    data: config
  });
}

//更新当前任务的进度
export function currentRoleDevelopProgress (config) {
  return Service({
    url: "/checklist/currentRoleDevelopProgress",
    data: config
  });
}

// 更新上传信息
export function uploadInfo (config) {
  return Service({
    url: "/attachment/uploadInfo",
    params: config
  });
}

// 更新上传文件状态
export function updateUploadInfo (config) {
  return Service({
    url: "/attachment/updateUploadInfo",
    data: config
  });
}

// duedate 信息
export function dueDateInfo (config) {
  return Service({
    url: "/attachment/dueDateInfo",
    params: config
  });
}

//更新duedate
export function updateDueDateInfo (config) {
  return Service({
    url: "/attachment/updateDueDateInfo",
    data: config
  });
}

// export function getCarList (config) {
//   const params = new URLSearchParams()
//   params.append('page', config.page);
//   return Service({
//     url: "/api/oldcar/getCarList/",
//     data: params
//   })
// }

//獲取專案成員資訊
export function getTeamMemberList (config) {
  return Service({
    url: "/members/getMembersInfo",
    params: config
  });
}

// 獲取內部專案成員用於layout顯示
export function getAllTeamMembers (config) {
  return Service({
    url: "/members/getInternalMembers",
    params: config
  });
}

// 更新Layout的Member成员
export function updateMembersInfo (config) {
  return Service({
    url: "members/updateMembersInfo",
    data: config
  });
}

//请求RFQList列表接口
export function getRfqList (config) {
  return Service({
    url: "/projectList/RFQList",
    data: config
  });
}
//请求RDList列表接口
export function getRdList (config) {
  return Service({
    url: "/projectList/RDList",
    data: config
  });
}
//请求AwardList列表接口
export function getAwardList (config) {
  return Service({
    url: "/projectList/AwardList",
    data: config
  });
}

//历史记录数据
export function historyUploadInfo (config) {
  return Service({
    url: "/attachment/historyUploadInfo",
    params: config
  });
}

// 获取设定母阶预计完成时间详情页信息
export function getSetUpParentPlanDateInfo (config) {
  return Service({
    url: "/checklist/getSetUpParentPlanDateInfo",
    params: config
  });
}
//設定母階的預計完成時間
export function updateParentPlanDate (config) {
  return Service({
    url: "/checklist/updateParentPlanDate",
    data: config
  });
}

//给后端传递微软token
export function getToken (config) {
  return Service({
    url: "/system/login",
    params: config
  });
}

export function getLoginRole (config) {
  return Service({
    url: "/system/loginRole",
    params: config
  });
}


//获取权限列表

export function getPerms (config) {
  return Service({
    url: "/system/refreshProjectRole",
    params: config
  });
}

// 獲取文件下載信息
export function downloadInput (config) {
  return Service({
    url: "/attachment/downloadInput",
    params: config
  });
}
//获取用户（customer）下拉框数据
export function getCustomer (config) {
  return Service({
    url: "/projectList/customerList",
    params: config
  });
}
//获取产品(product) 下拉框数据
export function getProduct (config) {
  return Service({
    url: "/projectList/productList",
    params: config
  });
}

//獲取function用戶數據
export function allFunctions (config) {
  return Service({
    url: '/checklist/allFunctions',
    data: config
  })
}

// 获取任务清单下搜索框数据
export function taskSearchBoxData (config) {
  return Service({
    url: '/checklist/taskSearchBoxData',
    data: config
  })
}

// 获取notifyloop账户

export function notifyUser (config) {
  return Service({
    url: '/sysUser/notifyUser',
    params: config
  })
}

// guideline列表
export function guidelineList (config) {
  return Service({
    url: '/guideline/guidelineList',
    data: config
  })
}

// guideline新增
export function addGuideline (config) {
  return Service({
    url: '/guideline/addGuidelineList',
    data: config
  })
}

// 修改guideline
export function updateGuidelineList (config) {
  return Service({
    url: '/guideline/updateGuidelineList',
    data: config
  })
}

// 删除guideline
export function deleteGuidelineList (config) {
  return Service({
    url: '/guideline/deleteGuidelineList',
    data: config
  })
}

//獲取guideline的相關權限
export function getRole (config) {
  return Service({
    url: '/guideline/getRole',
    params: config
  })
}

//设置guideline的管理员
export function setGuidelineAdmin (config) {
  return Service({
    url: '/guideline/addGuidelineAdmin',
    data: config
  })
}


//獲取functionMember
export function getFunctionMember (config) {
  return Service({
    url: '/members/functionMember',
    params: config
  })
}

// 留言板主题添加
export function addSubject (config) {
  return Service({
    url: '/message/addSubject',
    data: config
  })
}

//查詢當前project人員
export function getProjectMembers (config) {
  return Service({
    url: '/message/projectMembers',
    params: config
  })
}

// 主題列表subject
export function getSubjectList (config) {
  return Service({
    url: '/message/subjectList',
    data: config
  })
}

//主題信息
export function getDiscussionInfo (config) {
  return Service({
    url: '/message/getDiscussion',
    data: config
  })
}

//主題回復
export function addRespond (config) {
  return Service({
    url: '/message/addRespond',
    data: config
  })
}


// skip 申请弹窗信息
export function skipApplyInfo (config) {
  return Service({
    url: '/attachment/skipApplyInfo',
    params: config
  })
}

// skip 申请提交
export function skipApply (config) {
  return Service({
    url: '/attachment/skipApply',
    data: config
  })
}

// 恢复skip modal
export function skipRecoverInfo (config) {
  return Service({
    url: '/attachment/skipRecoverInfo',
    params: config
  })
}

//撤回 modal
export function skipRecallInfo (config) {
  return Service({
    url: '/attachment/skipRecallInfo',
    params: config
  })
}

// skip撤回
export function skipRecall (config) {
  return Service({
    url: '/attachment/skipRecall',
    data: config
  })
}

// 審核modal
export function skipAuditInfo (config) {
  return Service({
    url: '/attachment/skipAuditInfo',
    params: config
  })
}

// 審核更新
export function skipAudit (config) {
  return Service({
    url: '/attachment/skipAudit',
    data: config
  })
}

// 恢复申请审核 
export function skipRecover (config) {
  return Service({
    url: '/attachment/skipRecover',
    data: config
  })
}

//批量task skip 申请详情页
export function taskSkipApplyInfo (config) {
  return Service({
    url: '/task/skipApplyInfo',
    params: config
  })
}

//批量task skip申请submit
export function taskSkipApply (config) {
  return Service({
    url: '/task/skipApply',
    data: config
  })
}

//批量恢復申請task skip詳情頁
export function taskSkipRecoverInfo (config) {
  return Service({
    url: '/task/skipRecoverInfo',
    params: config
  })
}
// 批量撤回詳情頁 task reacll 詳情頁
export function taskSkipRecallInfo (config) {
  return Service({
    url: '/task/skipRecallInfo',
    params: config
  })
}

export function taskSkipRecover (config) {
  return Service({
    url: '/task/skipRecover',
    data: config
  })
}

// 批量撤回 task reacll
export function taskSkipRecall (config) {
  return Service({
    url: '/task/skipRecall',
    data: config
  })
}

// 獲取Cockpit頁面Project Status區塊中右邊區塊的表格數據
export function getProjectStatus (config) {
  return Service({
    url: '/cockpit/statusData',
    params: config
  })
};

// 獲取Cockpit頁面Detail Information區塊Function Team訊息
export function getDetailFunctions (config) {
  return Service({
    url: '/cockpit/getDetailFunctions',
    params: config
  })
};

// 獲取Cockpit頁面Detail Information區塊母階子階訊息
export function getDetailParentAndChild (config) {
  return Service({
    url: '/cockpit/getDetailParentAndChild',
    params: config
  })
};

// 獲取Cockpit頁面Detail Information區塊表格數據
export function getDetailData (config) {
  return Service({
    url: '/cockpit/detailData',
    data: config
  })
}

// 语言切换
export function setLanguage (config) {
  return Service({
    url: '/sysUser/setLanguage',
    params: config
  })
}

//guideline 獲取user
export function getAllUserEmail (config) {
  return Service({
    url: '/sysUser/getAllUserEmail',
    params: config
  })
}

//獲取當前user的Supervisor
export function addGuidelineAdminInfo (config) {
  return Service({
    url: '/guideline/addGuidelineAdminInfo',
    params: config
  })
}


//gerber修订
export function reviseGerber (config) {
  return Service({
    url: '/checklist/reviseGerber',
    data: config
  })
}

//process task 确认修订
export function reviseConfirm (config) {
  return Service({
    url: '/processTask/reviseConfirm',
    params: config
  })
}

export function reviseConfirmInfo (config) {
  return Service({
    url: '/attachment/reviseConfirmInfo',
    data: config
  })
}

//档案重做
export function revise (config) {
  return Service({
    url: '/attachment/revise',
    data: config
  })
}

//檔案繼承
export function inherit (config) {
  return Service({
    url: '/attachment/inherit',
    data: config
  })
}

//cockpit獲取任務數據
export function taskCount (config) {
  return Service({
    url: '/cockpit/taskCount',
    params: config
  })
}