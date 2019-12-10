<template>
    <div>
        <van-nav-bar
            title="地址管理"
            left-arrow
            @click-left="onClickLeft"
        />

        <div>
            <!-- 快递地址 -->
            <div class="addressBox">
                <i class="addressBox-icon"></i>
                <div class="addressBox-text" @click="$router.push({name:'AddressList',query:{canChange:1}})">
                    <addressDetile :address-obj="addressObj"></addressDetile>
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
                        <p>商品合计：<span>￥{{goodDetile.rent_money}}</span></p>
                    </div>
                </div>
            </div>
            <!-- 编号信息 -->
            <div class="numberBox">
                <p>押金<span>￥{{goodDetile.good_price}}</span></p>
<!--                <p>运费<span>￥{{goodDetile.rent_money}}</span></p>-->
            </div>
            <div class="rule-div">
                <p class="rule-p"><i :class="isReadRule?'active_icon':''" @click="readRule"></i>《租聘协议》</p>
            </div>
        </div>

        <div class="footer">
            <div class="footer-left">实付金额：<em>￥{{goodDetile.good_total_money}}</em></div>
            <button v-if="is_wx==false" @click="isshowMask = true">结算</button>
            <button v-if="is_wx==true" @click="settlementFunc('wx')">结算</button>
        </div>

        <!-- 支付选择弹窗 -->
        <div class="mask-box" v-show="isshowMask">
            <div class="mask"  @click.stop="isshowMask = false"></div>
            <div class="radio">
                <p @click="changePayment(1)">支付宝 <i :class="Payment==1?'isclick':''"></i></p>
                <p @click="changePayment(2)">微信 <i :class="Payment==2?'isclick':''"></i></p>
                <div class="footertwo">


                    <div class="footer-left">实付金额：<em>￥{{goodDetile.good_total_money}}</em></div>
                    <button @click="settlementFunc('h5')">结算</button>



                </div>
            </div>
        </div>
    </div>
</template>

