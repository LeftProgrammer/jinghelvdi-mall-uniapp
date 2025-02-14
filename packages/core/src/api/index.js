import { getService } from './registry';
import { ServiceNames } from './contracts';

// 创建服务代理
const createServiceProxy = (serviceName) => {
  return new Proxy({}, {
    get(target, property) {
      const service = getService(serviceName);
      if (!service) {
        console.error(`[API] Service not found: ${serviceName}`);
        return undefined;
      }
      return service[property];
    }
  });
};

// 创建模块代理
const createModuleProxy = (moduleName) => {
  const moduleServices = ServiceNames[moduleName];
  if (!moduleServices) {
    console.error(`[API] Module not found: ${moduleName}`);
    return undefined;
  }

  return new Proxy({}, {
    get(target, serviceName) {
      // 服务名称转换：authApi -> AuthApi
      const apiName = serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
      const fullServiceName = moduleServices[apiName];
      
      if (!fullServiceName) {
        console.error(`[API] Service not found: ${moduleName}.${apiName}`);
        return undefined;
      }
      
      return createServiceProxy(fullServiceName);
    }
  });
};

// 导出统一的 API 对象
const api = new Proxy({}, {
  get(target, moduleName) {
    // 常用服务直接放在顶层，使用 camelCase
    switch(moduleName) {
      case 'authApi':
        return createServiceProxy(ServiceNames.member.AuthApi);
      case 'userApi':
        return createServiceProxy(ServiceNames.member.UserApi);
      case 'socialApi':
        return createServiceProxy(ServiceNames.pay.SocialApi);
      default:
        // 其他服务按模块访问
        return createModuleProxy(moduleName);
    }
  }
});

export default api;
