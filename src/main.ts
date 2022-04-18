import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from "@/components/Nav.vue";
import Icon from "@/components/Icon.vue";
import Layout from "@/components/Layout.vue";
import {tagListModel} from "@/models/tagListModel";

Vue.config.productionTip = false
Vue.component('Nav',Nav)
Vue.component('Icon',Icon)
Vue.component('Layout',Layout)

window.tagList = tagListModel.fetch()
// @ts-ignore
window.findTag = (id:string)=>{
  return window.tagList.filter(t=>t.id===id)[0]
}
window.createTag = (name:string) =>{
  const message = tagListModel.create(name)
  if(message === 'duplicated'){
      window.alert('标签重复')
    }else if(message === 'success'){
      window.alert('添加成功')
  }
}
// @ts-ignore
window.removeTag = (id:string)=>{
  if(tagListModel.remove(id)){
    return 'success'
  }
}
// @ts-ignore
window.updateTag = (id:string,name:string)=>{
  return tagListModel.update(id,name)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
