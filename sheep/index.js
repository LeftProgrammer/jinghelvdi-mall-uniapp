import { $helper,  $url, $router, $platform, $zIndex, $store, $api } from '@jinghelvdi/core';
import { registerServices } from '@jinghelvdi/core/src/api/registry';
import AuthApi from './api/member/auth';
import UserApi from './api/member/user';
import AddressApi from './api/member/address';
import PointApi from './api/member/point';
import SignInApi from './api/member/signin';
import SocialApi from './api/member/social';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);
dayjs.extend(duration);

const sheep = {
  $helper,
  $url,
  $router,
  $platform,
  $zIndex,
  $store,
  $api,
};

export function initProjectServices() {
  // 按模块组织服务
  const services = {
    member: {
      auth: AuthApi,
      user: UserApi,
      address: AddressApi,
      point: PointApi,
      signin: SignInApi,
      social: SocialApi,
    }
  };
  // 批量注册服务
  const success = registerServices(services, { override: true });
  if (!success) {
    console.error('[Sheep] Service registration failed');
    throw new Error('Service registration failed. Check the console for details.');
  } else {
    console.log('[Sheep] Service registration completed successfully');
  }
}

// 加载Shopro底层依赖
export async function ShoproInit() {
  initProjectServices();
  // 应用初始化
  await $store('app').init();

  // 平台初始化加载(各平台provider提供不同的加载流程)
  $platform.load();

  if (process.env.NODE_ENV === 'development') {
    ShoproDebug();
  }
}

// 开发模式
function ShoproDebug() {
  // 开发环境引入vconsole调试
  // #ifdef H5
  // import("vconsole").then(vconsole => {
  // 	new vconsole.default();
  // });
  // #endif

  // TODO 芋艿：可以打印路由
  // 同步前端页面到后端
  // console.log(ROUTES)
}

export default sheep;
