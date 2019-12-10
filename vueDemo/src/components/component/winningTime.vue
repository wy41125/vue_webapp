<template>
    <div>
        <div :class="styleType==1?'winningInDetile newStyle':'winningInDetile'">
            <div class="winningInDetile-left">
                <img :src="dataArray.img" alt="" width="100%">
                <i></i>
            </div>
            <div class="winningInDetile-text">
                <div class="winningInDetile-top">
                    <p class="winningInDetile-name">{{dataArray.big_title}}第{{dataArray.q_id}}期：<span>{{dataArray.cnum}}</span>次</p>
                    <p class="winningInDetile-peice">价值：<span>￥{{dataArray.money}}</span></p>
                </div>
                <div v-show="!btnType" class="timing">
                    揭晓倒计时：<span><em>15</em>:<em>10</em>:<em>52</em></span>
                </div>
                <div v-show="btnType" class="timing timingType" @click="$router.push({name:'LotteryDetile',query:{'id':dataArray.id}})">
                    <i class="videoIcon"></i>进入直播间
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        props:['btnType','styleType',"dataArray"],
        methods:{
            changeTime:function(num){
                let shi = ((second-second%3600)/3600)<10?'0'+(second-second%3600)/3600:(second-second%3600)/3600
                let fen = ((second%3600-(second%3600)%60)/60)<10?'0'+(second%3600-(second%3600)%60)/60:(second%3600-(second%3600)%60)/60
                let miao = ((second%3600)%60)<10?'0'+(second%3600)%60:(second%3600)%60
                console.log(shi+' : '+fen+' : '+miao)
            }
        },
        created(){
            this.changeTime(324000)
        }
    }
</script>

<style lang="less" scoped>
@import '../../assets/less/rem.less';
.winningInDetile{
            .rem(10);
            padding: @rv;
            padding-right: 0;
            background: #ffffff;
            border:1px solid rgba(36,207,104,1);
            box-shadow:0px 8px 15px 0px rgba(235,235,235,0.75);
            border-radius:10px;
            &.newStyle{
                border-radius: 0;
                border: 0;
            }
            .winningInDetile-left{
                display: inline-block;
                .rem(90);
                width: @rv;
                height: @rv;
                border:1px solid rgba(227, 227, 227, 1);
                border-radius:10px;
                position: relative;
                &{
                    .rem(5);
                    margin-right: @rv;
                }
                i{
                    display: inline-block;
                    .rem(42);
                    width: @rv;
                    height: @rv;
                    background: url(../../assets/index/winningIcon.png) no-repeat;
                    background-size: 100%;
                    position: absolute;
                    top: 0;
                    right: 0;
                }
            }
            .winningInDetile-text{
                display: inline-block;
                width: 63%;
                vertical-align: top;
                .winningInDetile-top{
                    color: #999999;
                    .rem(12);
                    font-size: @rv;
                    &{
                        .rem(15);
                        margin-bottom: @rv;
                    }
                    .winningInDetile-name{
                        span{
                            color: #333333;
                            .rem(13);
                            font-size: @rv;
                        }
                    }
                    .winningInDetile-peice{
                        span{
                            color: #fc5244;
                        }
                    }
                }
                .timing{
                    background: #24cf68;
                    border-radius: 10px;
                    color: #fff;
                    .rem(12);
                    font-size: @rv;
                    &{
                        .rem(8);
                        padding: @rv;
                    }
                    &{
                        .rem(5);
                        padding-left: @rv;
                        padding-right: 0;
                    }
                    span{
                        color: #333333;
                        em{
                            display: inline-block;
                            text-align: center;
                            .rem(18);
                            width: @rv;
                            height: @rv;
                            line-height: @rv;
                            background: #ffffff;
                            &{
                                .rem(6);
                                margin: 0 @rv;
                            }
                        }
                    }
                    &.timingType{
                        text-align: center;
                        .videoIcon{
                            display: inline-block;
                            .rem(15);
                            width: @rv;
                            height: @rv;
                            background: url(../../assets/lottery/icon-video.png) no-repeat;
                            background-size: 100%;
                            vertical-align: middle;
                            &{
                                .rem(3);
                                margin-bottom: @rv;
                            }
                            &{
                                .rem(7);
                                margin-right: @rv;
                            }
                        }
                    }
                }
            }
        }
</style>
