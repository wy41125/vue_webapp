<template>
    <div>
        <div class="goods-detile" v-for="(item,index) in map.goodList" @click="jumpJadeDetile(item)" :key="index">
                        <div class="goods-detile-left">
                            <img :src="item.good_img" alt="" width="100%">
                        </div>
                        <div class="goods-detile-right">
                            <p class="goods-detile-name">
                                {{item.good_name}} | {{item.good_keyword}}
                            </p>
                            <div class="goods-detile-price">
                                <div class="price-left">
                                    <p>押金：<span>￥{{item.good_price}}</span></p>
                                    <p>租金：<span>{{item.month_rent_money}}元/月</span></p>
                                </div>
                                <div class="price-btn">
                                    <button @click="jumpJadeDetile(item)">{{buttonText}}</button>
                                </div>
                            </div>
                        </div>
                    </div>
    </div>
</template>

<script>
    import AxiosDIY from "@/assets/config/axiosData.js";
    export default {
        props:['buttonText','tip'],

        data() {
            return {
                map:{
                    goodList:[]
                }
            }
        },
        computed: {

        },
        methods: {
            jumpJadeDetile(item){
                // localStorage.setItem('goodObj',JSON.stringify(item))
                this.$router.push({name:'JadeDetile',query:{goodObj:encodeURIComponent(JSON.stringify(item))}})
            }
        },
        created() {
            let dataObj = {
                mode:'lists',
                act:'jxkj',
                sid:'A011750',
                ctype:this.tip
            }
            AxiosDIY.getAjaxFunc(dataObj,'getDataUrl',(data)=>{
                //console.log(data)
                let c=data.msg
                this.map.goodList=c.good
            })

            // if(!window.localStorage) {
            //     var c=this.getdateIndex(sign)
            // }else if (!sessionStorage.goodlist && this.tip==1) {
            //     var c=this.getdateIndex(sign)
            //     var v=JSON.stringify(c);
            //     sessionStorage.setItem("goodlist", v);
            // }else if(!sessionStorage.goodlists && this.tip==2){
            //     var c=this.getdateIndex(sign)
            //     var v=JSON.stringify(c);
            //     sessionStorage.setItem("goodlists", v);
            // }else{
            //     if(this.tip==1){
            //         var infos=sessionStorage.getItem("goodlist");
            //     }else if(this.tip==2){
            //         var infos=sessionStorage.getItem("goodlists");
            //     }
            //     var c=JSON.parse(infos);
        }
    }
</script>

<style lang="less" scoped>
@import '../../assets/less/rem.less';
.goods-detile{
        border-bottom: 1px solid #E3E3E3;
        .rem(10);
        padding: @rv;
        background: #ffffff;
        .goods-detile-left{
            display: inline-block;
            .rem(90);
            height: @rv;
            width: @rv;
            &{
                .rem(10);
                margin-right: @rv;
            }
            img{
                .rem(10);
                border-radius: @rv;
            }
        }
        .goods-detile-right{
            display: inline-block;
            width: 63%;
            vertical-align: top;
            .rem(3);
            padding-top: @rv;
            .goods-detile-name{
                color: #333333;
                .rem(14);
                font-size: @rv;
                &{
                    .rem(38);
                    height: @rv;
                }
                &{
                    .rem(15);
                    margin-bottom: @rv;
                }
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
            .goods-detile-price{
                .price-left{
                    display: inline-block;
                    color: #999999;
                    .rem(12);
                    font-size: @rv;
                    span{
                        color: #FF0000;
                    }
                }
                .price-btn{
                    display: inline-block;
                    vertical-align: middle;
                    .rem(80);
                    width: @rv;
                    float: right;
                    button{
                        width: 100%;
                        .rem(28);
                        height: @rv;
                        background: #24CF68;
                        color: #ffffff;
                        border-radius: 10px;
                        border: 0;
                        &{
                            .rem(13);
                            font-size: @rv;
                        }
                    }
                }
            }
        }
    }
</style>
