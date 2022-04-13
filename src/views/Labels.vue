<template>
  <Layout>
    <div class="tags">
      <router-link class="item" v-for="(tag,index) in tags" :key="index"
      :to="`/labels/edit/${tag.id}`">
        <span>{{tag.name}}</span>
        <Icon class="icon" name="right"/>
        <div class="btns" ref='remove'>
          <button class="update">
            <Icon name="update"/>
          </button>
          <button>
            <Icon name="delete"/>
          </button>
        </div>
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
    import {tagListModel} from "@/models/tagListModel";
    import Button from "@/components/Button.vue";
    tagListModel.fetch()
    @Component({
        components: {Button}
    })
    export default  class Labels extends Vue{
        tags = tagListModel.data
        createTag(){
            const name = window.prompt("请输入标签名")
            if(name){
                const message = tagListModel.create(name)
                if(message === 'duplicated'){
                    window.alert('标签重复')
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
  .tags{
    background: white;
    font-size: 16px;
    > .item {
      transition: all 1s;
      position: relative;
      display: flex;
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
      > .btns{
        position: absolute;
        right: -120px;
        width: 120px;
        height: 44px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        >button{
          width: 60px;
          height: 44px;
          border: none;
        }
        >.update{
          border-right: 1px solid #a1a1a1;
        }
      }
    }
  }
</style>