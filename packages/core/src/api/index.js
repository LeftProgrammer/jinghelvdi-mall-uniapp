import { getService } from './registry';
import { ServiceNames } from './contracts';

// 创建服务代理
const createServiceProxy = (serviceName) => {
  return new Proxy({}, {
    get(target, property) {
      const service = getService(serviceName);
      return service[property];
    }
  });
};

// 创建模块代理
const createModuleProxy = (moduleName) => {
  return new Proxy({}, {
    get(target, property) {
      const serviceName = `${moduleName}.${property}`;
      return createServiceProxy(serviceName);
    }
  });
};

// 导出统一的 API 对象
const api = new Proxy({}, {
  get(target, moduleName) {
    // 常用服务直接放在顶层
    switch(moduleName) {
      case 'auth':
        return createServiceProxy(ServiceNames.member.AUTH);
      case 'user':
        return createServiceProxy(ServiceNames.member.USER);
      case 'address':
        return createServiceProxy(ServiceNames.member.ADDRESS);
      case 'goods':
        return createServiceProxy(ServiceNames.product.SPU);
      case 'order':
        return createServiceProxy(ServiceNames.trade.ORDER);
      case 'wallet':
        return createServiceProxy(ServiceNames.pay.WALLET);
      default:
        // 其他服务按模块访问
        return createModuleProxy(moduleName);
    }
  }
});

export default api;
