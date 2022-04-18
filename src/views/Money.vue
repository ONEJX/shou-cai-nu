<template>
  <Layout>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    <Notes field-name="备注" placeholder="在这里输入备注" @update:value="onUpdateNotes"/>
    <Types :value.sync="record.type"/>
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
  </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Tags from "@/components/Money/Tags.vue";
    import Notes from "@/components/Money/Notes.vue";
    import Types from "@/components/Money/Types.vue";
    import NumberPad from "@/components/Money/NumberPad.vue";
    import {Component,Watch} from "vue-property-decorator";
    import {recordListModel} from "@/models/recordListModel";
    
    const recordList = recordListModel.fetch()
    @Component({
        components: {NumberPad, Types, Notes, Tags},
    })
    export default class Money extends  Vue{
        tags = window.tagList
        recordList:RecordItem[] = recordList
        record:RecordItem = {
            tags:[],notes:'',type:'-',amount:0
        }
        onUpdateTags(value:string[]){
            this.record.tags = value
        }
        onUpdateNotes(value:string){
            this.record.notes = value
        }
        saveRecord(){
            recordListModel.create(this.record)
        }
        @Watch('recordList')
        onRecordListChanged(){
            recordListModel.save()
        }
    }
</script>