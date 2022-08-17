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



export function getSpecialNewsList(params) {
  let url = `${baseUrl}api/Specialnews/getList`;
  return http.get(url, {
    ...params
  });
}