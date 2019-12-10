<template>
    <div class="sharePage">
        <div class="header"></div>
        <!-- 已邀请 -->
        <div class="InvitationNumber">
            目前已邀请1人
        </div>
        <div class="box"></div>
        <div class="shareBtn">
            <button @click="share">立即邀请</button>
        </div>

        <!-- 获取方式 -->
        <div class="winning">
            <lineTitle title-text="获奖方式" style-type="1"></lineTitle>
            <div class="winningBox">
                <div class="winningBox-List">
                    <div class="boxdetile">
                        <h4>邀请5人</h4>
                        <img src="../../assets/receive1.png" alt="">
                        <span>领取</span>
                        <p>0/200</p>
                    </div>
                    <div class="boxdetile">
                        <h4>邀请20人</h4>
                        <img src="../../assets/receive2.png" alt="">
                        <span>领取</span>
                        <p>0/20</p>
                    </div>
                    <div class="boxdetile">
                        <h4>排行榜第一</h4>
                        <img src="../../assets/receive3.png" alt="">
                        <span>领取</span>
                        <p>0/20</p>
                    </div>
                </div>
                <div class="winningBox-text">
                    <p class="one">邀请新人并完成租聘即可获得以上<em>全部</em>奖励</p>
                    <p>先到先得，送完为止</p>
                </div>
            </div>
        </div>
        <!-- 排行榜 -->
        <div class="RankingListBox">
            <lineTitle title-text="排行榜" style-type="1"></lineTitle>
            <div class="RankingList">
                <div class="title">
                    <span>排名</span><span>头像</span><span>昵称</span><span>邀请人数</span>
                </div>
                <div class="title">
                    <span><em class="one">1</em></span>
                    <span><em class="userImg"></em></span>
                    <span>昵称</span>
                    <span>50</span>
                </div>
                <div class="title">
                    <span><em class="two">2</em></span>
                    <span><em class="userImg"></em></span>
                    <span>昵称</span>
                    <span>50</span>
                </div>
                <div class="title">
                    <span><em class="three">3</em></span>
                    <span><em class="userImg"></em></span>
                    <span>昵称</span>
                    <span>50</span>
                </div>
                <div class="title">
                    <span><em>4</em></span>
                    <span><em class="userImg"></em></span>
                    <span>昵称</span>
                    <span>50</span>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import AxiosDIY from "@/assets/config/axiosData.js";
    import wx from 'weixin-js-sdk';
import lineTitle from '@/components/component/lineTitle.vue'
    export default {
        data() {
            return {
                id:'',
                appid: 'wx0fca4cd759571525',
                signature: '',
                timestamp: '',
                noncestr: ''
            }
        },
        components:{
            lineTitle
        },
        methods: {
            share:function(){
                WeixinJSBridge.on('menu:share:appmessage', function(argv){ alert("发送给好友"); });
                // wx.config({
                //     debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                //     appId: this.appid, // 必填，公众号的唯一标识
                //     timestamp: this.timestamp, // 必填，生成签名的时间戳
                //     nonceStr: this.noncestr, // 必填，生成签名的随机串
                //     signature: this.signature,// 必填，签名
                //     jsApiList: ['updateTimelineShareData','updateAppMessageShareData'] // 必填，需要使用的JS接口列表
                // });
                // WeixinJSBridge.invoke('shareTimeline',{
                //     "img_url":'https://www.ishongyuan.com/share_ico.jpg',
                //     "link":'https://www.ishongyuan.com/index.html#/register?id='+this.id,
                //     // "desc": desc,
                //     "title":'注册'
                // });

            },
            shard:function() {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: this.appid, // 必填，公众号的唯一标识
                    timestamp: this.timestamp, // 必填，生成签名的时间戳
                    nonceStr: this.noncestr, // 必填，生成签名的随机串
                    signature: this.signature,// 必填，签名
                    jsApiList: ['updateTimelineShareData','updateAppMessageShareData'] // 必填，需要使用的JS接口列表
                });
                wx.error(function (res) {
                    console.log('验证失败返回的信息:',res);
                });
                wx.updateTimelineShareData({
                    title: '注册', // 分享标题
                    link: 'https://www.ishongyuan.com/index.html#/register?id='+this.id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'https://www.ishongyuan.com/share_ico.jpg', // 分享图标
                    success: function () {
                        // 设置成功
                    }
                });
                wx.updateAppMessageShareData({
                    title: '注册', // 分享标题
                    desc: '分享', // 分享描述
                    link: 'https://www.ishongyuan.com/index.html#/register?id='+this.id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'https://www.ishongyuan.com/share_ico.jpg', // 分享图标
                    success: function () {
                        // 设置成功
                    }
                });
            }
        },
        created(){
            document.title = '邀请';
            var userinfo = localStorage.getItem("userinfo");
            var c = JSON.parse(userinfo);
            let objdata = {
                phone:c.phone
            }
            var cons=AxiosDIY.changeData(objdata);
            this.id=cons;
            var url=location.href.split('#')[0];
            let dataObj={
                mode:'get_wx_data',
                act:'jxkj',
                sid:'A011750',
                url:url
            }
            AxiosDIY.getAjaxFunc(dataObj,'getDataUrl',(data)=>{
                this.appid = 'wx0fca4cd759571525'
                this.signature = data.Sign
                this.timestamp = data.timestamp
                this.noncestr = data.noncestr
                this.shard()
            })
        },
    }
