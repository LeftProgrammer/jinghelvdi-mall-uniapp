import { $helper,  $url, $router, $platform, $zIndex, $store } from '@jinghelvdi/core';

// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
// import duration from 'dayjs/plugin/duration';
// import 'dayjs/locale/zh-cn';

// dayjs.locale('zh-cn');
// dayjs.extend(relativeTime);
// dayjs.extend(duration);

const sheep = {
  $helper,
  $url,
  $router,
  $platform,
  $zIndex,
  $store,
};

// 加载Shopro底层依赖
export async function ShoproInit() {
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
