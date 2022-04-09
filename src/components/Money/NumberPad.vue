<template>
  <div class="numberPad">
    <div class="output">{{output}}</div>
    <div class="btns">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button >+</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button>-</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button>x</button>
      <button @click="ok" class="ok">ok</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
      <button>%</button>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';

    @Component
    export default class NumberPad extends Vue {
      @Prop() readonly value!:number
      output = this.value.toString()
      
      inputContent(e:MouseEvent){
        const button = (e.target as HTMLButtonElement);
        const input = button.textContent!;
        if(this.output.length === 16){ return; }
          if(this.output === '0'){
              if('0123456789'.indexOf(input)>=0){
                  this.output = input;
              }else{
                  this.output += input;
              }
              return;
          }
          if (this.output.indexOf('.') >= 0 && input === '.') {
              return;
          }
          this.output += input
      }
      remove(){
          if(this.output.length !== 1){
              this.output = this.output.slice(0,-1)
          }else{
              this.output = '0'
          }
      }
      clear(){
          this.output = '0'
      }
      ok(){
          this.$emit('update:value',this.output)
          this.$emit('submit',this.output)
          this.clear()
      }
    }
</script>

<style scoped lang="scss">
  @import "src/assets/style/helper";
  .numberPad{
    .output{
      @extend %clearFix;
      height:72px;
      font-size:36px;
      font-family: Consolas,monospace;
      padding:9px 16px;
      text-align: right;
      box-shadow: inset 0 -5px 5px -5px fade_out(black,0.6);
    }
    .btns{
      @extend %clearFix;
      > button{
        width:20%;
        height:64px;
        float: left;
        background: transparent;
        border:none;
        &.ok{
          height: 64*2px;
          float: right;
        }
        &.zero{
          width: 20*2%;
        }
        $bg:#f2f2f2;
        &:nth-child(1){
          background: $bg;
        }
        &:nth-child(2),&:nth-child(6){
          background: darken($bg,2%);
        }
        &:nth-child(3),&:nth-child(7),&:nth-child(11){
          background: darken($bg,2*2%);
        }
        &:nth-child(4),&:nth-child(8),&:nth-child(12){
          background: darken($bg,2*4%);
        }
        &:nth-child(5),&:nth-child(9),&:nth-child(13),&:nth-child(16){
          background: darken($bg,2*6%);
        }
        &:nth-child(10),&:nth-child(14),&:nth-child(17){
          background: darken($bg,2*8%);
        }
        &:nth-child(15){
          background: darken($bg,2*11%);
        }
        &:nth-child(18){
          background: darken($bg,2*10%);
        }
      }
    }
  }
</style>