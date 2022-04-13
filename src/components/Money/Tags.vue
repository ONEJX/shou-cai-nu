<template>
  <div class="tags">
    <div class="new">
      <button @click="addTag">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tags in dataSource" :key="tags.id" @click="toggle(tags)"
          :class="{selected:selectedTage.indexOf(tags)>=0}">{{tags.name}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
    import  Vue from 'vue'
    import {Component, Prop} from "vue-property-decorator";

    @Component
    export default class Tags extends Vue{
        @Prop() readonly dataSource:string | undefined;
        selectedTage:string[] = [];

        toggle(tag:string){
            const index = this.selectedTage.indexOf(tag)
            if(!(index>=0)){
                this.selectedTage.push(tag)
            }else{
                this.selectedTage.splice(index,1)
            }
            this.$emit('update:value',this.selectedTage)
        }
        addTag(){
            const tag = window.prompt('请输入标签');
            if(this.dataSource){
                if(tag !== ''){
                    this.$emit('update:dataSource',[...this.dataSource,tag])
                }
            }
        }
    }
</script>

<style scoped lang="scss">
  .tags{
    font-size:14px;
    padding:16px;
    flex-grow: 1;
    display: flex;
    flex-direction: column-reverse;
    >.current{
      display: flex;
      flex-wrap: wrap;
      overflow: auto;
      max-height: 80px;
      > li{
        $bg:#d9d9d9;
        background: $bg;
        text-align: center;
        $h:24px;
        height:$h;
        line-height:$h;
        border-radius: $h/2;
        padding: 0 16px;
        margin-right: 12px;
        margin-bottom: 12px;
        &.selected{
          background: darken($bg,50%);
          color:white;
        }
      }
    }
    >.new{
      padding-top:16px;
      >button{
        background:transparent;
        border:none;
        color:#999;
        border-bottom: 1px solid;
        padding: 0 4px;
      }
    }
  }
</style>