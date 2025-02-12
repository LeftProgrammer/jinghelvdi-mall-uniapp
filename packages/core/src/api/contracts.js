/**
 * 服务名称常量
 */
export const ServiceNames = {
  AUTH: 'AuthService',
  USER: 'UserService',
  ADDRESS: 'AddressService',
  PAY: 'PayService',
  PRODUCT: 'ProductService',
  POINT: 'PointService',
  SIGNIN: 'SignInService',
  SOCIAL: 'SocialService',
};

/**
 * 认证服务契约
 */
export const AuthServiceContract = {
  login: 'function',
  refreshToken: 'function',
  logout: 'function',
  smsLogin: 'function',
  sendSmsCode: 'function',
  socialAuthRedirect: 'function',
  socialLogin: 'function',
  weixinMiniAppLogin: 'function',
};

/**
 * 用户服务契约
 */
export const UserServiceContract = {
  getUserInfo: 'function',
  updateUserInfo: 'function',
  updateAvatar: 'function',
  updateMobile: 'function',
  updatePassword: 'function',
};

/**
 * 地址服务契约
 */
export const AddressServiceContract = {
  getList: 'function',
  getDetail: 'function',
  add: 'function',
  update: 'function',
  delete: 'function',
  setDefault: 'function',
};

/**
 * 积分服务契约
 */
export const PointServiceContract = {
  getRecord: 'function',
  getDetail: 'function',
};

/**
 * 签到服务契约
 */
export const SignInServiceContract = {
  sign: 'function',
  getConfig: 'function',
  getList: 'function',
};

/**
 * 社交服务契约
 */
export const SocialServiceContract = {
  bindLogin: 'function',
  unbind: 'function',
  getBindList: 'function',
};