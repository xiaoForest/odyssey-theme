// 写法一：适合分类导出
import http from '../utils/http'
import localStorageEx from '../utils/localStorageEx.js'
import localCache from '../utils/localCache.js'
import {
  baseUrl,
  appBaseUrl
} from "./api_config.js";
import {
  getTimeFormat,
  queryToBool
} from "../utils/util.js";

export function isLoggedOn() {
  return localStorageEx.getLocalAccessToken() != null;
}

/**
 * 更新用户信息
 * @param {Object} userId
 * @param {Object} userDetail
 */
export function updateUserInfo(userId, userDetail) {
  let url = `${baseUrl}api/User/${userId}`;
  return http.put(url, userDetail);
}

/**
 * 获取指定用户信息
 * @param {Object} userId
 * @param {Object} loadNew
 */
export function getUserDetailInfo(userId, loadNew) {
  loadNew = queryToBool(loadNew, false);
  return http.get(`${baseUrl}api/User/${userId}?loadNew=${loadNew}`, {});
}

export function getPersonalInfo(loadNew) {
  loadNew = queryToBool(loadNew, false);
  return http.get(`${baseUrl}api/User/mine?loadNew=${loadNew}`, {});
}

export function getPersonalInfoAndSaveToLocal(loadNew) {
  getPersonalInfo(loadNew)
    .then((res) => {
      if (res && res.data && res.data.isSuccessCode) {
        localCache.savePersonalInfo(res.data.data);
        console.log('缓存个人信息成功');
      } else {
        console.log('缓存个人信息失败');
      }
    })
    .catch((err) => {
      console.log('缓存个人信息出错');
      console.error(err);
    });;
}