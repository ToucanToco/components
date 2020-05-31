import Vue from 'vue';

import TcDocsLayout from './components/TcDocsLayout';
import router from './router';
import store from './store';

store.dispatch('init');
new Vue({
  destroyed() {
    store.dispatch('cleanup');
  },
  render(createElement) {
    return createElement(TcDocsLayout, {
      attrs: {
        id: 'app',
      },
    });
  },
  router,
  store,
}).$mount('#app');
