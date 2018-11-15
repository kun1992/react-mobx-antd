import {fetch} from "../../utils";
import Config from "../../configName/index";

/**
 * 查找全部
 * @param params
 * @returns {*}
 */
function searchAll(params) {
  return fetch({
    url: "/app/mock",
    method: "post",
    params
  })
}

/**
 * 查找单个表
 * @param params
 * @returns {*}
 */
function searchTable(params) {
  return fetch({
    url: "/api/algorithm/getListByCondition",
    method: "post",
    params
  })
}

/**
 * 查找tab
 * @param params
 * @returns {*}
 */
function searchTab(params) {
  return fetch({
    url: Config.url + "entityController/searchTables",
    method: "post",
    params
  })
}

export {
  searchAll,
  searchTable,
  searchTab
}
