import '~/mount/styles.scss';
import { createApp } from 'vue';
import App from '~/mount/App.vue';
// import store from '~/store/store.js';
import plugins from '~/mount/plugins.js';

createApp(App)
//   .use(store)
  .use(plugins)
  .mount('#app');