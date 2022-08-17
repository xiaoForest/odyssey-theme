let ServerOrNot = 0
export const baseUrl = `${ServerOrNot==1?'http://localhost:44351/':'https://gdxczx.yuezhengwl.com/'}`
export const appBaseUrl = "https://gdxczx.yuezhengwl.com/"

export const wxAutoLogUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c5523d693bd8d42&redirect_uri=https%3a%2f%2fwww.yunkaobei.cn?app=zhifanzupu&from=youliqi&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'

//微信相关接口地址
export const getWxAccessTokenUrl = "https://yunkaobei.cn/api/login/wx/access_token/"
export const getWxUserInfoUrl = "https://yunkaobei.cn/api/login/wx/userInfo/"

export const defaultHeadMale = "https://gdxczx.yuezhengwl.com/favicon.ico"
export const defaultHeadFemale = "https://gdxczx.yuezhengwl.com/favicon.ico"
export const defaultUserPic = "/src/assets/images/cover_200_150.png"
export const defaultWallPage = "/src/assets/images/642.jpg"
export const coverImageFileName = "cover_200_150.png"

//照片最大大小
export const photoMaxSize = 10 * 1024 * 1024