<template>
    <div>
        <!-- 标题选择栏 -->
        <div class="classfomTab">
            <div class="select-div">
                <div class="select-box">
                    <select name="position-select" id="position">
                        <option value="1">档位分类</option>
                        <option value="1">一档</option>
                        <option value="1">二档</option>
                    </select>
                    <i></i>
                </div>
                <div class="select-box">
                    <select name="position-Issue" id="Issue">
                        <option value="1">期号选择</option>
                        <option value="1">一期</option>
                        <option value="1">二期</option>
                    </select>
                    <i></i>
                </div>
                <div class="select-box">
                    <select name="position-time" id="time">
                        <option value="1">日期选择</option>
                        <option value="1">20190203</option>
                        <option value="1">20190204</option>
                    </select>
                    <i></i>
                </div>
            </div>
            <div class="search-div">
                <i></i>
            </div>
        </div>

        <!-- winningDetile -->
        <div class="winningUser">
            <div class="userBox">
                <i></i>
                <div class="userBox-img">
                    <img :src="prizeinfo.tximg" width="100%" alt="">
                </div>
                <div class="userBox-text">
                    <h3>开奖时间:<span>{{prizeinfo.ctime}}</span></h3>
                    <p>姓名：<span>{{prizeinfo.realname}}</span></p>
                    <p>玉石证书编号：<span>{{prizeinfo.ys_id}}</span></p>
                </div>
            </div>
        </div>

        <!-- 奖品展示 -->
        <div class="Exhibition">
            <lineTitle title-text="奖品展示"></lineTitle>
            <!-- 奖品展示轮播 -->
            <div class="Exhibition-swiper">
                <div style="text-align: center">


                                <img :src="prizeinfo.img" />


                </div>
<!--                <div class="Exhibition-swiper-name">-->
<!--                    {{ExhibitionName}}-->
<!--                </div>-->
            </div>
        </div>

        <!-- 开奖视频 -->
        <div class="video">
            <lineTitle title-text="开奖视频"></lineTitle>
            <div class="videoBox" @click="palyVideo">
                <div v-show="isMask" class="mask"></div><i v-show="isMask" class="videoIcon" ></i>

                <!-- <video id="movie" src="../../../assets/video.mp4" width="100%" height="100%">
                    您的浏览器不支持 video 标签。
                </video> -->
            </div>
        </div>

        <!-- 轮动选择 -->
        <div class="areaBox" v-show="areaShow">
            <div class="mask"></div>
            <div class="area">
                <van-area
                    :area-list="areaList"
                    @confirm="funcConfirm"
                    @cancel="closeArea"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import AxiosDIY from "@/assets/config/axiosData.js";
import lineTitle from '../../component/lineTitle.vue'
    export default {
        data() {
            return {
                controlstr: 'controls',
                id:'',
                isMask:true,
                prizeinfo:'',
                ExhibitionList:[
                    {
                        image:require('../../../assets/image1.png'),
                        name:'啊伤心啊谢娜潇洒行啊'
                    },
                    {
                        image:require('../../../assets/image2.png'),
                        name:'阿信阿信阿信啊'
                    },
                    {
                        image:require('../../../assets/image3.png'),
                        name:'（千韵日常第一期:24241515）Macbook 15.6寸'
                    },
                ],
                ExhibitionName:'',
            }
        },
        components:{
            lineTitle
        },
        methods:{
            palyVideo:function(){//video播放暂停事件
                let video = document.getElementById('movie');
                if(video.paused){ //如果已暂停则播放
                    video.play();
                    this.isMask=false;
                }else{
                    video.pause();
                    this.isMask=true;
                }
            },
            changeExhibitionName:function(activeIndex){
                this.ExhibitionName = this.ExhibitionList[activeIndex].name
            }
        },
        mounted(){
            let that = this;
            var mySwiper = new Swiper ('.swiper-container', {
                direction: 'horizontal',
                slidesPerView: "auto",
                centeredSlides:true,
                spaceBetween: 20,
                initialSlide:1,
                on:{
                    slideChangeTransitionEnd:function(){
                        that.changeExhibitionName(this.activeIndex)
                    }
                }
            })
        },
        created(){
            document.title = '开奖纪录';
            this.ExhibitionName = this.ExhibitionList[1].name7
            this.id = this.$route.query.id
            let dataObj = {
                mode:'prize_info',
                act:'jxkj',
                sid:'A011750',
                id:this.id
            }
            AxiosDIY.getAjaxFunc(dataObj,'getDataUrl',(data)=>{
                console.log(data)
                if(data.status==200 && data.msg=='ok'){
                    this.prizeinfo=data.info
                }

            })
        }
    }
