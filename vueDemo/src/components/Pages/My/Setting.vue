<template>
    <div>
        <van-nav-bar
            title="设置"
            left-arrow
            @click-left="onClickLeft"
        />

        <!-- 功能栏 -->
        <div class="FuncBar">
            <div class="FuncBar-line">
                <img class="line-icon linename" :src="userImg"/>
                <span class="right-sapn">
                    <van-uploader :after-read="onRead">
                        更换头像<i class="next"></i>
                    </van-uploader>
                </span>
            </div>
            <div class="FuncBar-line">
                <span class="linename">手机号码</span>
                <span class="right-sapn">158888888888</span>   
            </div>
            <div class="FuncBar-line" @click="$router.push({name:'RealName'})">
                <span class="linename">实名认证</span>
                <span class="right-sapn" >已认证<i class="next"></i></span>
            </div>
        </div>
        <div class="FuncBar">
            <div class="FuncBar-line" @click="$router.push({name:'ChangePassword'})">
                <span class="linename">修改密码</span>
                <span class="right-sapn"><i class="next"></i></span>
            </div>
        </div>

        <!-- 退出 -->
        <div class="signOut">
            账号退出
        </div>
    </div>
</template>

<script>
import AxiosDIY from "@/assets/config/axiosData.js";
import { Toast } from 'vant';
export default {
    data() {
        return {
            userImg:'data:image/png;base64,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'

        }
    },
    computed: {
        
    },
    methods: {
        onClickLeft:function(){
            this.$router.go(-1);
        },
        onRead:function(file){
            this.userImg = file.content
            AxiosDIY.getAjaxFunc({},'setUserImg',(data)=>{
                Toast('头像设置成功')
            })
        }
    },
    created() {
        document.title = '设置'
    },  
}
</script>

<style lang="less" scoped>
@import '../../../assets/less/rem.less';

.FuncBar{
    .rem(10);
    margin-bottom: @rv;
    .FuncBar-line{
        background: #fff;
        border-bottom: 1px solid #e3e3e3;
        width: 100%;
        box-sizing: border-box;
        &{
            .rem(44);
            line-height: @rv;
            height: @rv;
        }
        &{
            .rem(20);
            padding: 0 @rv;
        }
        .linename{
            color: #333;
            .rem(14);
            font-size: @rv;
            &.line-icon{
                .rem(35);
                width: @rv;
                height: @rv;
                border:1px solid #e3e3e3;
                border-radius: 50%;
                &{
                    .rem(3);
                    margin-top: @rv;
                }
            }
        }
        .right-sapn{
            float: right;
            color: #999999;
            &{
                .rem(12);
                font-size: @rv;
            }
            .next{
                display: inline-block;
                vertical-align: middle;
                margin-left: 5px;
                margin-bottom: 2px;
                &{
                    .rem(6);
                    width: @rv;
                }
                &{
                    .rem(11);
                    height: @rv;
                }
                background: url(../../../assets/icon/icon_next.png) no-repeat;
                background-size: 100%;
            }
        }
    }
}

.signOut{
    width: 100%;
    text-align: center;
    background: #fff;
    &{
        .rem(40);
        margin-top: @rv;
    }
    &{
        .rem(44);
        height: @rv;
        line-height: @rv;
    }
    color:#333;
    .rem(14);
    font-size: @rv;
}
</style>