<script>
import addressDetile from '../../component/addressDeitile.vue'
import iconNext from '../../component/iconNext.vue'
import goodDetile from '../../component/goodDetile.vue'
import AxiosDIY from "@/assets/config/axiosData.js";
import { Toast } from 'vant';
    export default {
        data() {
            return {
                is_wx:false,
                Payment:1,//支付方式
                isshowMask:false,//支付方式选择框
                addressObj: {
                    name:'王大锤',
                    isDefaultAdd:1,
                    phone:'18100000002',
                    s_city:'浙江省杭州市西湖区',
                    address:'古墩路一号大街',
                    addressID:1
                },
                goodDetile:{},
                isReadRule:false,//是否已读协议
                appId:'wx0fca4cd759571525',
                timeStamp:'',
                nonceStr:'',
                package:'',
                signType:'',
                paySign:'',
                code:''
            }
        },
        components:{
            addressDetile,iconNext,goodDetile
        },
        computed:{
            newPrice:function(){
                return parseInt(this.goodDetile.TotalRent) + parseInt(this.goodDetile.good_price) + parseInt(goodDetile.rent_money)
            }
        },
        methods:{
            readRule(){

                this.isReadRule = this.isReadRule ? false : true

            },
            changePayment:function(type){//支付方式选择
                this.Payment = type;
            },
            onClickLeft:function(){
                this.$router.go(-1);
            },
            getCodeApi:function(state){//获取code
                let u=encodeURIComponent(window.location.href);
                //let u=window.location.href;
                //let u="https://www.ishongyuan.com/get_code.php";
                let url= "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0fca4cd759571525&redirect_uri="+u+"&response_type=code&scope=snsapi_base";
                window.location.replace(url);
            },
            getUrlKey:function(name){//获取url 参数
                return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
            },
            settlementFunc:function(way){//结算
                if(!this.isReadRule){
                    return Toast('请勾选并阅读租聘协议')
                }
                if(way=='wx'){
                    var ctype=3
                }else{
                    var ctype=this.Payment
                }
                let dataObj = {
                    mode:'paying',
                    act:'jxkj',
                    name:this.addressObj.name,
                    phone:this.addressObj.phone,
                    s_city:this.addressObj.s_city,
                    address:this.addressObj.address,
                    sid:'A011750',
                    ctype:ctype,
                    good_id:this.goodDetile.id,
                    u_sid:this.u_sid,
                    code:this.code
                }
                console.log(dataObj)
                AxiosDIY.getAjaxFunc(dataObj,'getDataUrl',(data)=>{
                    console.log(data)

                    if(ctype==2){
                        window.location.href = data;
                    }else if(ctype==3){

                        this.timeStamp=data.timeStamp
                        this.nonceStr=data.nonceStr
                        this.package=data.package
                        this.signType=data.signType
                        this.paySign=data.paySign
                        this.wxpayjs()
                    }else{

                        const div = document.createElement('div')
                        div.innerHTML = data //此处form就是后台返回接收到的数据
                        document.body.appendChild(div)
                        document.forms[0].submit()
                    }
                })
            },
            wxpayjs:function(){
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                            "appId":this.appId,     //公众号名称，由商户传入
                            "timeStamp":this.timeStamp,         //时间戳，自1970年以来的秒数
                            "nonceStr":this.nonceStr, //随机串
                            "package":this.package,
                            "signType":this.signType,         //微信签名方式：
                            "paySign":this.paySign //微信签名
                        },
                        function(res){
                            if(res.err_msg == "get_brand_wcpay_request:ok" ){
                                // 使用以上方式判断前端返回,微信团队郑重提示：
                                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                            }
                        });

                // if (typeof WeixinJSBridge == "undefined"){
                //     if( document.addEventListener ){
                //         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                //     }else if (document.attachEvent){
                //         document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                //         document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                //     }
                // }else{
                //     this.wxpayjs();
                // }
            },
            getAddressList:function(){//获取用户地址
                var userinfo = localStorage.getItem("userinfo");
                var c = JSON.parse(userinfo);
                let dataObj = {
                    mode:'address_list',
                    act:'jxkj',
                    sid:'A011750',
                    u_sid:c.u_sid
                }
                AxiosDIY.getAjaxFunc(dataObj,'getDataUrl',(data)=>{
                    if(data.status==200 && data.msg=='ok') {
                        this.addressObj = data.info[0]
                        localStorage.setItem('setAddress',JSON.stringify(this.addressObj));
                    }
                })
            },
        },
        created(){

            let wx = navigator.userAgent.toLowerCase()

            if (wx.match(/MicroMessenger/i) == 'micromessenger') {

                this.is_wx=true
                let code=this.getUrlKey("code");
                if(code){
                    console.log(code)
                    this.code=code
                }else{
                    this.getCodeApi("123");
                }

            } else {

                this.is_wx=false
            }

            let a = decodeURIComponent(this.$route.query.goodDetile)
            this.goodDetile = JSON.parse(a);

            if (!localStorage.userinfo){
                this.$router.replace({name:"Sign",query:{'acts':"PrePurchase"}})
            }else {
                var userinfo = localStorage.getItem("userinfo");
                var c = JSON.parse(userinfo);
                this.u_sid=c.u_sid
            }
            if(!localStorage.getItem("setAddress")){
                this.getAddressList();
            }else{
                this.addressObj = JSON.parse(localStorage.getItem("setAddress"))
            }

        }
    }
</script>

