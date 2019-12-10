<template>
    <div>
        <van-nav-bar
            title="新增地址"
            left-arrow
            @click-left="onClickLeft"
        />

        <div class="addDetile">
            <div class="addDetile-input">
                <span>收件人</span>
                <input class="input-width" type="text" placeholder="收件人姓名" v-model="addressObj.name">
            </div>
            <div class="addDetile-input">
                <span>联系电话</span>
                <input 
                    class="input-width" 
                    type="number" 
                    placeholder="收件人电话" 
                    v-model="addressObj.phone" 
                    oninput="if(value.length>11)value=value.slice(0,11)"
                >
            </div>
            <div class="addDetile-input">
                <span>所在区域</span>
                <!-- <input type="text" placeholder="选择省/市/区" v-model="addressObj.s_city" @click="lookArea"> -->
                <span 
                    class="input-span" 
                    @click="lookArea" 
                >
                    {{addressObj.s_city}}
                </span>
            </div>
            <div class="addDetile-input">
                <span>详细地址</span>
                <input class="input-width" type="text" placeholder="填写详细地址" v-model="addressObj.address">
                <input class="input-width" type="hidden" v-model="addressObj.id">
            </div>

        </div>

        <div class="btn" @click="addAddressFunc">
            提交
        </div>

        <div class="areaBox" v-show="areaShow">
            <div class="mask"></div>
            <div class="area">
                <van-area
                    :area-list="areaList"
                    @confirm="funcConfirm"
                    @cancel="closeArea"
                />
            </div>
        </div>
    </div>
</template>

<script>
import area from '@/assets/JSON/area.js'
import AxiosDIY from "@/assets/config/axiosData.js";
import { Toast } from 'vant';
    export default {
        data() {
            return {
                title:'',
                areaList: area,
                areaValue:'',
                areaShow:false,
                addressObj:{
                    name:'',
                    is_default:0,//是否是默认地址
                    phone:'',
                    s_city:'选择省/市/区',
                    address:'',
                    id:''

                }
            }
        },
        methods:{
            onClickLeft:function(){
                this.$router.go(-1);
            },
            funcConfirm:function(data){//省市区选择
                this.addressObj.s_city = ''
                for(let i = 0 ;i<data.length;i++){
                    this.addressObj.s_city += data[i].name
                }
                this.areaShow = false
            },
            lookArea:function(){//打开省市区选择框
                this.areaShow = this.areaShow?false:true
            },
            closeArea:function(){//关闭省市区选择框
                this.areaShow = false
            },
            addAddressFunc:function(){//新增、编辑地址
                var userinfo = localStorage.getItem("userinfo");
                var c = JSON.parse(userinfo);
                let addressObj=this.addressObj
                let dataObj = {
                    name:addressObj.name,
                    phone:addressObj.phone,
                    s_city:addressObj.s_city,
                    address:addressObj.address,
                    is_default:addressObj.is_default,
                    u_sid:c.u_sid,
                    mode:'address_add',
                    act:'jxkj',
                    sid:'A011750',
                    id:addressObj.id,
                }

                AxiosDIY.getAjaxFunc(dataObj,'getDataUrl',(data)=>{
                    console.log(data)
                    if(data.status==200 && data.msg=='ok'){
                        this.$router.replace({name:"AddressList"})
                    }
                })
            }
        },
        created(){
            if(this.$route.query.addressObj){
                document.title = '编辑地址';
                this.title='编辑地址'
                let a = decodeURIComponent(this.$route.query.addressObj)
                this.addressObj = JSON.parse(a);
                console.log(this.$route.query.addressObj)
            }else{
                document.title = '新增地址';
                this.title='新增地址'
            }
        }
    }
</script>

<style lang="less" scoped>
@import '../../../assets/less/rem.less';
.addDetile{
    .addDetile-input{
        .rem(15);
        padding: @rv;
        background: #fff;
        border-bottom: 1px solid #e3e3e3;
        &:last-child{
            border: 0;
        }
        &{
            .rem(14);
            font-size: @rv;
        }
        color: #333333;
        span{
            display: inline-block;
            width: 20%;
            text-align: right;
        }
        input{
            border: 0;
        }
        .input-span{
            display: inline-block;
            width: 70%;
            color: #888888;
            text-align: left;
        }
    }
}
.input-width{
    width: 70%;
}
.btn{
    width: 90%;
    margin: 0 auto;
    text-align: center;
    background: #24CF68;
    border-radius: 10px;
    color: #fff;
    .rem(45);
    height: @rv;
    line-height: @rv;
    &{
        .rem(25);
        margin-top: @rv;
    }
}
.areaBox{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    .mask{
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.3;
    }
    .area{
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
    }
}
</style>
