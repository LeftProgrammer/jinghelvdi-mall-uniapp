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

// 使用全局对象确保单例
const getRegistry = () => {
  // 在全局对象上存储单例
  const globalObj = typeof window !== 'undefined' ? window : global;
  const KEY = Symbol.for('SERVICE_REGISTRY');
  
  if (!globalObj[KEY]) {
    const registry = {
      services: new Map(),
      initialized: false
    };
    
    globalObj[KEY] = registry;
  }
  
  return globalObj[KEY];
};

// 获取服务注册表单例
const registry = getRegistry();

/**
 * 注册服务
 */
export function registerService(serviceName, implementation, options = {}) {
  const { override = false } = options;
  console.log(`[Registry] Registering service: ${serviceName}`);
  
  if (!implementation) {
    console.warn(`[Registry] Invalid implementation for service: ${serviceName}`);
    return false;
  }

  if (registry.services.has(serviceName) && !override) {
    console.warn(`[Registry] Service ${serviceName} already registered`);
    return false;
  }

  const contract = ServiceContracts[serviceName];
  const registeredImplementation = {};
  
  for (const [methodName, type] of Object.entries(contract)) {
    if (type === 'function' && typeof implementation[methodName] === 'function') {
      registeredImplementation[methodName] = implementation[methodName];
    }
  }

  registry.services.set(serviceName, registeredImplementation);
  console.log(`[Registry] Service ${serviceName} registered successfully with methods:`, Object.keys(registeredImplementation));
  return true;
}

/**
 * 批量注册服务
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
  
  registry.initialized = true;
  return allSuccess;
}

/**
 * 获取服务实例
 */
export function getService(serviceName) {
  if (!registry.initialized) {
    console.warn(`[Registry] Services not initialized yet. Make sure services are registered.`);
  }
  
  const service = registry.services.get(serviceName);
  if (!service) {
    console.error(`[Registry] Service ${serviceName} not found`);
    throw new Error(`Service ${serviceName} not registered`);
  }
  return service;
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

/**
 * 检查服务是否已初始化
 */
export function isServicesInitialized() {
  return registry.initialized;
}