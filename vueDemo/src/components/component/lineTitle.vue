<template>
    <div>
        <div :class="styleType?'title twoTitle':'title '">
                <i class="left-line"></i>{{titleText}}<i class="right-line"></i>
            </div>
    </div>
</template>

<script>
    export default {
        props:['titleText','styleType']
    }
</script>

<style lang="less" scoped>
@import '../../assets/less/rem.less';
.title{
        text-align: center;
        .rem(16);
        font-size: @rv;
        color: #333333;
        &{
            .rem(10);
            margin-bottom: @rv;
        }
        i{
            display: inline-block;
            .rem(82);
            width: @rv;
            &{
                .rem(9);
                height: @rv;
            }
            background: url(../../assets/lottery/leftLine.png) no-repeat;
            background-size: 100%;
            &{
                .rem(10);
                margin: 0 @rv;
            }
            &.right-line{
                background: url(../../assets/lottery/rightLine.png) no-repeat;
                background-size: 100%;
            }
        }
        &.twoTitle{
            color: #540000;
            font-weight: bold;
            i{
                &{
                    .rem(12);
                    height: @rv;
                }
                background: url(../../assets/lottery/lineLeft-two.png) no-repeat;
                background-size: 100%;
                &.right-line{
                    background: url(../../assets/lottery/lineRight-two.png) no-repeat;
                    background-size: 100%;
                }
            }
        }
    }
</style>