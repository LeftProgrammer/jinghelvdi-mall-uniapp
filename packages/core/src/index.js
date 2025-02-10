// @jinghe-lvdi/core/src/index.js

// 导入已迁移的模块
import $helper from './helper';
import $url from './url';

// 核心库的sheep对象
const sheep = {
    $helper,
    $url
};

// 导出模块
export { $helper, $url };

// 导出子模块，支持按需导入
export * from './helper';
export * from './url';
export * from './validate';
export * from './util'; 

export default sheep;