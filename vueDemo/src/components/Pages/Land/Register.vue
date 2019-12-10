<template>
    <div>
        <van-nav-bar
            title="注册"
            left-arrow
            @click-left="onClickLeft"
        />

        <div class="bigBox">
            <div class="FuncBar">
                <div class="FuncBar-line">
                    <input type="text" placeholder="请输入用户名" v-model="userObj.username" @focus="watchPassword">
                </div>
                <div class="FuncBar-line">
                    <input :type="pwdType" placeholder="请输入密码" v-model="userObj.password">
                    <i :class="canLookPassword?'activelook':''" @click="FuncLookPassword"></i>
                </div>
                <div class="FuncBar-line">
                    <input :type="pwdTypeAgine" placeholder="再次输入密码" v-model="userObj.passwordAgine">
                    <i :class="canLookPasswordAgine?'activelook':''" @click="FuncLookPasswordAgine"></i>
                </div>
                <div class="FuncBar-line">
                    <input 
                        type="number" 
                        placeholder="请输入手机号码" 
                        v-model="userObj.phone" 
                        @input="watchPhone($event)" 
                        oninput="if(value.length>11)value=value.slice(0,11)"
                        @focus="watchPassword"
                    >
                    <span 
                        class="Verification" 
                        @click="getVerification"  
                        :style="VerificationStr!='获取验证码'?'color:#999999;':''"
                    >
                        {{VerificationStr}}
                    </span>
                </div>
                <div class="FuncBar-line">
                    <input 
                        type="number" 
                        placeholder="请输入手机验证码" 
                        v-model="userObj.phone_code" 
                        oninput="if(value.length>7)value=value.slice(0,7)"
                        @focus="watchPassword"
                    >
                </div>
            </div>

            <div class="read">
                <i :class="isRead?'readicon':''" @click="isRead = isRead ? false : true;"></i>阅读并同意<span>《用户注册协议》《隐私政策》</span>
            </div>

            <div class="div-btn">
                <button :class="canClick?'Active':''" @click="toRegisterFunc">确认注册</button>
            </div>
        </div>
        
    </div>
</template>

<script>
import AxiosDIY from "@/assets/config/axiosData.js";
import { Toast } from 'vant';
    export default {
        data() {
            return {
                canLookPassword:false,//是否显示密码
                pwdType:'password',
                canLookPasswordAgine:false,//是否再次显示密码
                pwdTypeAgine:'password',
                phonetrue:false,//手机号码是否正确
                VerificationStr:'获取验证码',//验证码文字显示
                canGetVerification:true,//是否可以获取验证码
                canClick:false,//是否可点击注册
                isRead:false,//是否已读
                userObj:{
                    username:'',
                    password:'',
                    passwordAgine:'',
                    phone:'',
                    phone_code:''
                }
            }
        },
        watch:{
            isRead(){
                if(this.isRead &&  this.userObj.username!='' && this.userObj.password!='' && this.userObj.passwordAgine!='' && this.phonetrue && this.userObj.phone_code!='') this.canClick= true
                else this.canClick = false
            }
        },
        computed: {
            
        },
        methods: {
            watchPassword(){
                if( (this.userObj.password != this.userObj.passwordAgine) && this.userObj.password != '') {
                    Toast('两次输入密码不一致')
                    this.userObj.passwordAgine =''
                }
            },
            watchPhone(e){//手机号码监控验证
                let that = this,phoneNum = e.currentTarget.value
                if( !(phoneNum.length <11 || !AxiosDIY.PHONE_REG.test(phoneNum)) ) that.phonetrue = true
            },
            onClickLeft:function(){//回退页面
                this.$router.go(-1);
            },
            FuncLookPassword:function(){//显示隐藏密码
                this.canLookPassword = this.canLookPassword ? false : true;
                if (this.canLookPassword) this.pwdType='text'
                else this.pwdType='password'
            },
            FuncLookPasswordAgine:function(){//再次显示隐藏密码
                this.canLookPasswordAgine = this.canLookPasswordAgine ? false : true;
                if (this.canLookPasswordAgine) this.pwdTypeAgine='text'
                else this.pwdTypeAgine='password'
            },
            getVerification:function(){//获取验证码
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
            toRegisterFunc:function(){//注册
                if(this.canClick){
                    delete this.userObj.passwordAgine
                    AxiosDIY.getAjaxFunc(this.userObj,'toRegister',(data)=>{
                        console.log(data)
                    })
                }
            }
        },
        created() {
            document.title = '注册'
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
            background: -moz-linear-gradient(left, #56E48E 0%, #24CF68 100%);
            background: -webkit-gradient(linear, top left, top right, color-stop(0%,#56E48E), color-stop(100%,#24CF68));
            background: -webkit-linear-gradient(left, #56E48E 0%,#24CF68 100%);
            background: -o-linear-gradient(left, #56E48E 0%,#24CF68 100%);
            background: -ms-linear-gradient(left, #56E48E 0%,#24CF68 100%);
            background: linear-gradient(to right, #56E48E 0%,#24CF68 100%);
        }
    }
}

.read{
    .rem(40);
    margin-top: @rv;
    &{
        .rem(12);
        font-size: @rv;
    }
    i{
        display: inline-block;
        &{
            .rem(14);
            width: @rv;
            height: @rv;
        }
        vertical-align: middle;
        margin-bottom: 2px;
        margin-right: 5px;
        background: url(../../../assets/my/icon_noread.png) no-repeat;
        background-size: 100%;
        &.readicon{
            background: url(../../../assets/my/icon_read.png) no-repeat;
            background-size: 100%;
        }
    }
    span{
        color: #0960CC;
    }
}
</style>