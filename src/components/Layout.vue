<template>
    <div class="layout-wrapper">
        <div class="content">
            <slot></slot>
        </div>
        <Nav/>
    </div>
</template>

<script lang="ts">
    export default {
        name: "Layout"
    }
</script>

<style lang="scss" scoped>
    .layout-wrapper{
        display:flex;
        flex-direction: column;
        height: 100vh;
    }
    .content{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
</style>