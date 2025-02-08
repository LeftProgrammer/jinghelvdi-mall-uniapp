// @jinghe-lvdi/core/src/index.js

// 导入已迁移的模块
import $helper from './helper';

// 核心库的sheep对象
const sheep = {
    $helper
};

// 导出模块
export { $helper };

// 导出子模块，支持按需导入
export * from './helper';
export * from './validate';
export * from './util'; 

export default sheep;