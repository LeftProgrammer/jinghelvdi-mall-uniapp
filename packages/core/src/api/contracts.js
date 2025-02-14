/**
 * 服务名称常量
 */
export const ServiceNames = {
  // member 模块
  member: {
    AuthApi: 'member.AuthApi',
    UserApi: 'member.UserApi',
    SocialApi: 'member.SocialApi'
  },
  
  // infra 模块
  infra: {
    FileApi: 'infra.FileApi'
  },

  // promotion 模块
  promotion: {
    CouponApi: 'promotion.CouponApi',
    CombinationApi: 'promotion.CombinationApi',
    PointApi: 'promotion.PointApi',
    ArticleApi: 'promotion.ArticleApi',
    SeckillApi: 'promotion.SeckillApi',
    DiyApi: 'promotion.DiyApi',
  },

  // product 模块
  product: {
    SpuApi: 'product.SpuApi',
  },

  // trade 模块
  trade: {
    OrderApi: 'trade.OrderApi',
    BrokerageApi: 'trade.BrokerageApi',
    CartApi: 'trade.CartApi',
  },

  // pay 模块
  pay: {
    PayOrderApi: 'pay.PayOrderApi',
    PayWalletApi: 'pay.PayWalletApi',
  },

  // third 模块
  third: {
    AppleApi: 'third.AppleApi',
    WechatApi: 'third.WechatApi',
  },
};

// member 模块契约
export const MemberContracts = {
  // 认证服务契约
  [ServiceNames.member.AuthApi]: {
    login: 'function',
    smsLogin: 'function',
    sendSmsCode: 'function',
    createWeixinMpJsapiSignature: 'function',
    socialLogin: 'function',
    weixinMiniAppLogin: 'function',
    socialAuthRedirect: 'function',
    refreshToken: 'function',
    logout: 'function',
  },

  // 用户服务契约
  [ServiceNames.member.UserApi]: {
    getUserInfo: 'function',
    updateUserMobileByWeixin: 'function',
  },

  // 社交服务契约
  [ServiceNames.member.SocialApi]: {
    socialBind: 'function',
    socialUnbind: 'function',
    getSocialUser: 'function',
    getSubscribeTemplateList: 'function',
    getWxaQrcode: 'function',
  },
};

// infra 模块契约
export const InfraContracts = {
  [ServiceNames.infra.FileApi]: {
    uploadFile: 'function',
    getFilePresignedUrl: 'function',
    createFile: 'function',
  },
};

// promotion 模块契约
export const PromotionContracts = {
  [ServiceNames.promotion.CouponApi]: {
    takeCoupon: 'function',
    getCouponTemplateListByIds: 'function',
    getUnusedCouponCount: 'function',
  },
  [ServiceNames.promotion.CombinationApi]: {
    getCombinationActivityListByIds: 'function',
  },
  [ServiceNames.promotion.PointApi]: {
    getPointActivityListByIds: 'function',
  },
  [ServiceNames.promotion.ArticleApi]: {
    getArticle: 'function',
  },
  [ServiceNames.promotion.SeckillApi]: {
    getSeckillActivityListByIds: 'function',
  },
  [ServiceNames.promotion.DiyApi]: {
    getDiyTemplate: 'function',
    getUsedDiyTemplate: 'function',
  },
};

// product 模块契约
export const ProductContracts = {
  [ServiceNames.product.SpuApi]: {
    getSpuListByIds: 'function',
    getSpuDetail: 'function',
  },
};

// trade 模块契约
export const TradeContracts = {
  [ServiceNames.trade.OrderApi]: {
    getSettlementProduct: 'function',
    getOrderCount: 'function',
  },
  [ServiceNames.trade.BrokerageApi]: {
    bindBrokerageUser: 'function',
  },
  [ServiceNames.trade.CartApi]: {
    getCartList: 'function',
    addCart: 'function',
    updateCartCount: 'function',
    deleteCart: 'function',
    updateCartSelected: 'function',
  },
};

// pay 模块契约
export const PayContracts = {
  [ServiceNames.pay.PayOrderApi]: {
    submitOrder: 'function',
  },
  [ServiceNames.pay.PayWalletApi]: {
    getPayWallet: 'function',
  },
};

// third 模块契约
export const ThirdContracts = {
  [ServiceNames.third.AppleApi]: {
    login: 'function',
  },
  [ServiceNames.third.WechatApi]: {
    login: 'function',
  },
};

// 导出所有契约
export const ServiceContracts = {
  ...MemberContracts,
  ...InfraContracts,
  ...PromotionContracts,
  ...ProductContracts,
  ...TradeContracts,
  ...PayContracts,
  ...ThirdContracts,
};