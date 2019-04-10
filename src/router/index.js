// router/index.js
import Vue from "vue";
import Router from "vue-router";

// import generated routes
import routes from "./routes";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes
});
