import Vue from 'vue';

import TcComponents from '../plugin';
import TcDocsLayout from './components/TcDocsLayout';
import router from './router';

Vue.use(TcComponents);

new Vue({
  render(createElement) {
    return createElement(TcDocsLayout, {
      attrs: {
        id: 'app',
      },
    });
  },
  router,
}).$mount('#app');
