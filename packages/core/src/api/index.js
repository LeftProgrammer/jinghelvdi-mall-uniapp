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
    // member: {
    //   AuthApi: 'member.AuthApi',
    //   UserApi: 'member.UserApi',
    //   SocialApi: 'member.SocialApi'
    // },
    
    // // infra 模块
    // infra: {
    //   FileApi: 'infra.FileApi'
    // },
  
    // // promotion 模块
    // promotion: {
    //   CouponApi: 'promotion.CouponApi',
    //   CombinationApi: 'promotion.CombinationApi',
    //   PointApi: 'promotion.PointApi',
    //   ArticleApi: 'promotion.ArticleApi',
    //   SeckillApi: 'promotion.SeckillApi',
    //   DiyApi: 'promotion.DiyApi',
    // },
  
    // // product 模块
    // product: {
    //   SpuApi: 'product.SpuApi',
    // },
  
    // // trade 模块
    // trade: {
    //   OrderApi: 'trade.OrderApi',
    //   BrokerageApi: 'trade.BrokerageApi',
    //   CartApi: 'trade.CartApi',
    // },
  
    // // pay 模块
    // pay: {
    //   PayOrderApi: 'pay.PayOrderApi',
    //   PayWalletApi: 'pay.PayWalletApi',
    // },
  
    // // third 模块
    // third: {
    //   AppleApi: 'third.AppleApi',
    //   WechatApi: 'third.WechatApi',
    // },

    switch(moduleName) {
      case 'authApi':
        return createServiceProxy(ServiceNames.member.AuthApi);
      case 'userApi':
        return createServiceProxy(ServiceNames.member.UserApi);
      case 'socialApi':
        return createServiceProxy(ServiceNames.member.SocialApi);
      case 'fileApi':
        return createServiceProxy(ServiceNames.infra.FileApi);
      case 'couponApi':
        return createServiceProxy(ServiceNames.promotion.CouponApi);
      case 'combinationApi':
        return createServiceProxy(ServiceNames.promotion.CombinationApi);
      case 'pointApi':
        return createServiceProxy(ServiceNames.promotion.PointApi);
      case 'articleApi':
        return createServiceProxy(ServiceNames.promotion.ArticleApi);
      case 'seckillApi':
        return createServiceProxy(ServiceNames.promotion.SeckillApi);
      case 'diyApi':
        return createServiceProxy(ServiceNames.promotion.DiyApi);
      case 'spuApi':
        return createServiceProxy(ServiceNames.product.SpuApi);
      case 'orderApi':
        return createServiceProxy(ServiceNames.trade.OrderApi);
      case 'brokerageApi':
        return createServiceProxy(ServiceNames.trade.BrokerageApi);
      case 'cartApi':
        return createServiceProxy(ServiceNames.trade.CartApi);
      case 'payOrderApi':
        return createServiceProxy(ServiceNames.pay.PayOrderApi);
      case 'payWalletApi':
        return createServiceProxy(ServiceNames.pay.PayWalletApi);
      case 'appleApi':
        return createServiceProxy(ServiceNames.third.AppleApi);
      case 'wechatApi':
        return createServiceProxy(ServiceNames.third.WechatApi);
      default:
        // 其他服务按模块访问
        return createModuleProxy(moduleName);
    }
  }
});

export default api;
