<template>
  <div id="app">
    <div class="main-div">
      <router-view/>
    </div>
    <!-- Tabbar -->
    <van-tabbar v-model="active" @change="changeTabbar(active)" active-color="#07c160">
      <van-tabbar-item>
        <span>首页</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.active0 : icon.normal0" />
      </van-tabbar-item>
      <van-tabbar-item>
        <span>玉石</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.active1 : icon.normal1" />
      </van-tabbar-item>
      <van-tabbar-item>
        <span>开奖</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.active2 : icon.normal2" />
      </van-tabbar-item>
      <van-tabbar-item>
        <span>我的</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.active3 : icon.normal3" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      active: 0,
      nowPath:'',
      icon: {
        normal0: require('../../src/assets/tabbar/index.png'),
        active0: require('../../src/assets/tabbar/index_active.png'),
        normal1: require('../../src/assets/tabbar/jade.png'),
        active1: require('../../src/assets/tabbar/jade_active.png'),
        normal2: require('../../src/assets/tabbar/Lottery.png'),
        active2: require('../../src/assets/tabbar/Lottery_active.png'),
        normal3: require('../../src/assets/tabbar/my.png'),
        active3: require('../../src/assets/tabbar/my_active.png'),
      }
    }
  },
  created(){
    this.changerTabbarAcitve()
  },
  updated(){//页面发生变化的时候都执行
    this.changerTabbarAcitve()
  },
  methods:{
    changerTabbarAcitve(){
      this.nowPath = this.$route.path;
      if(this.nowPath == '/my'){
        this.active=3
      }else if(this.nowPath == '/lottery'){
        this.active=2
      }else if(this.nowPath == '/jade'){
        this.active=1
      }else if(this.nowPath == '/'){
        this.active=0
      }
    },
    changeTabbar(active){
      switch(active){
        case 0:
          this.$router.replace({name:'Index'})
          break;
        case 1:
          this.$router.replace({name:'Jade'})
          break;
        case 2:
          this.$router.replace({name:'Lottery'})
          break;
        case 3:
          this.$router.replace({name:'My'})
          break;
      }
    }
  }
}
</script>

<style>
.main-div{
    width: 100%;
    background-color: #f6f7f8;
    padding-bottom: 50px;
}
</style>
