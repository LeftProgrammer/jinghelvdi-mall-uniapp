import { $helper,  $url, $router, $platform, $zIndex, $store } from '@jinghelvdi/core';
import { registerServices } from '@jinghelvdi/core/src/api/registry';
import { ServiceNames } from '@jinghelvdi/core/src/api/contracts';
import AuthUtil from './api/member/auth';
import UserUtil from './api/member/user';
import AddressUtil from './api/member/address';
import PointUtil from './api/member/point';
import SignInUtil from './api/member/signin';
import SocialUtil from './api/member/social';

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
};

export function initProjectServices() {
  const services = {
    [ServiceNames.AUTH]: AuthUtil,
    [ServiceNames.USER]: UserUtil,
    [ServiceNames.ADDRESS]: AddressUtil,
    [ServiceNames.POINT]: PointUtil,
    [ServiceNames.SIGNIN]: SignInUtil,
    [ServiceNames.SOCIAL]: SocialUtil,
  };
  // 批量注册服务
  const success = registerServices(services, { override: true });
  if (!success) {
    console.warn('Some services failed to register. Check the console for details.');
  }
  // registerService('AuthService', AuthUtil);
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
