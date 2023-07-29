export const serviceUrls = {
  // 獲取當前登錄用戶的相關信息
  getUserInfo: '/users/info',
  // 给系统管理员发送权限申请
  requestPermissions: '/users/requestPermissions',

  // ---------------------maintain url--------
  // 获取角色清單
  getRoles: '/roles',
  // 获取所有頁面
  getPages: '/pages',
  // 獲取某個角色的權限
  getRolePages: '/roles',
  // 新增角色
  newRole: '/addrole',
  // 删除角色
  deleteRole: '/roles/',
  // 編輯角色權限
  editRole: '/roles/',
  // 获取用户
  getPersonInfo: '/user-infos',
  // 新增用户
  addPersonInfo: '/user-infos',
  // 编辑用户
  editPersonInfo: '/user-infos/',
  // 删除用户
  deletePersonInfo: '/deleteUser',

  // ---------------------budget url--------
  // 获取budget数据
  getBudget: '/budgets',
  // 获取resources数据
  getResources: '/resources',
  // 获取resources数据
  getProjectCategories: '/project-categories',
  // 获取resources数据
  getProjectTypes: '/project-types',
  // 获取Divs数据
  getDivs: '/divs',
  // 新增budget
  addNewBudget: '/budgets/createOne',
  // 删除budget数据
  deleteBudget: '/budgets/deletebudgets',
  // 修改budget数据
  editBudget: '/budgets/update/',
  // 修改budget数据by id
  editBudgetById: '/budgets/',
  // 上傳budget excel供預覽
  uploadBudgetExcelForPreview: '/budgets/upload/preview',
  // 上傳budget excel
  uploadBudgetData: '/budgets/upload',
  // Budget Copy To PRF
  budgetCopyToPRF: '/prfs/bulkCreate',
  // 獲取budget數據中的所有年份
  getBudgetProjectYears: '/budgets/getYear',
  // 下载budget数据
  downloadBudget: '/download/Budget',

  // ---------------------prf url--------
  // 获取prf数据
  getPRF: '/prfs',
  // 新增prf
  addNewPRF: '/prfs/createOne',
  // 修改prf数据
  editPRF: '/prfs/update/',
  // 獲取prf數據中的所有年份
  getPRFProjectYears: '/prfs/getYear',
  // 編輯prf - EP
  editEP: '/prfs/',
  // PRF Copy To IB
  prfCopyToIB: '/ibs/copyToIb',

  // ---------------------ib url--------
  // 获取ib数据
  getIB: '/ibs',
  // 獲取ib數據中的所有年份
  getIBProjectYears: '/ibs/getYear',
  // 编辑IB-IB INFO
  editIB: '/ibs/',


  // ----------------------mep steps url -------
  // 獲取當前階段
  // tssesException: '/tsses/exception',
  tssesException: '/paj-months/1',
  // mepStepsComplete
  mepStepsComplete: '/tsses/completeMonthEnd',
  // uploadTSS excel
  uploadTSS: '/files',
  // Unknown TSS Names
  getUnknownTSSNames: '/unknown-tss-names',
  // Unknown TSS Projects
  getUnknownTSSProjects: '/unknown-tss-projects',
  // gotoMaintain
  gotoMaintain: '/paj-months/gotoMaintain',
  // gotoMaintain
  gotoComplete: '/paj-months/gotoComplete',


  // ----------------------mep paj maintain url -------
  // 獲取PAJChargeData
  getPAJChargeData: '/paj',
  // 獲取trackingReportData
  getTrackingReportData: '/tracking-reports',
  // 编辑保存To Charge PAJ Man-Months
  editChargeToChargePAJData: '/paj-lns/',


  // ----------------------mep BU Wiwynn PAJ url -------
  // 获取bu paj 年份
  getBUPAJYear: '/q-pajuploadfile4s/getYear',
  // 获取wiwynn paj 年份
  getWiwynnPAJYear: '/q-pajuploadforwiwynns/getYear',
  // 获取bu paj数据
  getBUPAJ: '/q-pajuploadfile4s',
  // 获取wiwynn paj数据
  getWiwynnPAJ: '/q-pajuploadforwiwynns',
  // 下載bu paj数据
  downloadBU: '/download/Paj',
  // 下載wiwynn paj数据
  downloadWiwynn: '/download/Wiwynn',


  // -------------------basic data url--------
  // 獲取BO
  getBo: '/bos',
  // 獲取BU
  getBu: '/bus',
  // 獲取BG
  getBg: '/bgs',
  // 添加企業資料
  addData: '/bos/addData',
  // 刪除BU
  deleteBu: '/bus/',
  // 模糊查询
  searchData: '/bos/getData',

  // -------------------Tss-CAl--------------
  //国家/地区列表
  country: '/country',
  // TSS-CAL列表
  cals: '/cals',
  // 获取years
  getYear: 'getYear',
  // 新增cals
  createCals: '/cals/bulkCreate',

  // --------------外部人员名单列表----------
  extrtna: '/exteral-names',
  createExtrtna: '/exteral-names/bulkCreate',

  // ------------Div-Dept--------------------
  // 获取全部Div
  divs: '/divs',
  // 创建div
  addNewDiv: '/divs/createOne',
  // 修改Div数据
  editDiv: '/divs/updateDiv/',
  // 删除Div数据
  deleteDiv: '/divs/bulkDelete',

  // -----------资源列表--------------------
  resource: '/resources',
  createResource: '/resources/bulkCreate'
};
