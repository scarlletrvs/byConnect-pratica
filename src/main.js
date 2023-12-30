// main.js
import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css'; 
import router from './routers/router';
import {store} from './store/index';


Vue.config.productionTip = false;

Vue.use(Vuetify);
const vuetify = new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#000000',
        background: '#F19F05',
        post: '#CCCCCC'
      },
      dark: {
        primary: '#F19F05',
        background: '#000000',
        post:'#333333'
      },
    },
  },
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
