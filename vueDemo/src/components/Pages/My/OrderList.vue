<template>
    <div>
        <van-nav-bar
            title="订单列表"
            left-arrow
            @click-left="onClickLeft"
        />

        <!-- 列表 -->
        <div class="list">
            <div class="orderDetile" v-for="(item,index) in orderList" :key="index" @click="$router.push({name:'OrderDetile',query:{'ordersn':item.ordersn}})">
                <div class="orderDetile-title">
                    订单编号：{{item.ordersn}}
                    <span v-if="item.is_pay==0">待付款</span>
                    <span v-if="item.is_pay==1 && item.status==1">待发货</span>
                    <span v-if="item.is_pay==1 && item.status==2">确认收货</span>
                    <span v-if="item.is_pay==1 && item.status==3">已完成</span>
                </div>
                <div class="orderDetile-good">
                    <!-- 子组件 -->
                    <goodDetile :good-detile="item.order_info"></goodDetile>
                </div>
                <div class="btnBox">
                    <div class="btnBox-left">
                        <p class="deposit">押金：￥{{item.yj_money}}</p>
                        <p class="payment">实付金额：<em>￥{{item.pay_money}}</em></p>
                    </div>
                    <div class="btnBox-btn">
                        <button v-if="item.is_pay==0">去支付</button>
                        <button v-if="item.is_pay==1 && item.status==1">待发货</button>
                        <button v-if="item.is_pay==1 && item.status==2">确认收货</button>
                        <button v-if="item.is_pay==1 && item.status==3">已完成</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import AxiosDIY from "@/assets/config/axiosData.js";
import goodDetile from '../../component/goodDetile.vue'
    export default {
        data() {
            return {
                orderList:[],

            }
        },
        components:{
            goodDetile
        },
        methods:{
            onClickLeft:function(){
                this.$router.go(-1);
            }
        },
        created(){
            document.title = '订单列表';
            var userinfo = localStorage.getItem("userinfo");
            var c = JSON.parse(userinfo);
            let dataObj = {
                mode:'my_order',
                act:'jxkj',
                sid:'A011750',
                u_sid:c.u_sid
            }
            AxiosDIY.getAjaxFunc(dataObj,'getDataUrl',(data)=>{
                if(data.status==200 && data.msg=='ok') {
                    console.log(data.info)
                    this.orderList = data.info
                }
            })
        }
    }
</script>

<style lang="less" scoped>
@import '../../../assets/less/rem.less';
.orderDetile{
    background: #ffffff;
    width: 100%;
    .rem(10);
    margin-bottom: @rv;
    .orderDetile-title{
        border-bottom: 1px solid #e3e3e3;
        &{
            .rem(14);
            font-size: @rv;
        }
        color: #333333;
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
        span{
            float: right;
        }
    }
    .orderDetile-good{
        border-bottom: 1px solid #e3e3e3;
    }
    .btnBox{
        .rem(10);
        padding: @rv;
        .btnBox-left{
            display: inline-block;
            width: 60%;
            .deposit{
                color: #999999;
                .rem(12);
                font-size: @rv;
            }
            .payment{
                .rem(14);
                font-size: @rv;
                color: #333333;
                em{
                    color: #fc5244;
                }
            }
        }
        .btnBox-btn{
            display: inline-block;
            vertical-align: top;
            float: right;
            .rem(6);
            padding-top: @rv;
            button{
                border: 0;
                background: #24cf68;
                color: #ffffff;
                .rem(12);
                font-size: @rv;
                &{
                    .rem(70);
                    width: @rv;
                }
                &{
                    .rem(25);
                    height: @rv;
                    border-radius: @rv;
                }
                &.contact{
                    background: #ffffff;
                    border: 1px solid #333333;
                    color: #333333;
                }
            }
        }
    }
}
</style>
