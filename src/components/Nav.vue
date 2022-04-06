<template>
    <div class="nav">
        <router-link to="/money" class="item">
            <Icon name="money"/>
            记账
        </router-link>
        <router-link to="/labels" class="item">
            <Icon name="label"/>
            标签
        </router-link>
        <router-link to="/statistics" class="item">
            <Icon name="statistics"/>
            统计
        </router-link>
    </div>
</template>

<script lang="ts">
    import Icon from "@/components/Icon.vue";
    export default {
        name: "Nav",
        components: {Icon}
    }
</script>

<style lang="scss" scoped>
    .nav{
        border: 1px solid green;
        box-shadow: 0 0 3px rgba(0,0,0,0.25);
        display: flex;
        > .item{
            flex:1;
            display: flex;
            padding: 2px 0;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
</style>