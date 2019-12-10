<template>
    <div>
        <van-nav-bar
            title="玉石详情"
            left-arrow
            @click-left="onClickLeft"
        />

        <div class="goodDetile-box">
            <img :src="goodDetile.good_img" alt="" class="bigGoodImg" width="100%">
            <!-- 商品名称 -->
            <div class="goodDetile-nameBox">
                <p class="goodDetile-name">{{goodDetile.good_name}}</p>
                <p class="goodDetile-tishi">{{goodDetile.good_keyword}}</p>
                <div class="goodDetile-price">
                    <span class="left">租金：<em>{{goodDetile.month_rent_money}}元/月</em></span>
                    <span>押金：￥{{goodDetile.good_price}}</span>
                </div>
            </div>
        </div>

        <!-- 商品详情 -->
        <div class="goodDetile-imgBox">
            <div class="title">
                <lineTitle title-text="商品详情"></lineTitle>
            </div>

            <div class="goodDetile-tabs">
                <van-tabs v-model="active">
                    <van-tab title="图片介绍">
                        <div class="img-detile" v-html="goodDetile.content">
                            <!-- {{goodDetile.content}} -->
                        </div>
                    </van-tab>
                    <!-- <van-tab title="相关商品">
                        <div>相关商品</div>
                    </van-tab> -->
                </van-tabs>
            </div>

            <!-- 底部按钮 -->
            <div class="footer">
                <div class="btnSpan">
                    <span @click="$router.replace({name:'Index'})"><i class="index"></i>首页</span>
                    <span><a class="service-a" href="tel:400-640-6699"><i></i>客服</a></span>
                </div>
                <button @click="$router.push({name:'PrePurchase',query:{'goodDetile':goodObj}})">立即租赁</button>
            </div>
        </div>
    </div>
</template>

<script>
import lineTitle from '@/components/component/lineTitle.vue'
    export default {
        data() {
            return {
                active: '0',
                goodDetile:{},
                goodObj:''
            }
        },
        components:{
            lineTitle
        },
        methods:{
            onClickLeft:function(){
                this.$router.go(-1);
            },
        },
        mounted(){
            this.goodDetile.content = this.goodDetile.content.replace(/<img/g, '<img style="width:100%;display:inherit;vertical-align: middle;"');
        },
        created() {
            let a = decodeURIComponent(this.$route.query.goodObj)
            this.goodDetile = JSON.parse(a);
            this.goodObj = this.$route.query.goodObj
        }
    }
</script>

<style lang="less" scoped>
@import '../../../assets/less/rem.less';
.goodDetile-box{
    background: #ffffff;
    .goodDetile-nameBox{
        .rem(10);
        padding: @rv;
        .goodDetile-name{
            .rem(19);
            font-size: @rv;
            color: #333333;
        }
        .goodDetile-tishi{
            .rem(12);
            font-size: @rv;
            color: #FC5244;
            &{
                .rem(25);
                line-height: @rv;
            }
        }
        .goodDetile-price{
            .rem(13);
            font-size: @rv;
            text-align: right;
            color: #999999;
            vertical-align: bottom;
            .left{
                float: left;
                vertical-align: bottom;
                em{
                    .rem(18);
                    font-size: @rv;
                    color: #FC5244;
                }
            }
        }
    }
}

.goodDetile-imgBox{
    .rem(50);
    padding-bottom: @rv;
    .title{
        .rem(10);
        padding: @rv 0;
    }
    .goodDetile-tabs{
        .img-detile{
            overflow-y: hidden;
            img{
                display: block;
                width: 100%;
            }
        }
    }
}

.footer{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    .rem(50);
    height: @rv;
    overflow: hidden;
    z-index: 100;
    background: #ffffff;
    .btnSpan{
        display: inline-block;
        width: 50%;
        float: left;
        span{
            display: inline-block;
            width: 50%;
            height: 100%;
            box-sizing: border-box;
            text-align: center;
            float: left;
            .rem(10);
            font-size: @rv;
            color: #333333;
            &{
                .rem(10);
                padding-top: @rv;
            }
            i{
                display: block;
                .rem(17);
                width: @rv;
                height: @rv;
                margin: 0 auto;
                background: url(../../../assets/jade/icon-help.png) no-repeat;
                background-size: 100%;
                &{
                    .rem(3);
                    margin-bottom: @rv;
                }
                &.index{
                    background: url(../../../assets/jade/icon-index.png) no-repeat;
                    background-size: 100%;
                }
            }
            .service-a{
                color: #333333;
            }
        }
    }
    button{
        float: left;
        display: inline-block;
        width: 50%;
        height: 100%;
        border: 0;
        color: #ffffff;
        .rem(14);
        font-size: @rv;
        background: -moz-linear-gradient(left, #EF5B4C 0%, #E82B48 100%);
        background: -webkit-gradient(linear, top left, top right, color-stop(0%,#EF5B4C), color-stop(100%,#E82B48));
        background: -webkit-linear-gradient(left, #EF5B4C 0%,#E82B48 100%);
        background: -o-linear-gradient(left, #EF5B4C 0%,#E82B48 100%);
        background: -ms-linear-gradient(left, #EF5B4C 0%,#E82B48 100%);
        background: linear-gradient(to right, #EF5B4C 0%,#E82B48 100%);
    }
}


</style>
