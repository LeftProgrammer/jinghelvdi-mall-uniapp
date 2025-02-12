import App from './App';
import { createSSRApp } from 'vue';
import { setupPinia } from '@jinghelvdi/core/src/store/index';

export function createApp() {
  const app = createSSRApp(App);
  
  setupPinia(app);

  return {
    app,
  };
}
