// packages/core/src/api/registry.js
import {
  ServiceNames,
  AuthServiceContract,
  UserServiceContract,
  AddressServiceContract,
  PointServiceContract,
  SignInServiceContract,
  SocialServiceContract,
} from './contracts';

// 服务契约映射
const ServiceContracts = {
  [ServiceNames.AUTH]: AuthServiceContract,
  [ServiceNames.USER]: UserServiceContract,
  [ServiceNames.ADDRESS]: AddressServiceContract,
  [ServiceNames.POINT]: PointServiceContract,
  [ServiceNames.SIGNIN]: SignInServiceContract,
  [ServiceNames.SOCIAL]: SocialServiceContract,
};

// 使用模块级别的变量保存单例实例
const registry = {
  services: new Map()
};

/**
   * 验证服务实现是否符合契约
   * @private
   */
export function validateImplementation(serviceName, implementation) {
  const contract = ServiceContracts[serviceName];
  if (!contract) {
    console.warn(`[Registry] No contract found for service: ${serviceName}`);
    return true; // 没有契约定义时默认通过
  }

  for (const [methodName, type] of Object.entries(contract)) {
    if (type === 'function' && typeof implementation[methodName] !== 'function') {
      console.error(`[Registry] Service ${serviceName} missing required method: ${methodName}`);
      return false;
    }
  }
  return true;
}

/**
 * 注册服务实现
 * @param {string} serviceName - 服务名称
 * @param {object} implementation - 服务实现
 * @param {object} options - 注册选项
 * @returns {boolean} - 注册是否成功
 */
export function registerService(serviceName, implementation, options = {}) {
  const { override = false } = options;
  console.log(`[Registry] Registering service: ${serviceName}`);
  
  if (!implementation) {
    console.warn(`[Registry] Invalid implementation for service: ${serviceName}`);
    return false;
  }

  // 验证服务实现
  if (!validateImplementation(serviceName, implementation)) {
    console.error(`[Registry] Service ${serviceName} implementation does not match contract`);
    return false;
  }

  if (registry.services.has(serviceName) && !override) {
    console.warn(`[Registry] Service ${serviceName} already registered`);
    return false;
  }

  registry.services.set(serviceName, implementation);
  console.log(`[Registry] Service ${serviceName} registered successfully`);
  return true;
}

/**
 * 获取服务实例
 * @param {string} serviceName - 服务名称
 * @returns {object} 服务实现
 */
export function getService(serviceName) {
  console.log(`[Registry] Getting service: ${serviceName}`);
  console.log(`[Registry] Available services:`, Array.from(registry.services.keys()));
  
  const service = registry.services.get(serviceName);
  if (!service) {
    console.error(`[Registry] Service ${serviceName} not found`);
    throw new Error(`Service ${serviceName} not registered`);
  }
  return service;
}

/**
 * 批量注册服务
 * @param {Object} services - 服务映射对象
 * @param {object} options - 注册选项
 * @returns {boolean} - 是否全部注册成功
 */
export function registerServices(services, options = {}) {
  console.log(`[Registry] Batch registering services:`, Object.keys(services));
  let allSuccess = true;
  
  Object.entries(services).forEach(([name, implementation]) => {
    const success = registerService(name, implementation, options);
    if (!success) {
      console.error(`[Registry] Failed to register service: ${name}`);
    }
    allSuccess = allSuccess && success;
  });
  
  return allSuccess;
}

/**
 * 检查服务是否已注册
 */
export function hasService(serviceName) {
  return registry.services.has(serviceName);
}

/**
 * 注销服务
 */
export function unregisterService(serviceName) {
  return registry.services.delete(serviceName);
}

/**
 * 获取所有已注册的服务名称
 */
export function getRegisteredServices() {
  return Array.from(registry.services.keys());
}