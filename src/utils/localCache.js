import localStorageEx from "../utils/localStorageEx.js";
import {
  getMd5
} from "../utils/util.js";
import { 
  key_accessToken,key_expireTime,key_openId,key_personalInfo,
  key_refreshToken,key_wxUserInfo,key_needFreshToken,key_MembersInCharge 
} from '../utils/localStorageEx.js'
const key_toDoData = "to_do_data"
const key_familiesIncharge = "families_in_charge"
const key_md5MembersIncharge = "md5_members_incharge"
const key_md5PersonalInfo = "md5_personal_info"

const localCache = {
  getPersonalInfo() {
    var md5Local = localStorageEx.getLocalValue(key_md5PersonalInfo);
    var info = localStorageEx.getLocalObject(key_personalInfo);
    if(info && getMd5(info) != md5Local){
      console.error("个人信息被篡改");
      return {};
    }
    return info;
  },

  savePersonalInfo(personalInfo) {
    localStorageEx.saveLocalValue(key_md5PersonalInfo,getMd5(personalInfo))
    return localStorageEx.saveLocalObject(key_personalInfo,personalInfo);
  },
  removePersonalInfo() {
    return localStorageEx.removeLocalValue(key_personalInfo);
  },
  
  getToDoData() {
    return localStorageEx.getLocalObject(key_toDoData);
  },
    
  saveToDoData(todo) {
    return localStorageEx.saveLocalObject(key_toDoData,todo);
  },
  
  getMembersInCharge(familyGroup) {
    var list = localStorageEx.getLocalObject(key_MembersInCharge)??[];
    var md5Local = localStorageEx.getLocalValue(key_md5MembersIncharge);
    if(getMd5(list) != md5Local){
      console.error("权限数据不一致");
      return [];
    }
    for(var i=0;i<list.length;i++){
      if(list[i].familyGroup == familyGroup)
        return list[i].members;
    }
    return [];
  },
  
  saveMembersInCharge(familyGroup,members) {
    var list = localStorageEx.getLocalObject(key_MembersInCharge)??[];
    var isExist = false;
    for(var i=0;i<list.length;i++){
      if(list[i].familyGroup == familyGroup){
        list[i].members = members;
        list[i].checkSum = getMd5(members);
        isExist = true;
        break;
      }  
    }
    if(!isExist){
      var obj = {familyGroup:familyGroup,members:members,checkSum:getMd5(members)}
      list.push(obj)
    }
    localStorageEx.saveLocalObject(key_MembersInCharge,list);
    localStorageEx.saveLocalValue(key_md5MembersIncharge,getMd5(list))
  },
  
  isMemberInCharge(familyGroup,memberId) {
    if (localCache.isMemberSelf(memberId)) 
      return true;
    var members = localCache.getMembersInCharge(familyGroup);
    return members.filter(x=>x.memberId == 'all' || x.memberId == memberId).length > 0;
  },
  /**
   * 判断当前登录用户与指定成员是否关联为同一个人
   * @param {Object} memberId
   */
  isMemberSelf (memberId) {
    var logUser = localCache.getPersonalInfo();
    if(!logUser || !logUser.bindMembers)
      return false;
    for (var i = 0; i < logUser.bindMembers.length; i++) {
      if(memberId == logUser.bindMembers[i])
        return true;
    }
    return false;
  },
  
  /**
   * 当前登录用户是否属于指定族谱
   * @param {Object} familyGroup
   */
  isUserInFamily (familyGroup) {
    var logUser = localCache.getPersonalInfo();
    if(!logUser || !logUser.bindFamiles)
      return false;
    return logUser.bindFamiles.filter(x=>x == familyGroup).length > 0;
  },
  
  saveFamiliesInCharge(familyNumbers) {
    localStorageEx.saveLocalAsCache(key_familiesIncharge,familyNumbers);
  },
  
  getFamiliesInCharge(timeMinutes) {
    timeMinutes = timeMinutes??60;
    var list = localStorageEx.getLocalCacheInRange(key_familiesIncharge,timeMinutes*60,true);
    return list??[];
  },
  isFamilyInCharge(familyGroup,timeMinutes) {
    return localCache.getFamiliesInCharge(timeMinutes).indexOf(familyGroup) >= 0;
  },
  
  getTreeSettings() {
    var settings = localStorageEx.getLocalCacheInRange('tree_settings',60 * 60 * 24,true);    
    return settings ?? {
      showImage:false,
      showCousin:true,
      showFemale:true,
    };
  },
  
  saveTreeSettings(settings){
    localStorageEx.saveLocalAsCache('tree_settings',settings);
  }
}

export default localCache
