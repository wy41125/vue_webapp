<template>
    <div>
        <div class="goodDetile">
            <div class="goodDetile-img">
                <img :src="goodDetile.good_img" width="100%" alt="">
            </div>
            <div class="goodDetile-text">
                <div class="goodDetile-name">
                    {{goodDetile.good_name}}
                </div>
                <div class="goodDetile-price">
                    <span class="price">租金：<em>{{goodDetile.month_rent_money}}元/月</em></span><span class="number">X12</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['goodDetile']
    }
</script>

<style lang="less" scoped>
@import '../../assets/less/rem.less';
.goodDetile{
            .rem(10);
            padding: @rv;
            .goodDetile-img{
                display: inline-block;
                .rem(80);
                width: @rv;
                height: @rv;
                &{
                    .rem(10);
                    margin-right: @rv;
                }
            }
            .goodDetile-text{
                vertical-align: top;
                display: inline-block;
                width: 65%;
                .goodDetile-name{
                    color: #333333;
                    .rem(14);
                    font-size: @rv;
                    &{
                        .rem(10);
                        margin-bottom: @rv;
                    }
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
                .goodDetile-price{
                    .price{
                        vertical-align: bottom;
                        .rem(12);
                        font-size: @rv;
                        color: #999999;
                        em{
                            color: #fc5244;
                            .rem(16);
                            font-size: @rv;
                        }
                    }
                    .number{
                        vertical-align: bottom;
                        float: right;
                        .rem(14);
                        font-size: @rv;
                        color: #333333;
                    }
                }
            }
        }
</style>
