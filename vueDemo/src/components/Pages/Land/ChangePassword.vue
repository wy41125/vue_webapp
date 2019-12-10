<template>
    <div>
        <van-nav-bar
            title="修改密码"
            left-arrow
            @click-left="onClickLeft"
        />

        <div class="FuncBar">
            <div class="FuncBar-line">
                <span class="left-span">原密码</span>
                <input type="text" placeholder="请输入原密码" v-model="userObj.oldPassword">
            </div>
            <div class="FuncBar-line">
                <span class="left-span">新密码</span>
                <input type="text" placeholder="请输入新密码" v-model="userObj.newPassword">
            </div>
            <div class="FuncBar-line">
                <span class="left-span">确认密码</span>
                <input type="text" placeholder="请再次输入新密码" v-model="userObj.passwordAgine">
            </div>
        </div>

        <div class="div-btn">
            <button :class="canClick?'Active':''" @click="getChangePassword">提交</button>
        </div>
    </div>
</template>

<script>
import AxiosDIY from "@/assets/config/axiosData.js";
import { Toast } from 'vant';
    export default {
        data() {
            return {
                canClick:false,
                userObj:{
                    oldPassword:'',
                    newPassword:'',
                    passwordAgine:''
                }
            }
        },
        computed: {
            newPasswordAgine(){
                return this.userObj.passwordAgine
            }
        },
        watch:{
            newPasswordAgine(){
                if(this.userObj.oldPassword!='' && this.userObj.newPassword!='' && this.userObj.passwordAgine!='')this.canClick = true
            }
        },
        methods: {
            onClickLeft:function(){
                this.$router.go(-1);
            },
            getChangePassword:function(){
                if(this.canClick && this.userObj.newPassword == this.userObj.passwordAgine){
                    AxiosDIY.getAjaxFunc(this.userObj,'getChangePassword',(data)=>{
                        console.log(data)
                    })
                }else if(this.userObj.newPassword != this.userObj.passwordAgine){
                    Toast('两次新密码输入不一致')
                    this.userObj.passwordAgine = ''
                }
            }
        },
        created() {
            document.title = '修改密码'
        }, 
    }
</script>

<style lang="less" scoped>
@import '../../../assets/less/rem.less';
.FuncBar{
    .FuncBar-line{
        background: #ffffff;
        border-bottom: 1px solid #e3e3e3;
        &:last-child{
            border: 0;
        }
        &{
            .rem(14);
            font-size: @rv;
        }
        &{
            .rem(15);
            padding: @rv;
        }
        .left-span{
            color: #333;
            display: inline-block;
            text-align: left;
            &{
                .rem(60);
                width: @rv;
            }
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
</style>