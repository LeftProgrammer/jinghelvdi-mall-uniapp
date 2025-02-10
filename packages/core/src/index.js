// @jinghe-lvdi/core/src/index.js

// 导入已迁移的模块
import $helper from './helper';
import $url from './url';
import $router from './router';
import $platform from './platform';
import $zIndex from './config/zIndex';
import $store from './store';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);
dayjs.extend(duration);

// 核心库的sheep对象
const sheep = {
    $helper,
    $url,
    $router,
    $platform,
    $zIndex,
    $store,
};

// 导出模块
export { $helper, $url, $router, $platform, $zIndex, $store };

// 导出子模块，支持按需导入
export * from './helper';
export * from './url';
export * from './router';
// export * from './platform';
export * from './store';
export * from './config';
export * from './validate';
export * from './util'; 
export * from './request';
export * from './hooks';
// export * from './libs'; // TODO

export default sheep;