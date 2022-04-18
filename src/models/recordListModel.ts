import clone from "@/lib/clone";

const localStorageKeyName = 'recordList';
const recordListModel = {
    data:[] as RecordItem[],
    fetch(){
        this.data =  JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[]
        return this.data
    },
    create(record:RecordItem){
        const newRecord:RecordItem = clone(record)
        newRecord.createAt = new Date()
        this.data.push(newRecord)

    },
    save(){
        window.localStorage.setItem(localStorageKeyName,JSON.stringify(this.data))

    }
}
export {recordListModel}
