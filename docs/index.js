import TcComponents from 'tc-components/plugin';
import Vue from 'vue';

import TcDocsLayout from '@/components/TcDocsLayout';
import router from '@/router';

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