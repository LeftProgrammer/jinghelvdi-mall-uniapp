import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist-uni';

// 自动注入所有pinia模块
// const files = import.meta.glob('./*.js', { eager: true });
// const modules = {};
// Object.keys(files).forEach((key) => {
//   modules[key.replace(/(.*\/)*([^.]+).*/gi, '$2')] = files[key].default;
// });

// 导入 store 模块
import app from './app';
import user from './user';
import cart from './cart';
import sys from './sys';
import modal from './modal';

// store 模块映射
const modules = {
  app,
  user,
  cart,
  sys,
  modal
};

export const setupPinia = (app) => {
  const pinia = createPinia();
  pinia.use(piniaPersist);
  app.use(pinia);
};

// 返回 store 实例
export default (name) => {
  if (!modules[name]) {
    console.warn(`Store module [${name}] not found`);
    return null;
  }
  return modules[name]();
};