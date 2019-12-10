<template>
    <div>
        <van-tabs v-model="active" color="#24CF68">
            <van-tab title="千韵档">
                <div class="goodsBox">
                    <jadeGoodDetile button-text="了解详情" tip="1"></jadeGoodDetile>
                </div>
            </van-tab>
            <van-tab title="天韵档">
                <div class="goodsBox">
                    <jadeGoodDetile button-text="了解详情" tip="2"></jadeGoodDetile>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import jadeGoodDetile from '../../component/jadeGoodDetile.vue'
export default {
    data() {
        return {
            active:0
        }
    },
    components:{
        jadeGoodDetile
    },
    computed: {


    },
    methods: {

    },
    created() {
        document.title = '玉石中心';
        if(this.$route.query && this.$route.query.activeType){
            this.active = this.$route.query.activeType
        }
    },
    mounted(){
        let dom = document.getElementsByClassName('van-tabs__wrap')[0];
        dom.setAttribute('style','position: fixed!important;')
    }
}
</script>

<style lang="less" scoped>
@import '../../../assets/less/rem.less';
.goodsBox{
    .rem(10);
    padding-top: @rv;
}
.van-tabs__wrap{
    position: fixed!important;
}
</style>