</script>

<style lang="less" scoped>
@import '../../assets/less/rem.less';
.sharePage{
    width: 100%;
    background: url(../../assets/bigBg.png) no-repeat;
    background-size: 100%;
    .header{
        width: 100%;
        .rem(175);
        height: @rv;
    }
    .InvitationNumber{
        .rem(164);
        width: @rv;
        &{
            .rem(23);
            height: @rv;
            line-height: @rv;
            border-radius: @rv;
        }
        text-align: center;
        background-color: #FFD92A;
        color: #540000;
        margin: 0 auto;
        &{
            .rem(14);
            font-size: @rv;
        }

    }
    .box{
        width: 100%;
        .rem(240);
        height: @rv;
    }
    .shareBtn{
        .rem(135);
        width: @rv;
        margin: 0 auto;
        &{
            .rem(40);
            height: @rv;
            border-radius: @rv;
        }
        background-color: #ffffff;
        &{
            .rem(2);
            padding: @rv;
        }
        box-sizing: border-box;
        button{
            width: 100%;
            height: 100%;
            border: 0;
            background-color: #333333;
            .rem(18);
            font-size: @rv;
            font-weight: bold;
            color: #ffffff;
            &{
                .rem(40);
                border-radius: @rv;
            }
        }
    }
    .winning{
        &{
            .rem(10);
            padding: @rv;
        }
        .winningBox{
            width: 100%;
            .rem(10);
            padding-top: @rv;
            &{
                .rem(10);
                padding-bottom: @rv;
            }
            background-color: #E03B1F;
            border-radius: 10px;
            .winningBox-text{
                .rem(12);
                font-size: @rv;
                color: #ffffff;
                text-align: center;
                .one{
                    .rem(14);
                    font-size: @rv;
                    color: #FFD92A;
                    em{
                        color: #ffffff;
                    }
                }
            }
            .winningBox-List{
                .rem(14);
                margin-bottom: @rv;
                display: flex;
                justify-content: space-around;
                .boxdetile{
                    background-color: #FFF9DF;
                    text-align: center;
                    .rem(90);
                    width: @rv;
                    &{
                        .rem(10);
                        border-radius: @rv;
                    }
                    &{
                        .rem(8);
                        padding-top: @rv;
                        padding-bottom: @rv;
                    }
                    h4{
                        color: #E03B1F;
                        .rem(12);
                        font-size: @rv;
                    }
                    img{
                        .rem(54);
                        height: @rv;
                        &{
                            .rem(72.5);
                            width:@rv;
                        }
                    }
                    span{
                        display: block;
                        .rem(70);
                        width: @rv;
                        margin: 0 auto;
                        background-color: #FFD92A;
                        &{
                            .rem(20);
                            height: @rv;
                            line-height: @rv;
                            border-radius: @rv;
                        }
                        &{
                            .rem(12);
                            font-size: @rv;
                            color: #540000;
                        }
                    }
                    p{
                        color: #333333;
                        .rem(12);
                        font-size: @rv;
                    }
                }
            }
        }
    }
    .RankingListBox{
        .rem(10);
        padding: @rv;
        padding-top: 0;
        .RankingList{
            .rem(10);
            padding: @rv;
            padding-top: 0;
            background-color: #FFF9DF;
            color: #540000;
            border-radius: 10px;
            &{
                .rem(350);
                height: @rv;
                overflow-y: scroll;
            }
            &{
                .rem(14);
                font-size: @rv;
            }
            .title{
                border-bottom:1px solid #FFD92A;
                &:last-child{
                    border: 0;
                }
                display: flex;
                justify-content: space-around;
                span{
                    display: inline-block;
                    &{
                        .rem(75);
                        width: @rv;
                    }
                    &{
                        .rem(40);
                        height: @rv;
                        line-height: @rv;
                    }
                    text-align: center;
                }
                em{
                    display: inline-block;
                    .rem(29);
                    width: @rv;
                    height: @rv;
                    line-height: @rv;
                    border-radius: @rv;
                    background-color: transparent;
                    text-align: center;
                    &.one{
                        background-color: #E03B1F;
                        color: #ffffff;
                    }
                    &.two{
                        background-color: #FF6B0A;
                        color: #ffffff;
                    }
                    &.three{
                        background-color: #FFC20A;
                        color: #ffffff;
                    }
                    &{
                        .rem(14);
                        font-size: @rv;
                    }
                    &.userImg{
                        background: url(../../assets/my/userImg-s.png) no-repeat;
                        background-size: 100%;
                        &{
                            .rem(5);
                            margin-top: @rv;
                        }
                    }
                }
            }
        }
    }
}
</style>
