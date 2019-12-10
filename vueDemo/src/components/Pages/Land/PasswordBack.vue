<template>
    <div>
        <van-nav-bar
            title="密码找回"
            left-arrow
            @click-left="onClickLeft"
        />

        <div class="bigBox" :style="heightStr">
            <div class="FuncBar">
                <div class="FuncBar-line">
                    <input type="text" placeholder="请输入用户名" v-model="userObj.username">
                </div>
                <div class="FuncBar-line">
                    <input type="number" v-model="userObj.phone" placeholder="请输入手机号码" @input="watchPhone($event)" oninput="if(value.length>11)value=value.slice(0,11)">
                    <span class="Verification" @click="getVerification" :style="VerificationStr!='获取验证码'?'color:#999999;':''">{{VerificationStr}}</span>
                </div>
                <div class="FuncBar-line">
                    <input type="number" placeholder="请输入手机验证码" v-model="userObj.phonecode" oninput="if(value.length>7)value=value.slice(0,7)">
                </div>
            </div>
            <div class="div-btn">
                <button :class="canClick?'Active':''" @click="$router.push({name:'NewPassword'})">提交</button>
            </div>
        </div>
        
    </div>
</template>

<script>
import AxiosDIY from "@/assets/config/axiosData.js";
import {Toast } from 'vant'
    export default {
        data() {
            return {
                canClick:false,
                heightStr:'',//页面高度
                canGetVerification:true,//是否可以获取验证码
                VerificationStr:'获取验证码',//验证码文字显示
                phonetrue:false,//手机号是否正确
                userObj:{
                    username:'',
                    phone:'',
                    phonecode:''
                }
            }
        },
        computed: {
            newphoneCode(){
                return this.userObj.phonecode;
            }
        },
        watch:{
            newphoneCode(){
                if(this.userObj.username !='' && this.phonetrue && this.userObj.phonecode !='')this.canClick =true
                else this.canClick =false
            }
        },
        methods: {
            onClickLeft:function(){
                this.$router.go(-1);
            },
            getVerification:function(){//获取验证码请求
                if(this.canGetVerification && this.phonetrue){
                    this.canGetVerification = false
                    AxiosDIY.getAjaxFunc({phone:''},'getVerification',(data)=>{
                        console.log(data)
                    })
                    this.changeVerificationStr('获取验证码')
                }else if(!this.phonetrue){
                    Toast('请输入正确的手机号码')
                }
            },
            watchPhone(e){//手机号码监控验证
                let that = this,phoneNum = e.currentTarget.value
                if( !(phoneNum.length <11 || !AxiosDIY.PHONE_REG.test(phoneNum)) ) that.phonetrue = true
            },
            changeVerificationStr:function(str){//倒计时方法
                let TIME_COUNT = AxiosDIY.TIME_COUNT,VerificationStr=''
                this.VerificationStr = TIME_COUNT+"s"
                let timer = setInterval(() => {
                    if (TIME_COUNT > 0 && TIME_COUNT <= TIME_COUNT) {
                        this.VerificationStr = (TIME_COUNT-1)+"s"
                        TIME_COUNT--
                    } else {
                        clearInterval(timer);
                        timer = null;
                        this.VerificationStr = str
                        this.canGetVerification = true
                    }
                }, 1000)
            },
            getPasswordBack(){//提交手机验证码
                if(this.canClick){
                    AxiosDIY.getAjaxFunc(this.userObj,'getPasswordBack',(data)=>{
                        console.log(data)
                    })
                }
            }
        },
        created() {
            document.title = '密码找回'
            let htmlHeight = document.documentElement.clientHeight || document.body.clientHeight;
            this.heightStr = "height:"+(htmlHeight - 45)+"px";
        }, 
    }
</script>

<style lang="less" scoped>
@import '../../../assets/less/rem.less';
.bigBox{
    .rem(23);
    padding-left: @rv;
    padding-right: @rv;
    background: #ffffff;
}
.FuncBar{
    .FuncBar-line{
        background: #ffffff;
        border-bottom: 1px solid #e3e3e3;
        position: relative;
        i{
            display: inline-block;
            background: url(../../../assets/my/icon_noLook.png) no-repeat;
            background-size: 100%;
            &{
                .rem(21);
                width: @rv;
            }
            &{
                .rem(15);
                height: @rv;
            }
            position: absolute;
            top: 45%;
            &{
                .rem(12);
                right: @rv;
            }
            &.activelook{
                background: url(../../../assets/my/icon_look.png) no-repeat;
                background-size: 100%;
            }
        }
        &{
            .rem(14);
            font-size: @rv;
        }
        &{
            .rem(15);
            padding: @rv 0;
        }
        input{
            border:0;
        }
        .Verification{
            color: #0960CC;
            float: right;
            &{
                .rem(14);
                font-size: @rv;
            }
        }
    }
}
.div-btn{
    .rem(25);
    margin-top: @rv;
    &{
        .rem(8);
        margin-left: @rv;
        margin-right: @rv;
    }
    &{
        .rem(45);
        height: @rv;
    }
    button{
        width: 100%;
        height: 100%;
        border: 0;
        border-radius: 4px;
        color: #ffffff;
        &.Active{
            background: -moz-linear-gradient(left, #EF5B4C 0%, #E82B48 100%);
            background: -webkit-gradient(linear, top left, top right, color-stop(0%,#EF5B4C), color-stop(100%,#E82B48));
            background: -webkit-linear-gradient(left, #EF5B4C 0%,#E82B48 100%);
            background: -o-linear-gradient(left, #EF5B4C 0%,#E82B48 100%);
            background: -ms-linear-gradient(left, #EF5B4C 0%,#E82B48 100%);
            background: linear-gradient(to right, #EF5B4C 0%,#E82B48 100%);
        }
    }
}

</style>