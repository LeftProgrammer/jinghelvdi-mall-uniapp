import {
  ServiceNames,
  ServiceContracts,
} from './contracts';

// 使用全局对象确保单例
const getRegistry = () => {
  const globalObj = typeof window !== 'undefined' ? window : global;
  const KEY = Symbol.for('SERVICE_REGISTRY');
  
  if (!globalObj[KEY]) {
    globalObj[KEY] = {
      services: new Map(),
      initialized: false,
      modules: new Set()  // 记录已初始化的模块
    };
  }
  
  return globalObj[KEY];
};

// 获取服务注册表单例
const registry = getRegistry();

/**
 * 根据契约过滤服务实现
 */
function filterImplementation(serviceName, implementation) {
  const contract = ServiceContracts[serviceName];
  if (!contract) return implementation;

  const filteredImpl = {};
  for (const [methodName, type] of Object.entries(contract)) {
    if (type === 'function' && typeof implementation[methodName] === 'function') {
      filteredImpl[methodName] = implementation[methodName];
    }
  }
  return filteredImpl;
}

/**
 * 注册单个服务
 */
export function registerService(serviceName, implementation, options = {}) {
  const { override = false } = options;
  
  if (!implementation) {
    console.warn(`[Registry] Invalid implementation for service: ${serviceName}`);
    return false;
  }

  if (registry.services.has(serviceName) && !override) {
    console.warn(`[Registry] Service ${serviceName} already registered`);
    return false;
  }

  // 根据契约过滤实现
  const filteredImpl = filterImplementation(serviceName, implementation);
  
  registry.services.set(serviceName, filteredImpl);
  // console.log(`[Registry] Service ${serviceName} registered successfully with methods:`, 
  //   Object.keys(filteredImpl));
  return true;
}

/**
 * 注册模块服务
 */
export function registerModuleServices(moduleName, implementations, options = {}) {
  if (registry.modules.has(moduleName) && !options.override) {
    console.warn(`[Registry] Module ${moduleName} already registered`);
    return false;
  }

  // 获取模块的服务名称
  const moduleServices = ServiceNames[moduleName];
  if (!moduleServices) {
    console.error(`[Registry] Unknown module: ${moduleName}`);
    return false;
  }

  let success = true;
  // 注册模块下的所有服务
  Object.entries(implementations).forEach(([apiName, implementation]) => {
    // 使用完整的服务名称（例如：'member.AuthApi'）
    const fullServiceName = moduleServices[apiName];
    if (!fullServiceName) {
      console.warn(`[Registry] Unknown service ${apiName} in module ${moduleName}`);
      success = false;
      return;
    }

    if (!registerService(fullServiceName, implementation)) {
      success = false;
    }
  });

  if (success) {
    registry.modules.add(moduleName);
  } else {
    console.error(`[Registry] Module ${moduleName} registration failed`);
  }

  return success;
}

/**
 * 批量注册服务
 */
export function registerServices(services) {
  // console.log(`[Registry] Batch registering services:`, Object.keys(services));
  let allSuccess = true;
  
  // 按模块注册服务
  Object.entries(services).forEach(([moduleName, moduleServices]) => {
    if (!registerModuleServices(moduleName, moduleServices)) {
      allSuccess = false;
    }
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
 * 检查模块是否已注册
 */
export function hasModule(moduleName) {
  return registry.modules.has(moduleName);
}

/**
 * 获取已注册的模块列表
 */
export function getRegisteredModules() {
  return Array.from(registry.modules);
}

/**
 * 获取模块下的所有服务
 */
export function getModuleServices(moduleName) {
  const moduleServices = {};
  const prefix = `${moduleName}.`;
  
  for (const [serviceName, service] of registry.services.entries()) {
    if (serviceName.startsWith(prefix)) {
      moduleServices[serviceName.slice(prefix.length)] = service;
    }
  }
  
  return moduleServices;
}

/**
 * 检查服务是否已初始化
 */
export function isServicesInitialized() {
  return registry.initialized;
}