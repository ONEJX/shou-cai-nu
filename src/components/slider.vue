<template>
  <ol class="tags">
    <li :id="index" class="list-item" v-for="(tag,index) in tags" :key="index"
        :style="item_id==index?disp : ''" data-type="0">
      <div class="item" @touchstart.capture="start" @touchmove.capture="move" @touchend.capture="end" @click.capture="onself">
        <div class="content">
            <span>{{tag.name}}</span>
            <Icon class="icon" name="right"/>
        </div>
        <div class="btns">
          <button class="update">
                <Icon name="update"/>
          </button>
          <button class="remove" @click="$router.replace(`/labels/edit/${tag.id}`)"><Icon name="delete"/></button>
        </div>
      </div>
    </li>
  </ol>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component,Prop} from 'vue-property-decorator'
    import {tagListModel} from "@/models/tagListModel";
    @Component
    export default class slider extends Vue {
        @Prop({default:{}}) tags!:object
        startX = 0
        moveX = 0
        endX = 0
        chaX = 0
        item_id = -1
        disp = ''
        
        start(e:TouchEvent){
            this.item_id = e.currentTarget.parentElement.id
            this.disp = 'transform:translateX(0)'
            this.startX = e.touches[0].clientX
        }
        move(e:TouchEvent){
            if(e.touches.length == 1){
                let parentElement = e.currentTarget.parentElement//eslint-disable-line no-unused-vars
                this.moveX = e.touches[0].clientX
                this.chaX = (this.startX - this.moveX)*10
                if(this.chaX < 0 || this.chaX == 0){
                    this.disp = 'transform:translateX(0)'
                }else if(this.chaX > 0){
                    this.disp = `transform:translateX(-${this.chaX}px)`
                    if(this.chaX >= 120){
                        this.disp =  'transform:translateX(-120px)'
                    }
                }
            }
        }
        end(e:TouchEvent){
            let parentElement = e.currentTarget.parentElement
            this.endX = e.changedTouches[0].clientX
            if(this.startX - this.endX <= 50){
                parentElement.style = ''
            }
            if(parentElement.dataset.type == 0 && this.startX - this.endX >= 50){
                this.restSlide()
                parentElement.dataset.type = 1
            }
            if(parentElement.dataset.type == 1 && this.startX - this.endX < -50){
                this.restSlide()
            }
        }
        checkSlide(){
            let listItems:any = document.querySelectorAll('.list-item')
            for(let i= 0;i<listItems.length;i++){
                if(listItems[i].dataset.type == 1){
                    return true
                }
            }
            return false
        }
        restSlide(){
            let listItems:any = document.querySelectorAll('.list-item')
            for(let i = 0;i<listItems.length;i++){
                listItems[i].dataset.type = 0
            }
        }
        onself(e:Event){
            e.preventDefault()
            let listItems:any = document.querySelectorAll('.list-item')
            for(let i = 0;i<listItems.length;i++){
                listItems[i].style = ''
                listItems[i].dataset.type = 0
            }
        }
    }
</script>

<style scoped lang="scss">
  
  .tags{
    background: white;
    font-size: 16px;
    > .list-item {
      transition: all 0.3s;
      >.item{
        > .content{
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
        > .btns{
          position: absolute;
          right: -120px;
          top:0;
          width: 120px;
          height: 44px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          >.remove{
            width: 50%;
            height: 100%;
            border: none;
          }
          >.update{
            border-right: 1px solid #a1a1a1;
            width: 50%;
            height: 100%;
            border: none;
          }
        }
      }
    }
  }
  
  .list-item[data-type="0"]{
    transform: translateX(0);
  }
  .list-item[data-type="1"]{
    transform: translateX(-120px);
  }
</style>