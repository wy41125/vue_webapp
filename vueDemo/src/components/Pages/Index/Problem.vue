<template>
    <div>
        <van-nav-bar
            title="常见问题"
            left-arrow
            @click-left="onClickLeft"
        />

        <div class="bigBox">
            <!-- 问题列表 -->
            <div class="probelm-box-bg" v-for="(item,index) in map.articleList" :key="index">
                <div class="probelm-box">
                    <h3 class="title">{{item.cat_name}}</h3>
                    <div class="probelm-list" v-for="(items,indexs) in item.infos" :key="indexs">
                        <p @click="$router.push({name:'ProblemDetile',query:{'id':items.id}})">
                            <i></i>{{items.title}}
                            <iconNext class="nextIcon"></iconNext>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="phone-div">
            <p><a class="service-a" href="tel:400-640-6699">客服咨询：400-640-6699</a></p>
        </div>
    </div>
</template>

<script>
    import AxiosDIY from "@/assets/config/axiosData.js";
import iconNext from "@/components/component/iconNext.vue"
    export default {
        data() {
            return {
                key:'',
                map:{
                    articleList:[
                        {cat_name:'新',infos:[
                                {title:'新平台试运营期间1。',id:'2'}
                            ]
                        },
                        {cat_name:'新平台',infos:[
                                    {title:'新平台试运营期间2。',id:'2'}
                                ]
                        },
                    ]
                }
            }
        },
        components:{
            iconNext
        },
        methods:{
            onClickLeft:function(){
                this.$router.go(-1);
            },
        },
        created() {
            let dataObj = {
                mode:'article_list',
                act:'jxkj',
                sid:'A011750'
            }
            AxiosDIY.getAjaxFunc(dataObj,'getDataUrl',(data)=>{
                //console.log(data.msg.good)
                let c=data.msg
                this.map.articleList=c.good
            })
        }

    }
</script>

<style lang="less" scoped>
@import '../../../assets/less/rem.less';
.bigBox{
    .rem(15);
    padding: 0 @rv;
    &{
        .rem(10);
        padding-top: @rv;
    }
    .probelm-box-bg{
        width: 100%;
        background-color: #EF5B4C;
        padding-top: 2px;
        &{
            .rem(10);
            margin-bottom: @rv;
        }
        .rem(10);
        border-radius: @rv;
        .probelm-box{
            background-color: #ffffff;
            .rem(10);
            border-radius: @rv;
            .title{
                .rem(15);
                padding: @rv 0;
                border-bottom: 1px solid #e3e3e3;
                &{
                    .rem(17);
                    padding-left:@rv;
                    padding-right: @rv;
                }
                &{
                    .rem(16);
                    font-size: @rv;
                    color: #EF5B4C;
                }
            }
            .probelm-list{
                .rem(10);
                padding: 0 @rv;
                color: #333333;
                &{
                    .rem(14);
                    font-size: @rv;
                }
                p{
                    .rem(10);
                    padding: @rv 0;
                    border-bottom:1px solid #e3e3e3;
                    &:last-child{
                        border: 0;
                    }
                    i{
                        display: inline-block;
                        .rem(5);
                        width: @rv;
                        height: @rv;
                        border-radius: @rv;
                        background-color: #666666;
                        vertical-align: middle;
                        &{
                            .rem(8);
                            margin-right: @rv;
                        }
                    }
                    .nextIcon{
                        float: right;
                    }
                }
            }
        }
    }
}
.phone-div{
    .rem(15);
    padding-left: @rv;
    padding-right: @rv;
    text-align: center;
    &{
        .rem(20);
        padding-bottom: @rv;
    }
    .service-a{
        .rem(14);
        font-size: @rv;
        color: #000000;
    }
}
</style>
