<template>
  <Layout>
    <Tags :value.sync="record.tags"/>
    <Notes field-name="备注" placeholder="在这里输入备注" :value.sync="record.notes"/>
    <Tabs :value.sync="record.type"/>
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
  </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Tags from "@/components/Money/Tags.vue";
    import Notes from "@/components/Money/Notes.vue";
    import Tabs from "@/components/Tabs.vue";
    import NumberPad from "@/components/Money/NumberPad.vue";
    import {Component} from "vue-property-decorator";
    
    
    @Component({
      components: {Tabs, NumberPad, Notes, Tags}
    })
    export default class Money extends  Vue{
        get recordList(){
          return this.$store.state.recordList
        }
        record:RecordItem = {
            tags:[],notes:'',type:'-',amount:0
        }
        created(){
          this.$store.commit('fetchRecords')
        }
        saveRecord() {
          this.$store.commit('createRecord', this.record)
          if (this.$store.state.createRecordError === null) {
            window.alert('已保存')
            this.record.notes = ''
          }
        }
        mounted(){ //修复移动端软键盘带来的影响
          const Layout = <HTMLElement>document.querySelector('.layout-wrapper')
          const body = <HTMLElement>document.querySelector('body')
          Layout.style.height = body.clientHeight + 'px'
        }
    }
</script>