import { getService } from './registry';
import { ServiceNames } from './contracts';

// 服务访问代理
const createServiceProxy = (serviceName) => {
  return new Proxy({}, {
    get(target, property) {
      const service = getService(serviceName);
      return service[property];
    }
  });
};

// 导出服务实例
export const userService = createServiceProxy(ServiceNames.USER);
export const authService = createServiceProxy(ServiceNames.AUTH);
export const addressService = createServiceProxy(ServiceNames.ADDRESS);

// 为了向后兼容，也提供 api 对象
export const api = {
  user: userService,
  auth: authService,
  address: addressService
};
