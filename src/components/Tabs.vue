<template>
  <ul class="tabs">
    <li v-for="item in dataSource" :key="item.value" @click.passive="select(item)"
        class="tabs-item"
        :class="{selected:value===item.value,[classPrefix+'-tabs-item']:classPrefix}">{{item.text}}</li>
  </ul>
</template>

<script lang="ts">
	import Vue from "vue";
	import {Component,Prop} from "vue-property-decorator";
	
	type DataSourceItem = {text:string,value:string}
	@Component
	export default class Tabs extends Vue {
		@Prop({type:Array,default:()=>[{text:'支出',value:'-'},{text:'收入',value:'+'}]}) dataSource?:DataSourceItem[]
    @Prop(String) readonly value!:string;
    @Prop(String) classPrefix?:string
    select(item:DataSourceItem){
		  this.$emit('update:value',item.value)
    }
	}
</script>

<style scoped lang="scss">
  .tabs {
    background: #c4c4c4;
    display: flex;
    text-align: center;
    font-size: 24px;
    
    &-item {
      flex: 1;
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      
      &.selected::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #333;
      }
    }
  }
</style>