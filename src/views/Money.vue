<template>
  <Layout>
    {{recordList}}
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    <Notes @update:value="onUpdateNotes"/>
    <Types :value.sync="record.type"/>
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
  </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Layout from "@/components/Layout.vue";
    import Tags from "@/components/Money/Tags.vue";
    import Notes from "@/components/Money/Notes.vue";
    import Types from "@/components/Money/Types.vue";
    import NumberPad from "@/components/Money/NumberPad.vue";
    import {Component,Watch} from "vue-property-decorator";

    type Record = {
        tags:string[]
        notes:string
        type:string
        amount:number
        createAt?:Date
    }
    @Component({
        components: {NumberPad, Types, Notes, Tags, Layout},
    })
    export default class Money extends  Vue{
        tags = ['衣','食','住','行']
        recordList:Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]')
        record:Record = {
            tags:[],notes:'',type:'-',amount:0
        }
        onUpdateTags(value:string[]){
            this.record.tags = value
        }
        onUpdateNotes(value:string){
            this.record.notes = value
        }
        saveRecord(){
            const newRecord:Record = JSON.parse(JSON.stringify(this.record))
            newRecord.createAt = new Date()
            this.recordList.push(newRecord)
        }
        @Watch('recordList')
        onRecordListChanged(){
            window.localStorage.setItem('recordList',JSON.stringify(this.recordList))
        }
    }
</script>