import tagStore from "@/store/tagStore";

let id:number = JSON.parse(window.localStorage.getItem('_MaxId') || '0') || 0
function createId() {
  if(tagStore.findTag(id.toString()) || tagStore.findTag(id.toString())===undefined){
    id+=1
  }
  window.localStorage.setItem('_MaxId',JSON.stringify(id))
  return id
}
export default createId