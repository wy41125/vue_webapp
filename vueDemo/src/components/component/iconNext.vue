<template>
    <div class="box">
        <em class="logistics-next"></em>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
@import '../../assets/less/rem.less';
.box{
    display: inline-block;
    .logistics-next{
        display: inline-block;
        &{
            .rem(8);
            width: @rv;
        }
        &{
            .rem(15);
            height: @rv;
        }
        background: url(../../assets/icon/icon_next.png) no-repeat;
        background-size: 100%;
    }
}
</style>