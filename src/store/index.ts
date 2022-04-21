import Vue from 'vue'
import Vuex from 'vuex'
import clone from "@/lib/clone";
import createId from "@/lib/createId";

Vue.use(Vuex)

type RootState = {
  recordList:RecordItem[],
  tagList:Tag[],
  currentTag?:Tag
}
const store =  new Vuex.Store({
  state: {
    recordList:[],
    tagList:[],
    currentTag:undefined
  } as RootState,
  mutations: {
    fetchRecords(state){
      state.recordList =  JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[]
    },
    createRecord(state,record){
      const newRecord:RecordItem = clone(record)
      newRecord.createAt = new Date()
      state.recordList.push(newRecord)
      store.commit('saveRecords')
    },
    saveRecords(state){
      window.localStorage.setItem('recordList',JSON.stringify(state.recordList))
    
    },
  
    fetchTags(state){
      return state.tagList =  JSON.parse(window.localStorage.getItem('tagList') || '[]')
    },
    setCuttentTag(state,id:string){
      state.currentTag =  state.tagList.filter(t=>t.id===id)[0]
    },
    createTag(state,name:string){
      const names = state.tagList.map(item=>item.name)
      if(names.indexOf(name)>=0){ return 'duplicated'}
      const id = createId().toString()
      state.tagList.push({id,name:name})
      store.commit('saveTag')
      return 'success'
    },
    removeTag(state,id:string){
      let index = -1
      for(let i = 0;i<=state.tagList.length;i++){
        if(state.tagList[i].id===id){
          index = i
          break;
        }
      }
      state.tagList.splice(index,1)
      store.commit('saveTag')
      return 'success'
    },
    saveTag(state){
      window.localStorage.setItem('tagList',JSON.stringify(state.tagList))
    
    },
  }
});
export default store