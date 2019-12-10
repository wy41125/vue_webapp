<template>
    <div>
        <van-nav-bar
            title="订单详情"
            left-arrow
            @click-left="onClickLeft"
        />

        <div style="margin-bottom:50px;">
            <!-- 物流信息 -->
            <div class="logistics">
                <i class="logisticsIcon"></i>暂无快递信息<iconNext class="iconNext"></iconNext>
            </div>
            <!-- 快递地址 -->
            <div class="addressBox">
                <i class="addressBox-icon"></i>
                <div class="addressBox-text">
                    <addressDetile></addressDetile>
                </div>
                <iconNext class="addressBox-next"></iconNext>
            </div>
            <div class="iconBottom"></div>
            <!-- 物品信息 -->
            <div class="orderDetile">
                <div class="orderDetile-title">
                    订单列表
                </div>
                <div class="orderDetile-good">
                    <goodDetile class="goodDetiles" :good-detile="goodDetile"></goodDetile>
                    <div class="goodPrice">
                        <p>租金：￥{{goodDetile.rent_money}}</p>
                        <p>押金：￥{{goodDetile.price}}</p>
                        <p class="price">实付金额：<em>￥{{order.pay_money}}</em></p>
                    </div>
                </div>
            </div>
            <!-- 编号信息 -->
            <div class="numberBox">
                <p>玉石证书编号：<span>{{order.ysbm}}</span></p>
                <p>订单编号：<span>{{order.ordersn}}</span></p>
                <p>下单时间：<span>{{order.create_time}}</span></p>
            </div>
            <!-- 中奖信息 -->
            <div class="winningBox">
                <div class="winningIn">
                    <div class="title">参加抽奖信息</div>
                    <div class="winningIn-list">
                        <winningTime></winningTime>
                    </div>
                </div>
                <div class="winningHistory">
                    <div class="title">近期中奖纪录</div>
                    <div class="winningHistory-list">
                        <winningHistory></winningHistory>
                    </div>
                </div>
            </div>
        </div>

        <!-- 按钮 -->
        <div class="footer">
            <button class="confirm">确认收货</button>
            <button class="contact">联系商家</button>
        </div>
    </div>
</template>

<script>
    import AxiosDIY from "@/assets/config/axiosData.js";
import addressDetile from '../../component/addressDeitile.vue'
import iconNext from '../../component/iconNext.vue'
import goodDetile from '../../component/goodDetile.vue'
import winningHistory from '../../component/winningHistory.vue'
import winningTime from '../../component/winningTime.vue'
    export default {
        data() {
            return {
                ordersn:'',
                order:'',
                goods:'',
                goodDetile:''
            }
        },
        components:{
            addressDetile,iconNext,goodDetile,winningHistory,winningTime
        },
        methods:{
            onClickLeft:function(){
                this.$router.go(-1);
            }
        },
        created(){
            document.title = '订单详情';
            this.ordersn = this.$route.query.ordersn
            var userinfo = localStorage.getItem("userinfo");
            var c = JSON.parse(userinfo);
            let dataObj = {
                mode:'order_info',
                act:'jxkj',
                sid:'A011750',
                u_sid:c.u_sid,
                ordersn:this.ordersn
            }
            AxiosDIY.getAjaxFunc(dataObj,'getDataUrl',(data)=>{
                if(data.status==200) {
                    console.log(data.order)
                    console.log(data.goods)
                    this.order = data.order
                    this.goodDetile = data.goods
                }
            })
        }
    }
</script>

<style lang="less" scoped>
@import '../../../assets/less/rem.less';
.logistics{
    background: #ffffff;
    &{
        .rem(10);
        margin-bottom: @rv;
    }
    color: #333333;
    .rem(14);
    font-size: @rv;
    &{
        .rem(12);
        padding-top: @rv;
        padding-bottom: @rv;
    }
    &{
        .rem(15);
        padding-left: @rv;
        padding-right: @rv;
    }
    .logisticsIcon{
        display: inline-block;
        vertical-align: middle;
        .rem(21);
        width: @rv;
        &{
            .rem(18);
            height: @rv;
        }
        background: url(../../../assets/my/icon_logistics.png) no-repeat;
        background-size: 100%;
        &{
            .rem(19);
            margin-right: @rv;
        }
    }
    .iconNext{
        float: right;
        margin-top: 3px;
    }
}

