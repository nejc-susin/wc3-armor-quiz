import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

const DEFAULT_TITLE = 'WC III Unit Quiz';

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = `WC III Unit ${to.name} Quiz` || DEFAULT_TITLE;
  });
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
