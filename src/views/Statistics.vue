<template>
  <Layout>
    <Tabs :value.sync="type" class-prefix="type"/>
    <Tabs :data-source="arr" :value.sync="cycle" class-prefix="cycle"/>
      <ol class="xxx">
        <li v-for="(group,index) in result" :key="index">
          <h3 class="title">{{group.title}}</h3>
          <ol>
            <li v-for="item in group.items" :key="item.id" class="record">
              <span class="tags">{{item.tags}}</span>
              <span class="notes">{{item.notes}}</span>
              <span>￥{{item.amount}}</span>
            </li>
  
            <li v-for="item in group.items" :key="item.id" class="record">
              <span class="tags">{{item.tags}}</span>
              <span class="notes">{{item.notes}}</span>
              <span>￥{{item.amount}}</span>
            </li>
          </ol>
        </li>
      </ol>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from "vue-property-decorator";
  import Tabs from "@/components/Tabs.vue";
  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
    get recordList(){
      return (this.$store.state as RootState).recordList
    }
    get result(){
      type HashTableValue = {title:string,items:RecordItem[]}
      const {recordList} = this
      const hashTable:{[key:string]:HashTableValue} = {}
      for(let i = 0;i<recordList.length;i++){
        console.log(recordList[i].createAt!);
        const [data,time] = recordList[i].createAt!.split('T')
        hashTable[data] = hashTable[data] || {title:data,items:[]}
        hashTable[data].items.push(recordList[i])
      }
      console.log(hashTable);
      return hashTable
    }
    beforeCreate(){
      this.$store.commit('fetchRecords')
    }
  
    type = '-'
    cycle = 'day'//cycle 周期
    arr = [{text:'按天',value:'day'},{text:'按周',value:'week'},{text:'按月',value:'month'}]
  }
</script>
<style lang="scss" scoped>
  .xxx{
    overflow: auto;
  }
  ::v-deep{
    .type-tabs-item{
      background: #F4F4F4;
      &.selected{
        background: #C4C4C4;
        &::after{
          display: none;
        }
      }
    }
    .cycle-tabs-item{
      height: 48px;
      font-size: 20px;
    }
  }
  
  .title{
    background: #F4F4F4;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
  }
  .record{
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    justify-content: space-between;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  
    -o-text-overflow:ellipsis;
    >.tags{
      padding-right: 5px;
      border-right:1px dotted #C4C4C4;
    }
    >.notes{
      overflow:hidden;
      text-overflow: ellipsis;
      margin-right: auto;
      margin-left: 10px;
    }
  }
</style>