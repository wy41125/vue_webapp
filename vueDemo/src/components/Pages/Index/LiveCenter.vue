<template>
    <div>
        <van-nav-bar
            title="详细"
            left-arrow
            @click-left="onClickLeft"
        />

        <div class="winningTime-box" v-for="(item,index) in map.winning_prizeList" :key="index">
            <winningTime btn-type='1' style-type='1' v-bind:dataArray="item"></winningTime>
        </div>
    </div>
</template>

<script>
    import AxiosDIY from "@/assets/config/axiosData.js";
import winningTime from "@/components/component/winningTime.vue"
    export default {
        data() {
            return {
                map:{
                    winning_prizeList:[]
                }
            }
        },
        methods:{
            onClickLeft:function(){
                this.$router.go(-1);
            },
        },
        components:{
            winningTime
        },
        created() {
            let dataObj = {
                mode:'prize',
                act:'jxkj',
                sid:'A011750'
            }
            AxiosDIY.getAjaxFunc(dataObj,'getDataUrl',(data)=>{
                console.log(data)
                let c=data.msg
                this.map.winning_prizeList=c.winning_prize
            })
        }
    }
</script>

<style lang="less" scoped>
.winningTime-box{
    border-bottom: 1px solid #e3e3e3;
}
</style>
