<template>
    <svg class="icon">
        <use :xlink:href='`#${name}`'></use>
    </svg>
</template>

<script lang="ts">
    // eslint-disable-next-line no-undef
    let importAll = (requireContext:__WebpackModuleApi.RequireContext)=>requireContext.keys().forEach(requireContext);
    try{
        importAll(require.context('../assets/icons',true,/\.svg$/));
    }catch(e){
        console.log(e);
    }
    export default {
        name: "Icon",
        props:['name']
    }
</script>

<style scoped lang="scss">
    .icon {
        width: 2em; height: 2em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>