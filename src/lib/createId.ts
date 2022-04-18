let id:number = JSON.parse(window.localStorage.getItem('_maxId') || '0') || 0
function createId() {
  if(!window.findTag(id.toString())){
    id++
  }else{
    id++
  }
  window.localStorage.setItem('_MaxId',JSON.stringify(id))
  return id
}
export default createId