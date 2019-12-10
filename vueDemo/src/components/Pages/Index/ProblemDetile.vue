<template>
    <div>
        <van-nav-bar
            :title=title
            left-arrow
            @click-left="onClickLeft"
        />

        <div class="setileBox" v-html="content">
            <!-- {{content}} -->
        </div>
    </div>
</template>

<script>
    import AxiosDIY from "@/assets/config/axiosData.js";
    export default {
        data() {
            return {
                title:'',
                content:''
            }
        },
        methods:{
            onClickLeft:function(){
                this.$router.go(-1);
            },
        },
        created() {
            var id = this.$route.query.id
            let dataObj = {
                mode:'article_info',
                act:'jxkj',
                sid:'A011750',
                id:id,
            }
            AxiosDIY.getAjaxFunc(dataObj,'getDataUrl',(data)=>{
                if(data.status==200){
                    console.log(data)
                    this.content=data.msg.content
                    this.title=data.msg.title
                }
            })
        }
    }
</script>

<style lang="less" scoped>

@import '../../../assets/less/rem.less';
.setileBox{
    .rem(15);
    padding: @rv;
    p{
        .rem(12);
        font-size: @rv;
        color: #333333;
        &{
            .rem(10);
            margin: @rv 0;
        }
    }
}
</style>
