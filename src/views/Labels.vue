<template>
  <Layout>
    <div class="tags">
      <router-link class="list-item" v-for="(tag,index) in tags" :key="index"
                   :to="`/labels/edit/${tag.id}`">
        <span>{{tag.name}}</span>
        <Icon class="icon" name="right"/>
      </router-link>
    </div>
    <div>
      <Button @click.native="createTag">新增标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component} from "vue-property-decorator";
    import Button from "@/components/Button.vue";
    @Component({
      components: { Button}
    })
    export default  class Labels extends Vue{
        get tags(){
          return this.$store.state.tagList;
        }
        created(){
          this.$store.commit('fetchTags')
        }
        createTag(){
          const name = window.prompt('请输入标签');
          if(name){
            this.$store.commit('createTag',name)
          }
        }
    }
</script>
<style lang="scss" scoped>
  .tags{
    background: white;
    font-size: 16px;
    > .list-item {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        min-height: 44px;
        border-bottom: 1px solid #e6e6e6;
          > span{
            margin-left: 10px;
          }
          > .icon{
            width: 24px;height: 24px;
            margin-right: 1em;
          }
    }
  }
</style>