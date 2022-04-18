<template>
    <label class="notes">
            <span class="name">{{fieldName}}：</span>
            <input type="text" :value="value" @input="onValueChanged($event.target.value) " :placeholder="placeholder">
    </label>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from "vue-property-decorator";

  @Component
  export default class Notes extends Vue{
      @Prop({default:''}) value!:string;
      @Prop({required:true}) fieldName!:string
      @Prop() placeholder?:string
      onValueChanged(value:string,oldValue:string){
          this.$emit('update:value',value)
      }
  }
</script>

<style scoped lang="scss">
    .notes{
        margin-left: 16px;
        display: flex;
        > .name{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 16px;
        }
        > input{
            font-size: 16px;
            flex-grow:1;
            background:transparent;
            height:64px;
            border: none;
        }
    }
</style>