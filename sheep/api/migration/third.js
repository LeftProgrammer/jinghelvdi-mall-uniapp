import request from '@jinghe-lvdi/core/src/request/index';

export default {
  // 苹果相关
  AppleApi: {
    // 第三方登录
    login: (data) =>
      request({
        url: 'third/apple/login',
        method: 'POST',
        data,
        custom: {
          showSuccess: true,
          loadingMsg: '登陆中',
        },
      }),
  },
};
