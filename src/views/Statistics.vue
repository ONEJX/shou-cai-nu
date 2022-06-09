<template>
  <Layout>
    <Tabs :value.sync="type" class-prefix="type"/>
    <Tabs :data-source="arr" :value.sync="cycle" class-prefix="cycle"/>
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
    type = '-'
    cycle = 'day'//cycle 周期
    arr = [{text:'按天',value:'day'},{text:'按周',value:'week'},{text:'按月',value:'month'}]
  }
</script>
<style lang="scss" scoped>
  ::v-deep .type-tabs-item{
    background: #F4F4F4;
    &.selected{
      background: #C4C4C4;
      &::after{
        display: none;
      }
    }
  }
</style>