// 写法一：适合分类导出
import http from '../utils/http'
import localStorageEx from '../utils/localStorageEx.js'
import {
    key_accessToken,
    key_expireTime,
    key_openId,
    key_playUrlHelpMsg,
    key_personalInfo,
    key_refreshToken,
    key_wxUserInfo,
    key_needFreshToken
} from '../utils/localStorageEx.js'
import {
    baseUrl,
    appBaseUrl,

} from "./api_config.js";
import {
    getTimeFormat
} from "../utils/util.js";
import {
    getPersonalInfoAndSaveToLocal
} from "./api_user.js";
import {
    Toast
} from "vant";
import axios from 'axios'
// import sha1 from "sha1";

// 
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
function zero(s) {
    return s < 10 ? "0" + s : s;
}

export function isLoggedOn() {
    return localStorageEx.getLocalAccessToken() != null;
}

export function autoLogOn() {
    let needFresh = localStorageEx.getLocalBool(key_needFreshToken, false);
    let refreshToken = localStorageEx.getLocalValue(key_refreshToken);
    if (needFresh && refreshToken) {
        refreshTokenAuto();
        return;
    }
    if (isLoggedOn())
        return;
    logOn("grid2", "123456", 0);
}

export function logOn(userName, passWord, requestType) {
    if (requestType == undefined)
        requestType = 0;
    var userInfo = {
        appName: "GridManagement",
        userName: userName,
        password: passWord,
        requestType: requestType
    };
    return http.post(`${baseUrl}api/user/token`, userInfo)
        .then((res) => {
            if (res.status == 401) {
                Toast('请登录后重试');
                return;
            }
            if (res.data && res.data.data) {
                let data = res.data.data;
                localStorage.setItem(key_accessToken, data.accessToken);
                localStorage.setItem(key_refreshToken, data.refreshToken);
                localStorage.setItem(key_expireTime, data.expireTime);
                getPersonalInfoAndSaveToLocal();
                console.log('自动登录成功');
            } else {
                console.log(res);
                Toast("登录失败");
            }
        })
        .catch((err) => {
            Toast("登录失败");
            console.log(err);
        });
}

export function loginWx(code, inviteNumber) {
    if (inviteNumber == undefined)
        inviteNumber = "";
    var wxLoginUrlFull = `${baseUrl}api/oauth/token/wxlogin?code=${code}&inviteNumber=${inviteNumber}`;
    setLogingState(true);
    return http.get(wxLoginUrlFull, {})
        .then((res) => {
            setLogingState(false);
            if (!res) {
                Toast("微信登录未知错误");
            } else if (res.data && res.data.data) {
                let data = res.data.data;
                localStorage.setItem(key_accessToken, data.accessToken);
                localStorage.setItem(key_refreshToken, data.refreshToken);
                localStorage.setItem(key_expireTime, data.expireTime);
                getPersonalInfoAndSaveToLocal();
                console.log('微信登录成功');
            } else {
                console.error(res);
                Toast("微信登录失败");
            }
        })
        .catch((err) => {
            Toast("微信登录出错");
            console.log(err);
        });
}

export function isLoging() {
    return localStorageEx.getLocalBool("is_loging", false);
}

export function setLogingState(value) {
    localStorageEx.saveLocalValue("is_loging", value)
}

/**
 * 刷新Token
 * @param {Object} refreshToken
 */
export function refreshToken(refreshToken) {
    var url = getApiRefreshToken(refreshToken);
    return http.get(url, {})
        .then((res) => {
            if (res.data && res.data.data) {
                let data = res.data.data;
                localStorage.setItem(key_accessToken, data.accessToken);
                localStorage.setItem(key_refreshToken, data.refreshToken);
                localStorage.setItem(key_expireTime, data.expireTime);
                localStorage.removeItem(W); //重置防止一直获取最新
                getPersonalInfoAndSaveToLocal(true);
                console.log('更新凭证成功');
            } else if (res.status == 404 || res.status == 400) {
                localStorageEx.removeLocalValue(key_refreshToken); //过期或不存在直接移除本地refreshToken
            } else {
                Toast("更新凭证失败");
                console.log(res);
            }
        })
        .catch((err) => {
            Toast("更新凭证失败");
            console.log(err);
        });
}

/**
 * 自动刷新Token
 */
export function refreshTokenAuto() {
    let needFresh = localStorageEx.getLocalBool(key_needFreshToken, false);
    let refreshTokenValue = localStorageEx.getLocalValue(key_refreshToken);
    if (needFresh) {
        if (refreshTokenValue) {
            refreshToken(refreshTokenValue);
        }
    } else {
        // console.log('暂不需要更新Token');
    }
}