<template>
    <div>
        <van-nav-bar
            title="地址管理"
            left-arrow
            @click-left="onClickLeft"
        />

        <div class="addList">
            <div class="addBox" v-for="(item,index) in addressList" :key="index">
                <div class="addList-top">
                    <div class="addList-top-leftIcon" v-show="isCanChange">
                        <i :class="item.is_default==1?'active':''" @click="setDefaultAdd(item)"></i>
                    </div>
                    <div class="addList-top-detile">
                        <addressDetile :address-obj="item"></addressDetile>
                    </div>
                </div>
                <div class="addList-btn">
                    <span class="edit" @click="$router.push({name:'NewAddress',query:{'addressObj':encodeURIComponent(JSON.stringify(item))}})"><i></i>编辑</span>
                    <span class="delete" @click="detleteAddres(item)"><i></i>删除</span>
                </div>
            </div>
        </div>

        <div class="newAdd" @click="$router.push({name:'NewAddress'})">
            <i></i>新增地址
        </div>
    </div>
</template>

<script>
import addressDetile from '../../component/addressDeitile.vue'
import AxiosDIY from "@/assets/config/axiosData.js";
import { Toast } from 'vant';
    export default {
        data() {
            return {
                isActive:false,
                addressList:[],
                isCanChange:false,//是否可以选择地址
            }
        },
        inject:['reload'],
        components:{
            addressDetile
        },
        methods:{
            onClickLeft:function(){
                this.$router.go(-1);
            },
            setDefaultAdd:function(addreess){//选取地址
                let that = this 
                if(addreess.is_default == 0){
                    addreess.is_default = 1
                    localStorage.setItem('setAddress',JSON.stringify(addreess));
                    setTimeout(function(){
                        that.$router.go(-1)
                    },500)
                }
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
                        this.addressList = data.info
                    }
                })
            },
            detleteAddres:function(obj){//删除地址
                console.log(obj.id)
                var userinfo = localStorage.getItem("userinfo");
                var c = JSON.parse(userinfo);
                let dataObj = {
                    mode:'address_del',
                    act:'jxkj',
                    sid:'A011750',
                    u_sid:c.u_sid,
                    id:obj.id
                }
                AxiosDIY.getAjaxFunc(dataObj,'getDataUrl',(data)=>{
                    if(data.status==200 && data.msg=='ok') {
                        console.log(data)
                    }
                })
            }
        },
        created(){
            document.title = '地址管理';
            this.getAddressList()
            if(this.$route.query && this.$route.query.canChange == 1)this.isCanChange = true
        }
    }
</script>

<style lang="less" scoped>
@import '../../../assets/less/rem.less';
.addList{
    .addBox{
        .rem(10);
        margin-bottom: @rv;
        background: #ffffff;
    }
    .addList-top,.addList-btn{
        .rem(15);
        padding: @rv;
    }
    .addList-top{
        border-bottom: 1px solid #e3e3e3;
        .addList-top-leftIcon{
            display: inline-block;
            .rem(19);
            width: @rv;
            height: @rv;
            vertical-align: top;
            &{
                .rem(10);
                margin-top: @rv;
            }
            &{
                .rem(16);
                margin-right: @rv;
            }
            i{
                display: inline-block;
                width: 100%;
                height: 100%;
                background: url(../../../assets/my/icon_noChecklist.png) no-repeat;
                background-size: 100%;
                &.active{
                    background: url(../../../assets/my/icon_Checklist.png) no-repeat;
                    background-size: 100%;
                }
            }
        }
        .addList-top-detile{
            width: 85%;
            display: inline-block;
        }
    }
    .addList-btn{
        text-align: right;
        span{
            display: inline-block;
            margin: 0 6px;
            color: #999999;
            &{
                .rem(14);
                font-size: @rv;
            }
            i{
                display: inline-block;
                background: url(../../../assets/my/icon_edit.png) no-repeat;
                background-size: 100%;
                vertical-align: middle;
                margin-bottom: 2px;
                margin-right: 5px;
                &{
                    .rem(15);
                    width: @rv;
                }
                &{
                    .rem(17);
                    height: @rv;
                }
            }
            &.delete{
                i{
                    background: url(../../../assets/my/icon_delete.png) no-repeat;
                    background-size: 100%;
                }
            }
        }
    }
}
.newAdd{
    width: 100%;
    .rem(50);
    height: @rv;
    line-height: @rv;
    text-align: center;
    color: #ffffff;
    background: #24CF68;
    position: fixed;
    bottom: 0;
    left: 0;
    &{
        .rem(16);
        font-size: @rv;
    }
    i{
        display: inline-block;
        .rem(13);
        width: @rv;
        height: @rv;
        background: url(../../../assets/my/icon_newAdd.png) no-repeat;
        background-size: 100%;
        vertical-align: middle;
        margin-bottom: 5px;
        margin-right: 5px;
    }
}
</style>
