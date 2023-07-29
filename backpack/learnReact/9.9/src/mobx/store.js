import { observable, configure, action } from "mobx";

configure({
  enforceActions: "always"
});

class Store {
  @observable
  ShowCircleList = {
    1: true,
    2: false,
    3: false,
    4: false,
    5: false
  };

  @observable isShowTableDetail = true;

  @action
  changeTable () {
    this.isShowTableDetail = true;
  }

  @action
  changeDetail () {
    this.isShowTableDetail = false;
  }

  @action
  changeCircle (value) {
    Object.keys(this.ShowCircleList).forEach(item => {
      if (Number(item) === Number(value)) {
        this.ShowCircleList[item] = true;
      } else {
        this.ShowCircleList[item] = false;
      }
    });
  }

  @action
  resetShowCircleList () {
    this.ShowCircleList[1] = true;
    this.ShowCircleList[2] = false;
    this.ShowCircleList[3] = false;
    this.ShowCircleList[4] = false;
    this.ShowCircleList[5] = false;
  }

  @observable loading = false;

  @action
  changeloadingShow () {
    this.loading = true;
  }

  @action
  changeloadingHide () {
    this.loading = false;
  }

  @observable Projectloading = false

  @action
  changeProjectloadingShow () {
    this.Projectloading = true;
  }

  @action
  changeProjectloadingHide () {
    this.Projectloading = false;
  }

  // //处理gobak 返回当前tab //yourproject buproject
  // @observable projectKey = 1;

  // @action
  // getProjectKey (projectKey) {
  //   this.projectKey = projectKey;
  // }
  //处理 下面的三个列表
  @observable tabkey = "1";
  @action
  getTabKey (tabkey) {

    this.tabkey = tabkey;
  }
  //处理返回后 是用户选择的排序和分页
  @observable nowCurrent = 1;
  // goback现在当前用户所在分页
  @action
  changeCurrent (current) {

    this.nowCurrent = current;
  }
  //RDList分页
  @observable rdNowCurrent = 1;
  @action
  changeRdCurrent (current) {
    this.rdNowCurrent = current;
  }
  //AWardList分页
  @observable awNowCurrent = 1;
  @action
  changeAwCurrent (current) {

    this.awNowCurrent = current;
  }
  //排序 设置传入的这一行信息....
  @observable sortedInfo = {};

  @action
  setSortedInfo (sortedInfo) {

    this.sortedInfo = sortedInfo;
  }
  @observable rdsortedInfo = {};

  @action
  setRdSortedInfo (sortedInfo) {
    this.rdsortedInfo = sortedInfo;
  }

  @observable AwSortedInfo = {};

  @action
  setAwSortedInfo (sortedInfo) {

    this.AwSortedInfo = sortedInfo;
  }

  @observable filteredInfo = {};

  //传入那个filed字段.....
  @action
  setFilteredInfo (filteredInfo) {

    this.filteredInfo = filteredInfo;
  }
  //AD
  @observable rdfilteredInfo = {};

  @action
  setADFilteredInfo (filteredInfo) {
    this.rdfilteredInfo = filteredInfo;
  }
  //Award
  @observable AwfilteredInfo = {};

  @action
  setAwardFilteredInfo (filteredInfo) {
    this.AwfilteredInfo = filteredInfo;
  }
  //改变Total,分页
  @observable
  pagination = {
    pageNo: 1, //当前页为1
    pageSize: 10 //一页10行
  };
  @action
  changePagination (pagination) {

    this.pagination = pagination;
  }

  @observable
  paginationRd = {
    pageNo: 1, //当前页为1
    pageSize: 10 //一页10行
  };
  @action
  changeRdPagination (pagination) {

    this.paginationRd = pagination;
  }
  @observable
  paginationAw = {
    pageNo: 1, //当前页为1
    pageSize: 10 //一页10行
  };
  @action
  changeAwPagination (pagination) {

    this.paginationAw = pagination;
  }

  @observable pageOption = {};
  //升序、降序.....
  //RFQ
  @observable sortserver = "desc";
  @action
  changeSortserver (sortserver) {

    this.sortserver = sortserver;
  }
  //RD
  @observable sortRdserver = "desc";
  @action
  changerdSortserver (sortserver) {

    this.sortRdserver = sortserver;
  }
  //AWARD
  @observable sortAwserver = "desc";
  @action
  changeAwSortserver (sortserver) {

    this.sortAwserver = sortserver;
  }

  //获取当前用户点击的升降序
  @action
  changsortOrder (sortOrder) {

    this.sortOrder = sortOrder;
  }

  //传filed 信息...
  @action
  changedataIndex (dataIndex) {

    this.dataIndex = dataIndex;
  }
  @action
  changeRdDataIndex (dataIndex) {

    this.rdDataIndex = dataIndex;
  }
  @action
  changeAWDataIndex (dataIndex) {
    this.awDataIndex = dataIndex;
  }
  //

  @action
  setpageOption (pageOption) {
    this.pageOption = pageOption;
  }

  //设置select下拉框百分比数据使用
  @observable dataProgress = [];

  @action
  getdataProgress (dataProgress) {
    this.dataProgress = dataProgress;
  }
  //url携带参数
  @observable keyUrl = "1";
  @action
  setKeyUrl (key) {
    this.keyUrl = key;
  }
  //basicInfo ProjectName存入到全局
  @observable ProjectName = "";
  @action
  changeProjectName (code) {
    this.ProjectName = code;
  }
  @observable projectCode = "";
  @action
  changeprojectCode (code) {
    this.projectCode = code;
  }

  @observable plmForm = "";
  @action
  changeplmForm (code) {
    this.plmForm = code;
  }

  @observable rfqCode = "";
  @action
  changerfqCode (code) {
    this.rfqCode = code;
  }

  @observable updateperms = false;

  @action
  changeupdateperms () {
    this.updateperms = !this.updateperms
  }

}

export default new Store();
