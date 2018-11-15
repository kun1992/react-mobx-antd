import {observable, action} from 'mobx'

class Store {
  @observable settingVisible = false;  //设置按钮弹窗
  @observable loadSearchModal = true;  //加载搜索模块
  @observable addBookMarkVisible = false; //添加数据弹窗
  @observable searchVal = {}; //查询的条件
  @observable bookMarkManageVisible = false; //书签管理弹窗
  @observable OrganizationVisible = false; //组织机构

  /**
   * 是否显示设置弹窗框
   */
  @action change = () => {
    this.settingVisible = !this.settingVisible
  };
  /**
   * 搜索模块加载
   */
  @action changeLoad = () => {
    this.loadSearchModal = !this.loadSearchModal
  }
  /**
   * 书签添加弹窗
   */
  @action changeAddBook = () => {
    this.addBookMarkVisible = !this.addBookMarkVisible;
  };
  /**
   * 书签添加搜索条件
   * @param value
   */
  @action setSearchVal = (value) => {
    this.searchVal = value
  }

  /**
   * 书签管理弹窗
   */
  @action changeMarkManage = () => {
    this.bookMarkManageVisible = !this.bookMarkManageVisible
  };
  /**
   * 组织机构弹窗
   */
  @action changeOrganization = () => {
    this.OrganizationVisible = !this.OrganizationVisible
  }

}

export default Store
