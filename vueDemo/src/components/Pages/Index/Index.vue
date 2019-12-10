<template>
    <div class="Index">
        <!-- 头部 -->
        <div class="top-div">
            <div class="top-div-bg">
                <div class="top-div-swipe">
                    <van-swipe :autoplay="3000" indicator-color="#fff">
                        <van-swipe-item v-for="(item, index) in map.wheelPlantingList" :key="index">
                            <div class="detile">
                                <img :src="item.first_img" style="100%"/>
                            </div>
                        </van-swipe-item>
                    </van-swipe>
                </div>
            </div>
            <div class="top-div-Notice">
                <div class="swiper-box">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item,index) in map.noticeList" :key="index">
                                <div class="voticeIcon">
                                    <i></i>公告<span @click="$router.push({name:'ProblemDetile',query:{'id':item.id}})">{{item.title}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="jumpTwo">
                    <van-row type="flex" justify="space-around">
                        <van-col span="11">
                            <div class="Live-div" @click="jumpPage('video')">
                                <div class="div-left">
                                    <h2>直播间</h2>
                                    <p>点击进入直播间</p>
                                </div>
                                <img src="../../../assets/index/Live.png" alt="">
                            </div>
                        </van-col>
                        <van-col span="11">
                            <div class="Live-div" @click="jumpPage('problem')">
                                <div class="div-left">
                                    <h2>常见问题</h2>
                                    <p>教你从新手变成老手</p>
                                </div>
                                <img src="../../../assets/index/problem.png" alt="">
                            </div>
                        </van-col>
                    </van-row>
                </div>
            </div>
        </div>

        <!-- 玉石展示 -->
        <div class="exhibition">
            <div class="exhibition-title">
                <i></i>
                玉石展示
                <span>所有玉石都可以参加抽奖</span>
            </div>
            <div class="exhibition-boxs" v-for="(item,index) in map.jadeExhibitionList" :key="index">
                <div class="exhibition-box-img" @click="jumpJadeFunc(index)">
                    <img :src="item.img" alt="" width="100%">
                    <i></i>
                </div>
                <div class="exhibition-box-text">
                    <div class="exhibition-box-name">
                        <h4 class="name">{{item.ctype}}第{{item.cnum}}期</h4>
                        <p>已参与:<span>{{item.real_num}}/{{item.set_num}}</span>人</p>
                    </div>
                    <div class="exhibition-box-btn">
                        <div class="box-btn-left">
                            <p>当前进度：{{item.percentage}}%</p>
                            <van-progress
                                :percentage="item.percentage"
                                pivot-color="#24CF68"
                                color="#24CF68"
                            />
                        </div>
                        <button class="btn" style="background-color: #7d7e80;" v-if="parseInt(item.real_num) == parseInt(item.set_num)">募集完成</button>
                        <button class="btn" v-if="parseInt(item.real_num) < parseInt(item.set_num)" @click="jumpJadeFunc(index)">立即参与</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 中奖专区 -->
        <div class="winning">
            <div class="winning-title">
                <div class="title-text">
                    <h3>中奖专区</h3>
                    <p>每天都有好礼相送，精彩不断</p>
                </div>
            </div>
            <div class="winning-box">
                <div class="winning-box-detile" v-for="(item,index) in map.winningAreaList" :key="index">
                    <div class="box-title">{{item.big_title}}日常第{{item.q_id}}期：<span>{{item.cnum}}</span>次</div>
                    <div class="box-detile" @click="$router.push({name:'LotteryDetile',query:{'id':item.id}})">
                        <div class="box-detile-left">
                            <img :src="item.img" alt="" width="100%">
                            <i></i>
                        </div>
                        <div class="box-detile-right">
                            <div class="detile-right-top">
                                <img :src="item.tximg" alt="" class="portrait">
                                <p class="name">姓名：<span>{{item.realname}}</span></p>
                            </div>
                            <div class="detile-right-bottom">
                                <p class="introduce">玉石证书编号:<span>{{item.ys_id}}</span></p>
                                <p class="introduce">揭晓时间:<span>{{item.ctime}}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Index from "./Index.js";
export default Index;
</script>

<style lang="less" scoped>
@import './Index.less';
</style>
