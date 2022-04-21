import clone from "@/lib/clone";

const localStorageKeyName = 'recordList';
const recordStore = {
  recordList:[] as RecordItem[],
  fetchRecords(){
    this.recordList =  JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[]
    return this.recordList
  },
  createRecord(record:RecordItem){
    const newRecord:RecordItem = clone(record)
    newRecord.createAt = new Date()
    this.recordList?.push(newRecord)
    this.saveRecords()
  },
  saveRecords(){
    window.localStorage.setItem(localStorageKeyName,JSON.stringify(this.recordList))
    
  }
}

export default recordStore