<style lang="less" scoped>
@import '../../../assets/less/rem.less';
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
            span{
                color: #FC5244;
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
            color: #FC5244;
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
.rule-div{
    .rem(10);
    padding: @rv;
    &{
        .rem(13);
        font-size: @rv;
    }
    color: #333333;
    .rule-p{
        i{
            display: inline-block;
            vertical-align: middle;
            margin-right: 5px;
            .rem(15);
            width: @rv;
            height: @rv;
            background: url(../../../assets/my/icon_noChecklist.png) no-repeat;
            background-size: 100%;
        }
        i.active_icon{
            display: inline-block;
            vertical-align: middle;
            margin-right: 5px;
            .rem(15);
            width: @rv;
            height: @rv;
            background: url(../../../assets/my/icon_Checklist.png) no-repeat;
            background-size: 100%;
        }
    }
}

.footer{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    .rem(50);
    height: @rv;
    background: #ffffff;
    box-sizing: border-box;
    .footer-left{
        display: inline-block;
        .rem(18);
        padding-top: @rv;
        &{
            .rem(10);
            padding-left: @rv;
        }
        color: #333333;
        &{
            .rem(14);
            font-size: @rv;
        }
        em{
            color: #FC5244
        }
    }
    button{
        .rem(80);
        width: @rv;
        height: 100%;
        color: #ffffff;
        float: right;
        border: 0;
        &{
            .rem(14);
            font-size: @rv;
        }
        background: -moz-linear-gradient(left, #EF5B4C 0%, #E82B48 100%);
        background: -webkit-gradient(linear, top left, top right, color-stop(0%,#EF5B4C), color-stop(100%,#E82B48));
        background: -webkit-linear-gradient(left, #EF5B4C 0%,#E82B48 100%);
        background: -o-linear-gradient(left, #EF5B4C 0%,#E82B48 100%);
        background: -ms-linear-gradient(left, #EF5B4C 0%,#E82B48 100%);
        background: linear-gradient(to right, #EF5B4C 0%,#E82B48 100%);
    }
}

.mask-box{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    .mask{
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.3);
    }
    .radio{
        background-color: #fff;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        p{
            .rem(10);
            padding: @rv;
            color: #333333;
            border-bottom: 1px solid #e3e3e3;
            i{
                .rem(15);
                width: @rv;
                height: @rv;
                background: url(../../../assets/my/icon_noChecklist.png) no-repeat;
                background-size: 100%;
                float: right;
                vertical-align: middle;
                &.isclick{
                    background: url(../../../assets/my/icon_Checklist.png) no-repeat;
                    background-size: 100%;
                }
            }
        }
        .footertwo{
            width: 100%;
            .rem(50);
            height: @rv;
            background: #ffffff;
            box-sizing: border-box;
            .footer-left{
                display: inline-block;
                .rem(18);
                padding-top: @rv;
                &{
                    .rem(10);
                    padding-left: @rv;
                }
                color: #333333;
                &{
                    .rem(14);
                    font-size: @rv;
                }
                em{
                    color: #FC5244
                }
            }
            button{
                .rem(80);
                width: @rv;
                height: 100%;
                color: #ffffff;
                float: right;
                border: 0;
                &{
                    .rem(14);
                    font-size: @rv;
                }
                background: -moz-linear-gradient(left, #EF5B4C 0%, #E82B48 100%);
                background: -webkit-gradient(linear, top left, top right, color-stop(0%,#EF5B4C), color-stop(100%,#E82B48));
                background: -webkit-linear-gradient(left, #EF5B4C 0%,#E82B48 100%);
                background: -o-linear-gradient(left, #EF5B4C 0%,#E82B48 100%);
                background: -ms-linear-gradient(left, #EF5B4C 0%,#E82B48 100%);
                background: linear-gradient(to right, #EF5B4C 0%,#E82B48 100%);
            }
        }
    }
}


.mask-box{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    .mask{
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.3);
    }
    .radio{
        background-color: #fff;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        p{
            .rem(10);
            padding: @rv;
            color: #333333;
            border-bottom: 1px solid #e3e3e3;
            i{
                .rem(15);
                width: @rv;
                height: @rv;
                background: url(../../../assets/my/icon_noChecklist.png) no-repeat;
                background-size: 100%;
                float: right;
                vertical-align: middle;
                &.isclick{
                    background: url(../../../assets/my/icon_Checklist.png) no-repeat;
                    background-size: 100%;
                }
            }
        }
        .footertwo{
            width: 100%;
            .rem(50);
            height: @rv;
            background: #ffffff;
            box-sizing: border-box;
            .footer-left{
                display: inline-block;
                .rem(18);
                padding-top: @rv;
                &{
                    .rem(10);
                    padding-left: @rv;
                }
                color: #333333;
                &{
                    .rem(14);
                    font-size: @rv;
                }
                em{
                    color: #FC5244
                }
            }
            button{
                .rem(80);
                width: @rv;
                height: 100%;
                color: #ffffff;
                float: right;
                border: 0;
                &{
                    .rem(14);
                    font-size: @rv;
                }
                background: -moz-linear-gradient(left, #EF5B4C 0%, #E82B48 100%);
                background: -webkit-gradient(linear, top left, top right, color-stop(0%,#EF5B4C), color-stop(100%,#E82B48));
                background: -webkit-linear-gradient(left, #EF5B4C 0%,#E82B48 100%);
                background: -o-linear-gradient(left, #EF5B4C 0%,#E82B48 100%);
                background: -ms-linear-gradient(left, #EF5B4C 0%,#E82B48 100%);
                background: linear-gradient(to right, #EF5B4C 0%,#E82B48 100%);
            }
        }
    }
}
</style>
