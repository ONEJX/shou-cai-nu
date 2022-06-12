import store from "@/store/index2";

let id:number = JSON.parse(window.localStorage.getItem('_MaxId') || '0') || 0
function createId() {
  if(store.findTag(id.toString()) || store.findTag(id.toString())===undefined){
    id+=1
  }
  window.localStorage.setItem('_MaxId',JSON.stringify(id))
  return id
}
export default createId