import '~/mount/styles.scss';
import { createApp } from 'vue';
import App from '~/mount/App.vue';
import plugins from '~/mount/plugins.js';

createApp(App)
  .use(plugins)
  .mount('#app');