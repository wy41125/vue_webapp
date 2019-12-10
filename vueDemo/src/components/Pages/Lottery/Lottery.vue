<template>
    <div>
        <!-- 正在开奖 -->
        <div class="BeingWinning">
            <lineTitle title-text="正在开奖"></lineTitle>
            <!-- 开奖列表 -->
            <div class="winningList">
                <div :class="isShowAll?'list':'list showList'">
                    <div class="winningDetile">
                        <winningTime :btn-type="1"></winningTime>
                    </div>
                    <div class="winningDetile">
                        <winningTime></winningTime>
                    </div>
                    <div class="winningDetile">
                        <winningTime :btn-type="1"></winningTime>
                    </div>
                </div>
                <div class="lookAll" @click="lookAllFunc">
                    {{showText}}<i :class="isShowAll?'showIcon':'hideIcon'"></i>
                </div>
            </div>
        </div>

        <!-- 往期开奖 -->
        <div class="pastWinning">
            <div class="title">往期开奖记录</div>
            <div class="pastWinning-list">
                <div class="pastWinning-detile" v-for="(item,index) in map.winning_prizeList" :key="index">
                    <winningDetails style-type="1" v-bind:dataArray="item"></winningDetails>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import AxiosDIY from "@/assets/config/axiosData.js";
import winningTime from '../../component/winningTime.vue'
import winningDetails from '../../component/winningDetails.vue'
import lineTitle from '../../component/lineTitle.vue'
    export default {
        data() {
            return {
                isShowAll:false,
                showText:'展示更多',
                map:{
                    winning_prizeList:[]
                }
            }
        },
        components:{
            winningTime,winningDetails,lineTitle
        },
        computed: {

        },
        methods: {
            lookAllFunc:function(){
                this.isShowAll = this.isShowAll?false:true;
                if (this.isShowAll) this.showText='收起'
                else this.showText='展示更多'
            }
        },
        created() {
            let dataObj = {
                mode:'prize',
                act:'jxkj',
                sid:'A011750'
            }
            AxiosDIY.getAjaxFunc(dataObj,'getDataUrl',(data)=>{
                //console.log(data)
                let c=data.msg
                this.map.winning_prizeList=c.winning_prize
            })
	    document.title = '开奖中心';
        },
    }
</script>

<style lang="less" scoped>
@import '../../../assets/less/rem.less';
.BeingWinning{
    .rem(10);
    margin-bottom: @rv;
    &{
        .rem(10);
        padding-left: @rv;
        padding-right: @rv;
    }
    &{
        .rem(20);
        padding-top: @rv;
        padding-bottom: @rv;
    }
    background: #ffffff;
    .winningList{
        .list{
            .winningDetile{
                .rem(15);
                margin-bottom: @rv;
            }
            &.showList{
                .rem(265);
                height: @rv;
                overflow: hidden;
            }
        }
        .lookAll{
            text-align: center;
            color: #999999;
            .rem(12);
            font-size: @rv;
            &{
                .rem(5);
                margin-top: @rv;
            }
            i{
                display: inline-block;
                vertical-align: middle;
                margin-bottom: 3px;
                .rem(15);
                width: @rv;
                height: @rv;
                background: url(../../../assets/lottery/icon_show.png) no-repeat;
                background-size: 100%;
                &{
                    .rem(5);
                    margin-left: @rv;
                }
            }
        }
    }
}

.pastWinning{
    .rem(10);
    padding: @rv;
    background: #ffffff;
    .title{
        .rem(10);
        padding-bottom: @rv;
        color: #333333;
        border-bottom: 1px solid #e3e3e3;
        &{
            .rem(14);
            font-size: @rv;
        }
    }
}

.hideIcon{
    animation: hideIcon 0.5s linear;
    transform: rotate(0deg);
}
/*通过@keyframes规则,能够创建动画 , que 定义动画的名称 可自己定义*/
@keyframes hideIcon {
    /*以百分比来规定改变发生的时间 也可以通过"from"和"to",等价于0% 和 100%*/
    0%{
        /*rotate(2D旋转) scale(放大或者缩小) translate(移动) skew(翻转)*/
        transform: rotate(-180deg);
    }
    100%{
        transform: rotate(0deg);
    }
}
.showIcon{
    /*animation (动画) :绑定选择器, 4s完成动画 linear(匀速) infinite(循环) */
    animation: showIcon 0.5s linear;
    transform: rotate(180deg);
}
/*通过@keyframes规则,能够创建动画 , que 定义动画的名称 可自己定义*/
@keyframes showIcon {
    /*以百分比来规定改变发生的时间 也可以通过"from"和"to",等价于0% 和 100%*/
    0%{
        /*rotate(2D旋转) scale(放大或者缩小) translate(移动) skew(翻转)*/
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(-180deg);
    }
}
</style>