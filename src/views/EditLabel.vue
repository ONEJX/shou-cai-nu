<template>
  <Layout>
    <div class="navBar">
      <router-link class="link" to="/labels">
        <Icon class="icon" name="left"/>
      </router-link>
      <span>编辑标签</span>
    </div>
    <div class="form-wrapper">
      <Notes :value="tag.name" field-name="标签" placeholder="请输入标签" @update:value="update"/>
    </div>
    <div class="button-wrapper">
      <Button @click.native="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator'
    import Notes from "@/components/Money/Notes.vue";
    import Button from "@/components/Button.vue";
    @Component({
        components: {Button, Notes}
    })
    export default class EditLabel extends Vue {
        tag?:{id:string,name:string} = undefined
        created(){
            const id = this.$route.params.id
            const tag = window.findTag(id)
            if(tag){
               this.tag = tag
            }else{
                this.$router.replace('/404')
            }
        }
        update(value:string){
            if(this.tag){
                window.updateTag(this.tag.id,value)
            }
        }
        remove(){
            console.log('进来了');
            if(this.tag){
                if(window.removeTag(this.tag.id) === 'success'){
                   window.alert('删除成功！')
                    this.$router.replace('/labels')
                }
            }
        }
    }
</script>

<style scoped lang="scss">
  .navBar{
    min-height: 44px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    >.link{
      >.icon{
        width: 24px;height: 24px;
        position: absolute;
        left: 16px;
        top:10px;
      }
    }
}
  .form-wrapper{
    margin-top: 0.5em;
    background: white;
  }
</style>