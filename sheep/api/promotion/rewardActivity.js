import request from '@jinghe-lvdi/core/src/request/index';

const RewardActivityApi = {
  // 获得满减送活动
  getRewardActivity: (id) => {
    return request({
      url: '/promotion/reward-activity/get',
      method: 'GET',
      params: { id },
    });
  }
};

export default RewardActivityApi;