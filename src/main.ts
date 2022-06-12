import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from "@/components/Nav.vue";
import Icon from "@/components/Icon.vue";
import Layout from "@/components/Layout.vue";

Vue.config.productionTip = false
Vue.component('Nav',Nav)
Vue.component('Icon',Icon)
Vue.component('Layout',Layout)

window.onload =()=>{
  setTimeout(()=>{
    window.scrollTo(0,200)
  },0)
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

if(document.documentElement.clientWidth > 500){
  window.alert('为提升用户体验 请用手机打开')
  store.state.mask = true
}
