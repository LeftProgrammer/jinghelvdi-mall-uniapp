import { $helper,  $url, $router, $platform, $zIndex, $store, $api } from '@jinghe-lvdi/core';
import { registerServices } from '@jinghe-lvdi/core/src/api/registry';
import AuthApi from './api/member/auth';
import UserApi from './api/member/user';
import SocialApi from './api/member/social';
import FileApi from './api/infra/file';
import CouponApi from './api/promotion/coupon';
import CombinationApi from './api/promotion/combination';
import PointApi from './api/promotion/point';
import ArticleApi from './api/promotion/article';
import SeckillApi from './api/promotion/seckill';
import DiyApi from './api/promotion/diy';
import SpuApi from './api/product/spu';
import OrderApi from './api/trade/order';
import BrokerageApi from './api/trade/brokerage';
import CartApi from './api/trade/cart';
import PayOrderApi from './api/pay/order';
import PayWalletApi from './api/pay/wallet';

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

export function initServices() {
  // 按模块组织服务
  const services = {
    member: {
      AuthApi,
      UserApi,
      SocialApi,
    },
    infra: {
      FileApi
    },
    promotion: {
      CouponApi,
      CombinationApi,
      PointApi,
      ArticleApi,
      SeckillApi,
      DiyApi
    },
    product: {
      SpuApi
    },
    trade: {
      OrderApi,
      BrokerageApi,
      CartApi
    },
    pay: {
      PayOrderApi,
      PayWalletApi
    },
    third: {}
  };
  // 批量注册服务
  const success = registerServices(services, { override: true });
  if (!success) {
    console.error('[Sheep] Service registration failed');
    throw new Error('Service registration failed. Check the console for details.');
  }
}

// 加载Shopro底层依赖
export async function ShoproInit() {
  // 注册Api服务
  initServices();
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
