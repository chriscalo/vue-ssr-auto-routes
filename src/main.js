import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

export async function createApp({
  beforeApp = () => {},
  afterApp = () => {},
} = {}) {
  
  await beforeApp({
    router
  });
  
  const app = new Vue({
    router,
    render: h => h(App)
  });
  
  const result = {
    app,
    router
  };
  
  await afterApp(result);
  
  return result;
}