.addressBox{
    background: #ffffff;
    .rem(14);
    font-size: @rv;
    &{
        .rem(15);
        padding-top: @rv;
        padding-bottom: @rv;
    }
    &{
        .rem(10);
        padding-left: @rv;
        padding-right: @rv;
    }
    .addressBox-icon{
        display: inline-block;
        .rem(11);
        width: @rv;
        &{
            .rem(14);
            height: @rv;
        }
        vertical-align: top;
        background: url(../../../assets/my/icon_address.png) no-repeat;
        background-size: 100%;
        &{
            .rem(11);
            margin-right: @rv;
        }
    }
    .addressBox-text{
        display: inline-block;
        width: 80%;
    }
    .addressBox-next{
        float: right;
        &{
            .rem(25);
            margin-top: @rv;
        }
    }
}
.iconBottom{
    width: 100%;
    height: 5px;
    background: url(../../../assets/my/icon_bottom.png) no-repeat;
    background-size: 100%;
    &{
        .rem(10);
        margin-bottom: @rv;
    }
}
.orderDetile{
    .rem(10);
    margin-bottom: @rv;
    .orderDetile-title{
        &{
            .rem(10);
            padding-left: @rv;
            padding-right: @rv;
        }
        &{
            .rem(13);
            padding-bottom: @rv;
        }
        &{
            .rem(5);
            padding-top: @rv;
        }
        color: #999999;
        .rem(12);
        font-size: @rv;
    }
    .orderDetile-good{
        background: #ffffff;
        .goodDetiles{
            border-bottom: 1px solid #e3e3e3;
        }
        .goodPrice{
            text-align: right;
            &{
                .rem(10);
                padding-left: @rv;
                padding-right: @rv;
            }
            &{
                .rem(15);
                padding-top: @rv;
                padding-bottom: @rv;
            }
            color: #999999;
            .rem(12);
            font-size: @rv;
            .price{
                .rem(14);
                font-size: @rv;
                color: #333333;
                em{
                    color: #fc5244;
                }
            }
        }
    }
}
.numberBox{
    p{
        .rem(15);
        padding: @rv 0 @rv @rv;
        border-bottom: 1px solid #e3e3e3;
        background: #fff;
        &{
            .rem(10);
            padding-right: @rv;
        }
        span{
            float: right;
        }
        color: #333333;
        &{
            .rem(14);
            font-size: @rv;
        }
        &:last-child{
            border: 0;
        }
    }
}

.winningBox{
    .rem(15);
    padding-top: @rv;
    padding-bottom: @rv;
    &{
        .rem(10);
        padding-left: @rv;
        padding-right: @rv;
    }
    .title{
        color: #999999;
        .rem(12);
        font-size: @rv;
        &{
            .rem(10);
            margin-bottom: @rv;
        }
    }
    .winningIn-list{
        .winningInDetile{
            .rem(10);
            padding: @rv;
            padding-right: 0;
            background: #ffffff;
            border:1px solid rgba(36,207,104,1);
            box-shadow:0px 8px 15px 0px rgba(235,235,235,0.75);
            border-radius:10px;
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
                    background: url(../../../assets/index/winningIcon.png) no-repeat;
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
                }
            }
        }
    }
}

.footer{
    .rem(50);
    height: @rv;
    background: #fff;
    text-align: right;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    &{
        .rem(10);
        padding: @rv;
    }
    button{
        border: 0;
        .rem(100);
        width: @rv;
        &{
            .rem(30);
             border-radius: @rv;
             height: @rv;
        }
        background: #24cf68;
        color: #fff;
        &.contact{
            background: #fff;
            border: 1px solid #333333;
            color: #333333;
        }
    }
}
</style>
