// @jinghe-lvdi/core/src/index.js

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);
dayjs.extend(duration);

// 导入已迁移的模块
import $helper from './helper';
import $url from './url';
import $router from './router';

// 核心库的sheep对象
const sheep = {
    $helper,
    $url,
    $router
};

// 导出模块
export { $helper, $url, $router };

// 导出子模块，支持按需导入
export * from './helper';
export * from './url';
export * from './router';
export * from './config';
export * from './validate';
export * from './util'; 
export * from './request';
export * from './hooks';

export default sheep;