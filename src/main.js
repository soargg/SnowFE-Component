import Vue from 'vue'
import App from './AppMain.vue'

// import Popup from './components/Popup'
import Picker from './components/Picker'

// Vue.use(Popup);
// Vue.use(Picker);

new Vue({
  el: '#app',
  render: h => h(App)
})
