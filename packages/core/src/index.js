// @jinghe-lvdi/core/src/index.js

// 导入已迁移的模块
import helper from './helper';  // 改为默认导入

// 核心库的sheep对象（只包含已迁移的模块）
const sheep = {
    $helper: helper  // 直接使用默认导入的helper
};

// 导出已迁移的模块
export const $helper = helper;

// 导出子模块，支持按需导入
export * from './helper';

// 默认导出
export default sheep;