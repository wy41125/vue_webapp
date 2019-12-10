import Vue from 'vue'
import Router from 'vue-router'
import Main from "@/components/Main.vue"
import Index from "@/components/Pages/Index/Index.vue"
import Jade from "@/components/Pages/Jade/Jade.vue"
import Lottery from "@/components/Pages/Lottery/Lottery.vue"
import My from "@/components/Pages/My/My.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children:[
        {path: '',name: 'Index',component: Index},
        {path: '/jade',name: 'Jade',component: Jade},
        {path: '/lottery',name: 'Lottery',component: Lottery},
        {path: '/my',name: 'My',component: My},
      ]
    },
    {
      path:'/setting',
      name:'Setting',
      component:resolve => {
        require(['@/components/Pages/My/Setting.vue'], resolve);
      },
    },
    {
      path:'/changePassword',//修改密码
      name:'ChangePassword',
      component:resolve => {
        require(['@/components/Pages/Land/ChangePassword.vue'], resolve);
      },
    },
    {
      path:'/realName',//实名认证
      name:'RealName',
      component:resolve => {
        require(['@/components/Pages/Land/RealName.vue'], resolve);
      },
    },
    {
      path:'/sign',//登录
      name:'Sign',
      component:resolve => {
        require(['@/components/Pages/Land/Sign.vue'], resolve);
      },
    },
    {
      path:'/register',//注册
      name:'Register',
      component:resolve => {
        require(['@/components/Pages/Land/Register.vue'], resolve);
      },
    },
    {
      path:'/passwordBack',//密码找回
      name:'PasswordBack',
      component:resolve => {
        require(['@/components/Pages/Land/PasswordBack.vue'], resolve);
      },
    },
    {
      path:'/newPassword',//设置密码
      name:'NewPassword',
      component:resolve => {
        require(['@/components/Pages/Land/NewPassword.vue'], resolve);
      },
    },
    {
      path:'/addressList',//地址管理
      name:'AddressList',
      component:resolve => {
        require(['@/components/Pages/My/AddressList.vue'], resolve);
      },
    },
    {
      path:'/newAddress',//新增地址
      name:'NewAddress',
      component:resolve => {
        require(['@/components/Pages/My/NewAddress.vue'], resolve);
      },
    },
    {
      path:'/collection',
      name:'Collection',
      component:resolve => {
        require(['@/components/Pages/My/Collection.vue'], resolve);
      },
    },
    {
      path:'/winningRecord',//中奖记录
      name:'WinningRecord',
      component:resolve => {
        require(['@/components/Pages/My/WinningRecord.vue'], resolve);
      },
    },
    {
      path:'/orderList',//订单列表
      name:'OrderList',
      component:resolve => {
        require(['@/components/Pages/My/OrderList.vue'], resolve);
      },
    },
    {
      path:'/orderDetile',//订单详情
      name:'OrderDetile',
      component:resolve => {
        require(['@/components/Pages/My/OrderDetile.vue'], resolve);
      },
    },
    {
      path:'/prePurchase',//购物车
      name:'PrePurchase',
      component:resolve => {
        require(['@/components/Pages/Jade/PrePurchase.vue'], resolve);
      },
    },
    {
      path:'/lotteryDetile',//开奖记录详情
      name:'LotteryDetile',
      component:resolve => {
        require(['@/components/Pages/Lottery/LotteryDetile.vue'], resolve);
      },
    },
    {
      path:'/share',//分享
      name:'Share',
      component:resolve => {
        require(['@/components/Pages/Share.vue'], resolve);
      },
    },
    {
      path:'/jadeDetile',//商品详情页
      name:'JadeDetile',
      component:resolve => {
        require(['@/components/Pages/Jade/JadeDetile.vue'], resolve);
      },
    },
    {
      path:'/problem',//常见问题列表页
      name:'Problem',
      component:resolve => {
        require(['@/components/Pages/Index/Problem.vue'], resolve);
      },
    },
    {
      path:'/problemDetile',//问题详情页
      name:'ProblemDetile',
      component:resolve => {
        require(['@/components/Pages/Index/ProblemDetile.vue'], resolve);
      },
    },
    {
      path:'/liveCenter',//直播列表页
      name:'LiveCenter',
      component:resolve => {
        require(['@/components/Pages/Index/LiveCenter.vue'], resolve);
      },
    },
  ]
})
