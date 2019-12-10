<template>
    <div>
        <van-nav-bar
            title="登录"
        />

        <div class="bigBox" :style="heightStr">
            <div class="FuncBar">
                <div class="FuncBar-line">
                    <input type="text" placeholder="请输入用户名" v-model="userObj.username">
                </div>
                <div class="FuncBar-line">
                    <input :type="pwdType" placeholder="请输入密码" v-model="userObj.password">
                    <i :class="canLook?'activelook':''" @click="FuncLook"></i>
                </div>
            </div>

            <div class="forget">
                <span @click="$router.push({name:'PasswordBack'})">忘记密码?</span>
            </div>

            <div class="div-btn">
                <button :class="canClick?'Active':''" @click="getSignFunc">提交</button>
            </div>

            <div class="register">
                <span @click="$router.push({name:'Register'})">注册新用户</span>
            </div>
        </div>
        
    </div>
</template>

<script>
import AxiosDIY from "@/assets/config/axiosData.js";
    export default {
        data() {
            return {
                canLook:false,//密码显示隐藏
                pwdType:'password',
                canClick:false,//提交按钮置灰高亮
                heightStr:'',//页面高度
                userObj:{
                    username:'',
                    password:''
                }
            }
        },
        watch:{
            newPassword(val){
                if(this.userObj.username.length>0 && val.length>0)this.canClick=true
                else this.canClick = false
            }   
        },
        computed: {
            newPassword(){
                return this.userObj.password
            }
        },
        methods: {
            FuncLook:function(){//显示隐藏密码
                this.canLook = this.canLook ? false : true;
                if (this.canLook) this.pwdType='text'
                else this.pwdType='password'
            },
            onClickLeft:function(){
                this.$router.go(-1);
            },
            getSignFunc(){//登录请求
                if(this.canClick){
                    AxiosDIY.getAjaxFunc(this.userObj,'toSign',(data)=>{
                        console.log(data)
                    })
                }
            }
        },
        mounted(){
            
        },
        created() {
            document.title = '登录'
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

.forget{
    .rem(31);
    margin-top: @rv;
    text-align: right;
    color: #999999;
    &{
        .rem(12);
        font-size: @rv;
    }
}

.register{
    text-align: center;
    color: #999999;
    .rem(23);
    margin-top: @rv;
    &{
        .rem(12);
        font-size:@rv;
    }
}
</style>