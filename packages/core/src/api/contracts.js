/**
 * 服务名称常量
 */
export const ServiceNames = {
  // member 模块
  member: {
    AUTH: 'member.auth',
    USER: 'member.user',
    ADDRESS: 'member.address',
    POINT: 'member.point',
    SIGNIN: 'member.signin',
    SOCIAL: 'member.social'
  },
  
  // infra 模块
  infra: {
    FILE: 'infra.file'
  },
  
  // pay 模块
  pay: {
    CHANNEL: 'pay.channel',
    ORDER: 'pay.order',
    WALLET: 'pay.wallet'
  },
  
  // product 模块
  product: {
    CATEGORY: 'product.category',
    COMMENT: 'product.comment',
    FAVORITE: 'product.favorite',
    HISTORY: 'product.history',
    SPU: 'product.spu'
  },
  
  // promotion 模块
  promotion: {
    ACTIVITY: 'promotion.activity',
    ARTICLE: 'promotion.article',
    COMBINATION: 'promotion.combination',
    COUPON: 'promotion.coupon',
    DIY: 'promotion.diy',
    KEFU: 'promotion.kefu',
    POINT: 'promotion.point',
    REWARD_ACTIVITY: 'promotion.rewardActivity',
    SECKILL: 'promotion.seckill'
  },
  
  // system 模块
  system: {
    AREA: 'system.area',
    DICT: 'system.dict'
  },
  
  // trade 模块
  trade: {
    AFTER_SALE: 'trade.afterSale',
    BROKERAGE: 'trade.brokerage',
    CART: 'trade.cart',
    CONFIG: 'trade.config',
    DELIVERY: 'trade.delivery',
    ORDER: 'trade.order'
  }
};

// member 模块契约
export const MemberContracts = {
  // 认证服务契约
  [ServiceNames.member.AUTH]: {
    login: 'function',
    refreshToken: 'function',
    logout: 'function',
    smsLogin: 'function',
    sendSmsCode: 'function',
    socialAuthRedirect: 'function',
    socialLogin: 'function',
    weixinMiniAppLogin: 'function',
  },

  // 用户服务契约
  [ServiceNames.member.USER]: {
    getUserInfo: 'function',
    updateUserInfo: 'function',
    updateAvatar: 'function',
    updateMobile: 'function',
    updatePassword: 'function',
  },

  // 地址服务契约
  [ServiceNames.member.ADDRESS]: {
    getList: 'function',
    getDetail: 'function',
    add: 'function',
    update: 'function',
    delete: 'function',
    setDefault: 'function',
  },

  // 积分服务契约
  [ServiceNames.member.POINT]: {
    getRecord: 'function',
    getDetail: 'function',
  },

  // 签到服务契约
  [ServiceNames.member.SIGNIN]: {
    sign: 'function',
    getConfig: 'function',
    getList: 'function',
  },

  // 社交服务契约
  [ServiceNames.member.SOCIAL]: {
    bindLogin: 'function',
    unbind: 'function',
    getBindList: 'function',
  },
};

// infra 模块契约
export const InfraContracts = {
  [ServiceNames.infra.FILE]: {
    upload: 'function',
    getUrl: 'function',
  },
};

// pay 模块契约
export const PayContracts = {
  [ServiceNames.pay.CHANNEL]: {
    // todo
  },
  [ServiceNames.pay.ORDER]: {
    create: 'function',
    query: 'function',
  },
  [ServiceNames.pay.WALLET]: {
    getBalance: 'function',
    recharge: 'function',
  },
};

// product 模块契约
export const ProductContracts = {
  [ServiceNames.product.CATEGORY]: {
    // todo
  },
  [ServiceNames.product.COMMENT]: {
    // todo
  },
  [ServiceNames.product.FAVORITE]: {
    // todo
  },
  [ServiceNames.product.HISTORY]: {
    // todo
  },
  [ServiceNames.product.SPU]: {
    // todo
  },
};

// promotion 模块契约
export const PromotionContracts = {
  [ServiceNames.promotion.ACTIVITY]: {
    // todo
  },
  [ServiceNames.promotion.ARTICLE]: {
    // todo
  },
  [ServiceNames.promotion.COMBINATION]: {
    // todo
  },
  [ServiceNames.promotion.COUPON]: {
    // todo
  },
  [ServiceNames.promotion.DIY]: {
    // todo
  },
  [ServiceNames.promotion.KEFU]: {
    // todo
  },
  [ServiceNames.promotion.POINT]: {
    // todo
  },
  [ServiceNames.promotion.REWARD_ACTIVITY]: {
    // todo
  },
  [ServiceNames.promotion.SECKILL]: {
    // todo
  },
};

// system 模块契约
export const SystemContracts = {
  [ServiceNames.system.AREA]: {
    // todo
  },
  [ServiceNames.system.DICT]: {
    // todo
  },
};

// trade 模块契约
export const TradeContracts = {
  [ServiceNames.trade.AFTER_SALE]: {
    // todo
  },
  [ServiceNames.trade.BROKERAGE]: {
    // todo
  },
  [ServiceNames.trade.CART]: {
    // todo
  },
  [ServiceNames.trade.CONFIG]: {
    // todo
  },
  [ServiceNames.trade.DELIVERY]: {
    // todo
  },
  [ServiceNames.trade.ORDER]: {
    // todo
  },
};

// 导出所有契约
export const ServiceContracts = {
  ...MemberContracts,
  ...InfraContracts,
  ...PayContracts,
  ...ProductContracts,
  ...PromotionContracts,
  ...SystemContracts,
  ...TradeContracts,
};