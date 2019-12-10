<template>
    <div class="winning-box-detile">
        <div :class="styleType==1?'box-title whiteFont':'box-title'">{{dataArray.big_title}}日常奖第{{dataArray.q_id}}期：<span>{{dataArray.cnum}}</span>次</div>
        <div :class="styleType==1?'box-detile showBorder':'box-detile'" @click="$router.push({name:'LotteryDetile',query:{'id':dataArray.id}})">
            <div class="box-detile-left">
                <img :src="dataArray.img" alt="" width="100%">
                <i></i>
            </div>
            <div class="box-detile-right">
                <div class="detile-right-top">
                    <img :src="dataArray.tximg" alt="" class="portrait" style="width:2.25rem;height:2.25rem;">
                    <div>
                        <p class="name">姓名：<span>{{dataArray.realname}}</span></p>
                        <p class="tel">手机号：<span>{{dataArray.phone}}</span></p>
                    </div>
                </div>
                <div class="detile-right-bottom">
                    <p class="introduce">玉石证书编号：<span>{{dataArray.ys_id}}</span></p>
                    <p class="introduce">揭晓时间:<span>{{dataArray.ctime}}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['styleType',"dataArray"],
        data() {
            return {

            }
        },
    }
</script>

<style lang="less" scoped>
@import '../../assets/less/rem.less';
.winning-box-detile{
    .rem(10);
    margin: @rv 0;
    .box-title{
        color: #D06307;
        .rem(14);
        font-size: @rv;
        &{
            .rem(12.5);
            margin-bottom: @rv;
        }
        &{
            .rem(20);
            line-height: @rv;
        }
        span{
            color: #fff;
        }
        &.whiteFont{
            color: #999;
            span{
                color: #333;
            }
        }
    }
    .box-detile{
        background: #fff;
        border-radius: 10px;
        &.showBorder{
            border:1px solid #e3e3e3;
        }
        .rem(10);
        padding: @rv;
        &{
            .rem(8);
            padding-bottom: @rv;
        }
        .box-detile-left{
            .rem(90);
            height: @rv;
            width: @rv;
            position: relative;
            display: inline-block;
            i{
                display: inline-block;
                .rem(42.5);
                width: @rv;
                height: @rv;
                position: absolute;
                top: 0;
                right: 0;
                z-index: 1;
                background: url(../../assets/index/winningIcon.png) no-repeat;
                background-size: 100%;
            }
            img{
                .rem(10);
                border-radius: @rv;
            }
        }
        .box-detile-right{
            display: inline-block;
            float: right;
            width:64%;
            .rem(10);
            margin-left: @rv;
            &{
                color: #999;
                .rem(14);
                font-size: @rv;
            }
            .detile-right-top{
                .rem(5);
                margin-bottom: @rv;
                padding-top: @rv;
                display: flex;
                justify-content: space-around;
                img{
                    .rem(36);
                    width: 38px;
                    height: 38px;
                    border-radius: 38px;
                    margin-right: 10px;
                    vertical-align: middle;
                }
                .name{
                    display: inline-block;
                    span{
                        color: #333;
                    }
                }
                .tel{
                    display: inline-block;
                    span{
                        .rem(12);
                        font-size:@rv; 
                        color: #333;
                    }
                }
            }
            .detile-right-bottom{
                .rem(12);
                font-size:@rv;
                .introduce{
                    .rem(20);
                    line-height: @rv;
                    span{
                        .rem(12);
                        font-size: @rv;
                        color: #333;
                    }
                }
            }
        }
    }
}
</style>
