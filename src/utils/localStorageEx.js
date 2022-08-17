export const key_openId = "open_id"
export const key_accessToken = "access_token"
export const key_wxUserInfo = "wx_user_info"
export const key_refreshToken = "refresh_token"
export const key_expireTime = "expire_time"
export const key_personalInfo = "personal_info"
export const key_personalViewInfo = "personal_view_info"
export const key_needFreshToken = "need-fresh-token"
export const key_inviteMemberInfo = "invite_member_info" //待移除
export const key_inviteFamilyInfo = "invite_family_info" //待移除
export const key_invitePlatformInfo = "invite_platform_info" //待移除
export const key_inviteInfo = "invite_info"
export const key_memberViewInfo = "member_info_view"
export const key_lastCenterNodeId = "last_center_node_id"

export const key_MembersInCharge = "members_in_charge"

export const key_FamilyInView = "family_in_view"

/***************OrgChart组件***************/
export const key_chartDefaultOrientation = "chart_default_orientation"

export const key_playUrlHelpMsg = "url_help_msg"


// add 

export const key_md5PersonalInfo = "md5_personal_info"




const localStorageEx = {
  getLocalObject(key) {
    var obj = localStorage.getItem(key);
    try {
      if (obj) {
        return JSON.parse(obj);
      }
    } catch {
      console.error('localStorage读取出错');
      return null;
    }
    return null;
  },

  getLocalInt(key) {
    var obj = localStorage.getItem(key);
    if (obj) {
      return parseInt(obj);
    }
    return null;
  },

  getLocalBool(key, defaultValue) {
    if (defaultValue == undefined)
      defaultValue = null;
    var obj = localStorage.getItem(key);
    if (obj == null)
      return defaultValue;
    if (obj == 'true' || obj == true) {
      return true;
    }
    return false;
  },

  getLocalFloat(key) {
    var obj = localStorage.getItem(key);
    if (obj) {
      return parseFloat(obj);
    }
    return null;
  },

  saveLocalObject(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
  },

  saveLocalValue(key, value) {
    localStorage.setItem(key, value);
  },
  getLocalValue(key) {
    return localStorage.getItem(key);
  },

  //作为缓存对象进行存储
  saveLocalAsCache(key, value) {
    var cacheData = {
      data: value,
      createTime: new Date()
    };
    localStorageEx.saveLocalObject(key, cacheData);
  },

  getLocalCache(key) {
    var cacheData = localStorageEx.getLocalObject(key);
    if (!cacheData || !cacheData.createTime)
      return null;
    return cacheData;
  },

  //获取在一定时间范围内的缓存对象
  getLocalCacheInRange(key, seconds, autoRemove) {
    var localCache = localStorageEx.getLocalCache(key);
    if (!localCache)
      return null;
    var timeLength = new Date() - new Date(localCache.createTime);
    if (timeLength <= seconds * 1000)
      return localCache.data
    autoRemove = autoRemove == true;
    if (autoRemove)
      localStorageEx.removeLocalValue(key);
    return null;
  },

  removeLocalValue(key) {
    localStorage.removeItem(key);
  },

  saveCurrentTime(k) {
    localStorage.setItem(k, new Date());
  },
  saveLocalTime(k, v) {
    localStorage.setItem(k, v);
  },
  getLocalTime(k) {
    var value = localStorage.getItem(k);
    if (typeof (value) == 'string' || typeof (value) == 'number')
      return new Date(value);
    else if (typeof (value) == 'object')
      return value;
    else
      return null;
  },

  isKeyExist(k) {
    var value = localStorage.getItem(k);
    return value != null;
  },

  clear() {
    localStorage.clear();
  },

  isSupportStorage() {
    try {
      var k = "test_key_cloud";
      var v = "good_luck_China";
      localStorage.setItem(k, v);

      var v2 = localStorage.getItem(k);
      local.removeItem(k);

      return v2 == v;
    } catch (err) {
      return false;
    }
  },

  /**业务逻辑方法**/

  /**
   * 获取本地存储的AccessToken
   */
  getLocalAccessToken() {
    var expireTime = localStorage.getItem(key_expireTime);
    if (expireTime) {
      var expireTimeValue = new Date(parseInt(expireTime));
      if (expireTimeValue < new Date()) {
        localStorage.removeItem(key_expireTime);
        localStorage.removeItem(key_refreshToken);
        localStorage.removeItem(key_accessToken);
        return null; //超时则返回null
      } else {

      }
    }
    return localStorage.getItem(key_accessToken);
  },

  /**
   * 获取本地存储的refreshToken
   */
  getLocalRefreshToken() {
    return localStorage.getItem(key_refreshToken);
  },

  removeLocalToken() {
    localStorage.removeItem(key_accessToken);
    localStorage.removeItem(key_expireTime);
    localStorage.removeItem(key_refreshToken);
    localStorage.removeItem(key_personalInfo);
    localStorage.removeItem(key_md5PersonalInfo);
  },

  clearOrgChartCache() {
    for (var i = localStorage.length - 1; i >= 0; i--) {
      var key = localStorage.key(i); //获取本地存储的Key
      if (key.startsWith('{"n":') && key.endsWith('}')) {
        localStorage.removeItem(key);
      }
    }
    //localStorage.removeItem('funcUrl');
    localStorage.removeItem('state-org-chart');
  },
}

export default localStorageEx