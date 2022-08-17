import http from '../utils/http'
import localStorageEx from '../utils/localStorageEx.js'
import {
  baseUrl,
  appBaseUrl
} from "./api_config.js";
import {
  getTimeFormat,
  queryToBool
} from "../utils/util.js";
export const imgUrl = "https://gdxczx.yuezhengwl.com/"

/**
 * @param {Object} params
 */

export function getNewsBlock(params) {
  let url = `${baseUrl}api/News/getBlock`;
  return http.get(url, {
    ...params
  });
}

export function getNewsIndex(params) {
  let url = `${baseUrl}api/News/index`;
  return http.get(url, {
    ...params
  });
}



export function getNewsDetail(id) {
  let url = `${baseUrl}api/News/detail?id=${id}`;
  return http.get(url, {

  });
}



export function getSearchIndex(params) {
  let url = `${baseUrl}api/Search/index`;
  return http.get(url, {
    ...params
  });
}
