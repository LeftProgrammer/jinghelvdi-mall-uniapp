# @jinghe-lvdi/core

芋道商城 uniapp 基础框架，提供了完整的商城基础功能组件和工具函数。

## 特性

- 🚀 基于 Vue 3 和 uni-app
- 📦 开箱即用的商城组件
- 🛠️ 丰富的工具函数
- 🔄 状态管理（Pinia）
- 📱 多端适配
- 🎨 主题定制

## 安装

```bash
npm install @jinghe-lvdi/core
# 或
pnpm add @jinghe-lvdi/core
```

## 快速开始

```javascript
import { createSSRApp } from 'vue'
import sheep from '@jinghe-lvdi/core'
import '@jinghe-lvdi/core/src/scss/index.css'

export function createApp() {
  const app = createSSRApp(App)
  
  app.use(sheep, {
    baseUrl: 'https://api.example.com', // API 基础路径
  })
  
  return { app }
}

// 初始化
await sheep.init({
  // 初始化配置
})
```

## 功能模块

### 路由管理 ($router)
```javascript
import { $router } from '@jinghe-lvdi/core'

// 页面跳转
$router.go('/pages/index/index')
```

### 请求处理 ($url)
```javascript
import { $url } from '@jinghe-lvdi/core'

// 发起请求
const response = await $url.get('/api/products')
```

### 平台适配 ($platform)
```javascript
import { $platform } from '@jinghe-lvdi/core'

// 判断平台
if ($platform.isH5) {
  // H5 平台特定代码
}
```

### 工具函数 ($helper)
```javascript
import { $helper } from '@jinghe-lvdi/core'

// 格式化价格
const price = $helper.formatPrice(100)
```

### 状态管理
```javascript
import { $store } from '@jinghe-lvdi/core'

// 获取用户信息
const userInfo = $store('user').info
```

## 组件

框架提供了丰富的商城组件，包括：

- 商品卡片
- 购物车
- 订单列表
- 支付面板
- 地址选择
- ...更多

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (git checkout -b feature/AmazingFeature)
3. 提交你的改动 (git commit -m 'Add some AmazingFeature')
4. 推送到分支 (git push origin feature/AmazingFeature)
5. 开启一个 Pull Request

## 许可证

MIT


## @jinghe-lvdi/core 包发布

...
打包：pnpm run build

npm 包推送： 
npm login --registry=http://192.168.10.110:8081/repository/npm-hosted-jinghe/
npm publish --registry=http://192.168.10.110:8081/repository/npm-hosted-jinghe/

删除包： npm unpublish @jinghe-lvdi/core@1.0.0 --registry=http://192.168.10.110:8081/repository/npm-hosted-jinghe/ --force

npm 包使用： pnpm install @jinghe-lvdi/core --filter jinghe-lanhai-template --registry=http://192.168.10.110:8081/repository/npm-hosted-jinghe
...