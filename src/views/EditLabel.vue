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
        get tag(){
          return this.$store.state.currentTag
        }
        created(){
            const id = this.$route.params.id
            this.$store.commit('setCuttentTag',id)
            if(!this.tag){
                this.$router.replace('/404')
            }
        }
        update(value:string){
            if(this.tag){
                this.$store.commit('updateTag',{id:this.tag.id,name:value})
            }
        }
        remove(){
            if(this.tag){
                this.$store.commit('removeTag',this.tag.id)
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