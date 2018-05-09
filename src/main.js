import Vue from 'vue'
import App from './AppMain.vue'

import Popup from './components/Popup/index.js'
Vue.use(Popup);

new Vue({
  el: '#app',
  render: h => h(App)
})
