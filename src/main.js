import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.prototype.$http = axios;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
})

import ElementUI, {
  Message
} from 'element-ui'


const showMessage = Symbol('showMessage')

let messageInstance = null;
class DonMessage {
  success(options, single = true) {
    this[showMessage]('success', options, single)
  }
  warning(options, single = true) {
    this[showMessage]('warning', options, single)
  }
  info(options, single = true) {
    this[showMessage]('info', options, single)
  }
  error(options, single = true) {
      this[showMessage]('error', options, single)
    }
    [showMessage](type, options, single) {
      if (messageInstance && single) {
        messageInstance.close() 
      }
      messageInstance = Message[type](options) 
    }
}
Vue.use(ElementUI)
Vue.prototype.$message = new DonMessage()