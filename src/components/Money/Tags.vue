<template>
  <div class="tags">
    <div class="new">
      <button @click="addTag">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="(tag,index) in tagList" :key="index" @click="toggle(tag)"
          :class="{selected:selectedTag.indexOf(tag)>=0}">{{tag.name}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
    import  Vue from 'vue'
    import {Component,} from "vue-property-decorator";

    @Component
    export default class Tags extends Vue{
        selectedTag:string[] = [];
        created(){
          this.$store.commit('fetchTags')
        }
        get tagList(){
          return this.$store.state.tagList
        }
        toggle(tag:string){
            const index = this.selectedTag.indexOf(tag)
            if(!(index>=0)){
                this.selectedTag.push(tag)
            }else{
                this.selectedTag.splice(index,1)
            }
            const string = this.selectedTag.map(item=>{return item.name}).join(',')
            this.$emit('update:value',string)
        }
        addTag(){
            const name = window.prompt('请输入标签');
                if(name){
                  this.$store.commit('createTag',name)
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