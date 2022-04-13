<template>
  <button class="createTag"><slot/></button>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator'

    @Component
    export default class Button extends Vue {
    }
</script>

<style scoped lang="scss">
  .createTag{
    width: 80px;
    padding: 10px;
    border-radius: 6px;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 4em;
    border: none;
    background: #767676;
    color:white;
  }
</style>