</script>

<style lang="less" scoped>
@import '../../../assets/less/rem.less';
.classfomTab{
    background-color: #fff;
    .rem(10);
    padding: @rv;
    display: flex;
    justify-content: flex-start;
    .select-div{
        display: inline-block;
        width: 90%;
        border-right: 1px solid #e3e3e3;
        display: flex;
        justify-content: space-around;
        box-sizing: border-box;
        .select-box{
            display: inline-block;
            i{
                display: inline-block;
                .rem(7);
                width: @rv;
                &{
                    .rem(6);
                    height: @rv;
                }
                background: url(../../../assets/lottery/drop-down.png) no-repeat;
                background-size: 100%;
            }
            select{
                border: 0;
                background: transparent;
            }
        }
    }
    .search-div{
        display: inline-block;
        text-align: center;
        width: 10%;
        i{
            display: inline-block;
            .rem(17);
            width: @rv;
            height: @rv;
            background: url(../../../assets/lottery/icon_search.png) no-repeat;
            background-size: 100%;
            vertical-align: middle;
        }
    }
}


.winningUser{
    .rem(10);
    padding: @rv;
    .userBox{
        .rem(10);
        padding: @rv;
        position: relative;
        background: #ffffff;
        border-radius: 10px;
        i{
            display: inline-block;
            position: absolute;
            top: 0;
            left: 0;
            .rem(50);
            width: @rv;
            height: @rv;
            background: url(../../../assets/lottery/icon_winner.png) no-repeat;
            background-size: 100%;
            z-index: 1;
        }
        .userBox-img{
            display: inline-block;
            .rem(90);
            width: @rv;
            height: @rv;
            &{
                .rem(8);
                margin-right: @rv;
            }
            img{
                .rem(5);
                border-radius: @rv;
            }
        }
        .userBox-text{
            display: inline-block;
            width: 62%;
            color: #999999;
            h3{
                .rem(12);
                font-size: @rv;
                span{
                    color: #24cf68;
                    .rem(14);
                    font-size: @rv;
                }
                &{
                    .rem(15);
                    margin-bottom: @rv;
                }
            }
            p{
                .rem(12);
                font-size: @rv;
                span{
                    color: #333333;
                }
            }
        }
    }
}

.Exhibition{
    .Exhibition-swiper{
        width: 100%;
        position: relative;
        .rem(20);
        padding-top:@rv;
        .Exhibition-swiper-box{
            width: 100%;
            height: 210px;
            position: absolute;
            top: 0;
            left: 0;
        }
        .Exhibition-swiper-name{
            width: 100%;
            color: #fff;
            text-align: center;
            &{
                .rem(14);
                font-size: @rv;
            }
            .rem(70);
            padding-top: @rv;
            &{
                .rem(20);
                padding-bottom:@rv;
            }
            background-color: #24cf68;
        }
    }
}

.video{
    .rem(20);
    margin-top: @rv;
    .videoBox{
        .rem(10);
        margin:0 @rv @rv;
        &{
            .rem(138);
            height: @rv;
        }
        border-radius: 10px;
        position: relative;
        .mask{
            width: 100%;
            height: 100%;
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            background-color: #000000;
            opacity: 0.3;
            text-align: center;
            box-sizing: border-box;
            z-index: 100;
        }
        .videoIcon{
            display: inline-block;
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 1000;
            .rem(55);
            width: @rv;
            height: @rv;
            background: url(../../../assets/lottery/icon_paly.png) no-repeat;
            background-size: 100%;
            transform: translate(-50%,-50%);
            -ms-transform: translate(-50%,-50%);
            -moz-transform: translate(-50%,-50%);
            -webkit-transform: translate(-50%,-50%);
            -o-transform: translate(-50%,-50%);
        }
    }
}

.Exhibition-swiper-box{
    width: 100%;
    height: 210px;
}
.swiper-container {
    margin-top: 20px;
    width: 100%;
    height: 100%;
    margin-bottom: 53px;
    overflow: hidden;
}
.swiper-container .swiper-wrapper .swiper-slide{
    .rem(118);
    width: @rv;
    height: @rv;
    border-radius: 10px;
}
.swiper-container .swiper-wrapper .swiper-slide img{
    width: 100%; height: 100%;
    display: inline-block;
    border-radius: 10px;
}
.swiper-container .swiper-wrapper .swiper-slide-prev{
    margin-top: 18px;
    .rem(118);
    height: @rv!important;
    width: @rv!important;
}
.swiper-container .swiper-wrapper .swiper-slide-next{
    margin-top: 18px;
    .rem(118);
    height: @rv!important;
    width: @rv!important;
}


</style>
