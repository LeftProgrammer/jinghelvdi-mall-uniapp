import request from '@jinghelvdi/core/src/request/index';

const TradeConfigApi = {
  // 获得交易配置
  getTradeConfig: () => {
    return request({
      url: `/trade/config/get`,
      method: 'GET',
      custom: {
        showLoading: false,
      },
    });
  },
};

export default TradeConfigApi;
