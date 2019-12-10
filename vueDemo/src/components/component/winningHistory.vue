<template>
    <div>
        <div class="recordDetile-box">
                    <i class="winningIcon"></i>
                    <div class="recordDetile-box-left">
                        <img src="../../assets/my/winningGood.png" alt="" width="100%">
                    </div>
                    <div class="recordDetile-box-text">
                        <p class="scene"><span>开奖场次：</span>20190308</p>
                        <p class="number"><span>中奖编号：</span>YJ91587541</p>
                        <p class="time"><span>开奖时间：</span>2019.03.08  20:00</p>
                    </div>
                </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
@import '../../assets/less/rem.less';
.recordDetile-box{
            background: #ffffff;
            &{
                .rem(10);
                padding: @rv;
            }
            border-radius: 10px;
            box-shadow:0px 8px 15px 0px rgba(235,235,235,0.75);
            position: relative;
            .winningIcon{
                .rem(43);
                width: @rv;
                height: @rv;
                display: inline-block;
                position: absolute;
                top: 0;
                right: 0;
                z-index: 1;
                background: url(../../assets/my/winningIcon.png) no-repeat;
                background-size: 100%;
            }
            .recordDetile-box-left{
                display: inline-block;
                .rem(70);
                width: @rv;
                height: @rv;
                &{
                    .rem(13);
                    margin-right: @rv;
                }
                vertical-align: top;
                border: 1px solid #e3e3e3;
                border-radius: 5px;
            }
            .recordDetile-box-text{
                vertical-align: top;
                display: inline-block;
                width: 65%;
                p{
                    .rem(20);
                    line-height: @rv;
                    color: #999999;
                    &{
                        .rem(12);
                        font-size: @rv;
                    }
                    &.scene{
                        .rem(13);
                        font-size: @rv;
                        color: #333333;
                    }
                    &.number{
                        color: #FF3031;
                        span{
                            color: #999999;
                        }
                    }
                }
            }
        }
</style>