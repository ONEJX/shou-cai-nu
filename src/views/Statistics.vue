<template>
  <Layout>
    <Tabs :value.sync="type" class-prefix="type"/>
    <Tabs :data-source="arr" :value.sync="cycle" class-prefix="cycle"/>
      <ol class="xxx">
        <li v-for="(group,index) in groupList" :key="index">
          <div class="title">
            <h3>{{beautiful(group.title)}}</h3>
            <h3>￥{{group.total}}</h3></div>
          <ol>
            <li v-for="item in group.items" :key="item.id" class="record">
              <span class="tags">{{item.tags.length===0?'未知':item.tags}}</span>
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
  import dayjs from "dayjs";
  import clone from '@/lib/clone';
  console.log(dayjs())
  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
    type = '-'
    cycle = 'day'//cycle 周期
    arr = [{text:'按天',value:'day'},{text:'按周',value:'week'},{text:'按月',value:'month'}]
    get recordList(){
      return (this.$store.state as RootState).recordList
    }
    get groupList(){
      type Result = {title:string,total?:number,items:RecordItem[]}[]
      const {recordList} = this
      if(recordList.length === 0) return []
      const newList = clone(recordList).filter(r=>r.type===this.type).sort((a,b)=>dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf())
      const result:Result = [{title:dayjs(newList[0].createAt).format('YYYY-MM-DD'),items:[newList[0]]}]
      for(let i = 1;i<newList.length;i++){
        const current = newList[i]
        const last = result[result.length - 1]
        if(dayjs(last.title).isSame(dayjs(current.createAt),'day')){
          last.items.push(current)
        }else{
          result.push({title:dayjs(current.createAt).format('YYYY-MM-DD'),items:[current]})
        }
        result.map(g=>{
          g.total = g.items.reduce((sum,item)=>sum + item.amount,0)
        })
      }
      return result
    }
    beautiful(string:string){//美化日期 显示 今天 昨天
      const now = dayjs()
      if(dayjs(string).isSame(now,'day')){
        return '今天'
      }else if(dayjs(string).isSame(now.subtract(1,'day'),'day')){
        return '昨天'
      }else if(dayjs(string).isSame(now.subtract(2,'day'),'day')){
        return '前天'
      }else if(dayjs(string).isSame(now,'year')){
        return dayjs(string).format('M月DD日')
      }else{
        return dayjs(string).format('YYYY年M月DD日')
      }
    }
    beforeCreate(){
      this.$store.commit('fetchRecords')
    }
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
    padding-right: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .record{
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow:ellipsis;
    position:relative;
    >.tags{
      min-width:40px;
      padding-right: 10px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: right;
    }
    >.notes{
      overflow:hidden;
      text-overflow: ellipsis;
      margin-right: auto;
      margin-left: 10px;
    }
  }
  .tags::after{
    content: '';
    position: absolute;
    right: 1px;
    background: #c4c4c4;
    width: 2px;
    height: 20px;
  }
</style>