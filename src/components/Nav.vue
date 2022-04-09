<template>
    <div class="nav">
        <router-link to="/money" class="item" active-class="selected">
            <Icon name="money"/>
            记账
        </router-link>
        <router-link to="/labels" class="item" active-class="selected">
            <Icon name="label"/>
            标签
        </router-link>
        <router-link to="/statistics" class="item" active-class="selected">
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
        box-shadow: 0 0 3px rgba(0,0,0,0.25);
        display: flex;
        height: 48px;
        font-size: 14px;
        > .item{
            flex:1;
            display: flex;
            padding: 2px 0;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        > .item.selected{
            color:limegreen;
        }
    }
</style>