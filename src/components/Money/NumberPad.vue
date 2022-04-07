<template>
    <div class="numberPad">
        <div class="output">100</div>
        <div class="btns">
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>+</button>
            <button>删除</button>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button>-</button>
            <button>清空</button>
            <button>7</button>
            <button>8</button>
            <button>9</button>
            <button>x</button>
            <button class="ok">ok</button>
            <button class="zero">0</button>
            <button>·</button>
            <button>%</button>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "NumberPad"
    }
</script>

<style scoped lang="scss">
    @import "src/assets/style/helper";
    .numberPad{
        .output{
            @extend %clearFix;
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
                    background: darken($bg,4%);
                }
                &:nth-child(3),&:nth-child(7),&:nth-child(11){
                    background: darken($bg,4*2%);
                }
                &:nth-child(4),&:nth-child(8),&:nth-child(12){
                    background: darken($bg,4*4%);
                }
                &:nth-child(5),&:nth-child(9),&:nth-child(13),&:nth-child(16){
                    background: darken($bg,4*6%);
                }
                &:nth-child(10),&:nth-child(14),&:nth-child(17){
                    background: darken($bg,4*8%);
                }
                &:nth-child(15){
                    background: darken($bg,4*11%);
                }
                &:nth-child(18){
                    background: darken($bg,4*10%);
                }
            }
        }
    }
</style>