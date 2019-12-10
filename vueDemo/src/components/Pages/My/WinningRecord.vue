<template>
    <div>
        <van-nav-bar
            title="中奖记录"
            left-arrow
            @click-left="onClickLeft"
        />

        <!--记录列表 -->
        <div class="recordList">
            <div class="recordDetile" v-for="(item,index) in prize_list" :key="index">
                <div class="recordDetile-title">
                    {{item.big_title}}日常第{{item.q_id}}期
                </div>
                <div class="recordDetile-box">
                    <i class="winningIcon"></i>
                    <div class="recordDetile-box-left">
                        <img :src="item.img" alt="" width="100%">
                    </div>
                    <div class="recordDetile-box-text">
                        <p class="scene"><span>奖品：</span>{{item.title}}</p>
                        <p class="scene"><span>开奖场次：</span>{{item.cnum}}</p>
                        <p class="number"><span>中奖编号：</span>{{item.ys_id}}</p>
                        <p class="time"><span>开奖时间：</span>{{item.ctime}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AxiosDIY from "@/assets/config/axiosData.js";
    export default {
        data() {
            return {
                prize_list:''
            }
        },
        methods:{
            onClickLeft:function(){
                this.$router.go(-1);
            }
        },
        created(){
            document.title = '中奖记录';
            var userinfo = localStorage.getItem("userinfo");
            var c = JSON.parse(userinfo);
            let dataObj = {
                mode:'my_prize',
                act:'jxkj',
                sid:'A011750',
                u_sid:c.u_sid
            }
            AxiosDIY.getAjaxFunc(dataObj,'getDataUrl',(data)=>{
                console.log(data)
                if(data.status==200 && data.msg=='ok'){
                    //let c=data.msg
                    this.prize_list=data.info
                }

            })
        }
    }
</script>

<style lang="less" scoped>
@import '../../../assets/less/rem.less';
.recordList{
    .rem(10);
    padding: @rv;
    .recordDetile{
        .recordDetile-title{
            .rem(14);
            font-size: @rv;
            color: #333333;
            &{
                .rem(11);
                margin-bottom: @rv;
            }
        }
        .recordDetile-box{
            background: #ffffff;
            &{
                .rem(10);
                padding: @rv;
            }
            border-radius: 10px;
            box-shadow:0px 8px 15px 0px rgba(235,235,235,0.75);
            position: relative;
            .winningIcon{
                .rem(43);
                width: @rv;
                height: @rv;
                display: inline-block;
                position: absolute;
                top: 0;
                right: 0;
                z-index: 1;
                background: url(../../../assets/my/winningIcon.png) no-repeat;
                background-size: 100%;
            }
            .recordDetile-box-left{
                display: inline-block;
                .rem(70);
                width: @rv;
                height: @rv;
                &{
                    .rem(13);
                    margin-right: @rv;
                }
                vertical-align: top;
                border: 1px solid #e3e3e3;
                border-radius: 5px;
            }
            .recordDetile-box-text{
                vertical-align: top;
                display: inline-block;
                width: 65%;
                p{
                    .rem(20);
                    line-height: @rv;
                    color: #999999;
                    &{
                        .rem(12);
                        font-size: @rv;
                    }
                    &.scene{
                        .rem(13);
                        font-size: @rv;
                        color: #333333;
                    }
                    &.number{
                        color: #FF3031;
                        span{
                            color: #999999;
                        }
                    }
                }
            }
        }
    }
}
</style>
